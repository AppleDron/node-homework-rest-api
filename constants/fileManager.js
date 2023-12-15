const path = require("node:path");

const TEMP_DIR = path.join(process.cwd(), "temp");
const TEMP_AVATARS_DIR = path.join(process.cwd(), "public");

module.exports = { TEMP_AVATARS_DIR, TEMP_DIR };
