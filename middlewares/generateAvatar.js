const gravatar = require("gravatar");

const generateAvatar = (email) => {
  return gravatar.url(email, { s: "100", r: "x", d: "retro" }, true);
};

module.exports = generateAvatar;
