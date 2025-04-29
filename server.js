const express = require("express");
const app = express();
const cors = require("cors");
const dbConfig = require("./db");

const bookingsRoute = require("./routes/bookingsRoute");
const roomsRoute = require("./routes/roomsRoute");
const usersRoute = require("./routes/usersRoute"); // ✅ Add this line

app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

app.use("/api/rooms", roomsRoute);
app.use("/api/bookings", bookingsRoute);
app.use("/api/users", usersRoute); // ✅ Mount the route

app.get("/test", (req, res) => {
  res.send("Direct server test works!");
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
