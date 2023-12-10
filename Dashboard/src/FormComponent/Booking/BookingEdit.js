// BookingEdit.js

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useFormik } from 'formik';

function BookingEdit() {
  const params = useParams();
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);

  const getBookingData = async () => {
    try {
      const response = await axios.get(`http://localhost:8800/api/bookings/${params.id}`, {
        withCredentials: true,
      });
      myFormik.setValues(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBookingData();
  }, [params.id]);

  const myFormik = useFormik({
    initialValues: {
      userName: '',
      hotelName: '',
      // roomName: '',
      fromDate: '',
      toDate: '',
      // Add more fields as needed
    },
    validate: (values) => {
      let errors = {};
      // Add validation logic as needed
      return errors;
    },
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setSubmitting(true);
        // Add logic to submit the updated booking data
        await axios.put(`http://localhost:8800/api/bookings/${params.id}`, values, {
          withCredentials: true,
          // Add headers as needed
        });
        setSubmitting(false);
        navigate(`/portal/booking-view/${params.id}`);
      } catch (error) {
        console.log(error);
        setSubmitting(false);
      }
    },
  });

  return (
    <div>
      <h2>Edit Booking</h2>
      <form onSubmit={myFormik.handleSubmit}>
        {/* Add form fields for editing booking details */}
        <div>
          <label>User Name:</label>
          <input
            type="text"
            name="userName"
            value={myFormik.values.userName}
            onChange={myFormik.handleChange}
          />
        </div>
        <div>
          <label>Hotel Name:</label>
          <input
            type="text"
            name="hotelName"
            value={myFormik.values.hotelName}
            onChange={myFormik.handleChange}
          />
        </div>
        <div>
          <label>Room Name:</label>
          <input
            type="text"
            name="roomName"
            value={myFormik.values.roomName}
            onChange={myFormik.handleChange}
          />
        </div>
        <div>
          <label>From Date:</label>
          <input
            type="date"
            name="fromDate"
            value={myFormik.values.fromDate}
            onChange={myFormik.handleChange}
          />
        </div>
        <div>
          <label>To Date:</label>
          <input
            type="date"
            name="toDate"
            value={myFormik.values.toDate}
            onChange={myFormik.handleChange}
          />
        </div>
        {/* Add more fields as needed */}
        <div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Updating...' : 'Update'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default BookingEdit;
