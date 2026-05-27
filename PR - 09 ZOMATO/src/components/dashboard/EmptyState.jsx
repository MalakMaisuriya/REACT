const EmptyState = ({ icon, text, sub }) => (
  <div className="empty-state">
    <div className="empty-icon">{icon}</div>
    <p className="empty-text">{text}</p>
    {sub && <p className="empty-sub">{sub}</p>}
  </div>
);

export default EmptyState;
