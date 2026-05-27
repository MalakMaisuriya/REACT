import Avatar from "./Avatar";
import { Link } from "react-router-dom";
//import { fullName } from "../utils";
import { fullName, mailTo } from "../utils/contactUtils";
import { useMemo } from "react";
 const ContactList = ({ contacts, q, favorites = [], setFavorites = () => {} }) => {
      
      const toggleFavorite = (id, e) => {
        e.preventDefault();
        setFavorites((prev) =>
          prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id],
        );
      };

      const handleEmail = (e, contact) => {
        e.preventDefault();
        window.location.href = mailTo(contact);
      };

      const filtered = useMemo(() => {
        const s = q.toLowerCase();
        return contacts.filter(c => fullName(c).toLowerCase().includes(s) || c.email.toLowerCase().includes(s) || c.phone.includes(s));
      }, [contacts, q]);

      const grouped = useMemo(() => {
        const g = {};
        [...filtered].sort((a,b) => fullName(a).localeCompare(fullName(b))).forEach(c => {
          const k = c.last[0].toUpperCase();
          (g[k] = g[k] || []).push(c);
        });
        return g;
      }, [filtered]);

      if (!filtered.length) return (
        <div className="empty-state">
          <i className="bi bi-search"></i>
          <h3>No results for "{q}"</h3>
          <p>Try a different name, email, or phone number.</p>
        </div>
      );

      return (
        <div className="page-contacts">
          <div className="contacts-toolbar">
            <h1>Contacts</h1>
            <span style={{fontSize:13, color:'var(--on-surface-variant)'}}>{filtered.length} contacts</span>
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
                      title={favorites.includes(c.id) ? "Remove from frequent" : "Add to frequent"}
                      onClick={(e) => toggleFavorite(c.id, e)}
                    >
                      <i className={`bi ${favorites.includes(c.id) ? 'bi-star-fill' : 'bi-star'}`}></i>
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
export default ContactList;