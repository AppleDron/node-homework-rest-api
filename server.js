const app = require("./app");
const setupMongoConnection = require("./setupMongoConnection/setupMongoConnection");

setupMongoConnection().then(() => {
  app.listen(3000, async () => {
    await setupMongoConnection();
    console.log("Server running. Use our API on port: 3000");
  });
});
