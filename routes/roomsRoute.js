const express = require("express");
const router = express.Router();
const Room = require("../models/room");

// Route: GET all rooms
router.get("/getallrooms", async (req, res) => {
  try {
    const rooms = await Room.find({});
    res.send(rooms);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

// Route: GET one room by ID
router.get("/getroombyid/:roomid", async (req, res) => {
  try {
    const roomid = req.params.roomid;
    const room = await Room.findOne({ _id: roomid });
    res.send(room);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

module.exports = router;
