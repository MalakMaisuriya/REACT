const StatCard = ({ icon, label, value, color, trend }) => (
  <div className={`stat-card stat-${color}`}>
    <div className="stat-icon">{icon}</div>
    <div className="stat-body">
      <p className="stat-label">{label}</p>
      <p className="stat-value">{value}</p>
      <p className="stat-trend">{trend}</p>
    </div>
  </div>
);

export default StatCard;
