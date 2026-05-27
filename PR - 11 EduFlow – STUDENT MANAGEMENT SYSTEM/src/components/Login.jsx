import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import './Login.css';

export default function Login() {
  const [creds, setCreds] = useState({ username: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
      dispatch(login());
      navigate('/');
  };

  return (
    <div className="row justify-content-center mt-5 mb-5 align-items-center" style={{ minHeight: '60vh' }}>
      <div className="col-md-5 col-lg-4">
        <div className="card custom-login-card border-0">
          
          <div className="text-center pb-4">
            <h3 className="fw-bold text-dark mb-1">Welcome Back</h3>
            <p className="text-muted small">Sign in to access the student Portal</p>
          </div>

          <form onSubmit={handleLogin} className="px-2">
            
            <div className="mb-4">
              <label className="form-label fw-semibold text-secondary small text-uppercase">Username</label>
              <input 
                type="text" 
                placeholder="Enter your username" 
                className="form-control custom-input" 
                onChange={e => setCreds({...creds, username: e.target.value})} 
                required
              />
            </div>

            <div className="mb-5">
              <label className="form-label fw-semibold text-secondary small text-uppercase">Password</label>
              <input 
                type="password" 
                placeholder="Enter your password" 
                className="form-control custom-input" 
                onChange={e => setCreds({...creds, password: e.target.value})} 
                required
              />
            </div>

            <button type="submit" className="btn custom-btn-primary w-100">
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}