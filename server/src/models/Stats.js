const Comment = require("./Comment");
const Post = require("./Post");
const User = require("./User");

async function getDocumentsCount() {
  const users = await User.estimatedDocumentCount();
  const posts = await Post.estimatedDocumentCount();
  const comments = await Comment.estimatedDocumentCount();
  return { users, posts, comments };
}

async function getCategoriesWithCount() {
  const categories = await Post.distinct("category");
  const categoriesWithCount = await Promise.all(
    categories.map(async (category) => ({
      category,
      count: await Post.count({ category }),
    }))
  );
  return categoriesWithCount.sort((a, b) => b.count - a.count);
}

async function getKeywordsWithCount() {
  const keywords = await Post.distinct("keywords");
  const keywordsWithCount = await Promise.all(
    keywords.map(async (keyword) => ({
      keyword,
      count: await Post.count({ keywords: keyword }),
    }))
  );
  return keywordsWithCount.sort((a, b) => b.count - a.count);
}

class Statistics {
  constructor() {
    this.count = {};
    this.categories = [];
    this.keywords = [];
    this.update();
  }
  async update() {
    this.count = await getDocumentsCount();
    this.categories = await getCategoriesWithCount();
    this.keywords = await getKeywordsWithCount();
    if (process.env.NODE_ENV === "development")
      console.log("Statistics updated!");
  }
  get(categoriesLimit = 16, keywordsLimit = 24) {
    return {
      count: this.count,
      categories: this.categories.slice(0, categoriesLimit),
      keywords: this.keywords.slice(0, keywordsLimit),
    };
  }
}

module.exports = Statistics;
