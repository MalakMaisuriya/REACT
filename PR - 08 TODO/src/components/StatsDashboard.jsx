import React from 'react';

export default function StatsDashboard({ tasks }) {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === 'Completed').length;
  const active = total - completed;
  const highPriority = tasks.filter((t) => t.priority === 'High' && t.status !== 'Completed').length;
  
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  const getGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) return 'Good Morning, Malak 🌅';
    if (hours < 18) return 'Good Afternoon, Malak ☀️';
    return 'Good Evening, Malak 🌙';
  };

  const getEncouragement = () => {
    if (total === 0) return "Hey Malak! Create your first task and start crushing your goals! 🚀";
    if (completionRate === 100) return "Incredible Malak! You've crushed every single task. 🎉";
    if (completionRate >= 75) return "Amazing work Malak! Almost there, keep the momentum going. 💪";
    if (completionRate >= 50) return "Great progress Malak! Halfway through, you got this. 🏃";
    if (completionRate > 0) return "Nice start Malak! Keep ticking those items off your list. 👍";
    return "Let's go Malak! Complete at least one task today. 💥";
  };

  return (
    <div className="glass-card p-5 mb-5 animate-fade-in" style={{ animationDelay: '0.1s', backdropFilter: 'blur(16px)' }}>
      <div className="row align-items-center g-4">
        {/* Welcome Section */}
        <div className="col-lg-6 mb-4 mb-lg-0 text-start">
          <h2 className="fw-bold mb-2" style={{ color: 'var(--text-primary)', fontSize: '1.8rem' }}>{getGreeting()}</h2>
          <p className="text-secondary mb-4" style={{ fontSize: '1rem', lineHeight: '1.6' }}>{getEncouragement()}</p>
          
          <div className="d-flex align-items-center gap-3">
            <div className="flex-grow-1">
              <div className="d-flex justify-content-between mb-2 small text-muted">
                <span className="fw-semibold">Overall Completion</span>
                <span className="fw-bold text-primary" style={{ fontSize: '1.1rem' }}>{completionRate}%</span>
              </div>
              <div className="progress dashboard-progress" style={{ height: '10px', borderRadius: '6px' }}>
                <div
                  className="progress-bar rounded-3"
                  role="progressbar"
                  style={{
                    width: `${completionRate}%`,
                    background: 'var(--primary-gradient)',
                    transition: 'width 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)'
                  }}
                  aria-valuenow={completionRate}
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Panel */}
        <div className="col-lg-6">
          <div className="row g-3">
            {/* Total Tasks */}
            <div className="col-6 col-sm-3">
              <div className="p-4 rounded-4 text-center glass-card border-0" style={{ 
                backgroundColor: 'rgba(99, 102, 241, 0.12)',
                transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(99, 102, 241, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}>
                <div className="fs-3 fw-bold" style={{ color: '#6366f1' }}>{total}</div>
                <div className="small text-muted text-uppercase fw-bold" style={{ fontSize: '0.7rem', letterSpacing: '0.5px' }}>Total</div>
              </div>
            </div>

            {/* Active Tasks */}
            <div className="col-6 col-sm-3">
              <div className="p-4 rounded-4 text-center glass-card border-0" style={{ 
                backgroundColor: 'rgba(59, 130, 246, 0.12)',
                transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(59, 130, 246, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}>
                <div className="fs-3 fw-bold" style={{ color: '#3b82f6' }}>{active}</div>
                <div className="small text-muted text-uppercase fw-bold" style={{ fontSize: '0.7rem', letterSpacing: '0.5px' }}>Active</div>
              </div>
            </div>

            {/* Completed Tasks */}
            <div className="col-6 col-sm-3">
              <div className="p-4 rounded-4 text-center glass-card border-0" style={{ 
                backgroundColor: 'rgba(16, 185, 129, 0.12)',
                transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(16, 185, 129, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}>
                <div className="fs-3 fw-bold" style={{ color: '#10b981' }}>{completed}</div>
                <div className="small text-muted text-uppercase fw-bold" style={{ fontSize: '0.7rem', letterSpacing: '0.5px' }}>Completed</div>
              </div>
            </div>

            {/* High Priority / Urgent */}
            <div className="col-6 col-sm-3">
              <div className="p-4 rounded-4 text-center glass-card border-0" style={{ 
                backgroundColor: 'rgba(239, 68, 68, 0.12)',
                transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(239, 68, 68, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}>
                <div className="fs-3 fw-bold" style={{ color: '#ef4444' }}>{highPriority}</div>
                <div className="small text-muted text-uppercase fw-bold" style={{ fontSize: '0.7rem', letterSpacing: '0.5px' }}>Urgent</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
