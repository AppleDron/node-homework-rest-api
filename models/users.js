const User = require("../validation/userSchemaMongoose");

const registration = async (paylaod) => {
  try {
    const user = await User.create(paylaod);
    return user;
  } catch (error) {
    return null;
  }
};

const login = async (email) => {
  const user = await User.find().where("email").equals(email);
  return user[0];
};

const findById = async (id) => {
  const user = await User.findById(id);
  return user;
};

const findByToken = async (token) => {
  const user = await User.find().where("token").equals(token);
  return user[0];
};

const logout = async (id) => {
  const user = await User.findById(id);
  return user;
};

const updateById = async (id, payload) => {
  const user = await User.findByIdAndUpdate(id, payload);
  return user;
};

module.exports = {
  registration,
  login,
  findById,
  logout,
  updateById,
  findByToken,
};
