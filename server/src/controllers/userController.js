const { User, Post } = require("../models");

const authorPopulation = [
  {
    path: "author",
    select: "_id name profile",
  },
];
const userProjection = "-country -links  -bio -updatedAt";
const postsProjection = "-body -updatedAt";

exports.getUsers = async (req, res) => {
  const { query, limit, skip, sort } = req.databaseQuery || {};
  const users = await User.find(query, userProjection)
    .limit(limit)
    .skip(skip)
    .sort(sort);
  res.json(users);
};

exports.getSingleUser = async (req, res) => {
  const user = await User.findById(req.params.id, "-updatedAt");
  if (!user) return res.status(404).send("Not found!");
  // get the posts
  const { query, limit, skip, sort } = req.databaseQuery || {};
  const posts = await Post.find(
    { published: true, ...query, author: user._id },
    postsProjection
  )
    .limit(limit)
    .skip(skip)
    .sort(sort)
    .populate(authorPopulation);

  res.json({ user, posts });
};
