import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import LoginForm from './components/LoginForm';
import loginService from './services/login';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [message, setMessage] = useState(null);

  const blogFormRef = useRef();

  const logOut = () => {
    setUser(null);
    localStorage.removeItem('loggedBloglistUser');
  };

  const getSetAndSort = async () => {
    // get all blogs sort them by most likes, then set them to state as an array (of objects).
    const allBlogs = await blogService.getAll();
    await allBlogs.sort((a, b) => a.likes - b.likes).reverse(); //most likes is displayed first.
    setBlogs(allBlogs);
  };

  const loginFormSubmit = async (event, username, password) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);

      return 1;
    } catch (exception) {
      setErrorMessage('Wrong Username or Password');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const blogSubmitHandler = async (e, title, author, url) => {
    e.preventDefault();
    if (title.length < 3 || url.length < 3) {
      setErrorMessage('URL or TITLE invalid');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    } else {
      try {
        await blogService.create({ title, author, url });
        getSetAndSort();
        blogFormRef.current.toggleVisibility();
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

  const addLikes = async (id, title, author, url, likes, user) => {
    try {
      await blogService.update(id, { title, author, url, likes, user });
      getSetAndSort();
    } catch (exception) {
      console.log('error adding like');
    }
  };

  const deleteBlog = async (id) => {
    if (window.confirm('do you really want to delete this?')) {
      try {
        await blogService.remove(id);
        getSetAndSort();
      } catch {
        setErrorMessage('you do not have permission to delete this blog.');
      }
    }
  };

  useEffect(() => {
    getSetAndSort();
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
        <LoginForm loginFormSubmit={loginFormSubmit} user={user} />

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
      <Togglable buttonLabel={'new blog'} ref={blogFormRef}>
        <h2>create new</h2>
        <BlogForm user={user} blogSubmitHandler={blogSubmitHandler} />
        <h3 style={{ color: 'red', backgroundColor: '#3f3f3f' }}>
          {errorMessage}
        </h3>
      </Togglable>
      <h3 style={{ backgroundColor: 'green' }}>{message}</h3>

      <h2>blogs</h2>
      {blogs.map((blog, i) => (
        <Blog
          key={blog.id}
          viewId={`viewId${i}`}
          likeId={`likeId${i}`}
          deleteId={`deleteblog${i}`}
          blog={blog}
          addLikes={addLikes}
          deleteBlog={deleteBlog}
        />
      ))}
    </div>
  );
};

export default App;
