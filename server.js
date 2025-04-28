const express = require("express");
const app = express();
const dbConfig = require("./db"); // MongoDB connection
const roomsRoute = require("./routes/roomsRoute");
const usersRoute = require("./routes/usersRoute");

app.use(express.json());

// Mount routes
app.use("/api/rooms", roomsRoute);
app.use("/api/users", usersRoute);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Node Server Started on port ${port}`));
