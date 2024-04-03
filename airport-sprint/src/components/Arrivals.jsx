import React, { useState, useEffect } from 'react';
import Header from './Header';
import axios from 'axios';

const Arrivals = () => {
    const [airports, setAirports] = useState([]);
    const [selectedAirport, setSelectedAirport] = useState('');
    const [flightDetails, setFlightDetails] = useState(null);

    useEffect(() => {
        fetchAirports();
    }, []);

    const fetchAirports = async () => {
        try {
            const response = await axios.get('http://localhost:8080/airports');
            setAirports(response.data);
        } catch (error) {
            console.error('Error fetching airports:', error);
        }
    };

    const handleAirportChange = async (event) => {
        const selectedAirportId = event.target.value;
        setSelectedAirport(selectedAirportId);

        try {
            const response = await axios.get('http://localhost:8080/flightDetails');
            setFlightDetails(response.data);
        } catch (error) {
            console.error('Error fetching flight details:', error);
        }
    };

    return (
        <div>
            <Header />
            <h3>Airports:</h3>

            <select id='airportDropdown' onChange={handleAirportChange}>
                <option value=''>Select an airport</option>
                {airports.map((airport) => (
                    <option key={airport.id} value={airport.id}>
                        {airport.name}
                    </option>
                ))}
            </select>
            {selectedAirport &&  flightDetails &&(
                <div>
                <h2>Flight Details</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Arrival Gate</th>
                            <th>Departure Gate</th>
                            <th>Arrival Time</th>
                            <th>Departure Time</th>
                            <th>Flight Number</th>
                            <th>Flight Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{flightDetails.arrivalGate}</td>
                            <td>{flightDetails.departureGate}</td>
                            <td>{flightDetails.arrivalTime}</td>
                            <td>{flightDetails.departureTime}</td>
                            <td>{flightDetails.flightNumber}</td>
                            <td>{flightDetails.flightStatus}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
                
            )}


        </div>
    );
};

export default Arrivals;
