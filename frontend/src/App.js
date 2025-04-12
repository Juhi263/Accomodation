import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  const [places, setPlaces] = useState([]);
  const [filters, setFilters] = useState({
    accomodation: "",
    maxRent: "",
    room_sharing: "",
    ac: "",
  });
  
  const navigate = useNavigate();

  useEffect(() => {
    fetchPlaces();
  }, []);

  const fetchPlaces = async (filterParams = {}) => {
    try {
      const query = new URLSearchParams(filterParams).toString();
      const response = await axios.get(`http://localhost:5000/api/pgs?${query}`);
      setPlaces(response.data);
    } catch (error) {
      console.error("Error fetching places:", error);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const applyFilters = () => {
    fetchPlaces(filters);
  };

  return (
    <div className="container">
      <h1>Accomodation Places</h1>

      {/* Filter Section */}
      <div className="filter-container">
  <select name="accomodation" onChange={handleFilterChange}>
    <option value="">All</option>
    <option value="boys only">Boys</option>
    <option value="girls only">Girls</option>
    <option value="boys and girls">Boys and Girls</option>
  </select>

  <input
    type="number"
    name="maxRent"
    placeholder="Max Rent"
    onChange={handleFilterChange}
  />

  <select name="room_sharing" onChange={handleFilterChange}>
    <option value="">All Sharing</option>
    <option value="single">Single</option>
    <option value="double">Double</option>
    <option value="triple">Triple</option>
    <option value="four">Four</option>
  </select>

  <select name="ac" onChange={handleFilterChange}>
    <option value="">AC/Non-AC</option>
    <option value="available">AC Available</option>
    <option value="not available">Non-AC</option>
  </select>

  <button onClick={applyFilters}>Apply Filters</button>
</div>


      {/* Display Places */}
      <div className="grid">
  {places.length === 0 ? (
    <p className="grid1">No data available.</p>
  ) : (
    places.map((place) => (
      <div key={place._id} className="card">
        <img
          src={`http://localhost:5000/uploads/${place.image}`}
          alt={place.name}
          className="place-image"
        />
        <h3>{place.name}</h3>
        <p><strong>Location:</strong> {place.location}</p>
        <p><strong>Rent:</strong> ₹{place.rent}</p>
        <p><strong>Room Sharing:</strong> {place.room_sharing}</p>
        <p><strong>AC:</strong> {place.ac}</p>
        <p><strong>Accomodation:</strong> {place.accomodation}</p>
        <p><strong>Food:</strong> {place.food}</p>
        <p><strong>Deposit:</strong> ₹{place.deposit_amount}</p>
        <p><strong>Amenities:</strong> {place.amenities}</p>
      </div>
    ))
  )}
</div>



      
    </div>
  );
}

export default App;
