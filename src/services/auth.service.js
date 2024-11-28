const { User, Admin } = require('../models');

async function createUser(user) {
  return User.create(user);
}

async function getUserByFirebaseUId(id) {
  return User.findOne({ firebaseUid: id });
}

async function createAdmin(admin) {
  return await Admin.create(admin)
}

module.exports = {
  createUser,
  getUserByFirebaseUId,
  createAdmin
};
