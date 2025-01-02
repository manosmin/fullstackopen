import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";
import blogService from "../services/blogs";
vi.mock("../services/blogs");

const user = userEvent.setup();

const mockSetBlogs = vi.fn();
const mockSetMessage = vi.fn();
const mockToggleVisibility = vi.fn();
const mockShowFormRef = { current: { toggleVisibility: mockToggleVisibility } };

const blog = {
  title: "React patterns",
  author: "Michael Chan",
  url: "https://reactpatterns.com/",
  likes: 5,
};

test("the form calls the event handlers it received as props with the right details when a new blog is created", async () => {
  blogService.create.mockResolvedValue(blog);

  render(
    <BlogForm
      setBlogs={mockSetBlogs}
      setMessage={mockSetMessage}
      showFormRef={mockShowFormRef}
    />
  );

  await user.type(screen.getByPlaceholderText("Title"), blog.title);
  await user.type(screen.getByPlaceholderText("Author"), blog.author);
  await user.type(screen.getByPlaceholderText("URL"), blog.url);
  await user.type(screen.getByPlaceholderText("Likes"), String(blog.likes));

  await user.click(screen.getByText("Add"));

  await waitFor(() => {
    expect(mockSetBlogs).toHaveBeenCalledWith(expect.any(Function));

    const updateBlogsFunction = mockSetBlogs.mock.calls[0][0];
    const updatedBlogs = updateBlogsFunction([]);

    expect(updatedBlogs).toEqual([blog]);

    expect(mockSetMessage).toHaveBeenCalledWith({
      text: `Blog ${blog.title} added successfully`,
      type: "success",
    });

    expect(mockToggleVisibility).toHaveBeenCalled();
  });
});
