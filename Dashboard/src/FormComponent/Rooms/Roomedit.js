import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useFormik } from 'formik';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Container, Typography, Grid, List, ListItem } from '@mui/material';

function RoomEdit() {
  const params = useParams();
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);

  const apiUrl = `http://localhost:8800/api/rooms/${params.id}`;

  // Fetch room data by ID
  const getRoomData = async () => {
    try {
      const response = await axios.get(apiUrl, {
        withCredentials: true,
      });
      myFormik.setValues(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getRoomData();
  }, [params.id]);

  const myFormik = useFormik({
    initialValues: {
      title: '',
      price: 0,
      maxPeople: 0,
      desc: '',
      roomNumbers: [],
      // Add other room-specific fields here
    },
    validate: (values) => {
      let errors = {};
      if (!values.title) {
        errors.title = 'Please enter a title';
      }
      // Add other validation rules here
      return errors;
    },
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setSubmitting(true);

        // Send a PUT request to update the room
        await axios.put(apiUrl, values, {
          withCredentials: true,
        });

        setSubmitting(false); // Reset the submitting state
        navigate(`/portal/room-view/${params.id}`);
      } catch (error) {
        console.error(error);
        setSubmitting(false); // Reset the submitting state in case of an error
      }
    },
  });

  return (
    <Container>
      {/* <Typography variant="h5">Edit Room - ID: {params.id}</Typography> */}
      <Typography variant="h5">Edit Room  </Typography>
      <form onSubmit={myFormik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={myFormik.values.title}
              onChange={myFormik.handleChange}
              error={!!myFormik.errors.title}
              helperText={myFormik.errors.title}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Price"
              name="price"
              type="number"
              value={myFormik.values.price}
              onChange={myFormik.handleChange}
              error={!!myFormik.errors.price}
              helperText={myFormik.errors.price}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Max People"
              name="maxPeople"
              type="number"
              value={myFormik.values.maxPeople}
              onChange={myFormik.handleChange}
              error={!!myFormik.errors.maxPeople}
              helperText={myFormik.errors.maxPeople}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              name="desc"
              value={myFormik.values.desc}
              onChange={myFormik.handleChange}
              error={!!myFormik.errors.desc}
              helperText={myFormik.errors.desc}
            />
          </Grid>
        </Grid>

        <List>
          {myFormik.values.roomNumbers.map((roomNumber, index) => (
            <ListItem key={index}>
              Number: {roomNumber.number}, Unavailable Dates: {roomNumber.unavailableDates.join(', ')}
            </ListItem>
          ))}
        </List>

        <Button
          disabled={isLoading || myFormik.isSubmitting}
          type="submit"
          variant="contained"
          color="primary"
        >
          {myFormik.isSubmitting ? 'Updating...' : 'Update'}
        </Button>
      </form>
    </Container>
  );
}

export default RoomEdit;
