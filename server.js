const express = require("express");
const app = express();
const dbConfig = require("./db"); // MongoDB connection file
const roomsRoute = require("./routes/roomsRoute");

app.use(express.json());

// Mount rooms routes under /api/rooms
app.use("/api/rooms", roomsRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Node Server Started on port ${port}`));
