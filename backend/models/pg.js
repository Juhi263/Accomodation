const mongoose = require("mongoose");

const PgSchema = new mongoose.Schema({
  name: String,
  location: String,
  accomodation: String,
  rent: Number,
  food: String, 
  room: Number,
  amenities: String,
  room_sharing: String,
  ac: String,
  deposit_amount: Number,
  image: String, // Image URL
});

module.exports = mongoose.model("pg", PgSchema);
