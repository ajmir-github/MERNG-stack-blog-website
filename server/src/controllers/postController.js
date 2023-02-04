const { Post, Comment } = require("../models");

const authorPopulation = [
  {
    path: "author",
    select: "_id name profile",
  },
];
const postsProjection = "-keywords -body -updatedAt";
const postProjection = "-updatedAt";

exports.getPosts = async (req, res) => {
  const { query, limit, skip, sort } = req.databaseQuery || {};
  const posts = await Post.find({ published: true, ...query }, postsProjection)
    .limit(limit)
    .skip(skip)
    .sort(sort)
    .populate(authorPopulation);
  res.json(posts);
};

exports.getSinglePost = async (req, res) => {
  const { limit, skip } = req.databaseQuery || {};
  const post = await Post.findById(req.params.id, postProjection).populate(
    authorPopulation
  );
  if (!post) return res.status(404).send("Not found");
  // commments
  const comments = await Comment.find({ postId: post._id })
    .sort({
      createdAt: -1,
    })
    .populate(authorPopulation);
  // related posts
  const relatedPosts = await Post.find(
    {
      published: true,
      category: post.category,
    },
    postsProjection
  )
    .sort({
      views: -1,
    })
    .limit(limit)
    .skip(skip)
    .populate(authorPopulation);
  res.json({ post, comments, relatedPosts });
};
