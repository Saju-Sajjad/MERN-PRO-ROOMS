import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { isValid, format } from "date-fns";

function BookingList() {
  const [bookingList, setBookingList] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const apiUrl = "http://localhost:8800/api/bookings/";

  useEffect(() => {
    getBookings();
  }, []);

  const getBookings = async () => {
    try {
      const bookingsResponse = await axios.get(apiUrl, { withCredentials: true });
      console.log("Booking List Data:", bookingsResponse.data);
  
      const bookingsWithRoomNumbers = await Promise.all(
        bookingsResponse.data.map(async (booking) => {
          try {
            const roomResponse = await axios.get(
              `http://localhost:8800/api/rooms/${booking.roomName}`,
              { withCredentials: true }
            );
  
            console.log("Room Response:", roomResponse.data);
  
            // Check if roomResponse.data has the expected structure
            if (roomResponse.data && roomResponse.data.roomNumber !== undefined) {
              const roomNumber = roomResponse.data.roomNumber;
              console.log("Room Number:", roomNumber);
  
              return {
                ...booking,
                roomNumber,
              };
            } else {
              console.error("Invalid room response:", roomResponse.data);
              // Handle the case where roomNumber is not available
              return booking;
            }
          } catch (roomError) {
            console.error("Error fetching room:", roomError);
            // Handle the error, you can choose to return the booking as is or handle it differently
            return booking;
          }
        })
      );
  
      setBookingList(bookingsWithRoomNumbers);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };
  
  
  

  
  let handleDelete = async (id) => {
    const deleteUrl = `${apiUrl}/${id}`;
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete the data?");
      if (confirmDelete) {
        await axios.delete(deleteUrl);
        getBookings();
      }
    } catch (error) {
      console.error(error);
    }
  }
  const getRowId = (row) => row._id;
  const columns = [
    { field: "userName", headerName: "User Name", flex: 1 },
    { field: "hotelName", headerName: "Hotel Name", flex: 1 },
    // { field: "roomNumber", headerName: "Room Number", flex: 1 },
    { field: "fromDate", headerName: "From Date", flex: 1 },
    { field: "toDate", headerName: "To Date", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <div>
          <Link to={`/portal/booking-view/${params.row._id.toString()}`}
className='btn btn-primary btn-sm'>View</Link>
          {" | "}
          <Link to={`/portal/booking-edit/${params.row._id}`} className='btn btn-info btn-sm'>Edit</Link>
          {" | "}
          <button onClick={() => handleDelete(params.row._id)}className='btn btn-danger btn-sm'>Delete</button>
        </div>
      ),
    },
  ];

  const rowsWithFormattedDates = bookingList.map((booking) => ({
    ...booking,
    fromDate: booking.fromDate
      ? format(new Date(booking.fromDate), "MM/dd/yyyy")
      : null,
    toDate: booking.toDate
      ? format(new Date(booking.toDate), "MM/dd/yyyy")
      : null,
  }));

  console.log("datessss", rowsWithFormattedDates);

  return (
    <div className="booking-list-container">
      <div className="data-grid">
      <h3 className="h3 mb-0 text-gray-800">Booking Details</h3>
        <DataGrid
          rows={rowsWithFormattedDates}
          columns={columns}
          pageSize={5}
          loading={isLoading}
          getRowId={(row) => row._id}
        />
      </div>
    </div>
  );
}

export default BookingList;
