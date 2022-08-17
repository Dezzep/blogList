const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog');
const bcrypt = require('bcrypt');
const User = require('../models/user');

beforeEach(async () => {
  await Blog.deleteMany({});
  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

describe('when there is initially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs');

    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test('if a blog has no likes data, defaults to 0', async () => {
    await api
      .post('/api/blogs')
      .send(helper.blogWithNoLikes)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    const res = blogsAtEnd.pop();
    expect(res.likes).toEqual(0);
  });
  test('the first blog is titled susans story', async () => {
    const response = await api.get('/api/blogs');

    const titles = response.body.map((r) => r.title);
    expect(titles).toContain('Susans Story');
  });
});

describe('when deleting a blog', () => {
  test('responds with 204 when blog is deleted', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);
  });
});

describe('when adding a blog', () => {
  test('a valid blog can be added', async () => {
    await api

      .post('/api/blogs')
      .set('authorization', 'Bearer asfasg23tg3qfuhqfw')
      .set('token', 'HJSFAHUWFUHU2hjasduh')

      .send(helper.newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

    const contents = blogsAtEnd.map((b) => b.title);

    expect(contents).toContain('Susans Silly Story');
  });
  test('blog without title or url not added', async () => {
    await api.post('/api/blogs').send(helper.blogMissingContent).expect(400);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });
});

describe('when viewing a specific blog', () => {
  test('a blog once parsed through mongoose schema has id, not _id and can be viewed.', async () => {
    const blogsAtStart = await helper.blogsInDb();

    const blogToView = blogsAtStart[0];

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const processedBlogToView = JSON.parse(JSON.stringify(blogToView));

    expect(resultBlog.body).toEqual(processedBlogToView);
    expect(processedBlogToView._id).toBeFalsy();
  });
  test('returns 404 when id is invalid', async () => {
    const blogWithInvalidId = {
      title: 'title',
      url: 'url',
      id: 'asdjhasdasfasf2h23h',
    };
    await api.get(`/api/blogs/${blogWithInvalidId.id}`).expect(400);
  });
});
describe('when updating a blog', () => {
  test('likes can be updated', async () => {
    const blogsAtStart = (await helper.blogsInDb()).map((blogs) => blogs);
    await Promise.all(blogsAtStart);
    const blogSelected = blogsAtStart.filter((b) => b.title === 'Susans Story');

    const likesAtStart = blogSelected[0].likes;

    await api
      .put(`/api/blogs/${blogSelected[0].id}`)
      .expect('Content-Type', /application\/json/)
      .expect(200);

    await Blog.findByIdAndUpdate(blogSelected[0].id, {
      likes: likesAtStart + 1,
    });
    const blogsAtEnd = await helper.blogsInDb();
    const endBlog = blogsAtEnd.filter((b) => b.title === 'Susans Story');

    expect(likesAtStart).toBeLessThan(endBlog[0].likes);
  });
});

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('sekret', 10);
    const user = new User({
      username: 'roots',
      name: 'penelope',
      passwordHash,
    });

    await user.save();
  });

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.UsersInDb();

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'susanisactuallyhere',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.UsersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });
  test('creation fails when username below < 3 chars', async () => {
    const badUser = {
      username: 'bo',
      name: 'Matti Luukkainen',
      password: 'susanisactuallyhere',
    };

    await api.post('/api/users').send(badUser).expect(400);
  });
});
afterAll(() => {
  mongoose.connection.close();
});
