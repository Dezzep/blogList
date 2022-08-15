const blogRouter = require('express').Router();
const Blog = require('../models/blog');

// GET ALL DATA FROM MONGODB/BLOG
blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

// GET BY ID
blogRouter.get('/:id', async (request, response) => {
  const blogs = await Blog.findById(request.params.id);
  blogs ? response.json(blogs) : response.status(404).end();
});

// CREATE (POST) NEW ENTRY
blogRouter.post('/', async (request, response, next) => {
  const body = await request.body;
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    date: new Date(),
    likes: body.likes,
  });
  const savedBlog = await blog.save();
  response.status(201).json(savedBlog);
});

// DELETE FROM DB
blogRouter.delete('/:id', async (request, response, next) => {
  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

// UPDATE ITEM ON DB
blogRouter.put('/:id', async (request, response) => {
  const body = request.body;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };
  const toUpdate = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  });

  response.json(toUpdate);
});

module.exports = blogRouter;
