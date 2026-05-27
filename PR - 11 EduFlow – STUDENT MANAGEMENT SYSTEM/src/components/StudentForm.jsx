import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addStudent, updateStudent } from '../redux/studentSlice';
import { useNavigate, useParams } from 'react-router-dom';
import './StudentForm.css'; // Import the new styles

export default function StudentForm() {
  const [formData, setFormData] = useState({ name: '', roll: '', class: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  
  const existingStudent = useSelector((state) => 
    id ? state.students.list.find((s) => s.id === id) : null
  );

  useEffect(() => {
    if (existingStudent) setFormData(existingStudent);
  }, [existingStudent]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      dispatch(updateStudent({ id, ...formData }));
    } else {
      dispatch(addStudent({ id: Date.now().toString(), ...formData })); 
    }
    navigate('/');
  };

  return (
    <div className="row justify-content-center mt-5 mb-5">
      <div className="col-md-6 col-lg-5">
        <div className="card custom-form-card border-0">
          
          <div className="form-header text-center pb-3">
            <h3 className="fw-bold text-dark">
              {id ? 'Update Student' : 'New Student'}
            </h3>
            <p className="text-muted small">
              {id ? 'Edit the details below to update the student record.' : 'Enter the details below to register a new student.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="px-2">
            
            <div className="mb-4">
              <label className="form-label fw-semibold text-secondary small text-uppercase">Full Name</label>
              <input 
                type="text" 
                className="form-control custom-input" 
                placeholder="e.g. Jane Doe"
                value={formData.name} 
                onChange={e => setFormData({...formData, name: e.target.value})} 
                required 
              />
            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold text-secondary small text-uppercase">Roll Number</label>
              <input 
                type="text" 
                className="form-control custom-input" 
                placeholder="e.g. CS-101"
                value={formData.roll} 
                onChange={e => setFormData({...formData, roll: e.target.value})} 
                required 
              />
            </div>

            <div className="mb-5">
              <label className="form-label fw-semibold text-secondary small text-uppercase">Class / Grade</label>
              <input 
                type="text" 
                className="form-control custom-input" 
                placeholder="e.g. 10th Grade"
                value={formData.class} 
                onChange={e => setFormData({...formData, class: e.target.value})} 
                required 
              />
            </div>

            <div className="d-flex gap-3">
              <button type="button" className="btn custom-btn-cancel flex-fill" onClick={() => navigate('/')}>
                Cancel
              </button>
              <button type="submit" className="btn custom-btn-primary flex-fill">
                {id ? 'Save Changes' : 'Add Student'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}