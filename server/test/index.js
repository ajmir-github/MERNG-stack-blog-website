const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");
const { Post, User, RolesEnums, Comment } = require("../models");
require("dotenv").config();

async function logUsers() {
  const users = await User.find();
  console.log(users);
}

async function logPosts() {
  const posts = await Post.find();
  console.log(posts);
}
async function logComments() {
  const comments = await Comment.find();
  console.log(comments);
}

async function addUser(data) {
  const user = new User(data);
  await user.save();
}
async function addPost(data) {
  const post = new Post(data);
  await post.save();
}

async function addComment(data) {
  const comment = new Comment(data);
  await comment.save();
}

async function cleanUsers() {
  const users = await User.find();
  for (const user of users) {
    await User.findByIdAndDelete(user._id);
  }
  console.log("USERS CLEANED!");
}

async function cleanPosts() {
  const posts = await Post.find();
  for (const post of posts) {
    await Post.findByIdAndDelete(post._id);
  }
  console.log("POSTS CLEANED!");
}

async function cleanComments() {
  const comments = await Comment.find();
  for (const comment of comments) {
    await Comment.findByIdAndDelete(comment._id);
  }
  console.log("COMMENTS CLEANED!");
}

async function runRange(func, times) {
  let results = [];
  for (let index = 0; index < times; index++) {
    const result = await func(index);
    results.push(result);
  }
  return results;
}

function randomRangeNumber(max) {
  return parseInt(Math.random() * max);
}

function randomItem(list) {
  const index = randomRangeNumber(list.length);
  return list[index];
}

async function getIdsOfUsers() {
  const list = [];
  const users = await User.find(undefined);
  users.forEach((user) => list.push(user._id.toString()));
  return list;
}

async function getIdsOfPosts() {
  const list = [];
  const posts = await Post.find(undefined);
  posts.forEach((post) => list.push(post._id.toString()));
  return list;
}

async function addUsers(count) {
  await runRange(async () => {
    await addUser({
      email: faker.internet.email(),
      password: faker.internet.password(),
      role: randomItem(RolesEnums),
      name: faker.name.fullName(),
      country: faker.address.country(),
      profile: faker.image.avatar(),
      bio: faker.lorem.lines(2 + randomRangeNumber(14)),
      links: {
        facebook: faker.internet.email(),
        instagram: faker.internet.email(),
        gmail: faker.internet.email(),
        github: faker.internet.email(),
        youtube: faker.internet.email(),
      },
    });
  }, count);
  console.log("USERS created", { count });
}

async function addPosts(count) {
  const users = await getIdsOfUsers();
  await runRange(async () => {
    await addPost({
      title: faker.name.jobTitle(),
      category: faker.name.jobType(),
      keywords: await runRange(
        () => faker.name.jobDescriptor(),
        randomRangeNumber(6)
      ),
      description: faker.lorem.lines(2),
      thumbnail: faker.image.abstract(640, 480, true),
      body: faker.lorem.paragraph(14),
      // comments
      published: faker.datatype.boolean(),
      userId: randomItem(users),
      views: randomRangeNumber(100000),
    });
  }, count);
  console.log("POSTS created", { count });
}

async function addComments(count) {
  const postIds = await getIdsOfPosts();
  const userIds = await getIdsOfUsers();
  await runRange(async () => {
    await addComment({
      postId: randomItem(postIds),
      body: faker.lorem.lines(4),
      ...(faker.datatype.boolean()
        ? {
            internalAuthor: randomItem(userIds),
          }
        : {
            externalAuthor: {
              name: faker.name.fullName(),
              email: faker.internet.email(),
            },
          }),
    });
  }, count);
  console.log("Comments created", { count });
}

mongoose.set("strictQuery", true);
mongoose.connect(process.env.DATABASE_URL, async (err) => {
  if (err) throw err;

  // await addUsers(20);
  // await addPosts(400);
  // await addComments(800);

  // await logUsers();
  // await logPosts();
  // await logComments();

  // await cleanUsers();
  // await cleanPosts();
  // await cleanComments();
});
