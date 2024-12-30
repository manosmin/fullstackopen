const Blog = ({ blog }) => (
  <div style={{marginBottom: 24}}>
    <h3>{blog.title}</h3>
    <p>{blog.author}</p>
    <a href={blog.url}>{blog.url}</a>
    <p>{blog.likes}</p>
  </div>  
)

export default Blog