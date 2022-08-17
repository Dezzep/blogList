const listHelper = require('../utils/list_helper');

const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0,
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0,
  },
  {
    _id: '5a422b3aasfaTESTsfjka676234d17f9',
    title: 'CanasEXRTRAEXTRAfasfasfon',
    author: 'Edsasfasfasftra Burg..',
    url: 'http:asfasfasfu/~EWD/transcriptREALURL!ions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
  },
];
const listWithOneBlog = [
  {
    id: '125jh125jhsaf',
    title: 'fortestsandstuff..',
    author: 'cooltester36',
    url: 'http://supercool.com',
    likes: 12,
    __v: 0,
  },
];
test('dummy returns one', () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe('total likes', () => {
  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(12);
  });
  test('when list has many blogs, equals the total likes', () => {
    const result = listHelper.totalLikes(blogs);
    expect(result).toBe(48);
  });
});
describe('most favourited', () => {
  test('when list has only one blog, it should be itself', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog);
    expect(result).toBe(listWithOneBlog[0]);
  });
  test('when list has many blogs, should return 2nd index, even if there is a tie breaker', () => {
    const r = listHelper.favoriteBlog(blogs);
    expect(r).toEqual(blogs[2]);
  });
});

describe('most blogs', () => {
  test('when list has only one blog, it should be the author of that blog.', () => {
    const result = listHelper.mostBlogs(listWithOneBlog);
    expect(result).toBe('cooltester36');
  });
  test('when list has many blogs, expect the author to be Robert C. Martin', () => {
    const r = listHelper.mostBlogs(blogs);
    expect(r).toBe('Robert C. Martin');
  });
});
describe('most likes', () => {
  test('when list has only one blog, the likes should be 12 (that blogs likes)', () => {
    const result = listHelper.mostLikes(listWithOneBlog);
    expect(result).toEqual({ name: 'cooltester36', likes: 12 });
  });
  test('when list has many blogs, the most liked author should be Edsger W. Dijkstra with 17 likes', () => {
    const r = listHelper.mostLikes(blogs);
    expect(r).toEqual({ name: 'Edsger W. Dijkstra', likes: 17 });
  });
});
