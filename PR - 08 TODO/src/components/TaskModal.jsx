import React, { useState, useEffect } from 'react';

export default function TaskModal({ isOpen, onClose, onSubmit, taskToEdit }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [category, setCategory] = useState('Work');
  const [status, setStatus] = useState('Pending');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description || '');
      setDueDate(taskToEdit.dueDate);
      setPriority(taskToEdit.priority);
      setCategory(taskToEdit.category);
      setStatus(taskToEdit.status);
    } else {
      setTitle('');
      setDescription('');
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      setDueDate(tomorrow.toISOString().split('T')[0]);
      setPriority('Medium');
      setCategory('Work');
      setStatus('Pending');
    }
    setErrors({});
  }, [taskToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!title.trim()) newErrors.title = 'Title is required';
    if (!dueDate) newErrors.dueDate = 'Due date is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit({
      title: title.trim(),
      description: description.trim(),
      dueDate,
      priority,
      category,
      status,
    });
  };

  return (
    <div
      className="modal-backdrop-blur d-flex align-items-center justify-content-center"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        backdropFilter: 'blur(8px)',
        zIndex: 1050,
      }}
      onClick={onClose}
    >
      <div
        className="glass-card p-4 animate-fade-in"
        style={{
          width: '100%',
          maxWidth: '500px',
          maxHeight: '90vh',
          overflowY: 'auto',
          backgroundColor: 'var(--bg-card)',
          boxShadow: 'var(--shadow-lg)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="fw-bold m-0" style={{ color: 'var(--text-primary)' }}>
            {taskToEdit ? 'Edit Task' : 'Add Task'}
          </h3>
          <button
            type="button"
            className="btn-close"
            onClick={onClose}
            aria-label="Close"
          ></button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Title */}
          <div className="mb-3 text-start">
            <label className="form-label fw-semibold small" style={{ color: 'var(--text-secondary)' }}>Title *</label>
            <input
              type="text"
              className={`form-control glass-input ${errors.title ? 'is-invalid' : ''}`}
              placeholder="e.g. Test Auth API endpoints"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {errors.title && <div className="invalid-feedback">{errors.title}</div>}
          </div>

          {/* Description */}
          <div className="mb-3 text-start">
            <label className="form-label fw-semibold small" style={{ color: 'var(--text-secondary)' }}>Description</label>
            <textarea
              className="form-control glass-input"
              rows="3"
              placeholder="e.g. Details about API headers, params, and responses..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <div className="row">
            {/* Due Date */}
            <div className="col-6 mb-3 text-start">
              <label className="form-label fw-semibold small" style={{ color: 'var(--text-secondary)' }}>Due Date *</label>
              <input
                type="date"
                className={`form-control glass-input ${errors.dueDate ? 'is-invalid' : ''}`}
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
              {errors.dueDate && <div className="invalid-feedback">{errors.dueDate}</div>}
            </div>

            {/* Priority */}
            <div className="col-6 mb-3 text-start">
              <label className="form-label fw-semibold small" style={{ color: 'var(--text-secondary)' }}>Priority</label>
              <select
                className="form-select glass-input"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>

          <div className="row">
            {/* Category */}
            <div className="col-6 mb-4 text-start">
              <label className="form-label fw-semibold small" style={{ color: 'var(--text-secondary)' }}>Category</label>
              <select
                className="form-select glass-input"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
                <option value="Shopping">Shopping</option>
                <option value="Health">Health</option>
                <option value="Finance">Finance</option>
              </select>
            </div>

            {/* Status (Only visible when editing) */}
            {taskToEdit && (
              <div className="col-6 mb-4 text-start">
                <label className="form-label fw-semibold small" style={{ color: 'var(--text-secondary)' }}>Status</label>
                <select
                  className="form-select glass-input"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="d-flex justify-content-end gap-2">
            <button
              type="button"
              className="btn btn-light border px-4 py-2"
              onClick={onClose}
              style={{ borderRadius: '10px' }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-gradient-primary px-4 py-2"
              style={{ borderRadius: '10px' }}
            >
              {taskToEdit ? 'Update Task' : 'Save Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
