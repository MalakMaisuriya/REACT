import Avatar from "./Avatar";
import { Link } from "react-router-dom";
import { fullName, mailTo } from "../utils/contactUtils";
import { useMemo } from "react";

const FrequentPage = ({ contacts, favorites, setFavorites }) => {
  const frequentContacts = contacts.filter(c => favorites.includes(c.id));

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id],
    );
  };

  const handleEmail = (e, contact) => {
    e.preventDefault();
    window.location.href = mailTo(contact);
  };

  const grouped = useMemo(() => {
    const g = {};
    [...frequentContacts].sort((a, b) => fullName(a).localeCompare(fullName(b))).forEach(c => {
      const k = c.last[0].toUpperCase();
      (g[k] = g[k] || []).push(c);
    });
    return g;
  }, [frequentContacts]);

  if (!frequentContacts.length) {
    return (
      <div className="empty-state">
        <i className="bi bi-star"></i>
        <h3>No frequently contacted</h3>
        <p>People you favorite will appear here.</p>
      </div>
    );
  }

  return (
    <div className="page-contacts">
      <div className="contacts-toolbar">
        <h1>Frequently contacted</h1>
        <span style={{ fontSize: 13, color: 'var(--on-surface-variant)' }}>
          {frequentContacts.length} contacts
        </span>
        <button className="sort-btn"><i className="bi bi-sort-alpha-down"></i> Name</button>
      </div>
      {Object.keys(grouped).sort().map(letter => (
        <div className="alpha-section" key={letter}>
          <div className="alpha-header">{letter}</div>
          {grouped[letter].map(c => (
            <Link to={`/contact/${c.id}`} key={c.id} className="contact-row">
              <Avatar contact={c} />
              <div className="info">
                <div className="name">{fullName(c)}</div>
                <div className="sub">{c.email}</div>
              </div>
              <div className="row-actions">
                <button 
                  className="icon-btn" 
                  title="Remove from frequent"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleFavorite(c.id);
                  }}
                >
                  <i className="bi bi-star-fill"></i>
                </button>
                <button className="icon-btn" title="Email" onClick={(e) => handleEmail(e, c)}><i className="bi bi-envelope"></i></button>
                <button className="icon-btn" title="Call" onClick={e=>e.preventDefault()}><i className="bi bi-telephone"></i></button>
                <button className="icon-btn" title="More" onClick={e=>e.preventDefault()}><i className="bi bi-three-dots-vertical"></i></button>
              </div>
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
};

export default FrequentPage;
