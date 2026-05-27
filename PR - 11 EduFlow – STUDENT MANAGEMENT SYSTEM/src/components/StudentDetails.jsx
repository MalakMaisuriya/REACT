import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteStudent } from '../redux/studentSlice';
import { useNavigate } from 'react-router-dom';
import './StudentDetails.css'; 

export default function StudentDetails({ student }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initial = student.name ? student.name.charAt(0).toUpperCase() : '?';

  return (
    <div className="sd-card">
      <div className="sd-header">
        <div className="sd-avatar">{initial}</div>
        <div className="sd-title-group">
          <h3 className="sd-name">{student.name}</h3>
          <span className="sd-badge">Class {student.class}</span>
        </div>
      </div>

      <div className="sd-body">
        <div className="sd-stat">
          <span className="sd-stat-label">Roll Number</span>
          <span className="sd-stat-value">{student.roll}</span>
        </div>
      </div>

      <div className="sd-actions">
        <button 
          className="sd-btn sd-btn-edit" 
          onClick={() => navigate(`/edit/${student.id}`)}
        >
          Edit
        </button>
        <button 
          className="sd-btn sd-btn-delete" 
          onClick={() => dispatch(deleteStudent(student.id))}
        >
          Delete
        </button>
      </div>
    </div>
  );
}