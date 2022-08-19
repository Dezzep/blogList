import { useState } from 'react';

const Blog = ({ blog, addLikes, deleteBlog }) => {
  const [details, setDetails] = useState(false);

  const hideDetails = { display: details ? 'none' : '' };
  const showDetails = { display: details ? '' : 'none' };

  const toggleDetails = () => {
    setDetails(!details);
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };
  if (blog.user.id !== undefined) {
  }

  return (
    <div style={blogStyle}>
      <div style={hideDetails}>
        {blog.title} -  {blog.author} <button onClick={toggleDetails}>view</button>
      </div>
      <div style={showDetails}>
        <div>
          {blog.title} <button onClick={toggleDetails}>hide</button>
        </div>
        <p>{blog.url}</p>
        <div>
          {blog.likes}{' '}
          <button
            onClick={() =>
              addLikes(
                blog.id,
                blog.title,
                blog.author,
                blog.url,
                blog.likes + 1,
                blog.user.id
              )
            }
          >
            like
          </button>
        </div>
        <p>{blog.author}</p>
      </div>
      <button onClick={() => deleteBlog(blog.id)}>remove</button>
    </div>
  );
};

export default Blog;
