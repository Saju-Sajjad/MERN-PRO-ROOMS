import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";
import Login from "./pages/login/Login";
import Register from "./pages/login/Register";
import About from "./pages/about/About";
import Destinations from "./pages/destination/Destinations";
import Contact from "./pages/contact/Contact";
import HotelRegister from "./pages/Register/HotelRegister";
import BookingView from "./pages/booking/bookingview";
import ReservationDetail from "./pages/Reservation/ReservationDetail";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotels" element={<List />} />
        <Route path="/hotels/:id" element={<Hotel />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/hotelRegister" element={<HotelRegister />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/bookings/:id" element={<BookingView />} />
        <Route path="/reservation/detail/:hotelId/:roomId" element={<ReservationDetail />} />



      </Routes>
    </BrowserRouter>
  );
}

export default App;

// import React from 'react';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Home from './pages/home/Home';
// import List from './pages/list/List';
// import Hotel from './pages/hotel/Hotel';

// function App() {
//     return ( <
//         BrowserRouter >
//         <
//         Routes >
//         <
//         Route path = "/"
//         element = { < Home / > }
//         />     <
//         Route path = "/hotels"
//         element = { < List / > }
//         />     <
//         Route path = "/hotels/:id"
//         element = { < Hotel / > }
//         />    < /
//         Routes > <
//         /BrowserRouter>
//     );
// }

// export default App;
