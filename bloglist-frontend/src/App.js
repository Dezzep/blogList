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
  const [message, setMessage] = useState(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const logOut = () => {
    setUser(null);
    localStorage.removeItem('loggedBloglistUser');
  };

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
      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      setErrorMessage('Wrong Username or Password');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const blogSubmitHandler = async (e) => {
    e.preventDefault();
    if (title.length < 3 || url.length < 3) {
      setErrorMessage('URL or TITLE invalid');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    } else {
      try {
        await blogService.create({ title, author, url });
        blogService.getAll().then((blogs) => setBlogs(blogs));
        setMessage(`${title} by ${author} has been added`);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      } catch (exception) {
        setErrorMessage('please fill out required forms');
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      }
    }
  };

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  if (!user) {
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
      </div>
    );
  }
  return (
    <div>
      <h2>blogs</h2>
      <div>
        {user.name} logged in <button onClick={logOut}>Log Out</button>
      </div>
      <h2>create new</h2>
      <BlogForm
        user={user}
        title={title}
        handleAuthorChange={handleAuthorChange}
        handleTitleChange={handleTitleChange}
        handleUrlChange={handleUrlChange}
        blogSubmitHandler={blogSubmitHandler}
      />
      <h3 style={{ color: 'red', backgroundColor: '#3f3f3f' }}>
        {errorMessage}
      </h3>
      <h3 style={{ backgroundColor: 'green' }}>{message}</h3>

      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
