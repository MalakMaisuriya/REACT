import { Clock } from 'lucide-react';
import { imgSrc } from '../../constants/dashboard';

const TAB_TITLES = {
  overview: 'Dashboard Overview',
  foods:    'Menu Management',
  addItem:  'Add Menu Item',
  orders:   'Order Management',
};

const Topbar = ({ activeTab, user }) => (
  <header className="topbar">
    <div className="topbar-left">
      <h2 className="page-title">{TAB_TITLES[activeTab]}</h2>
    </div>
    <div className="topbar-right">
      <div className="topbar-time">
        <Clock size={16} />
        <span>
          {new Date().toLocaleDateString('en-IN', {
            weekday: 'short', day: 'numeric', month: 'short',
          })}
        </span>
      </div>
      <div className="topbar-avatar">
        {user?.image
          ? <img src={imgSrc(user.image)} alt={user?.name} />
          : <div className="avatar-fallback sm">{user?.name?.[0]?.toUpperCase()}</div>
        }
      </div>
    </div>
  </header>
);

export default Topbar;
