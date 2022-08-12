const _ = require('lodash');

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogData) => {
  arrayOfLikes = [];

  //map and reduce to get the total likes for n data entries.
  const total = blogData
    .map((blog) => blog.likes)
    .reduce((prev, curr) => prev + curr, 0);

  return total;
};

const favoriteBlog = (blogData) => {
  let mostLikes = 0;
  let mostLikedIndex = 0;

  blogData.map((blog, index) => {
    if (blog.likes > mostLikes) {
      (mostLikedIndex = index), (mostLikes = blog.likes);
    }
  });
  return blogData[mostLikedIndex];
};

const mostBlogs = (blogs) => {
  const arrayOfAuthors = _.map(blogs, 'author');

  let occurrences = _.head(_(arrayOfAuthors).countBy().entries().maxBy(_.last));
  return occurrences;
};

const mostLikes = (blogs) => {
  const authorTotalLikes = [];
  const arrOfAuthors = _.map(blogs, 'author');
  let mostLiked = -1;
  let mostLikedAuthor;

  // have only one value for each author given.
  let uniqueAuthors = _.uniq(arrOfAuthors);

  // initiate object with {name set to author}, {likes set to 0}.
  uniqueAuthors.map((author) => {
    const obj = { name: author, likes: 0 };
    authorTotalLikes.push(obj);
  });

  // increment likes based on author name and likes for each blog.
  blogs.map((blog) => {
    const author = blog.author;
    const likes = blog.likes;
    const index = _.findIndex(authorTotalLikes, (obj) => obj.name == author);

    authorTotalLikes[index].likes += likes;
  });

  // for each author.. is their like count higher than the mostLiked (var declared at top of scope?)
  // if true: set the author and their like count as the value to return.
  authorTotalLikes.forEach((author) => {
    if (author.likes > mostLiked) {
      mostLiked = author.likes;
      mostLikedAuthor = author;
    }
  });
  return mostLikedAuthor;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
