import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import axios from 'axios';

const CreateRoom = () => {
    const [formData, setFormData] = React.useState({
        title: '',
        price: '',
        maxPeople: '',
        desc: '',
        roomNumbers: [
            {
                number: '',
                unavailableDates: null,
            },
        ],
        selectedHotel: '', // New state for the selected hotel
    });

    const [hotels, setHotels] = useState([]); // State for storing hotels

    useEffect(() => {
        async function fetchHotels() {
            try {
                const response = await axios.get('http://localhost:8800/api/hotels');
                setHotels(response.data);
            } catch (error) {
                console.error('Error fetching hotels:', error);
            }
        }
        fetchHotels();
    }, []);

    // const addRoomNumber = () => {
    //     setFormData({
    //         ...formData,
    //         roomNumbers: [
    //             ...formData.roomNumbers,
    //             {
    //                 number: '',
    //                 unavailableDates: null,
    //             },
    //         ],
    //     });
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const apiUrl = `http://localhost:8800/api/rooms/${formData.selectedHotel}`;


            const response = await axios.post(apiUrl, formData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log(response.data);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'number' ? parseInt(value) : value,
        });
    };

    return (
        <Container>
            <Box component="form" onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    label="Title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="Price"
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleChange}
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="Max People"
                    name="maxPeople"
                    type="number"
                    value={formData.maxPeople}
                    onChange={handleChange}
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="Description"
                    name="desc"
                    value={formData.desc}
                    onChange={handleChange}
                    margin="normal"
                />

                {/* Dropdown to select the hotel */}
                <TextField
                    select
                    fullWidth
                    label="Select Hotel"
                    name="selectedHotel"
                    value={formData.selectedHotel}
                    onChange={handleChange}
                    SelectProps={{
                        native: true,
                    }}
                    margin="normal"
                >
                    <option value="">Select a Hotel</option>
                    {hotels.map((hotel) => (
                        <option key={hotel.id} value={hotel.id}>
                            {hotel.name}
                        </option>
                    ))}
                </TextField>

                {/* Room number and unavailable dates inputs */}
                {formData.roomNumbers.map((room, index) => (
                    <div key={index}>
                        <TextField
                            fullWidth
                            label={`Room ${index + 1} Number`}
                            name={`roomNumbers[${index}].number`}
                            type="number"
                            value={room.number}
                            onChange={(e) => handleChange(e, index)}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label={`Room ${index + 1} Unavailable Dates`}
                            name={`roomNumbers[${index}].unavailableDates`}
                            type="date"
                            value={room.unavailableDates}
                            onChange={(e) => handleChange(e, index)}
                            margin="normal"
                        />
                    </div>
                ))}

                <Box mt={2} mb={2}>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                    >
                        Submit
                    </Button>
                </Box>
            </Box>

            {/* Optional: Add Room Button and View Room List Link */}
        </Container>
    );
};

export default CreateRoom;
