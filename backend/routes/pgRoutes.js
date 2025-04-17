const express = require("express");
const router = express.Router();
const Pg = require("../models/pg");

// Dummy data with image URLs
const pgData = [
  {
    name: "Stayvillas Paying Guest/Hostels",
    location: "Shastri Nagar",
    accomodation: "boys and girls",
    rent: 10000,
    food: "veg only",
    room: 1,
    amenities:"yes",
    room_sharing:"single",
    ac:"available",
    deposit_amount:5000,
    image: "stayvilla.png",
    link: "https://www.magicbricks.com/propertyDetail/stayvillas-pg-shastri-nagar-in-jodhpur&pgid=4d42343839353739677261646532",
  },
  {
    name: "Stayvillas Paying Guest/Hostels",
    location: "Shastri Nagar",
    accomodation: "boys and girls",
    rent: 6000,
    food: "veg only",
    room: 2,
    amenities:"yes",
    room_sharing:"double",
    ac:"available",
    deposit_amount:5000,
    image: "stayvilla.png",
    link : "https://www.magicbricks.com/propertyDetail/stayvillas-pg-shastri-nagar-in-jodhpur&pgid=4d42343839353739677261646532",
  },
  {
    name: "Stayvillas Paying Guest/Hostels",
    location: "Shastri Nagar",
    accomodation: "boys and girls",
    rent: 5000,
    food: "veg only",
    room: 2,
    amenities:"yes",
    room_sharing:"triple",
    ac:"available",
    deposit_amount:5000,
    image: "stayvilla.png",
    link : "https://www.magicbricks.com/propertyDetail/stayvillas-pg-shastri-nagar-in-jodhpur&pgid=4d42343839353739677261646532",
  },
  {
    name: "Balaji Boys Hostel PG/Hostels",
    location: "Sardarpura",
    accomodation: "boys only",
    rent: 6500,
    food: "veg only",
    room: 3,
    amenities:"yes",
    room_sharing:"double",
    ac:"not available",
    deposit_amount:100,
    image: "balaji-pg.jpeg",
    link : "https://www.magicbricks.com/propertyDetail/balaji-boys-hostel-pg-sardarpura-in-jodhpur&pgid=4d42313839393937677261646532",
  },
  {
    name: "Balaji Boys Hostel PG/Hostels",
    location: "Sardarpura",
    accomodation: "boys only",
    rent: 6500,
    food: "veg only",
    room: 4,
    amenities:"yes",
    room_sharing:"triple",
    ac:"not available",
    deposit_amount:100,
    image: "balaji-pg.jpeg",
    link: "https://www.magicbricks.com/propertyDetail/balaji-boys-hostel-pg-sardarpura-in-jodhpur&pgid=4d42313839393937677261646532",
  },
  {
    name: "Karam Residency Paying Guest/Hostels",
    location: "Mandore",
    accomodation: "girls only",
    rent: 10400,
    food: "veg and non-veg",
    room: 6,
    amenities:"yes",
    room_sharing:"single",
    ac:"available",
    deposit_amount:2500,
    image: "karam_single.png",
    link: "https://www.magicbricks.com/propertyDetail/karam-residency-pg-mandore-in-jodhpur&pgid=4d42323431393637677261646532",
  },
  {
    name: "Karam Residency Paying Guest/Hostels",
    location: "Mandore",
    accomodation: "girls only",
    rent: 7800,
    food: "veg and non-veg",
    room: 4,
    amenities:"yes",
    room_sharing:"double",
    ac:"available",
    deposit_amount:2500,
    image: "karam_double.png",
    link: "https://www.magicbricks.com/propertyDetail/karam-residency-pg-mandore-in-jodhpur&pgid=4d42323431393637677261646532",
  },
  {
    name: "Karam Residency Paying Guest/Hostels",
    location: "Mandore",
    accomodation: "girls only",
    rent: 5900,
    food: "veg and non-veg",
    room: 2,
    amenities:"yes",
    room_sharing:"triple",
    ac:"available",
    deposit_amount:2500,
    image: "karam_triple.png",
    link: "https://www.magicbricks.com/propertyDetail/karam-residency-pg-mandore-in-jodhpur&pgid=4d42323431393637677261646532",
  },
  {
    name: "Karam Residency Paying Guest/Hostels",
    location: "Mandore",
    accomodation: "girls only",
    rent: 5200,
    food: "veg and non-veg",
    room: 4,
    amenities:"yes",
    room_sharing:"four",
    ac:"available",
    deposit_amount:2500,
    image: "karam_four.png",
    link: "https://www.magicbricks.com/propertyDetail/karam-residency-pg-mandore-in-jodhpur&pgid=4d42323431393637677261646532",
  },
  {
    name: "Shivaay Girls Pg/Hostels",
    location: "Sardarpura",
    accomodation: "girls only",
    rent: 4000,
    food: "veg only",
    room: 4,
    amenities:"basic",
    room_sharing:"triple",
    ac:"not available",
    deposit_amount:8000,
    image: "shivay.png",
    link: "https://www.magicbricks.com/propertyDetail/shivaay-girls-pg-sardarpura-in-jodhpur&pgid=4d42343431393135677261646532",
  },
  {
    name: "Hotel Guru International Paying Guest/Hostels",
    location: "Nai Sarak",
    accomodation: "boys and girls",
    rent: 1300,
    food: "veg only",
    room: 8,
    amenities:"yes",
    room_sharing:"single",
    ac:"available",
    deposit_amount:500,
    image: "guru.png",
    link:"https://www.magicbricks.com/propertyDetail/hotel-guru-international-pg-nai-sarak-in-jodhpur&pgid=4d42313531383337677261646532",
  },
  {
    name: "Hotel Guru International Paying Guest/Hostels",
    location: "Nai Sarak",
    accomodation: "boys and girls",
    rent: 1600,
    food: "veg only",
    room: 6,
    amenities:"yes",
    room_sharing:"double",
    ac:"available",
    deposit_amount:500,
    image: "guru.png",
    link:"https://www.magicbricks.com/propertyDetail/hotel-guru-international-pg-nai-sarak-in-jodhpur&pgid=4d42313531383337677261646532",
  },
  {
    name: "Hotel Guru International Paying Guest/Hostels",
    location: "Nai Sarak",
    accomodation: "boys and girls",
    rent: 2000,
    food: "veg only",
    room: 8,
    amenities:"yes",
    room_sharing:"triple",
    ac:"available",
    deposit_amount:500,
    image: "guru.png",
    link:"https://www.magicbricks.com/propertyDetail/hotel-guru-international-pg-nai-sarak-in-jodhpur&pgid=4d42313531383337677261646532",
  },
  {
    name: "Shree Gajanand Paying Guest/Hostels",
    location: "Chopasani Road",
    accomodation: "boys and girls",
    rent: 7800,
    food: "veg only",
    room: 10,
    amenities:"yes",
    room_sharing:"single",
    ac:"available",
    deposit_amount:5000,
    image: "gajanand.png",
    link:"https://www.magicbricks.com/propertyDetail/shree-gajanand-paying-guest-pg-chopasani-road-in-jodhpur&pgid=4d42313136373734677261646532",
  },
  {
    name: "Shree Gajanand Paying Guest/Hostels",
    location: "Chopasani Road",
    accomodation: "boys and girls",
    rent: 7800,
    food: "veg only",
    room: 10,
    amenities:"yes",
    room_sharing:"double",
    ac:"available",
    deposit_amount:5000,
    image: "gajanand.png",
    link:"https://www.magicbricks.com/propertyDetail/shree-gajanand-paying-guest-pg-chopasani-road-in-jodhpur&pgid=4d42313136373734677261646532",
  },
  {
    name: "Shree Gajanand Paying Guest/Hostels",
    location: "Chopasani Road",
    accomodation: "boys and girls",
    rent: 7200,
    food: "veg only",
    room: 10,
    amenities:"yes",
    room_sharing:"triple",
    ac:"available",
    deposit_amount:5000,
    image: "gajanand.png",
    link:"https://www.magicbricks.com/propertyDetail/shree-gajanand-paying-guest-pg-chopasani-road-in-jodhpur&pgid=4d42313136373734677261646532",
  },
  {
    name: "Shree Gajanand Paying Guest/Hostels",
    location: "Chopasani Road",
    accomodation: "boys and girls",
    rent: 7200,
    food: "veg only",
    room: 10,
    amenities:"yes",
    room_sharing:"four",
    ac:"available",
    deposit_amount:5000,
    image: "gajanand.png",
    link:"https://www.magicbricks.com/propertyDetail/shree-gajanand-paying-guest-pg-chopasani-road-in-jodhpur&pgid=4d42313136373734677261646532",
  },
  {
    name: "Mathur Paying Guest Hostel for Boys/Hostels",
    location: "Chopasni Housing Board",
    accomodation: "boys only",
    rent: 6500,
    food: "veg only",
    room: 2,
    amenities:"limited",
    room_sharing:"single",
    ac:"available",
    deposit_amount:1500,
    image: "mathur.png",
    link:"https://www.magicbricks.com/propertyDetail/mathur-paying-guest-hostel-for-boys-pg-chopasni-housing-board-in-jodhpur&pgid=4d42333732313935677261646532",
  },
  {
    name: "Mathur Paying Guest Hostel for Boys/Hostels",
    location: "Chopasni Housing Board",
    accomodation: "boys only",
    rent: 6000,
    food: "veg only",
    room: 6,
    amenities:"limited",
    room_sharing:"double",
    ac:"available",
    deposit_amount:1500,
    image: "mathur.png",
    link:"https://www.magicbricks.com/propertyDetail/mathur-paying-guest-hostel-for-boys-pg-chopasni-housing-board-in-jodhpur&pgid=4d42333732313935677261646532",
  },
  {
    name: "Savitri PG",
    location: "Ratanada",
    accomodation: "girls only",
    rent: 5000,
    food: "veg only",
    room: 5,
    amenities:"limited",
    room_sharing:"double",
    ac:"not available",
    deposit_amount:5000,
    image: "savitri.png",
    link:"https://www.magicbricks.com/propertyDetail/savitri-pg-ratanada-in-jodhpur&pgid=4d42343031353739677261646532",
  },
  
];

// API to add places (Avoid Duplicates)
router.post("/populate", async (req, res) => {
  try {
    let addedCount = 0;
    
    for (const pg of pgData) {
      const exists = await Pg.findOne(pg); // Checks for full document match
      if (!exists) {
        await Pg.create(pg);
        addedCount++;
      }
    }

    if (addedCount === 0) {
      return res.status(400).json({ message: "All places already exist. No new data added!" });
    }

    res.status(201).json({ message: `${addedCount} new places added successfully!` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// API to get filtered places with pagination
router.get("/pgs", async (req, res) => {
  try {
    const { page = 1, limit = 10, accomodation, maxRent, room_sharing, ac } = req.query;
    const filters = {};

    if (accomodation) filters.accomodation = accomodation;
    if (maxRent) filters.rent = { $lte: maxRent }; // Rent less than or equal to maxRent
    if (room_sharing) filters.room_sharing = room_sharing;
    if (ac) filters.ac = ac;

    // Paginate using MongoDB query
    const skip = (page - 1) * limit;
    const places = await Pg.find(filters)
      .skip(skip)
      .limit(parseInt(limit))
      .exec();

    const totalPlaces = await Pg.countDocuments(filters); // Get the total number of places that match filters
    const totalPages = Math.ceil(totalPlaces / limit);

    res.json({ places, totalPages });
  } catch (error) {
    console.error("Error fetching places:", error);
    res.status(500).send("Server error");
  }
});



module.exports = router;
