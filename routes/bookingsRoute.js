const express = require("express");
const router = express.Router();
const Booking = require("../models/booking");
const Room = require("../models/room");
const moment = require("moment");

router.post("/bookroom", async (req, res) => {
  const {
    room,
    roomid,
    userid,
    fromdate,
    todate,
    totalamount,
    totaldays,
    transactionId,
  } = req.body;

  try {
    const roomdoc = await Room.findOne({ _id: roomid });

    const newFrom = moment(fromdate, "MM-DD-YYYY").startOf("day");
    const newTo = moment(todate, "MM-DD-YYYY").endOf("day");

    for (const booking of roomdoc.currentbookings) {
      const existingFrom = moment(booking.fromdate, "YYYY-MM-DD").startOf("day");
      const existingTo = moment(booking.todate, "YYYY-MM-DD").endOf("day");

      if (
        newFrom.isSameOrBefore(existingTo) &&
        newTo.isSameOrAfter(existingFrom)
      ) {
        return res.status(400).json({
          message:
            "Room unavailable with the dates you selected. Please choose different dates.",
        });
      }
    }

    const newbooking = new Booking({
      room,
      roomid,
      userid,
      fromdate: newFrom.format("YYYY-MM-DD"),
      todate: newTo.format("YYYY-MM-DD"),
      totalamount,
      totaldays,
      transactionId,
      status: "booked",
    });

    const savedBooking = await newbooking.save();

    roomdoc.currentbookings.push({
      bookingid: savedBooking._id,
      fromdate: newFrom.format("YYYY-MM-DD"),
      todate: newTo.format("YYYY-MM-DD"),
      userid,
      status: "booked",
    });

    await roomdoc.save();

    res.send("Room Booked Successfully");
  } catch (error) {
    console.error("Booking error:", error);
    res.status(500).json({ message: "Booking Failed", error });
  }
});

module.exports = router;
