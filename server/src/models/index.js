const { Collections, Roles, RolesEnums } = require("./utils");
const Post = require("./Post");
const User = require("./User");
const Comment = require("./Comment");
const Statistics = require("./Stats");

const Stats = new Statistics();

module.exports = { Post, User, Comment, Stats, Collections, Roles, RolesEnums };
