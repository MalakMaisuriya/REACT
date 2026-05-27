import React, { useState, useEffect } from 'react';
import { api } from './services/api';
import StatsDashboard from './components/StatsDashboard';
import TaskCard from './components/TaskCard';
import TaskModal from './components/TaskModal';
import ToastNotification from './components/ToastNotification';

export default function App() {
  // Theme state
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  // Tasks and Loading states
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modals & toast states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [toast, setToast] = useState(null);

  // Filters & Sorting states
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [sortBy, setSortBy] = useState('dueDateAsc');

  // Sync theme to root html document tag
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('data-bs-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Load tasks on mount
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.fetchTasks();
      setTasks(data);
    } catch (err) {
      setError(err.message || 'Could not fetch tasks. Is the backend server running?');
      showToast('danger', 'Failed to load tasks. Make sure JSON Server is running.');
    } finally {
      setLoading(false);
    }
  };

  const showToast = (type, message) => {
    setToast({ type, message });
  };

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // CRUD Actions
  const handleCreateOrUpdateTask = async (taskData) => {
    try {
      if (taskToEdit) {
        // Edit Mode
        const updated = await api.updateTask(taskToEdit.id, taskData);
        setTasks(prev => prev.map(t => (t.id === updated.id ? updated : t)));
        showToast('success', `Task "${updated.title}" updated successfully!`);
      } else {
        // Create Mode
        const created = await api.createTask({
          ...taskData,
          status: 'Pending'
        });
        setTasks(prev => [created, ...prev]);
        showToast('success', `Task "${created.title}" created successfully!`);
      }
      setIsModalOpen(false);
      setTaskToEdit(null);
    } catch (err) {
      showToast('danger', `Operation failed: ${err.message}`);
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      const updated = await api.updateTask(taskId, { status: newStatus });
      setTasks(prev => prev.map(t => (t.id === taskId ? updated : t)));
      showToast('success', `Task status updated to "${newStatus}".`);
    } catch (err) {
      showToast('danger', `Failed to update status: ${err.message}`);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await api.deleteTask(taskId);
        setTasks(prev => prev.filter(t => t.id !== taskId));
        showToast('warning', 'Task has been deleted.');
      } catch (err) {
        showToast('danger', `Failed to delete task: ${err.message}`);
      }
    }
  };

  const handleEditClick = (task) => {
    setTaskToEdit(task);
    setIsModalOpen(true);
  };

  const handleAddNewClick = () => {
    setTaskToEdit(null);
    setIsModalOpen(true);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setStatusFilter('All');
    setPriorityFilter('All');
    setCategoryFilter('All');
    setSortBy('dueDateAsc');
  };

  // Client-side filtering
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = 
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' ? true : task.status === statusFilter;
    const matchesPriority = priorityFilter === 'All' ? true : task.priority === priorityFilter;
    const matchesCategory = categoryFilter === 'All' ? true : task.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
  });

  // Client-side sorting
  const priorityWeights = { High: 3, Medium: 2, Low: 1 };
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === 'dueDateAsc') {
      return new Date(a.dueDate) - new Date(b.dueDate);
    }
    if (sortBy === 'dueDateDesc') {
      return new Date(b.dueDate) - new Date(a.dueDate);
    }
    if (sortBy === 'priorityHighToLow') {
      return priorityWeights[b.priority] - priorityWeights[a.priority];
    }
    if (sortBy === 'priorityLowToHigh') {
      return priorityWeights[a.priority] - priorityWeights[b.priority];
    }
    if (sortBy === 'dateCreatedNewest') {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    if (sortBy === 'dateCreatedOldest') {
      return new Date(a.createdAt) - new Date(b.createdAt);
    }
    return 0;
  });

  return (
    <div className="app-container">
      {/* Top Header Row */}
      <header className="d-flex justify-content-between align-items-center mb-5 animate-fade-in pt-3">
        <div className="text-start">
          <div className="d-flex align-items-center gap-3 mb-2">
            <h1 className="fw-bold m-0 text-gradient fs-2" style={{ 
              background: 'var(--primary-gradient)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.5px',
              fontFamily: 'Outfit'
            }}>
              Malak's Tasks 📝
            </h1>
            <span className="badge bg-primary bg-opacity-10 text-primary border border-primary border-opacity-10 rounded-pill px-3 py-2 small fw-bold">
              v1.0.0
            </span>
          </div>
          <p className="text-muted m-0 small">Your personal task management hub - Stay organized, stay productive</p>
        </div>

        <div className="d-flex align-items-center gap-3">
          {/* Light/Dark mode Toggle */}
          <button
            className="btn btn-outline-secondary border-0 rounded-circle d-flex align-items-center justify-content-center glass-card"
            onClick={toggleTheme}
            style={{ 
              width: '48px', 
              height: '48px', 
              padding: 0,
              transition: 'all 0.3s ease'
            }}
            title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
          >
            <i className={`bi fs-5 ${theme === 'light' ? 'bi-moon-stars-fill text-dark' : 'bi-sun-fill text-warning'}`}></i>
          </button>
        </div>
      </header>

      {/* Stats Dashboard */}
      {!loading && !error && <StatsDashboard tasks={tasks} />}

      {/* Filters, Controls & Search Panel */}
      <section className="glass-card p-5 mb-5 animate-fade-in" style={{ animationDelay: '0.2s', backdropFilter: 'blur(16px)' }}>
        <div className="row g-4">
          {/* Search Input */}
          <div className="col-12 col-lg-5 text-start">
            <label className="form-label small fw-bold text-muted mb-2">🔍 Search Tasks</label>
            <div className="input-group">
              <span className="input-group-text glass-input border-end-0 bg-transparent" style={{ borderLeft: 'none' }}>
                <i className="bi bi-search text-muted"></i>
              </span>
              <input
                type="text"
                className="form-control glass-input border-start-0 ps-2"
                placeholder="Search by title or details..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Status Filter */}
          <div className="col-6 col-sm-4 col-lg-2 text-start">
            <label className="form-label small fw-bold text-muted mb-2">⏳ Status</label>
            <select
              className="form-select glass-input"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Pending">⏳ Pending</option>
              <option value="In Progress">⚡ In Progress</option>
              <option value="Completed">✅ Completed</option>
            </select>
          </div>

          {/* Priority Filter */}
          <div className="col-6 col-sm-4 col-lg-1.5 text-start">
            <label className="form-label small fw-bold text-muted mb-2">🔥 Priority</label>
            <select
              className="form-select glass-input"
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
            >
              <option value="All">All Priorities</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          {/* Category Filter */}
          <div className="col-6 col-sm-4 col-lg-1.5 text-start">
            <label className="form-label small fw-bold text-muted mb-2">📁 Category</label>
            <select
              className="form-select glass-input"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="All">All Categories</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Shopping">Shopping</option>
              <option value="Health">Health</option>
              <option value="Finance">Finance</option>
            </select>
          </div>

          {/* Sorting */}
          <div className="col-6 col-lg-1.5 text-start">
            <label className="form-label small fw-bold text-muted mb-2">📅 Sort By</label>
            <select
              className="form-select glass-input"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="dueDateAsc">📅 Due Date (Asc)</option>
              <option value="dueDateDesc">📅 Due Date (Desc)</option>
              <option value="priorityHighToLow">🔥 Priority (High-Low)</option>
              <option value="priorityLowToHigh">❄️ Priority (Low-High)</option>
              <option value="dateCreatedNewest">⏳ Newest Created</option>
              <option value="dateCreatedOldest">⏳ Oldest Created</option>
            </select>
          </div>
        </div>

        <div className="d-flex justify-content-between align-items-center mt-5 pt-4 border-top border-opacity-10">
          <div className="text-secondary small fw-semibold">
            Found <strong style={{ color: '#6366f1', fontSize: '1.1rem' }}>{sortedTasks.length}</strong> tasks
          </div>
          <div className="d-flex gap-2 flex-wrap">
            {(searchQuery || statusFilter !== 'All' || priorityFilter !== 'All' || categoryFilter !== 'All') && (
              <button className="btn btn-sm btn-outline-secondary rounded-pill border-opacity-25" onClick={clearFilters}>
                <i className="bi bi-x-circle me-1"></i> Clear Filters
              </button>
            )}
            <button className="btn btn-sm btn-gradient-primary d-flex align-items-center gap-1 py-2 px-4 rounded-pill fw-bold" onClick={handleAddNewClick}>
              <i className="bi bi-plus-lg"></i> Add New Task
            </button>
          </div>
        </div>
      </section>

      {/* Task List Grid Section */}
      <main className="position-relative min-vh-50">
        {loading && (
          <div className="text-center py-5 my-5">
            <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3 text-secondary">Loading tasks from JSON-Server...</p>
          </div>
        )}

        {error && (
          <div className="glass-card p-5 text-center my-4 border-danger border-opacity-25 bg-danger bg-opacity-5">
            <i className="bi bi-exclamation-triangle text-danger display-4 mb-3"></i>
            <h4 className="fw-bold text-danger">Connection Error</h4>
            <p className="text-secondary max-width-500 mx-auto mb-4">{error}</p>
            <button className="btn btn-primary px-4" onClick={loadTasks}>
              <i className="bi bi-arrow-clockwise me-1"></i> Try Reconnecting
            </button>
          </div>
        )}

        {!loading && !error && (
          <>
            {sortedTasks.length === 0 ? (
              <div className="glass-card p-5 text-center my-4 py-5 animate-fade-in">
                <i className="bi bi-inbox text-muted display-4 mb-3 d-block"></i>
                <h5 className="fw-semibold text-secondary">No Tasks Found</h5>
                <p className="text-muted small mb-4">Try refining your search queries or category selectors.</p>
                <button className="btn btn-gradient-primary px-4 rounded-3" onClick={handleAddNewClick}>
                  <i className="bi bi-plus-lg me-1"></i> Create a Task
                </button>
              </div>
            ) : (
              <div className="row g-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                {sortedTasks.map(task => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onStatusChange={handleStatusChange}
                    onEdit={handleEditClick}
                    onDelete={handleDeleteTask}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </main>

      {/* Modal Dialog */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setTaskToEdit(null);
        }}
        onSubmit={handleCreateOrUpdateTask}
        taskToEdit={taskToEdit}
      />

      {/* Toast Alerts Notification */}
      <ToastNotification
        toast={toast}
        onClose={() => setToast(null)}
      />
    </div>
  );
}
