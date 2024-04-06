import React from "react";
import Header from "./Header";
import { useState, useEffect } from "react";
import axios from "axios";

export const Reservations = () => {
  const [airports, setAirports] = useState([]);
  const [selectedAirport, setSelectedAirport] = useState("");
  const [flightDetails, setFlightDetails] = useState([]);
  const [foundFlights, setFoundFlights] = useState([]);
  const [destinationAirport, setDestinationAirport] = useState("");

  useEffect(() => {
    fetchAirports();
  }, []);

  const fetchAirports = async () => {
    try {
      const response = await axios.get("http://localhost:8080/airports");
      setAirports(response.data);
    } catch (error) {
      console.error("Error fetching airports:", error);
    }
  };

  const handleAirportChange = async (event) => {
    const selectedAirportId = event.target.value;
    setSelectedAirport(selectedAirportId);
    try {
      const response = await axios.get(
        `http://localhost:8080/flights/origin/${selectedAirportId}`
      );
      setFlightDetails(response.data); // Assuming this is an array of flights
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching flight details:", error);
    }
  };

  const handleDestinationChange = async (event) => {
    setDestinationAirport(event.target.value);
    console.log(destinationAirport);
  };

  const findFlights = async () => {
    setFoundFlights([]);
    console.log(destinationAirport);
    for (let i = 0; i < flightDetails.length; i++) {
      if (flightDetails[i].destinationAirport.id == destinationAirport) {
        setFoundFlights((prevFlights) => [...prevFlights, flightDetails[i]]);
      }
    }
    console.log(foundFlights);
  };

  return (
    <div className="reservation-form">
      <Header />
      <h1 className="airport-title">Reservations</h1>
      <h5 className="dropdown-title">Please select departure airport:</h5>
      <div className="left">
        <div className="airport-dropdown-container">
          <select id="airportDropdown" onChange={handleAirportChange}>
            <option value="">Select an airport</option>
            {airports.map((airport) => (
              <option key={airport.id} value={airport.id}>
                {airport.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <h5 className="dropdown-title">Please select destination airport:</h5>
      <div className="right">
        <div className="airport-dropdown-container">
          <select id="airportDropdown" onChange={handleDestinationChange}>
            <option value="">Select an airport</option>
            {airports.map((airport) => (
              <option key={airport.id} value={airport.id}>
                {airport.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" onClick={findFlights}>
          Find Flights
        </button>
        <br />
        <br />
        <table className="flight-table">
          <thead>
            <tr>
              <th>Flight Number</th>
              <th>From</th>
              <th>To</th>
              <th>Departure Time</th>
              <th>Arrival Time</th>
            </tr>
          </thead>
          <tbody>
            {foundFlights.map((flight, index) => (
              <tr key={index}>
                <td>{flight.flightNumber}</td>
                <td>{flight.originAirport.name}</td>
                <td>{flight.destinationAirport.name}</td>
                <td>{flight.departureTime}</td>
                <td>{flight.arrivalTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reservations;
