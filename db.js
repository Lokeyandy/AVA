const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://abigail4202:ava380@cluster0.pckmdoq.mongodb.net/mern-rooms", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const connection = mongoose.connection;

connection.on("connected", () => {
    console.log("Mongo DB Connection Successful");
});

connection.on("error", (error) => {
    console.log("Mongo DB Connection Failed:", error);
});

module.exports = mongoose;