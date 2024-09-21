import React from 'react';
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import UserListPage from './components/UserListPage';
import CreateUserPage from './components/CreateUserPage';
import EditUserPage from './components/EditUserPage';
import FilePreviewPage from './components/FilePreviewPage';
import './styles.css';

function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/users" element={<UserListPage/>} />
        <Route path="/create-user" element={<CreateUserPage/>} />
        <Route path="/edit-user/:id" element={<EditUserPage/>} />
        <Route path="/files/:id" element={<FilePreviewPage/>} />
        <Route path="/" element={<LoginPage/>} />
      </Routes>
    </div>
  </Router>
  );
}

export default App;
