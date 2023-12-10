import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Container, Typography, Grid } from '@mui/material';
import Navbar from "../../components/navbar/Navbar";
import FacebookIcon from '@mui/icons-material/Facebook';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    message: '',
  });

  const [formErrors, setFormErrors] = useState({
    name: false,
    email: false,
    phoneNumber: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    // Validate the input based on your criteria
    if (name === 'name') {
      setFormErrors({
        ...formErrors,
        name: value === '' ? true : false,
      });
    }
    // You can add email and phone number validation here if needed
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the form before submission
    const newFormErrors = {
      name: formData.name === '',
      email: formData.email === '',
      phoneNumber: formData.phoneNumber === '',
    };

    // Check if any validation errors exist
    if (Object.values(newFormErrors).some((error) => error)) {
      setFormErrors(newFormErrors);
      return;
    }

    // Form is valid, proceed with submission
    console.log('Form Data:', formData);

    // Reset the form fields and errors
    setFormData({
      name: '',
      email: '',
      phoneNumber: '',
      message: '',
    });

    setFormErrors({
      name: false,
      email: false,
      phoneNumber: false,
    });
  };

  const handleContactHotel = (contactMethod) => {
    // Handle the contact method (e.g., open WhatsApp, Facebook page, etc.)
    // You can add logic to redirect or handle different contact methods
    console.log(`Contacting Skardu Hotel via ${contactMethod}`);
  };

  return (
    <div>
      <Navbar />
      <Container>
        <Typography variant="h4" align="center" gutterBottom>
          Skardu Hotel Booking
        </Typography>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <ContactPhoneIcon
            style={{ fontSize: 40, margin: '10px', cursor: 'pointer' }}
            onClick={() => handleContactHotel('Phone')}
          />
          <Typography variant="body1" align="center">
            +92 123 4567890 (Phone)
          </Typography>
        </div>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Your Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={formErrors.name}
                helperText={formErrors.name ? 'Name is required' : ''}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Your Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={formErrors.email}
                helperText={formErrors.email ? 'Invalid email' : ''}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Your Phone Number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                error={formErrors.phoneNumber}
                helperText={formErrors.phoneNumber ? 'Phone number is required' : ''}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Your Message"
                name="message"
                multiline
                rows={4}
                value={formData.message}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Button
  type="submit"
  variant="contained"
  style={{ backgroundColor: '#3faa46', color: 'white' }}
>
  Submit
</Button>
        </form>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <FacebookIcon
            style={{ fontSize: 40, margin: '10px', cursor: 'pointer' }}
            onClick={() => handleContactHotel('Facebook')}
          />
          <WhatsAppIcon
            style={{ fontSize: 40, margin: '10px', cursor: 'pointer' }}
            onClick={() => handleContactHotel('WhatsApp')}
          />
          <InstagramIcon
            style={{ fontSize: 40, margin: '10px', cursor: 'pointer' }}
            onClick={() => handleContactHotel('Instagram')}
          />
        </div>
      </Container>
    </div>
  );
};

export default ContactForm;
