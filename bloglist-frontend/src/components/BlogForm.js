const BlogForm = ({
  user,
  title,
  handleAuthorChange,
  handleTitleChange,
  handleUrlChange,
  blogSubmitHandler,
  url,
  author,
}) => {
  if (user) {
    return (
      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '7em',
          gap: '.3em',
        }}
      >
        <label>
          Title:
          <input
            type={'text'}
            name={'username'}
            value={title}
            onChange={handleTitleChange}
          />
        </label>
        <label>
          Author:
          <input
            type={'text'}
            name={'author'}
            value={author}
            onChange={handleAuthorChange}
          />
        </label>
        <label>
          URL:
          <input
            type={'text'}
            name={'url'}
            value={url}
            onChange={handleUrlChange}
          />
        </label>
        <button onClick={(e) => blogSubmitHandler(e)}>Submit</button>
      </form>
    );
  }
};

export default BlogForm;
