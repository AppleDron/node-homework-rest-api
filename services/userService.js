const { JWT_SECRET } = require("../constants/env");
const generateAvatar = require("../middlewares/generateAvatar");
const {
  registration,
  findById,
  login,
  logout,
  updateById,
  findByToken,
} = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class UserService {
  async registration({ email, password }) {
    const passwordHash = await bcrypt.hash(password, 10);
    const avatarURL = generateAvatar(email);
    console.log(avatarURL);
    const user = await registration({
      email,
      avatarURL,
      password: passwordHash,
    });

    return user;
  }

  async login({ email }) {
    const user = await login(email);
    return user;
  }

  async logout(id, token) {
    const user = logout(id);
    return user;
  }

  async comparePasswords(password, hash) {
    const comparedPassword = await bcrypt.compare(password, hash);
    return comparedPassword;
  }

  async findUserById(id) {
    const user = await findById(id);
    return user;
  }

  async findUserByToken(token) {
    const user = await findByToken(token);
    return user;
  }

  async updateuserById(id, payload) {
    return await updateById(id, payload);
  }

  currentUser(user) {
    return { email: user.email, subscription: user.subscription };
  }

  accessToken(id, email) {
    return jwt.sign(
      {
        sub: id,
        email,
      },
      JWT_SECRET
    );
  }
}

const userService = new UserService();
module.exports = userService;
