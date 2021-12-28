const express = require("express");
const { connect, User } = require("orm");

const app = express();
const port = 3000;
connect();

const user = new User({
  name: "test",
  email: "test@example.com",
  password: "123456789",
});
user.save();

app.get("/", async (req, res) => {
  res.json(await User.find());
});

app.listen(port, () => {
  console.log("App is up and running");
});
