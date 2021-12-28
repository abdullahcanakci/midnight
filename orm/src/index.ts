const mongoose = require("mongoose");
import User from "./model/User";

const connect = () => {
  mongoose.connect("mongodb://localhost:27017/midnigt");
};

export { connect, User };
