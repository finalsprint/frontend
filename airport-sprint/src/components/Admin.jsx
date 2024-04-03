import React, { useState, useEffect } from 'react';
import Header from "./Header";
import FlightTable from './FlightTable';

const Admin = () => {
    const [formData, setFormData] = useState({
        airline: '',
        flightNumber: '',
        date: '',
        time: '',
        origin: '',
        destination: '',
        gateNumber: ''
    });

    const [flights, setFlights] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        
        setFormData({
            airline: '',
            flightNumber: '',
            date: '',
            time: '',
            origin: '',
            destination: '',
            gateNumber: ''
        });
        const newFlight = { ...formData };
        setFlights([...flights, newFlight]);
    };

    useEffect(() => {
        // Fetch flights data from the API
        fetchFlightsData()
            .then(data => setFlights(data))
            .catch(error => console.error('Error fetching flights:', error));
    }, []);

    // Function to fetch flights data from the API
    const fetchFlightsData = async () => {
        try {
            // Make API call to fetch flights data
            const response = await fetch('API_ENDPOINT');
            if (!response.ok) {
                throw new Error('Failed to fetch flights');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error('Error fetching flights data: ' + error.message);
        }
    };

    return (
        <div className="admin-container">
            <Header />
            
            <form className='admin-form' onSubmit={handleSubmit}>
                <h3>Add a Flight</h3>
                <label>
                    Airline:
                    <input type="text" name="airline" value={formData.airline} onChange={handleChange} />
                </label>
                <label>
                    Flight Number:
                    <input type="text" name="flightNumber" value={formData.flightNumber} onChange={handleChange} />
                </label>
                <label>
                    Date:
                    <input type="date" name="date" value={formData.date} onChange={handleChange} />
                </label>
                <label>
                    Time:
                    <input type="time" name="time" value={formData.time} onChange={handleChange} />
                </label>
                <label>
                    Origin:
                    <select name="origin" value={formData.origin} onChange={handleChange}>
                        <option value="St. John's(YYT)">St. John's(YYT)</option>
                        <option value="Churchill Falls(ZUM)">Churchill Falls(ZUM)</option>
                        <option value="Deer Lake(YDF)">Deer Lake(YDF)</option>
                    </select>
                </label>
                <label>
                    Destination:
                    <select name="destination" value={formData.destination} onChange={handleChange}>
                        <option value="St. John's(YYT)">St. John's(YYT)</option>
                        <option value="Churchill Falls(ZUM)">Churchill Falls(ZUM)</option>
                        <option value="Deer Lake(YDF)">Deer Lake(YDF)</option>
                    </select>
                </label>
                <label>
                    Gate Number:
                    <select name="gateNumber" value={formData.gateNumber} onChange={handleChange}>
                        {[...Array(9)].map((_, i) => (
                            <option key={i} value={i + 1}>{i + 1}</option>
                        ))}
                    </select>
                </label>
                <button type="submit">Add Flight</button>
            </form>
            <FlightTable flights={flights} />
        </div>
    )
}

export default Admin;
