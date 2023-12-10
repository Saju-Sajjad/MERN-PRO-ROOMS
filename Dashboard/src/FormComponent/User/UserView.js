import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function UserView() {
  const params = useParams();
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
  }, [params.id]); // Fetch data whenever `params.id` changes

  return (
    <>
      <div>UserView - {params.id}</div>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">UserView</h6>
        </div>
        <div className="card-body">
          {isLoading ? (
            <img src="https://media.giphy.com/media/ZO9b1ntYVJmjZlsWlm/giphy.gif" alt="Loading" />
          ) : error ? (
            <div>Error: {error}</div>
          ) : (
            <div className="table-responsive">
              <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                <tbody>
                  <tr>
                    <th>Username</th>
                    <td>{user.username}</td>
                  </tr>
                  <tr>
                    <th>Phone Number</th>
                    <td>{user.phone}</td>
                  </tr>
                  <tr>
                    <th>E-Mail</th>
                    <td>{user.email}</td>
                  </tr>
                  <tr>
                    <th>IsAdmin</th>
                    <td>{user.isAdmin ? "Yes" : "No"}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default UserView;
