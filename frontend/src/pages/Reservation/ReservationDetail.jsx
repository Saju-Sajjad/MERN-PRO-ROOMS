import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { useNavigate, useParams } from "react-router-dom";

const ReservationDetail = () => {
  const [hotelDetail, setHotelDetail] = useState({});
  const { hotelId, roomId } = useParams();
  const navigate = useNavigate();

  const fetchHotelData = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8800/api/hotels/find/${hotelId}`
      );
      if (!response.ok) {
        throw new Error("Internal Server Error");
      }
      const responseData = await response.json();
      setHotelDetail(responseData);
      console.log("In the fetchHotelDetail component");
      console.log(responseData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchHotelData(hotelId);
  }, [hotelId]);


  // const handleCancelReservation = async () => {
  //   console.log("Starts Here -> In the Cancel Reservation function");

  //   try {
  //     const response = await fetch(
  //       `http://localhost:8800/api/bookings/cancel/${roomId}`,{
  //         method: "DELETE"
  //       }
  //     );
  //     if (!response.ok) {
  //       throw new Error("Internal Server Error");
  //     }
  //     const responseData = await response.json()
  //     console.log("In the Cancel Reservation function");
  //     console.log(responseData);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  
  const handleCancelReservation = async () => {
    console.log("Starts Here -> In the Cancel Reservation function");
  
    try {
      const response = await fetch(
        `http://localhost:8800/api/bookings/cancel/${roomId}`,
        {
          method: "DELETE",
        }
      );
  
      if (!response.ok) {
        throw new Error("Internal Server Error");
      }
  
      const responseData = await response.json();
      console.log("In the Cancel Reservation function");
      console.log(responseData);
  
      // Show an alert message when the cancellation is successful
      alert("Your booking has been canceled successfully!");
  
    } catch (err) {
      console.log(err);
      // Show an alert message if there's an error during cancellation
      alert("An error occurred during the cancellation. Please try again.");
    }
  };
  
  const handleClose = () => {
    
    navigate("/");
  };

  return (
    <div>
     
      <Dialog open={true} onClose={handleClose}>
        <DialogTitle>Room Reserved!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Your room has reserved successfully! Do you want to cancel the reservation??
          </DialogContentText>
        </DialogContent>
        <DialogContent>
          <DialogContentText>
            Hotel Name: {hotelDetail.name}
          </DialogContentText>
          <DialogContentText>
            Amount: {hotelDetail.cheapestPrice}
          </DialogContentText>
          <DialogContentText>
            City: {hotelDetail.city}
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCancelReservation} color="primary">
            Cancel Reservation
          </Button>
          <Button onClick={handleClose} color="secondary">
            Close
          </Button>
          <Button onClick={handleClose} color="secondary">
           Conform Your Booking
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ReservationDetail;
