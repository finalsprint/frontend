import React, { useState, useEffect } from "react";
import Axios from "axios";
import Header from "./Header";
import FlightTable from "./FlightTable";

const Admin = () => {
  const [formData, setFormData] = useState({
    airline: "",
    flightNumber: "",
    date: "",
    time: "",
    origin: "",
    destination: "",
    gateDep: "",
    gateArr: "",
  });

  const [flights, setFlights] = useState([]);
  const [airports, setAirports] = useState([]);
  const [departureGates, setDepartureGates] = useState([]);
  const [arrivalGates, setArrivalGates] = useState([]);
  const [airlines, setAirlines] = useState([]);

  useEffect(() => {
    fetchAirlinesData();
  }, []);

  const fetchAirlinesData = async () => {
    try {
      const response = await fetch("http://localhost:8080/airlines");
      if (!response.ok) throw new Error("Failed to fetch airlines");
      const data = await response.json();
      setAirlines(data);
    } catch (error) {
      console.error("Error fetching airlines data:", error.message);
    }
  };

  useEffect(() => {
    fetchAirportsData();
  }, []);

  useEffect(() => {
    if (formData.origin)
      fetchGates("origin", formData.origin, setDepartureGates);
  }, [formData.origin]);

  useEffect(() => {
    if (formData.destination)
      fetchGates("destination", formData.destination, setArrivalGates);
  }, [formData.destination]);

  const fetchAirportsData = async () => {
    try {
      const response = await fetch("http://localhost:8080/airports");
      if (!response.ok) throw new Error("Failed to fetch airports");
      const data = await response.json();
      setAirports(data);
    } catch (error) {
      console.error("Error fetching airports data:", error.message);
    }
  };

  const fetchGates = async (type, airportId, setState) => {
    try {
      const endpoint =
        type === "origin" ? "origin-airport" : "destination-airport";
      const response = await Axios.get(
        `http://localhost:8080/gates/${endpoint}/${airportId}`
      );
      setState(response.data);
    } catch (error) {
      console.error(`Error fetching ${type} gates:`, error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    const newFlight = { ...formData };
    setFlights((prevFlights) => [...prevFlights, newFlight]);

    // Reset form after submission??
    setFormData({
      airline: "",
      flightNumber: "",
      date: "",
      time: "",
      origin: "",
      destination: "",
      gateDep: "",
      gateArr: "",
    });
  };

  return (
    <div className="admin-container">
      <Header />

      <form className="admin-form" onSubmit={handleSubmit}>
        <h3>Add a Flight</h3>
        {/* <label>
          Airline:
          <input
            type="text"
            name="airline"
            value={formData.airline}
            onChange={handleChange}
          />
        </label> */}
        <label>
          Airline:
          <select
            name="airline"
            value={formData.airline}
            onChange={handleChange}
          >
            <option value="" disabled>
              Select An Airline
            </option>
            {airlines.map((airline) => (
              <option key={airline.id} value={airline.id}>
                {airline.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Flight Number:
          <input
            type="text"
            name="flightNumber"
            value={formData.flightNumber}
            onChange={handleChange}
          />
        </label>
        <label>
          Date:
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
        </label>
        <label>
          Time:
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
          />
        </label>
        <label>
          Origin:
          <select name="origin" value={formData.origin} onChange={handleChange}>
            <option value="" disabled>
              Select Origin Airport
            </option>
            {airports.map((airport) => (
              <option key={airport.id} value={airport.id}>
                {airport.name} ({airport.airportCode})
              </option>
            ))}
          </select>
        </label>

        {/* Departure Gate Dropdown */}
        <label>
          Departure Gate:
          <select
            name="gateDep"
            value={formData.gateDep}
            onChange={handleChange}
          >
            <option value="" disabled>
              Select Departure Gate
            </option>
            {departureGates.map((gate) => (
              <option key={gate.id} value={gate.id}>
                {gate.gateNumber}
              </option>
            ))}
          </select>
        </label>

        {/* <label>
          Airline:
          <select
            name="airline"
            value={formData.airline}
            onChange={handleChange}
          >
            <option value="" disabled>
              Select An Airline
            </option>
            {airlines.map((airline) => (
              <option key={airline.id} value={airline.id}>
                {airline.name}
              </option>
            ))}
          </select>
        </label> */}

        {/* Destination Dropdown */}
        <label>
          Destination:
          <select
            name="destination"
            value={formData.destination}
            onChange={handleChange}
          >
            <option value="" disabled>
              Select Destination Airport
            </option>
            {airports.map((airport) => (
              <option key={airport.id} value={airport.id}>
                {airport.name} ({airport.airportCode})
              </option>
            ))}
          </select>
        </label>

        {/* Arrival Gate Dropdown */}
        <label>
          Arrival Gate:
          <select
            name="gateArr"
            value={formData.gateArr}
            onChange={handleChange}
          >
            <option value="" disabled>
              Select Arrival Gate
            </option>
            {arrivalGates.map((gate) => (
              <option key={gate.id} value={gate.id}>
                {gate.gateNumber}
              </option>
            ))}
          </select>
        </label>

        <button type="submit">Add Flight</button>
      </form>
      <FlightTable flights={flights} />
    </div>
  );
};

export default Admin;
