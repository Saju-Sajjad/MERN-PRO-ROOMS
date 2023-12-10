import { faBook, faHotel, faTachographDigital, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
// import LOGO from "../DashComponent/logo.png";

function Sidebar() {
    const sidebarStyle = {
        backgroundColor: "#333", // Change the background color to your desired color
    };

    return (
        <ul className="navbar-nav sidebar sidebar-dark accordion" id="accordionSidebar" style={sidebarStyle}>
            <li className="nav-item">
                <Link className="nav-link" to="/">
                    <FontAwesomeIcon icon={faTachographDigital} style={{ marginRight: "0.5rem" }} />
                    <span style={{ fontSize: "16px" }}>Travelics</span> {/* Change "Dashboard" to "Travelics" */}
                </Link>
            </li>

            <li className="nav-item">
                <Link className="nav-link" to="/portal/user-list">
                    <FontAwesomeIcon icon={faUsers} style={{ marginRight: "0.5rem" }} />
                    <span style={{ fontSize: "16px" }}>Users</span>
                </Link>
            </li>

            <li className="nav-item">
                <Link className="nav-link" to="/portal/hotel-list">
                    <FontAwesomeIcon icon={faHotel} style={{ marginRight: "0.5rem" }} />
                    <span style={{ fontSize: "16px" }}>Hotels</span>
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/portal/rooms-list">
                    <FontAwesomeIcon icon={faBook} style={{ marginRight: "0.5rem" }} />
                    <span style={{ fontSize: "16px" }}>Rooms</span>
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/portal/booking-list">
                    <FontAwesomeIcon icon={faBook} style={{ marginRight: "0.5rem" }} />
                    <span style={{ fontSize: "16px" }}>Booking</span>
                </Link>
            </li>

           
        </ul>
    );
}

export default Sidebar;

// import { faBook, faHotel, faTachographDigital, faUsers } from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import React from 'react'
// import { Link } from 'react-router-dom'
// import LOGO from "../DashComponent/logo.png"
// function Sidebar() {
//     return (
//         <ul className="navbar-nav sidebar sidebar-dark accordion" id="accordionSidebar">
//             {/* <img
//             style={{height:'40px'}}
//                 src={LOGO} alt='logo'
//             /> */}
//             <hr className="sidebar-divider my-0" />

//             {/* <!-- Nav Item - Dashboard --> */}
//             <li className="nav-item active">
//                 <Link className="nav-link" to="/portal/dashboard">
//                     <FontAwesomeIcon icon={faTachographDigital} style={{ marginRight: "0.5rem" }} />
//                     <span>Dashboard</span>
//                 </Link>
//             </li>
//             {/* <!-- Divider --> */}
//             <hr className="sidebar-divider my-0" />

//             {/* <!-- Nav Item - Users --> */}
//             <li className="nav-item active">
//                 <Link className="nav-link" to="/portal/user-list">
//                     <FontAwesomeIcon icon={faUsers} style={{ marginRight: "0.5rem" }} />
//                     <span>Users</span>
//                 </Link>
//             </li>
//             <li className="nav-item active">
//                 <Link className="nav-link" to="/portal/hotel-list">
//                     <FontAwesomeIcon icon={faHotel} style={{ marginRight: "0.5rem" }} />
//                     <span>Hotel</span>
//                 </Link>
//             </li>
//             <li className="nav-item active">
//                 <Link className="nav-link" to="/portal/booking-list">
//                     <FontAwesomeIcon icon={faBook} style={{ marginRight: "0.5rem" }} />
//                     <span>Booking</span>
//                 </Link>
//             </li>
//             <li className="nav-item active">
//                 <Link className="nav-link" to="/portal/rooms-list">
//                     <FontAwesomeIcon icon={faBook} style={{ marginRight: "0.5rem" }} />
//                     <span>Rooms</span>
//                 </Link>
//             </li>

//         </ul>
//     )
// }

// export default Sidebar