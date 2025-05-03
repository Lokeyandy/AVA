const express = require("express");
const router = express.Router();
const Booking = require("../models/booking");
const Room = require("../models/room");
const moment = require("moment");

// 1. Book room
router.post("/bookroom", async (req, res) => {
  const {
    room, roomid, userid,
    fromdate, todate,
    totalamount, totaldays,
    transactionId, paymentDetails
  } = req.body;

  try {
    const roomdoc = await Room.findOne({ _id: roomid });
    const newFrom = moment(fromdate, "MM-DD-YYYY").startOf("day");
    const newTo = moment(todate, "MM-DD-YYYY").endOf("day");

    for (const booking of roomdoc.currentbookings) {
      const existingFrom = moment(booking.fromdate, "YYYY-MM-DD").startOf("day");
      const existingTo = moment(booking.todate, "YYYY-MM-DD").endOf("day");
      if (newFrom.isSameOrBefore(existingTo) && newTo.isSameOrAfter(existingFrom)) {
        return res.status(400).json({ message: "Room unavailable with selected dates." });
      }
    }

    const newBooking = new Booking({
      room, roomid, userid,
      fromdate: newFrom.format("YYYY-MM-DD"),
      todate: newTo.format("YYYY-MM-DD"),
      totalamount, totaldays,
      transactionId, paymentDetails,
      status: "booked",
    });

    const saved = await newBooking.save();

    roomdoc.currentbookings.push({
      bookingid: saved._id,
      fromdate: newFrom.format("YYYY-MM-DD"),
      todate: newTo.format("YYYY-MM-DD"),
      userid,
      status: "booked"
    });

    await roomdoc.save();
    res.send("Room Booked Successfully");
  } catch (error) {
    res.status(500).json({ message: "Booking Failed", error });
  }
});

// 2. Get user bookings
router.post("/getuserbookings", async (req, res) => {
  const { userid } = req.body;

  try {
    const bookings = await Booking.find({ userid });
    res.send(bookings);
  } catch (error) {
    res.status(400).json({ message: "Error fetching user bookings", error });
  }
});

// 3. Cancel booking
router.post("/cancelbooking", async (req, res) => {
  const { bookingid, roomid } = req.body;

  try {
    const booking = await Booking.findOne({ _id: bookingid });
    booking.status = "cancelled";
    await booking.save();

    const room = await Room.findOne({ _id: roomid });
    room.currentbookings = room.currentbookings.filter(
      (b) => b.bookingid.toString() !== bookingid
    );
    await room.save();

    res.send("Booking cancelled successfully");
  } catch (error) {
    res.status(400).json({ message: "Cancel booking failed", error });
  }
});

// ✅ 4. Admin - get all bookings
router.get("/getallbookings", async (req, res) => {
  try {
    const bookings = await Booking.find({});
    res.send(bookings);
  } catch (error) {
    res.status(400).json({ message: "Could not load bookings", error });
  }
});

module.exports = router;
