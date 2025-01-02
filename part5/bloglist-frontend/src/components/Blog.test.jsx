import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import blogService from "../services/blogs"
import Blog from "./Blog";

const blog = {
  id: "5a422a851b54a676234d17f7",
  title: "React patterns",
  author: "Michael Chan",
  url: "https://reactpatterns.com/",
  likes: 5,
  user: [],
};

test("renders title and author but not URL and likes by default", () => {
  render(<Blog blog={blog} />);

  const title = screen.getByText("React patterns");
  expect(title).toBeInTheDocument();

  const author = screen.getByText("Michael Chan");
  expect(author).toBeInTheDocument();

  const url = screen.queryByText("https://reactpatterns.com/");
  expect(url).not.toBeVisible();

  const likes = screen.queryByText("5");
  expect(likes).not.toBeVisible();
});

test("renders URL and likes when button is clicked", async () => {
  const user = userEvent.setup();

  render(<Blog blog={blog} />);

  const title = screen.getByText("React patterns");
  expect(title).toBeInTheDocument();

  const author = screen.getByText("Michael Chan");
  expect(author).toBeInTheDocument();

  const url = screen.queryByText("https://reactpatterns.com/");
  expect(url).not.toBeVisible();

  const likes = screen.queryByText("5");
  expect(likes).not.toBeVisible();

  const viewButton = screen.getByText("View blog");
  await user.click(viewButton);

  expect(url).toBeVisible();
  expect(likes).toBeVisible();
});

test("calls event handler twice when like button is clicked twice", async () => {
  const mockHandleLike = vi.fn();
  const user = userEvent.setup();

  const mockSetBlogs = vi.fn();
  const mockSetMessage = vi.fn();

  const updateLikesMock = mockHandleLike.mockResolvedValue({
    ...blog,
    likes: 1,
  });
  blogService.updateLikes = updateLikesMock;

  render(
    <Blog blog={blog} setBlogs={mockSetBlogs} setMessage={mockSetMessage} />
  );

  const viewButton = screen.getByText("View blog");
  await user.click(viewButton);

  const likeButton = screen.getByText("Like");
  await user.click(likeButton);
  await user.click(likeButton);

  await waitFor(() => expect(updateLikesMock).toHaveBeenCalledTimes(2));

  expect(mockHandleLike.mock.calls).toHaveLength(2);
});