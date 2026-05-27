import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from './components/Navbar';
import StudentList from './components/StudentList';
import StudentForm from './components/StudentForm';
import Login from './components/Login';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default function App() {
  return (
    <Router>
      <Navbar />
      <div className="container pb-5">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<PrivateRoute><StudentList /></PrivateRoute>} />
          <Route path="/add" element={<PrivateRoute><StudentForm /></PrivateRoute>} />
          <Route path="/edit/:id" element={<PrivateRoute><StudentForm /></PrivateRoute>} />
        </Routes>
      </div>
    </Router>
  );
}