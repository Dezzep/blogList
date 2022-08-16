const Blog = require('../models/blog');
const User = require('../models/user');

const initialBlogs = [
  {
    title: 'Susans Story',
    author: 'Susan Ofcourse',
    date: new Date(),
    url: 'wasdasdasd.com',
    likes: 33,
  },
  {
    title: 'Susans Second Story',
    author: 'Susan Ofcourse',
    date: new Date(),
    url: 'wasdasdasd.ca',
    likes: 25,
    userId: '62fbc540b91336d08e9a8e6e',
  },
];
const newBlog = {
  title: 'Susans Silly Story',
  author: 'Susan Ofcourse',
  date: new Date(),
  url: 'susanisreallygoodatwriting.com',
  likes: 4,
  userId: '62fbc540b91336d08e9a8e6e',
};

const blogMissingContent = {
  author: 'SusanOfCourse',
};
const blogWithNoLikes = {
  title: 'Susans Silly Story',
  author: 'Susan Ofcourse',
  date: new Date(),
  url: 'susanisreallygoodatwriting.com',
};

const nonExistingId = async () => {
  const blog = new Blog({ newBlog });
  await blog.save();
  await blog.remove();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const UsersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

module.exports = {
  initialBlogs,
  newBlog,
  blogMissingContent,
  blogsInDb,
  nonExistingId,
  blogWithNoLikes,
  UsersInDb,
};
