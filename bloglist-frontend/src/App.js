import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import LoginForm from './components/LoginForm';
import loginService from './services/login';
import BlogForm from './components/BlogForm';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
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

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const loginFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      setErrorMessage('Wrong credentials');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const blogSubmitHandler = (e) => {
    e.preventDefault();
    
  };

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  return (
    <div>
      <LoginForm
        loginFormSubmit={loginFormSubmit}
        handlePasswordChange={handlePasswordChange}
        handleUsernameChange={handleUsernameChange}
        password={password}
        username={username}
        user={user}
      />
      <h3 style={{ color: 'red' }}>{errorMessage}</h3>

      <BlogForm
        user={user}
        title={title}
        handleAuthorChange={handleAuthorChange}
        handleTitleChange={handleTitleChange}
        handleUrlChange={handleUrlChange}
        blogSubmitHandler={blogSubmitHandler}
      />

      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
