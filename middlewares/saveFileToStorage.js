const fs = require("node:fs/promises");
const path = require("node:path");
const { TEMP_AVATARS_DIR } = require("../constants/fileManager");
const Jimp = require("jimp");

const saveFileToStorage = async (file) => {
  const image = await Jimp.read(file.path);
  image.resize(250, 250);

  const filename = `${Date.now()}_${file.originalname}`;
  console.log();
  const filePath = path.join(TEMP_AVATARS_DIR, "avatars", filename);

  await image.writeAsync(filePath);
  await fs.unlink(file.path);

  return `http://localhost:3000/avatars/${filename}`;
};

module.exports = saveFileToStorage;
