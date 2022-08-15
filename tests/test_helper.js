const Blog = require('../models/blog');

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
  },
];
const newBlog = {
  title: 'Susans Silly Story',
  author: 'Susan Ofcourse',
  date: new Date(),
  url: 'susanisreallygoodatwriting.com',
  likes: 4,
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

module.exports = {
  initialBlogs,
  newBlog,
  blogMissingContent,
  blogsInDb,
  nonExistingId,
  blogWithNoLikes,
};