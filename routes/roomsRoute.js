const express = require("express");
const router = express.Router();
const Room = require("../models/room");
const moment = require("moment");

// Route: GET all rooms (basic fetch)
router.get("/getallrooms", async (req, res) => {
  try {
    const rooms = await Room.find({});
    res.send(rooms);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

// Route: GET a room by ID
router.get("/getroombyid/:roomid", async (req, res) => {
  try {
    const roomid = req.params.roomid;
    const room = await Room.findOne({ _id: roomid });
    res.send(room);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

// Route: POST to get available rooms by date range
router.post("/getavailable", async (req, res) => {
  const { fromdate, todate } = req.body;

  const selectedFrom = moment(fromdate, "MM-DD-YYYY").startOf("day");
  const selectedTo = moment(todate, "MM-DD-YYYY").endOf("day");

  try {
    const rooms = await Room.find({});

    const availableRooms = rooms.filter((room) => {
      let isAvailable = true;

      for (const booking of room.currentbookings) {
        const bookedFrom = moment(booking.fromdate, "YYYY-MM-DD").startOf("day");
        const bookedTo = moment(booking.todate, "YYYY-MM-DD").endOf("day");

        if (
          selectedFrom.isSameOrBefore(bookedTo) &&
          selectedTo.isSameOrAfter(bookedFrom)
        ) {
          isAvailable = false;
          break;
        }
      }

      return isAvailable;
    });

    res.send(availableRooms);
  } catch (err) {
    console.error("Error checking availability:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
