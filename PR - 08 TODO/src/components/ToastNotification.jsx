import React, { useEffect } from 'react';

export default function ToastNotification({ toast, onClose }) {
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast, onClose]);

  if (!toast) return null;

  const { type, message } = toast;
  const iconClass = {
    success: 'bi-check-circle-fill text-success',
    danger: 'bi-exclamation-triangle-fill text-danger',
    warning: 'bi-exclamation-circle-fill text-warning',
    info: 'bi-info-circle-fill text-info',
  }[type] || 'bi-info-circle-fill';

  return (
    <div
      className="position-fixed top-0 end-0 p-3"
      style={{ zIndex: 9999 }}
    >
      <div
        className="toast show border-0 glass-card animate-fade-in"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        style={{
          minWidth: '280px',
          background: 'var(--bg-card)',
          backdropFilter: 'var(--glass-blur)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
        }}
      >
        <div className="toast-header border-0 bg-transparent d-flex align-items-center justify-content-between pt-3 px-3 pb-2">
          <div className="d-flex align-items-center gap-2">
            <i className={`bi ${iconClass} fs-5`}></i>
            <strong className="me-auto text-capitalize" style={{ color: 'var(--text-primary)' }}>
              {type === 'danger' ? 'Error' : type}
            </strong>
          </div>
          <button
            type="button"
            className="btn-close"
            onClick={onClose}
            aria-label="Close"
          ></button>
        </div>
        <div className="toast-body px-3 pb-3 pt-0" style={{ color: 'var(--text-secondary)' }}>
          {message}
        </div>
      </div>
    </div>
  );
}
