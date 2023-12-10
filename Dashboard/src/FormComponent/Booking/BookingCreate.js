import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';

const CreateBooking = () => {
  const [formData, setFormData] = useState({
    hotelName: '',
    // roomName: '',
    userName: '',
    toDate: '',
    fromDate: '',
    // maxPeople: '', // New field for max people
    // price: '', // New field for price
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiUrl = 'http://localhost:8800/api/bookings';

      const response = await axios.post(apiUrl, formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        fullWidth
        label="User Name"
        name="userName"
        value={formData.userName}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Hotel Name"
        name="hotelName"
        value={formData.hotelName}
        onChange={handleChange}
        margin="normal"
      />
      {/* <TextField
        fullWidth
        label="Room Name"
        name="roomName"
        value={formData.roomName}
        onChange={handleChange}
        margin="normal"
      /> */}
         {/* <TextField
        fullWidth
        label="Max People"
        name="maxPeople"
        value={formData.maxPeople}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Price"
        name="price"
        value={formData.price}
        onChange={handleChange}
        margin="normal"
      /> */}
      <TextField
        fullWidth
        label="From Date"
        type="date"
        name="fromDate"
        value={formData.fromDate}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        fullWidth
        label="To Date"
        type="date"
        name="toDate"
        value={formData.toDate}
        onChange={handleChange}
        margin="normal"
      />
   
      <Button
        variant="contained"
        color="primary"
        type="submit"
      >
        Create Booking
      </Button>
    </form>
  );
};

export default CreateBooking;