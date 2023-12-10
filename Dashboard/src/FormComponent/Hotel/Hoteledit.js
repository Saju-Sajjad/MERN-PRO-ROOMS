import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useFormik } from 'formik';

  
  function HotelEdit() {
    
      const params = useParams();
      const navigate = useNavigate();
      const [isLoading, setLoading] = useState(false);
    
      const getHotelData = async () => {
        try {
          const response = await axios.get(`http://localhost:8800/api/hotels/${params.id}`, {
            withCredentials: true,
          });
          myFormik.setValues(response.data);
          setLoading(false);
        } catch (error) {
          console.log(error);
        }
      };
    
      useEffect(() => {
        getHotelData();
      }, [params.id]);
    
      const myFormik = useFormik({
        initialValues: {
          name: '',
          type: '',
          city: '',
          address: '',
          photos: [],
          rooms: [],
          distance: '',
          title: '',
          desc: '',
          cheapestPrice: 0,
          featured: false,
        },
        validate: (values) => {
          let errors = {};
          if (!values.name) {
            errors.name = 'Please enter a name';
          }
          return errors;
        },
        onSubmit: async (values, { setSubmitting }) => {
          try {
            setSubmitting(true);
            const formData = new FormData();
    
            // Append form data as in the previous example
        // Append form fields
        formData.append("name", values.name);
        formData.append("type", values.type);
        formData.append("city", values.city);
        formData.append("address", values.address);
        formData.append("distance", values.distance);
        formData.append("title", values.title);
        formData.append("desc", values.desc);
        // formData.append("cheapestPrice", values.cheapestPrice);
    
        // Append the "featured" field as a boolean
        formData.append("featured", values.featured ? "true" : "false");
    
        // Append rooms as an array (convert to a string)
        formData.append("rooms", values.rooms.join("\n"));
    
        // Append files (photos)
        for (let i = 0; i < values.photos.length; i++) {
          formData.append("photos", values.photos[i]);
        }
            await axios.put(`http://localhost:8800/api/hotels/${params.id}`, formData, {
              withCredentials: true,
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });
    
            setSubmitting(false); // Reset the submitting state
            navigate(`/hotel-view/${params.id}`);
          } catch (error) {
            console.log(error);
            setSubmitting(false); // Reset the submitting state in case of an error
          }
        },
    
      });
  
    return (
      <div className="hotel-edit-container">
        {/* <h3>Edit Hotel - ID: {params.id}</h3> */}
        <h3><b>Hotel Edit</b></h3>
        <form onSubmit={myFormik.handleSubmit}>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label>Name</label>
              <input
                name="name"
                value={myFormik.values.name}
                onChange={myFormik.handleChange}
                type="text"
                className={`form-control ${myFormik.errors.name ? 'is-invalid' : ''}`}
              />
              <span style={{ color: 'red' }}>{myFormik.errors.name}</span>
            </div>
  
            <div className="form-group col-md-6">
              <label>Type</label>
              <input
                name="type"
                value={myFormik.values.type}
                onChange={myFormik.handleChange}
                type="text"
                className={`form-control ${myFormik.errors.type ? 'is-invalid' : ''}`}
              />
              <span style={{ color: 'red' }}>{myFormik.errors.type}</span>
            </div>
          </div>
  
          <div className="form-row">
            <div className="form-group col-md-6">
              <label>City</label>
              <input
                name="city"
                value={myFormik.values.city}
                onChange={myFormik.handleChange}
                type="text"
                className={`form-control ${myFormik.errors.city ? 'is-invalid' : ''}`}
              />
              <span style={{ color: 'red' }}>{myFormik.errors.city}</span>
            </div>
  
            <div className="form-group col-md-6">
              <label>Address</label>
              <input
                name="address"
                value={myFormik.values.address}
                onChange={myFormik.handleChange}
                type="text"
                className={`form-control ${myFormik.errors.address ? 'is-invalid' : ''}`}
              />
              <span style={{ color: 'red' }}>{myFormik.errors.address}</span>
            </div>
            <div className="form-group col-md-6">
              <label>Owner name</label>
              <input
                name="distance"
                value={myFormik.values.distance}
                onChange={myFormik.handleChange}
                type="text"
                className={`form-control ${myFormik.errors.distance ? 'is-invalid' : ''}`}
              />
              <span style={{ color: 'red' }}>{myFormik.errors.distance}</span>
            </div>
            <div className="form-group col-md-6">
              <label>Title</label>
              <input
                name="title"
                value={myFormik.values.distance}
                onChange={myFormik.handleChange}
                type="text"
                className={`form-control ${myFormik.errors.title ? 'is-invalid' : ''}`}
              />
              <span style={{ color: 'red' }}>{myFormik.errors.title}</span>
            </div>
            <div className="form-group col-md-6">
              <label>Description</label>
              <input
                name="desc"
                value={myFormik.values.desc}
                onChange={myFormik.handleChange}
                type="text"
                className={`form-control ${myFormik.errors.desc ? 'is-invalid' : ''}`}
              />
              <span style={{ color: 'red' }}>{myFormik.errors.desc}</span>
            </div>
          </div>
          <div className="form-group col-md-6">
              <label>Cheapest Price</label>
              <input
                name="type"
                value={myFormik.values.type}
                onChange={myFormik.handleChange}
                type="number"
                className={`form-control ${myFormik.errors.cheapestPrice ? 'is-invalid' : ''}`}
              />
              <span style={{ color: 'red' }}>{myFormik.errors.cheapestPrice}</span>
            </div>
            <div className="form-group col-md-6">
              <label>Room</label>
              <input
                name="type"
                value={myFormik.values.rooms}
                onChange={myFormik.handleChange}
                type="number"
                className={`form-control ${myFormik.errors.rooms ? 'is-invalid' : ''}`}
              />
              <span style={{ color: 'red' }}>{myFormik.errors.rooms}</span>
            </div>
          <div>
            <label>Photos</label>
            <input
              name="photos"
              type="file"
              onChange={(event) => {
                myFormik.setFieldValue("photos", event.currentTarget.files);
              }}
              className={`form-control ${myFormik.errors.photos ? 'is-invalid' : ''}`}
            />
            <span style={{ color: 'red' }}>{myFormik.errors.photos}</span>
          </div>
  
      
  
          <div className="form-group">
            <input
              disabled={isLoading}
              type="submit"
              value={isLoading ? 'Updating...' : 'Update'}
              className="btn btn-secondary"
            />
          </div>
        </form>
      </div>
    );
  }
  
  export default HotelEdit;
  
//   return (
//     <div>
//       <h3>Edit Hotel - ID: {params.id}</h3>
//       <form onSubmit={myFormik.handleSubmit}>
//         <div>
//           <label>Name</label>
//           <input
//             name="name"
//             value={myFormik.values.name}
//             onChange={myFormik.handleChange}
//             type="text"
//             className={`form-control ${myFormik.errors.name ? 'is-invalid' : ''}`}
//           />
//           <span style={{ color: 'red' }}>{myFormik.errors.name}</span>
//         </div>

//         <div>
//           <label>Type</label>
//           <input
//             name="type"
//             value={myFormik.values.type}
//             onChange={myFormik.handleChange}
//             type="text"
//             className={`form-control ${myFormik.errors.type ? 'is-invalid' : ''}`}
//           />
//           <span style={{ color: 'red' }}>{myFormik.errors.type}</span>
//         </div>

//         <div>
//           <label>City</label>
//           <input
//             name="city"
//             value={myFormik.values.city}
//             onChange={myFormik.handleChange}
//             type="text"
//             className={`form-control ${myFormik.errors.city ? 'is-invalid' : ''}`}
//           />
//           <span style={{ color: 'red' }}>{myFormik.errors.city}</span>
//         </div>

//         <div>
//           <label>Address</label>
//           <input
//             name="address"
//             value={myFormik.values.address}
//             onChange={myFormik.handleChange}
//             type="text"
//             className={`form-control ${myFormik.errors.address ? 'is-invalid' : ''}`}
//           />
//           <span style={{ color: 'red' }}>{myFormik.errors.address}</span>
//         </div>

//         <div>
//           <label>Distance</label>
//           <input
//             name="distance"
//             value={myFormik.values.distance}
//             onChange={myFormik.handleChange}
//             type="text"
//             className={`form-control ${myFormik.errors.distance ? 'is-invalid' : ''}`}
//           />
//           <span style={{ color: 'red' }}>{myFormik.errors.distance}</span>
//         </div>

//         <div>
//           <label>Title</label>
//           <input
//             name="title"
//             value={myFormik.values.title}
//             onChange={myFormik.handleChange}
//             type="text"
//             className={`form-control ${myFormik.errors.title ? 'is-invalid' : ''}`}
//           />
//           <span style={{ color: 'red' }}>{myFormik.errors.title}</span>
//         </div>

//         <div>
//           <label>Description</label>
//           <input
//             name="desc"
//             value={myFormik.values.desc}
//             onChange={myFormik.handleChange}
//             type="text"
//             className={`form-control ${myFormik.errors.desc ? 'is-invalid' : ''}`}
//           />
//           <span style={{ color: 'red' }}>{myFormik.errors.desc}</span>
//         </div>

//         <div>
//           <label>Cheapest Price</label>
//           <input
//             name="cheapestPrice"
//             value={myFormik.values.cheapestPrice}
//             onChange={myFormik.handleChange}
//             type="text"
//             className={`form-control ${myFormik.errors.cheapestPrice ? 'is-invalid' : ''}`}
//           />
//           <span style={{ color: 'red' }}>{myFormik.errors.cheapestPrice}</span>
//         </div>

//         <div>
//           <label>Featured</label>
//           <input
//             name="featured"
//             type="checkbox"
//             checked={myFormik.values.featured}
//             onChange={myFormik.handleChange}
//           />
//         </div>
//         <div>
//           <label>Rooms</label>
//           <input
//             name="rooms"
//             value={myFormik.values.rooms}
//             onChange={myFormik.handleChange}
//             type="text"
//             className={`form-control ${myFormik.errors.rooms ? 'is-invalid' : ''}`}
//           />
//           <span style={{ color: 'red' }}>{myFormik.errors.rooms}</span>
//         </div>
//         <div>

//           <label>Photos</label>
//           <input
//             name="photos"
//             type="file"
//             onChange={(event) => {
//               myFormik.setFieldValue("photos", event.currentTarget.files);
//             }}
//             className={`form-control ${myFormik.errors.photos ? 'is-invalid' : ''}`}
//           />
//           <span style={{ color: 'red' }}>{myFormik.errors.photos}</span>
//         </div>


//         <div>
//           <input
//             disabled={isLoading}
//             type="submit"
//             value={isLoading ? 'Updating...' : 'Update'}
//             className="btn btn-primary"
//           />
//         </div>

//       </form>
//     </div>
//   );
// }

// export default HotelEdit;



