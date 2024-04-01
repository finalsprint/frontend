import React, {useState } from 'react';
import Header from "./Header";

const Admin = () => {
    const [formData, setFormData] = useState({
        airline: '',
        flightNumber: '',
        date: '',
        time: '',
        direction: '',
        gateNumber: ''
        
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // form data for backend goes here??
        console.log9(formData);
        //resert form after submission
        setFormData({
            airline: '',
            flightNumber: '',
            date: '',
            time: '',
            direction: '',
            gateNumber: ''
        });
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
                    Direction (To/From):
                    <select name="direction" value={formData.direction} onChange={handleChange}>
                        <option value="To">To</option>
                        <option value="From">From</option>
                    </select>
                </label>
                <label>
                    Gate Number:
                    <input type="text" name="gateNumber" value={formData.gateNumber} onChange={handleChange} />
                </label>
                <button type="submit">Add Flight</button>
            </form>
        </div>
    )
}

export default Admin; 