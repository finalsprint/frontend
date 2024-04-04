import React from "react";

const Flight = ({ flights }) => {
  return (
    <div className="flight-table-container">
      <h3>Flight List</h3>
      <table className="flight-table">
        <thead>
          <tr>
            <th>Airline</th>
            <th>Flight Number</th>
            <th>Date</th>
            <th>Time</th>
            <th>Origin</th>
            <th>Origin Gate</th>
            <th>Destination</th>
            <th>Gate Number</th>
          </tr>
        </thead>
        <tbody>
          {flights.map((flight, index) => (
            <tr key={index}>
              <td>{flight.airline}</td>
              <td>{flight.flightNumber}</td>
              <td>{flight.date}</td>
              <td>{flight.time}</td>
              <td>{flight.origin}</td>
              <td>{flight.depGate}</td>
              <td>{flight.destination}</td>
              <td>{flight.arrGate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Flight;
