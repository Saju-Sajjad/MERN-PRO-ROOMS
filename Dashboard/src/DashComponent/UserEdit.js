// UserEdit.js
import React, { useEffect, useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import axios from 'axios';

function UserEdit() {
  const params = useParams();
  const navigate =useNavigate();
  const [user, setUser] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:8800/api/user/${params.id}`);
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError('Failed to fetch user data');
        setLoading(false);
      }
    };

    fetchUserData();
  }, [params.id]);

  const handleUpdate = async () => {
    try {
      // Assuming you have an update API endpoint on the server
      await axios.put(`http://localhost:8800/api/user/${params.id}`, user);
      navigate(`/portal/user-view/${params.id}`);

    } catch (error) {
      console.log(error);
      setError('Failed to update user');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <>
      <div>User Edit - {params.id}</div>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">User Edit</h6>
        </div>
        <div className="card-body">
          {isLoading ? (
            <img src="https://media.giphy.com/media/ZO9b1ntYVJmjZlsWlm/giphy.gif" alt="Loading" />
          ) : error ? (
            <div>Error: {error}</div>
          ) : (
            <form>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  name="username"
                  value={user.username || ''}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="text"
                  className="form-control"
                  id="phone"
                  name="phone"
                  value={user.phone || ''}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">E-Mail</label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  name="email"
                  value={user.email || ''}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="isAdmin">IsAdmin</label>
                <select
                  className="form-control"
                  id="isAdmin"
                  name="isAdmin"
                  value={user.isAdmin || ''}
                  onChange={handleChange}
                >
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </select>
              </div>
              <button type="button" className="btn btn-primary" onClick={handleUpdate}>
                Update
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}

export default UserEdit;
