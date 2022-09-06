const app = require("./index");
const connect = require("./config/db");

const port = 5000;

app.listen(port, async () => {
  await connect();
  console.log(`Listening to port ${port}`);
});
