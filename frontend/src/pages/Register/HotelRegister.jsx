import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import axios from 'axios';
import Navbar from "../../components/navbar/Navbar";
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import './HotelRegister.scss';

const CreateHotel = () => {
    const [rooms, setRooms] = useState([]);
    const navigate = useNavigate();
    const [formData, setFormData] = React.useState({
        name: '',
        type: '',
        city: '',
        address: '',
        distance: '',
        photos: [],
        title: '',
        desc: '',
        cheapestPrice: '',
        featured: false,
        roomtitle: '',
        roomprice: '',
        roomMaxPeople: '',
        roomdesc: '',
        roomNumber: '',
        rooms: []
    });
  

    const handleAddRoom = () => {
        // Add a new room object to the array
        setRooms([...rooms, {}]);
    };
    
    // Define errorMessage state variable
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const apiUrl = 'http://localhost:8800/api/hotels/';

            const hotel = {
                name: formData.name,
                type: formData.type,
                city: formData.city,
                address: formData.address,
                distance: formData.distance,
                title: formData.title,
                desc: formData.desc,
                cheapestPrice: formData.cheapestPrice,
                featured: formData.featured,
                photos: formData.photos,
                rooms: [{
                    title: formData.roomtitle,
                    price: formData.roomprice,
                    maxPeople: formData.roomMaxPeople,
                    desc: formData.roomdesc,
                    roomNumbers: [{
                        number: formData.roomNumber,
                        // unavailableDates: formData.roomUnavailableDates.split(',').map(date => new Date(date.trim())),
                    }],
                }],
            };

            if (!formData.name || !formData.distance) {
                setError('Name, distance, and address fields are required.');
                return;
            }

            const existingHotels = await axios.get(apiUrl);
            const exists = existingHotels.data.some((hotel) =>
                hotel.name === formData.name && hotel.distance === formData.distance
            );

            if (exists) {
                alert(' Please choose a different one.');
                return;
            }

            const response = await axios.post(apiUrl, hotel, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setFormData({
                name: '',
                type: '',
                city: '',
                address: '',
                distance: '',
                photos: [],
                title: '',
                desc: '',
                cheapestPrice: 0,
                featured: false,
                roomtitle: '',
                roomprice: '',
                roomMaxPeople: '',
                roomdesc: '',
                roomNumber: '',
                rooms: [],
            });

            alert('Your hotel is registered!');
            navigate("/");
            setError(''); // Clear the error when the submission is successful
            console.log(response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
    
        if (type === 'file') {
            setFormData({
                ...formData,
                photos: files[0],
            });
        } else if (name === 'roomUnavailableDates') {
            // Handle roomUnavailableDates separately
            const dates = value.split(',').map(date => new Date(date.trim()));
    
            // Check if all dates are valid before updating state
            if (dates.every(date => !isNaN(date))) {
                setFormData({
                    ...formData,
                    roomUnavailableDates: value,
                });
            }
        } else if (name.startsWith('rooms[')) {
            // Handle updating room fields
            const roomIndex = name.match(/\[(\d+)\]/)[1];
            const fieldName = name.match(/\.\w+/)[0].substring(1);
    
            setFormData({
                ...formData,
                rooms: formData.rooms.map((room, index) =>
                    index === Number(roomIndex)
                        ? { ...room, [fieldName]: type === 'checkbox' ? checked : value }
                        : room
                ),
            });
        } else {
            setFormData({
                ...formData,
                [name]: type === 'checkbox' ? checked : value,
            });
        }
    };
    
    return (
        <Container>
            <Navbar />

            <Box component="form" onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    label="Owner Name"
                    name="distance"
                    value={formData.distance}
                    onChange={handleChange}
                    margin="normal"
                    placeholder="Please Enter Owner Name"
                    required
                />
                <TextField
                    fullWidth
                    label="Hotel Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    margin="normal"
                    placeholder="Enter Hotel Name"
                    required
                />
                  <TextField
                    fullWidth
                    label="Cheapest Price Our Hotel Rooms"
                    name="cheapestPrice"
                    type="number"
                    value={formData.cheapestPrice}
                    onChange={handleChange}
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="Type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    margin="normal"
                    placeholder="hotels/cabins/guests/apartments/resorts"
                    required
                />
                <TextField
                    fullWidth
                    label="City"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    margin="normal"
                    placeholder="Please Enter Your City"
                    required
                />
                <TextField
                    fullWidth
                    label="Address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    margin="normal"
                    placeholder="Please Enter Your Address"
                    required
                />

                <TextField
                    fullWidth
                    label="Title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    margin="normal"
                    placeholder="Enter Hotel Title"
                    required
                />
                <TextField
                    fullWidth
                    label="Description"
                    name="desc"
                    value={formData.desc}
                    onChange={handleChange}
                    margin="normal"
                    placeholder="Please Enter Your Desc"
                    required
                />
              

           <Typography variant="h6">Room Details</Typography>
                <TextField
                    fullWidth
                    label="Room Title"
                    name="roomtitle"
                    value={formData.roomtitle}
                    onChange={handleChange}
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="Room Price"
                    name="roomprice"
                    type="number"
                    value={formData.roomprice}
                    onChange={handleChange}
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="Room Max People"
                    name="roomMaxPeople"
                    type="number"
                    value={formData.roomMaxPeople}
                    onChange={handleChange}
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="Room Description"
                    name="roomdesc"
                    value={formData.roomdesc}
                    onChange={handleChange}
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="Room Number"
                    name="roomNumber"
                    value={formData.roomNumber}
                    onChange={handleChange}
                    margin="normal"
                />
       
                <input
                    type="file"
                    accept="image/*"
                    name="photos"
                    multiple
                    onChange={handleChange}
                    style={{ display: 'none' }}
                    id="select-image"
                />
                <label htmlFor="select-image">
                    <Button component="span" variant="outlined" style={{ color: '#3faa46' }}>
                        Please Uploads Your Hotel Image
                    </Button>
                </label>
                <Button
                    type="submit"
                    variant="contained"
                    style={{ backgroundColor: '#3faa46', color: 'white' }}
                >
                    Submit
                </Button>
               {/* Render room details dynamically based on the array */}
               {rooms.map((room, index) => (
                    <div key={index}>
                         <TextField
                            fullWidth
                            label={`Room Title ${index + 1}`}
                            name={`rooms[${index}].roomtitle`}
                            value={room.roomtitle}
                            onChange={handleChange}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label={`Room Price ${index + 1}`}
                            name={`rooms[${index}].roomprice`}
                            type="number"
                            value={room.roomprice}
                            onChange={handleChange}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label={`Room Max People ${index + 1}`}
                            name={`rooms[${index}].roomMaxPeople`}
                            type="number"
                            value={room.roomMaxPeople}
                            onChange={handleChange}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label={`Room Description ${index + 1}`}
                            name={`rooms[${index}].roomdesc`}
                            value={room.roomdesc}
                            onChange={handleChange}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label={`Room Number ${index + 1}`}
                            name={`rooms[${index}].roomNumber`}
                            value={room.roomNumber}
                            onChange={handleChange}
                            margin="normal"
                        />
                        {/* Add other room details fields here */}
                    </div>
                    
                ))}
                 {/* Add Room button to add a new room */}
                 <Button
                    variant="outlined"
                    style={{ color: '#3faa46', marginBottom: '10px' }}
                    onClick={handleAddRoom}
                >
                    Add Room
                </Button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {/* {successMessage && <p>{successMessage}</p>} */}
            </Box>
        </Container>
    );
};

export default CreateHotel;