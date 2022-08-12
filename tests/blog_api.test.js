const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog');

const initialBlogs = [
  {
    title: 'Susans Story',
    author: 'Susan Ofcourse',
    date: new Date(),
    url: 'wasdasdasd.com',
    Likes: 33,
  },
  {
    title: 'Susans Second Story',
    author: 'Susan Ofcourse',
    date: new Date(),
    url: 'wasdasdasd.ca',
    Likes: 25,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(initialBlogs[0]);
  await blogObject.save();
  blogObject = new Blog(initialBlogs[1]);
  await blogObject.save();
});

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});
test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs');

  expect(response.body).toHaveLength(initialBlogs.length);
});
test('the first blog is titled susans story', async () => {
  const response = await api.get('/api/blogs');

  const titles = response.body.map((r) => r.title);
  expect(titles).toContain('Susans Story');
});

afterAll(() => {
  mongoose.connection.close();
});
