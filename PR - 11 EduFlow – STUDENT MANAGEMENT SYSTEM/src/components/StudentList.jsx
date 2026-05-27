import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStudents } from '../redux/studentSlice';
import StudentDetails from './StudentDetails';
import './StudentList.css';

export default function StudentList() {
  const dispatch = useDispatch();
  const { list, status } = useSelector((state) => state.students);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');

  useEffect(() => {
    if (status === 'idle') dispatch(fetchStudents());
  }, [status, dispatch]);

  const processedStudents = useMemo(() => {
    return [...list]
      .filter((s) => {
        const nameMatch = s.name?.toLowerCase().includes(searchTerm.toLowerCase());
        const classMatch = s.class?.toLowerCase().includes(searchTerm.toLowerCase());
        return nameMatch || classMatch;
      })
      .sort((a, b) => {
        const valA = a[sortBy];
        const valB = b[sortBy];
        
        if (typeof valA === 'string' && typeof valB === 'string') {
          return valA.localeCompare(valB);
        }
        return valA > valB ? 1 : -1;
      });
  }, [list, searchTerm, sortBy]);

  if (status === 'loading') {
    return (
      <div className="sl-status-container">
        <div className="sl-loader"></div>
        <p>Syncing directory...</p>
      </div>
    );
  }

  return (
    <div className="sl-wrapper">
      <header className="sl-header">
        <div>
          <h2 className="sl-title">Student Directory</h2>
          <p className="sl-subtitle">Manage and view enrolled students</p>
        </div>
        
        <div className="sl-controls">
          <div className="sl-input-group">
            <svg className="sl-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input 
              type="text" 
              className="sl-input" 
              placeholder="Search name or class..." 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
            />
          </div>
          
          <select 
            className="sl-select" 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="name">Sort: Name</option>
            <option value="roll">Sort: Roll No.</option>
            <option value="class">Sort: Class</option>
          </select>
        </div>
      </header>

      {processedStudents.length > 0 ? (
        <div className="sl-grid">
          {processedStudents.map((student) => (
            <div className="sl-grid-item" key={student.id}>
              <StudentDetails student={student} />
            </div>
          ))}
        </div>
      ) : (
        <div className="sl-empty-state">
          <svg className="sl-empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          <h3>No students found</h3>
          <p>We couldn't find anyone matching "{searchTerm}".</p>
          <button className="sl-clear-btn" onClick={() => setSearchTerm('')}>
            Clear search
          </button>
        </div>
      )}
    </div>
  );
}