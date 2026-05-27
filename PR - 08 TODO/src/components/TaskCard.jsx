import React from 'react';

export default function TaskCard({ task, onStatusChange, onEdit, onDelete }) {
  const { id, title, description, dueDate, priority, category, status } = task;

  const isCompleted = status === 'Completed';

  const getDueDateStatus = () => {
    if (isCompleted) return 'normal';
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const taskDate = new Date(dueDate);
    taskDate.setHours(0, 0, 0, 0);

    if (taskDate < today) return 'overdue';
    if (taskDate.getTime() === today.getTime()) return 'today';
    return 'upcoming';
  };

  const dueDateStatus = getDueDateStatus();

  const getCategoryIcon = (cat) => {
    switch (cat) {
      case 'Work': return 'bi-briefcase';
      case 'Personal': return 'bi-person';
      case 'Shopping': return 'bi-cart3';
      case 'Health': return 'bi-heart-pulse';
      case 'Finance': return 'bi-wallet2';
      default: return 'bi-tag';
    }
  };

  const formatDueDate = (dateStr) => {
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(dateStr).toLocaleDateString('en-US', options);
  };

  return (
    <div className="col-12 col-md-6 col-lg-4 mb-4 animate-fade-in" style={{ animation: `fadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards` }}>
      <div className={`card glass-card h-100 position-relative group-hover ${isCompleted ? 'border-success border-opacity-25 opacity-75' : ''}`} style={{
        transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        borderWidth: '1.5px'
      }}>
        {/* Priority indicator bar */}
        <div className="position-absolute top-0 start-0 w-100 h-1" style={{
          background: priority === 'High' ? '#ef4444' : priority === 'Medium' ? '#f59e0b' : '#10b981',
          borderRadius: '16px 16px 0 0',
          height: '4px'
        }}></div>

        <div className="card-body d-flex flex-column text-start pt-4">
          {/* Header Category and Priority */}
          <div className="d-flex justify-content-between align-items-start mb-3 gap-2">
            <span className="badge rounded-pill bg-light text-dark border d-flex align-items-center gap-2 py-2 px-3 flex-shrink-0" style={{
              fontSize: '0.85rem',
              fontWeight: '600',
              letterSpacing: '0.3px'
            }}>
              <i className={`bi ${getCategoryIcon(category)} text-primary`}></i>
              <span>{category}</span>
            </span>
            <span className={`badge rounded-pill priority-badge-${priority} py-2 px-3 flex-shrink-0`} style={{
              fontSize: '0.75rem',
              fontWeight: '700',
              letterSpacing: '0.5px'
            }}>
              {priority}
            </span>
          </div>

          {/* Title and Description */}
          <h5 className={`card-title fw-bold mb-2 ${isCompleted ? 'task-completed-text text-secondary' : ''}`} style={{ 
            color: 'var(--text-primary)',
            fontSize: '1.1rem',
            transition: 'color 0.3s ease',
            lineHeight: '1.4'
          }}>
            {title}
          </h5>
          <p className={`card-text text-secondary mb-4 flex-grow-1 ${isCompleted ? 'text-decoration-line-through opacity-50' : ''}`} style={{ 
            fontSize: '0.9rem', 
            lineHeight: '1.6',
            transition: 'all 0.3s ease'
          }}>
            {description || <em className="text-muted">No description provided.</em>}
          </p>

          {/* Due Date Indicator */}
          <div className="d-flex align-items-center gap-2 mb-4 p-2 rounded-2" style={{
            backgroundColor: dueDateStatus === 'overdue' ? 'rgba(239, 68, 68, 0.08)' : dueDateStatus === 'today' ? 'rgba(245, 158, 11, 0.08)' : 'transparent',
            transition: 'all 0.3s ease'
          }}>
            <i className={`bi bi-calendar3 ${dueDateStatus === 'overdue' ? 'text-danger' : dueDateStatus === 'today' ? 'text-warning' : 'text-muted'}`} style={{ fontSize: '1rem' }}></i>
            <span className={`small fw-semibold ${dueDateStatus === 'overdue' ? 'text-danger fw-bold' : dueDateStatus === 'today' ? 'text-warning' : 'text-secondary'}`}>
              Due: {formatDueDate(dueDate)}
              {dueDateStatus === 'overdue' && ' (Overdue)'}
              {dueDateStatus === 'today' && ' (Today!)'}
            </span>
          </div>

          <hr className="my-3 opacity-10" />

          {/* Action Row */}
          <div className="d-flex justify-content-between align-items-center mt-auto gap-2">
            {/* Status Dropdown */}
            <div className="flex-grow-1">
              <select
                className="form-select form-select-sm glass-input py-2 px-2 fw-semibold w-100"
                style={{ 
                  fontSize: '0.85rem', 
                  cursor: 'pointer',
                  minHeight: '36px',
                  transition: 'all 0.2s ease'
                }}
                value={status}
                onChange={(e) => onStatusChange(id, e.target.value)}
              >
                <option value="Pending">⏳ Pending</option>
                <option value="In Progress">⚡ In Progress</option>
                <option value="Completed">✅ Completed</option>
              </select>
            </div>

            {/* Edit / Delete Buttons */}
            <div className="d-flex align-items-center gap-1">
              <button
                className="btn btn-sm btn-outline-primary border-0 rounded-circle d-flex align-items-center justify-content-center"
                title="Edit Task"
                onClick={() => onEdit(task)}
                style={{ 
                  width: '36px', 
                  height: '36px', 
                  padding: 0,
                  transition: 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  fontSize: '1rem'
                }}
              >
                <i className="bi bi-pencil"></i>
              </button>
              <button
                className="btn btn-sm btn-outline-danger border-0 rounded-circle d-flex align-items-center justify-content-center"
                title="Delete Task"
                onClick={() => onDelete(id)}
                style={{ 
                  width: '36px', 
                  height: '36px', 
                  padding: 0,
                  transition: 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  fontSize: '1rem'
                }}
              >
                <i className="bi bi-trash"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
