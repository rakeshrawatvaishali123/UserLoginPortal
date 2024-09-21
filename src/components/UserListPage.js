
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles.css';

const UserListPage = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem('authToken');
      try {
        const response = await axios.get('https://reqres.in/api/users', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setUsers(response.data.data);
      } catch (err) {
        setError('Failed to fetch users.');
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="user-list-container">
      <h2>User List</h2>
      {error && <div className="error">{error}</div>}
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <img src={user.avatar} alt={user.first_name} />
            <p>{user.first_name} {user.last_name}</p>
            <Link to={`/files/${user.id}`}>Files</Link>
            <Link to={`/edit-user/${user.id}`}>Edit</Link>
          </li>
        ))}
      </ul>
      <Link to="/create-user">Create New User</Link>
    </div>
  );
};

export default UserListPage;
