// BookingView.jsx

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";

function BookingView() {
  const [booking, setBooking] = useState({});
  const [isLoading, setLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    getBookingDetails();
  }, [id]);

  const getBookingDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8800/api/bookings/${id}`, { withCredentials: true });
      setBooking(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }
  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete the booking?");
      if (confirmDelete) {
        await axios.delete(`http://localhost:8800/api/bookings/${id}`, { withCredentials: true });
        // After deletion, you might want to redirect to another page or update the state to reflect the changes.
      }
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="booking-view-container">
      <div className="header">
        <h1 className="h3 mb-0 text-gray-800">Booking View</h1>
      </div>
      <div className="booking-details">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div>
            <p>User Name: {booking.userName}</p>
            <p>Hotel Name: {booking.hotelName}</p>
            <p>Room Number: {booking.roomNumber}</p>
            <p>From Date: {format(new Date(booking.fromDate), "MM/dd/yyyy")}</p>
            <p>To Date: {format(new Date(booking.toDate), "MM/dd/yyyy")}</p>
          </div>
        )}
        <div className="actions">
          <button onClick={() => handleDelete(id)} className='btn btn-danger btn-sm'>Delete</button>
        </div>
      </div>
    </div>
  );
}

export default BookingView;
