import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import axios from 'axios';
import Typography from '@mui/material/Typography';

const CreateHotel = () => {
    const [formData, setFormData] = React.useState({
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
    });

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
            });

            alert('Your hotel is registered!');
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
        } else {
            setFormData({
                ...formData,
                [name]: type === 'checkbox' ? checked : value,
            });
        }
    };

    return (
        <Container>
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
                <TextField
                    fullWidth
                    label="Contact Number"
                    name="cheapestPrice"
                    type="number"
                    value={formData.cheapestPrice}
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
                        Please Upload Your Hotel Image
                    </Button>
                </label>
                <Button
                    type="submit"
                    variant="contained"
                    style={{ backgroundColor: '#3faa46', color: 'white' }}
                >
                    Submit
                </Button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </Box>
        </Container>
    );
};

export default CreateHotel;
