import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';
import './Navbar.css'; 

export default function Navbar() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar navbar-expand-lg custom-purple-nav mb-4">
      <div className="container">
        <Link className="navbar-brand text-white fw-bold d-flex align-items-center gap-2" to="/">
          <span className="brand-text">EduFlow</span>
        </Link>

        {isAuthenticated && (
          <div className="d-flex gap-2 align-items-center ms-auto">
            <Link 
              className={`nav-link custom-nav-link ${isActive('/') ? 'active-link' : ''}`} 
              to="/"
            >
              Directory
            </Link>
            
            <Link 
              className={`nav-link custom-nav-link ${isActive('/add') ? 'active-link' : ''}`} 
              to="/add"
            >
              Add Student
            </Link>
            
            <button className="btn custom-logout-btn ms-3" onClick={handleLogout}>
              Sign Out
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}