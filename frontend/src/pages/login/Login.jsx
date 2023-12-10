import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { TextField, Button, Container, Typography, Grid, CircularProgress } from "@mui/material";
import axios from "axios";
import { Link } from 'react-router-dom';
import { REACT_APP_URL } from "../../constant/url";
import "./login.css";
import { Home } from "@mui/icons-material";


const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });
  const [errors, setErrors] = useState({}); // State to track errors

  const { loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    // Clear the username error when the user starts typing in the username field
    if (e.target.id === "username") {
      setErrors((prevErrors) => ({ ...prevErrors, username: "" }));
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (!credentials.username) {
      // If the username field is empty, display an error
      setErrors((prevErrors) => ({ ...prevErrors, username: "Username is required" }));
      return; // Do not proceed with the login
    }
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(REACT_APP_URL + "/auth/login", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate("/");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  return (
    <Container sx={{ mt: 10, padding: '20px', borderRadius: '5px' }} component="main" maxWidth="xs">
     <Home/>
    <div className="login-form">
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form>
       
        <TextField
            fullWidth
            id="username"
            label="Username"
            variant="outlined"
            margin="normal"
            value={credentials.username}
            onChange={handleChange}
            // Display error if the username field is touched and empty
            error={!!errors.username}
            helperText={errors.username}
          />
          <TextField
            fullWidth
            id="password"
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            value={credentials.password}
            onChange={handleChange}
          />
          <Button
            fullWidth
            variant="contained"
            style={{ backgroundColor: 'rgb(49, 200, 90)' }}
            onClick={handleClick}
            className="login-button"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
          </Button>
          {error && (
            <Typography variant="body2" color="error" align="center">
              {error.message}
            </Typography>
          )}
        </form>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link to="/Register" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

export default Login;
// import React, { useContext, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../../context/AuthContext";
// import { TextField, Button, Container, Typography, Box,Grid, CircularProgress } from "@mui/material";
// import axios from "axios";
// // import Register from "./Register"
// import { Link } from 'react-router-dom';
// import { REACT_APP_URL } from "../../constant/url";
// import "./login.css"

// const Login = () => {
//   const [credentials, setCredentials] = useState({
//     username: undefined,
//     password: undefined,
//   });

//   const { loading, error, dispatch } = useContext(AuthContext);

//   const navigate = useNavigate()

//   const handleChange = (e) => {
//     setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
//   };

//   const handleClick = async (e) => {
//     e.preventDefault();
//     dispatch({ type: "LOGIN_START" });
//     try {
//       const res = await axios.post(REACT_APP_URL+"/auth/login", credentials);
//       dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
//       navigate("/")
//     } catch (err) {
//       dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
//     }
//   };


//   return (
//     <div className="login">
//       <div className="lContainer">
//         <input
//           type="text"
//           placeholder="username"
//           id="username"
//           onChange={handleChange}
//           className="lInput"
//         />
//         <input
//           type="password"
//           placeholder="password"
//           id="password"
//           onChange={handleChange}
//           className="lInput"
//         />
//         <button disabled={loading} onClick={handleClick} className="lButton">
//           Login
//         </button>
//         {error && <span>{error.message}</span>}
//         <Grid container justifyContent="flex-end">
//           <Grid item>
//             <Link to="/Register" variant="body2">
//               {"Don't have an account? Sign Up"}
//             </Link>
//           </Grid>
//         </Grid>
//       </div>
//     </div>
//   );
// };

// export default Login;

// // const Login = () => {
// //   const [username, setUsername] = useState('');
// //   const [password, setPassword] = useState('');

// //   const handleLogin = () => {
// //     const apiUrl = 'http://localhost:8000/api/auth/login/';
// //     const user = {
// //       username: username,
// //       password: password,
// //     };

// //     axios.post(apiUrl, user)


// //     .catch((error) => {
// //         console.error('Error logging in:', error);
// //       });

// //   };

// //   return (
// //     <Container component="main" maxWidth="xs">
// //       <div>
// //         <Typography component="h1" variant="h5">
// //           Sign In
// //         </Typography>
// //         <form>
// //           <TextField
// //             variant="outlined"
// //             margin="normal"
// //             required
// //             fullWidth
// //             id="username"
// //             label="Username"
// //             name="username"
// //             autoComplete="username"
// //             autoFocus
// //             value={username}
// //             onChange={(e) => setUsername(e.target.value)}
// //           />
// //           <TextField
// //             variant="outlined"
// //             margin="normal"
// //             required
// //             fullWidth
// //             name="password"
// //             label="Password"
// //             type="password"
// //             id="password"
// //             autoComplete="current-password"
// //             value={password}
// //             onChange={(e) => setPassword(e.target.value)}
// //           />
// //           <Button
// //             type="button"
// //             fullWidth
// //             variant="contained"
// //             color="primary"
// //             onClick={handleLogin}
// //           >
// //             Sign In
// //           </Button>
// //         </form>
// //         <Grid container justifyContent="flex-end">
// //           <Grid item>
// //             <Link to="/Register" variant="body2">
// //               {"Don't have an account? Sign Up"}
// //             </Link>
// //           </Grid>
// //         </Grid>
// //       </div>
// //     </Container>
// //   );
// // };

// // export default Login;

// // const Login = () => {
// //   const [credentials, setCredentials] = useState({
// //     username: "",
// //     password: "",
// //   });

// //   const { loading, error, dispatch } = useContext(AuthContext);
// //   const navigate = useNavigate();

// //   const handleChange = (e) => {
// //     setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
// //   };

// //   const handleClick = async (e) => {
// //     e.preventDefault();
// //     dispatch({ type: "LOGIN_START" });

// //     try {
// //       const res = await axios.post(REACT_APP_URL + "/auth/login", credentials);
// //       dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
// //       navigate("/");
// //     } catch (err) {
// //       dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
// //     }
// //   };

// //   return (
// //     <Container maxWidth="xs">
// //       <Box mt={5}>
// //         <Typography variant="h4" align="center" gutterBottom>
// //           Login
// //         </Typography>
// //         <form>
// //           <TextField
// //             fullWidth
// //             id="username"
// //             label="Username"
// //             variant="outlined"
// //             margin="normal"
// //             value={credentials.username}
// //             onChange={handleChange}
// //           />
// //           <TextField
// //             fullWidth
// //             id="password"
// //             label="Password"
// //             type="password"
// //             variant="outlined"
// //             margin="normal"
// //             value={credentials.password}
// //             onChange={handleChange}
// //           />
// //           <Button
// //             fullWidth
// //             variant="contained"
// //             color="success" // Change color to green (success)
// //             onClick={handleClick}
// //             className="lButton"
// //             disabled={loading}
// //           >
// //             {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
// //           </Button>
// //           {error && (
// //             <Typography variant="body2" color="error" align="center">
// //               {error.message}
// //             </Typography>
// //           )}
// //         </form>
// //       </Box>
// //     </Container>
// //   );
// // };

// // export default Login;


// // import axios from "axios";
// // import { useContext, useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { AuthContext } from "../../context/AuthContext";
// // import "./login.css";
// // import { REACT_APP_URL } from "../../constant/url";
