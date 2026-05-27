const PlaceholderPage = ({ icon, title, desc }) => (
      <div className="empty-state">
        <i className={`bi ${icon}`}></i>
        <h3>{title}</h3>
        <p>{desc}</p>
      </div>
    );

    export default PlaceholderPage;