const blogRouter = require('express').Router();
const Blog = require('../models/blog');

// GET ALL DATA FROM MONGODB/BLOG
blogRouter.get('/', (request, response) => {
  NodeIterator.find({}).then((blogs) => {
    response.json(blogs);
  });
});

// GET BY ID
blogRouter.get('/:id', (request, response, next) => {
  Blog.findById(request.params.id)
    .then((blog) => {
      blog ? response.json(blog) : response.status(404).end();
    })
    .catch((error) => next(error));
});

// CREATE (POST) NEW ENTRY
blogRouter.post('/', (request, response, next) => {
  const body = request.body;

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    date: new Date(),
    likes: body.likes,
  });
  blog
    .save()
    .then((savedBlog) => {
      response.json(savedBlog);
    })
    .catch((error) => next(error));
});

// DELETE FROM DB
blogRouter.delete('/:id', (request, response, next) => {
  Blog.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

//EDIT ITEM ON DB
// blogRouter.put('/:id', (request, response, next) => {
//   const body = request.body;

//   const blog = {
//     title: body.title,
//     author: body.author,
//     url: body.url,
//     likes: body.likes,
//   }
// Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
//     .then(updatedNote => {
//       response.json(updatedNote)
//     })
//     .catch(error => next(error))

// });

module.exports = blogRouter;
