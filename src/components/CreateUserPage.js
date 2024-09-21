
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';
import '../styles.css';

const CreateUserPage = () => {
  const [name, setName] = useState('');
  const [job, setJob] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const history = useNavigate ();

  const handleCreateUser = async (e) => {
    e.preventDefault();

    if (!name || !job) {
      setError('Name and job are required.');
      return;
    }

    setError('');
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.post('https://reqres.in/api/users', { name, job }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      debugger
      setSuccess('User created successfully!');
      history('/users');
    } catch (err) {
      setError('Failed to create user.');
    }
  };

  return (
    <div className="create-user-container">
      <h2>Create User</h2>
      <form onSubmit={handleCreateUser}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="job">Job</label>
          <input
            type="text"
            id="job"
            value={job}
            onChange={(e) => setJob(e.target.value)}
            required
          />
        </div>
        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}
        <button type="submit">Create User</button>
      </form>
    </div>
  );
};

export default CreateUserPage;
