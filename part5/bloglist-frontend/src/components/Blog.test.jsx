import { render, screen, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders title and author but not URL and likes by default', () => {
  const blog = {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 5,
    user: []
  }

  render(<Blog blog={blog} />)

  const title = screen.getByText('React patterns');
  expect(title).toBeInTheDocument();

  const author = screen.getByText('Michael Chan');
  expect(author).toBeInTheDocument();

  const url = screen.queryByText('https://reactpatterns.com/');
  expect(url).not.toBeVisible();

  const likes = screen.queryByText('5');
  expect(likes).not.toBeVisible();

})

test('renders URL and likes when button is clicked', () => {
    const blog = {
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 5,
      user: []
    }
  
    render(<Blog blog={blog} />)
  
    const title = screen.getByText('React patterns');
    expect(title).toBeInTheDocument();
  
    const author = screen.getByText('Michael Chan');
    expect(author).toBeInTheDocument();
  
    const url = screen.queryByText('https://reactpatterns.com/');
    expect(url).not.toBeVisible();
  
    const likes = screen.queryByText('5');
    expect(likes).not.toBeVisible();

    const viewButton = screen.getByText('View blog');
    fireEvent.click(viewButton);

    expect(url).toBeVisible();
    expect(likes).toBeVisible();
  
  })