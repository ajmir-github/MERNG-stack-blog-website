const Collections = {
  user: "User",
  post: "Post",
};

const Roles = {
  root: "Root",
  admin: "Admin",
  user: "User",
};

const RolesEnums = ["Root", "Admin", "User"];

function updateDate() {
  this.set({ updatedAt: new Date() });
}

module.exports = {
  Collections,
  Roles,
  RolesEnums,
  updateDate,
};
