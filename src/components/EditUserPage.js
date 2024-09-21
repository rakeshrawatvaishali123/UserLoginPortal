
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate  } from 'react-router-dom';
import '../styles.css';

const EditUserPage = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const history = useNavigate ();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('authToken');
      try {
        const response = await axios.get(`https://reqres.in/api/users/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setUser(response.data.data);
      } catch (err) {
        setError('Failed to fetch user.');
      }
    };
    fetchUser();
  }, [id]);

  const handleSaveChanges = async (e) => {
    e.preventDefault();

    if (!user.name || !user.job) {
      setError('Name and job are required.');
      return;
    }

    setError('');
    try {
      const token = localStorage.getItem('authToken');
      await axios.put(`https://reqres.in/api/users/${id}`, { name: user.name, job: user.job }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setSuccess('User updated successfully!');
      history('/users');
    } catch (err) {
      setError('Failed to update user.');
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="edit-user-container">
      <h2>Edit User</h2>
      <form onSubmit={handleSaveChanges}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="job">Job</label>
          <input
            type="text"
            id="job"
            value={user.job}
            onChange={(e) => setUser({ ...user, job: e.target.value })}
            required
          />
        </div>
        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditUserPage;
