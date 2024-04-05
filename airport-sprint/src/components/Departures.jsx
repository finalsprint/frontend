import React, { useState, useEffect } from "react";
import Header from "./Header";
import axios from "axios";
import { flightStatusColor } from "./flightViewController";

const Departures = () => {
  const [airports, setAirports] = useState([]);
  const [selectedAirport, setSelectedAirport] = useState("");
  const [flightDetails, setFlightDetails] = useState([]);

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

  flightStatusColor({ flightDetails });

  return (
    <div>
      <Header />
      <h1 className="airport-title">Departures</h1>
      <br />
      <h5 className="dropdown-title">Please select an airport:</h5>

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
      {selectedAirport && flightDetails.length > 0 && (
        <div>
          <h5 className="airport-title">Flight Details</h5>
          <table className="flight-table">
            <thead>
              <tr>
                <th>Flight Number</th>
                <th>To</th>
                <th>Departure Time</th>
                <th>Departure Gate</th>
                <th>Arrival Time</th>
                <th>Arrival Gate</th>
                <th>Flight Status</th>
              </tr>
            </thead>
            <tbody>
              {flightDetails.map((flight, index) => (
                <tr key={index}>
                  <td>{flight.flightNumber}</td>
                  <td>{flight.destinationAirport.name}</td>
                  <td>{flight.departureTime}</td>
                  <td>{flight.departureGate.gateNumber}</td>{" "}
                  <td>{flight.arrivalTime}</td>
                  <td>{flight.arrivalGate.gateNumber}</td>{" "}
                  <td className="status">{flight.flightStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
export default Departures;
