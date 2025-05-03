const express = require("express");
const cors = require("cors");
const dbConfig = require("./db");

const app = express();

// Routes
const roomsRoute = require("./routes/roomsRoute");
const usersRoute = require("./routes/usersRoute");
const bookingsRoute = require("./routes/bookingsRoute");
// Middleware
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

// Mount routes
app.use("/api/rooms", roomsRoute);
app.use("/api/users", usersRoute);
app.use("/api/bookings", bookingsRoute);
app.get("/api/bookings/test", (req, res) => {
  res.send("bookingsRoute is working");
});

// Basic test route
app.get("/test", (req, res) => {
  res.send("Server is running");
});

app.get("/ping", (req, res) => {
  res.send("pong");
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));