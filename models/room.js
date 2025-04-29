const mongoose = require("mongoose");

const roomSchema = mongoose.Schema({
  name: { type: String, required: true },
  maxcount: { type: Number, required: true },
  phonenumber: { type: Number, required: true },
  rentperday: { type: Number, required: true },
  imageurls: [],
  currentbookings: [
    {
      bookingid: { type: String },
      fromdate: { type: String },
      todate: { type: String },
      userid: { type: String },
      status: { type: String },
    },
  ],
  type: { type: String, required: true },
  description: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("rooms", roomSchema);