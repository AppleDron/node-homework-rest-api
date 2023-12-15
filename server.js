const app = require("./app");
const { PORT } = require("./constants/env");
const { TEMP_AVATARS_DIR, TEMP_DIR } = require("./constants/fileManager");
const createDirIfNotExists = require("./middlewares/createDirIfNotExists");
const setupMongoConnection = require("./setupMongoConnection/setupMongoConnection");

(async () => {
  await setupMongoConnection();
  await createDirIfNotExists(TEMP_DIR);
  await createDirIfNotExists(TEMP_AVATARS_DIR);

  app.listen(PORT, async () => {
    await setupMongoConnection();
    console.log(`Server is running on port ${PORT}`);
  });
})();
