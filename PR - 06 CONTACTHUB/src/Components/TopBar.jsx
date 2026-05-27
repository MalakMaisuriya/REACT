import { Link, useNavigate } from "react-router";

const TopBar = ({ q, setQ }) => {
      const nav = useNavigate();
      return (
        <div className="topbar">
          <Link to="/" className="logo" style={{textDecoration:'none', color:'inherit', display:'flex', alignItems:'center', gap:8, minWidth:'calc(var(--sidebar-width) - 32px)'}}>
            <svg height="28" viewBox="0 0 75 24" xmlns="http://www.w3.org/2000/svg">
              <text y="20" fontFamily="'Google Sans',sans-serif" fontSize="22" fill="#5f6368">Contacts</text>
            </svg>
          </Link>
          <div className="search-wrap">
            <i className="bi bi-search"></i>
            <input className="search-input" placeholder="Search" value={q} onChange={e => setQ(e.target.value)} />
          </div>
          <div className="topbar-actions">
            <button className="icon-btn" title="Help"><i className="bi bi-question-circle"></i></button>
            <button className="icon-btn" title="Settings"><i className="bi bi-gear"></i></button>
            <button className="icon-btn" title="Apps"><i className="bi bi-grid-3x3-gap"></i></button>
            <button className="avatar-btn">MK</button>
          </div>
        </div>
      );
    };

    export default TopBar;