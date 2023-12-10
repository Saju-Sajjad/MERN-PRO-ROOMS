import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Button, AppBar, Toolbar } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';
import '../navbar/navbar.css';
import { useParams } from "react-router-dom";
const Navbar = () => {
  const { user, setUser } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const { id } = useParams();
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    localStorage.removeItem('user');
    setUser(null);
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: '#4CAF50',
        // Replace with the desired green color in hexadecimal format
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" style={{ backgroundColor: '#3faa46' }}>
        <Toolbar className="custom-toolbar">
          {/* Left Content */}
          <div className="left-content">
            <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
              <span className="logo">TRAVILICS</span>
            </Link>
          </div>
          <div className="navitems">
                <Button variant="contained" component={Link} to="/about" style={{ textDecoration: "none", color: "white", backgroundColor: "#3faa46" }}>
                  About
                </Button>
                <Button variant="contained" component={Link} to="/destinations" style={{ textDecoration: "none", color: "white", backgroundColor: "#3faa46" }}>
                  Destinations
                </Button>
                <Button variant="contained" component={Link} to="/contact" style={{ textDecoration: "none", color: "white", backgroundColor: "#3faa46" }}>
                  Contact Us
                </Button>
                </div>
          {/* Center Content */}
          <div className="center-content">
            {user ? (
              <div className="navitems">
              
                <Button variant="contained" component={Link} to="/hotelRegister" style={{ textDecoration: "none", color: "white", backgroundColor: "#3faa46" }}>
                  Hotel Register
                </Button>
                {/* {user ? (
               <Button variant="contained" component={Link} to={`/bookings/${id}`} style={{ textDecoration: "none", color: "white", backgroundColor: "#333" }}>
               View Booking
             </Button>
             
               
                ) : null} */}
              </div>
            ) : null}
          </div>

          {/* Right Content */}
          <div className="right-content">
            {user ? (
              <div className="btn-group">
                <div className="dropdown">
                  <button
                    className="btn btn-success dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton1"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    style={{ backgroundColor: '#000', color: 'white', border: 'none' }}
                  >
                    <i className="fas fa-user" style={{ border: 'none' }}></i> {user.username}
                  </button>
                  <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1" style={{ backgroundColor: '#333', width: '150px' }}>
                    <li><a className="dropdown-item" href="/login" onClick={handleClose} style={{ color: 'white', backgroundColor: '#000', width: '100%' }}>Logout</a></li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="btn-group">
                <div className="dropdown">
                  <button
                    className="btn btn-success dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton2"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i className="fas fa-user-plus" style={{ marginRight: '5px' }}></i> {/* Font Awesome register icon */}
                    Create Account
                  </button>
                  <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton2">
                    <li><Button variant="text" component={Link} to="/register" onClick={handleClose}>Register</Button></li>
                    <li><Button variant="text" component={Link} to="/login" onClick={handleClose}>Login</Button></li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default Navbar;
