import React, { useState } from 'react';
import { Button, TextField, Grid, Typography, Container } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const navigate = useNavigate();

    const [formErrors, setFormErrors] = useState({});

    const handleValidation = () => {
      let errors = {};
      let formIsValid = true;
  
      // Username validation
      if (!username || username.length < 5 || username.length > 20) {
          formIsValid = false;
          errors["username"] = "Username must be between 5 and 20 characters";
      }
  
      // Email validation
      if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
          formIsValid = false;
          errors["email"] = "Please enter a valid email address";
      }
  
      // Password validation, if required
      if (!password) {
          formIsValid = false;
          errors["password"] = "Password is required";
      }
  
      setFormErrors(errors);
      return formIsValid;
  };
  

    const handleRegister = async () => {
        const isValid = handleValidation();

        if (isValid) {
            const user = {
                username: username,
                email: email,
                password: password,
                phone: phone
            };

            try {
                await axios.post('http://localhost:8800/api/auth/register', user);
                console.log("User registered successfully");
                navigate('/Login');
            } catch (error) {
                console.log("Error during registration:", error);
            }
        } else {
            console.log("Form has errors. Please fix them.");
        }
    };

    return (
        <Container sx={{ mt: 10, padding: '20px', borderRadius: '5px' }} component="main" maxWidth="xs">
            <div>
                <Typography component="h1" variant="h5" style={{ marginBottom: '20px' }}>
                    Sign Up
                </Typography>
                <form>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        error={formErrors.username ? true : false}
                        helperText={formErrors.username}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={formErrors.email ? true : false}
                        helperText={formErrors.email}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="phone"
                        label="Contact Number"
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        autoComplete="new-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        error={formErrors.password ? true : false}
                        helperText={formErrors.password}
                    />

                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
  
                        onClick={handleRegister}
                        style={{ backgroundColor: 'rgb(49, 200, 90)' }}
                    >
                        Sign Up
                    </Button>
                </form>
                <Grid container justifyContent="flex-end" style={{ marginTop: '20px' }}>
                    <Grid item>
                        <Link to="/Login" variant="body2">
                            Already have an account? Sign in
                        </Link>
                    </Grid>
                </Grid>
            </div>
        </Container>
    );
};

export default Register;
