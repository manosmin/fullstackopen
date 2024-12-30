const Blog = ({ blog }) => (
  <div>
    <h3>{blog.title}</h3>
    <p>
      <strong>Author: </strong>
      {blog.author}
    </p>
    <p>
      <strong>URL: </strong>
      <a href={blog.url}>{blog.url}</a>
    </p>
    <p>
      <strong>Likes: </strong>
      {blog.likes}
    </p>
  </div>
);

export default Blog;
