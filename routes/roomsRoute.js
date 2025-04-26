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

// NEW Route: POST to get available rooms by date range
router.post("/getallrooms", async (req, res) => {
  const { fromdate, todate } = req.body;

  try {
    const rooms = await Room.find({});

    const availableRooms = rooms.filter((room) => {
      let availability = true;

      for (const booking of room.currentbookings) {
        if (
          moment(fromdate).isBetween(booking.fromdate, booking.todate) ||
          moment(todate).isBetween(booking.fromdate, booking.todate) ||
          moment(booking.fromdate).isBetween(fromdate, todate) ||
          moment(booking.todate).isBetween(fromdate, todate)
        ) {
          availability = false;
        }
      }

      return availability;
    });

    res.send(availableRooms);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

module.exports = router;
