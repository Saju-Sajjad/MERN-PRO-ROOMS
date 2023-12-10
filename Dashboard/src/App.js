import "./App.css";
import Dashboard from "./DashComponent/Dashboard";
import Portal from "./DashComponent/Portal";
import Login from "./FormComponent/Forms/Auth/Login";
import Register from "./FormComponent/Forms/Auth/Register";
import HotelEdit from "./FormComponent/Hotel/Hoteledit";
import HotelList from "./FormComponent/Hotel/hotellist";
import RoomCreate from "./FormComponent/Rooms/RoomCreate";
import HotelView from "./FormComponent/Hotel/hotelsview";
import RoomList from "./FormComponent/Rooms/RoomList";
import RoomView from "./FormComponent/Rooms/RoomView";
import RoomEdit from "./FormComponent/Rooms/Roomedit";
import UserView from "./FormComponent/User/UserView";
import Userlist from "./FormComponent/User/Userlist";
import HotelCreate from "./FormComponent/Hotel/HotelCreate ";
import BookingCreate from "./FormComponent/Booking/BookingCreate";
import "./sb-admin-2.min.css";
import { Route, Routes } from "react-router-dom";
import UserEdit from "./DashComponent/UserEdit";
import BookingList from "./FormComponent/Booking/BookingList";
import BookingView from "./FormComponent/Booking/BookingView";
import BookingEdit from "./FormComponent/Booking/BookingEdit";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/portal" element={<Portal />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="hotel-list" element={<HotelList />} />
        <Route path="hotel-view/:id" element={<HotelView />} />
        <Route path="hotels-edit/:id" element={<HotelEdit />} />
        <Route path="create-hotel" element={<HotelCreate />} />
        <Route path="create-room" element={<RoomCreate />} />
        <Route path="user-list" element={<Userlist />} />
        <Route path="user-view/:id" element={<UserView />} />
        <Route path="user-edit/:id" element={<UserEdit />} />
        <Route path="booking-list" element={<BookingList />} />
        <Route path="booking-view/:id" element={<BookingView />} /> 
        <Route path="booking-edit/:id" element={<BookingEdit />} />
        <Route path="create-booking" element={<BookingCreate />} />
        <Route path="rooms-list" element={<RoomList />} />
        <Route path="room-view/:id" element={<RoomView />} />
        <Route path="rooms-edit/:id" element={<RoomEdit />} />
      </Route>
    </Routes>
  );
}

export default App;
