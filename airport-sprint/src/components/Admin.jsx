

import React, { useState, useEffect } from "react";
import Axios from "axios";
import Header from "./Header";
import FlightTable from "./FlightTable";

const Admin = () => {
  const [formData, setFormData] = useState({
    airline: "",
    originAirport: "", // Updated field name
    destinationAirport: "", // Updated field name
    flightNumber: "",
    departureTime: "",
    arrivalTime: "",
    flightStatus: "",
    departureGate: "",
    arrivalGate: ""
  });

  const [flights, setFlights] = useState([]);
  const [airports, setAirports] = useState([]);
  const [departureGates, setDepartureGates] = useState([]);
  const [arrivalGates, setArrivalGates] = useState([]);
  const [airlines, setAirlines] = useState([]);

  useEffect(() => {
    fetchAirlinesData();
    fetchAirportsData();
  }, []);

  const fetchAirlinesData = async () => {
    try {
      const response = await Axios.get("http://localhost:8080/airlines");
      setAirlines(response.data);
    } catch (error) {
      console.error("Error fetching airlines data:", error.message);
    }
  };

  const fetchAirportsData = async () => {
    try {
      const response = await Axios.get("http://localhost:8080/airports");
      setAirports(response.data);
    } catch (error) {
      console.error("Error fetching airports data:", error.message);
    }
  };

  useEffect(() => {
    if (formData.originAirport) {
      fetchGates(formData.originAirport, setDepartureGates);
    } else {
      setDepartureGates([]); // Reset departureGates when originAirport is not selected
    }
  }, [formData.originAirport]);

  useEffect(() => {
    if (formData.destinationAirport) {
      fetchGates(formData.destinationAirport, setArrivalGates);
    } else {
      setArrivalGates([]); // Reset arrivalGates when destinationAirport is not selected
    }
  }, [formData.destinationAirport]);

  const fetchGates = async (airportId, setState) => {
    try {
      const response = await Axios.get(`http://localhost:8080/gates/${airportId}`);
      console.log("Response from server:", response);
      console.log("Response.data:", response.data);

      if (Array.isArray(response.data)) {
        setState(response.data);
      } else if (typeof response.data === "object") {
        setState([response.data]);
      } else {
        throw new Error("Invalid gate data received");
      }
    } catch (error) {
      console.error("Error fetching gates:", error);
      setState([]); // Set empty array if there's an error
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };
  
  
  const formatDateTime = (dateTimeString) => {
    const [date, time] = dateTimeString.split(" ");
    const [year, month, day] = date.split("-");
    const [hour, mintute, second] = time.split(":");
    return `${year}-${month}-${day} ${hour}:${mintute}:${second}`;
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Construct the request payload to match backend expectations
    const payload = {
        flightNumber: formData.flightNumber,
        airline: { id: parseInt(formData.airline, 10) },
        originAirport: { id: parseInt(formData.originAirport, 10) },
        destinationAirport: { id: parseInt(formData.destinationAirport, 10) },
        departureGate: { id: parseInt(formData.departureGate, 10) },
        arrivalGate: { id: parseInt(formData.arrivalGate, 10) },
        scheduledDeparture: formatDateTime(formData.departureTime),
        scheduledArrival: formatDateTime(formData.arrivalTime),
        flightStatus: formData.flightStatus,
        // Convert any other fields as needed
    };

    

    try {
        const response = await Axios.post("http://localhost:8080/flights", payload);
        if (response.status !== 200) throw new Error("Failed to add flight");
        console.log("Flight added successfully");

        // Fetch updated flights list
        const updatedFlights = await Axios.get("http://localhost:8080/flights");
        setFlights(updatedFlights.data);
    } catch (error) {
        console.error("Error adding flight: ", error.message);
    }

    // Reset form after submission
    setFormData({
        airline: "",
        originAirport: "",
        destinationAirport: "",
        flightNumber: "",
        departureTime: "",
        arrivalTime: "",
        flightStatus: "",
        departureGate: "",
        arrivalGate: ""
    });
};
  
// Function to fetch airport data by ID
// const fetchAirportById = async (airportId) => {
//   try {
//     // Fetch airport data by ID from the backend
//     const response = await Axios.get(`http://localhost:8080/airports/${airportId}`);
    
//     if (!response.ok) throw new Error("Failed to fetch airport");

//     // Return the airport object corresponding to the provided ID
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching airport: ", error.message);
//     return null;
//   }
// };


  return (
    <div className="admin-container">
      <Header />

      <form className="admin-form" onSubmit={handleSubmit}>
        <h3>Add a Flight</h3>
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
          Origin Airport: 
          <select name="originAirport" value={formData.originAirport} onChange={(e) => {
            handleChange(e);
            fetchGates(e.target.value, setDepartureGates);
          }}>
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

        <label>
          Destination Airport: 
          <select
            name="destinationAirport"
            value={formData.destinationAirport}
            onChange={(e) => {
              handleChange(e);
              fetchGates(e.target.value, setArrivalGates);
            }}
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
          Departure Time:
          <input
            type="text"
            name="departureTime"
            value={formData.departureTime}
            onChange={handleChange}
            placeholder="YYYY-MM-DD HH:MM:SS"
            
            
          />
        </label>

        <label>
          Arrival Time:
          <input
            type="text"
            name="arrivalTime"
            value={formData.arrivalTime}
            onChange={handleChange}
            placeholder="YYYY-MM-DD HH:MM:SS"
            
            
          />
        </label>

        <label>
          Flight Status:
          <select
            name="flightStatus"
            value={formData.flightStatus}
            onChange={handleChange}
          >
            <option value="" disabled>
              Select Flight Status
            </option>
            <option value="On Time">On Time</option>
            <option value="Delayed">Delayed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </label>

        <label>
          Departure Gate:
          <select
            name="departureGate"
            value={formData.departureGate}
            onChange={handleChange}
          >
            <option value="" disabled>
              Select Departure Gate
            </option>
            {Array.isArray(departureGates) && departureGates.map((gate) => (
              <option key={gate.id} value={gate.id}>
                {gate.gateNumber}
              </option>
            ))}
          </select>
        </label>

        <label>
          Arrival Gate:
          <select
            name="arrivalGate"
            value={formData.arrivalGate}
            onChange={handleChange}
          >
            <option value="" disabled>
              Select Arrival Gate
            </option>
            {Array.isArray(arrivalGates) && arrivalGates.map((gate) => (
              <option key={gate.id} value={gate.id}>
                {gate.gateNumber}
              </option>
            ))}
          </select>
        </label>

        <button type="submit">Add Flight</button>
      </form>
      {/* <FlightTable flights={flights} /> */}
    </div>
  );
};

export default Admin;
