import { useState } from 'react';

const BlogForm = ({ user, blogSubmitHandler }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleAuthorChange = (e) => {
    setAuthor(e.target.value);
  };
  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const handleSubmit = (e, title, author, url) => {
    blogSubmitHandler(e, title, author, url);

    if (title.length >= 3 && url.length >= 3) {
      setTitle('');
      setAuthor('');
      setUrl('');
    }
  };

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
            id="title"
            type={'text'}
            name={'username'}
            value={title}
            onChange={handleTitleChange}
          />
        </label>
        <label>
          Author:
          <input
            id="author"
            type={'text'}
            name={'author'}
            value={author}
            onChange={handleAuthorChange}
          />
        </label>
        <label>
          URL:
          <input
            id="url"
            type={'text'}
            name={'url'}
            value={url}
            onChange={handleUrlChange}
          />
        </label>
        <button
          onClick={(e) => handleSubmit(e, title, author, url)}
          className="submit"
          id="submit"
        >
          Submit
        </button>
      </form>
    );
  }
};

export default BlogForm;
