const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://abigail4202:ava380@cluster0.pckmdoq.mongodb.net/mern-rooms", {
    useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;

connection.on("connected", () => {
  console.log("MongoDB Connection Successful");
});

connection.on("error", (err) => {
  console.log("MongoDB Connection Failed", err);
});

module.exports = mongoose;