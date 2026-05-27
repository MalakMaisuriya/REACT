import { LayoutDashboard, UtensilsCrossed, ShoppingBag, LogOut, ChefHat, Plus } from 'lucide-react';
import { imgSrc } from '../../constants/dashboard';

const Sidebar = ({
  user, activeTab, setActiveTab, sidebarOpen, setSidebarOpen,
  onOpenAddItem, onLogout, pendingCount,
}) => {
  const navItems = [
    { id: 'overview', label: 'Overview',        icon: <LayoutDashboard size={20} /> },
    { id: 'foods',    label: 'Menu Management', icon: <UtensilsCrossed size={20} /> },
    { id: 'addItem',  label: 'Add Item',         icon: <Plus size={20} />, highlight: true },
    { id: 'orders',   label: 'Orders',           icon: <ShoppingBag size={20} />, badge: pendingCount },
  ];

  const handleNav = (id) => id === 'addItem' ? onOpenAddItem() : setActiveTab(id);

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-brand">
          <ChefHat size={28} className="brand-icon" />
          {sidebarOpen && <span className="brand-name">Zomato Partner</span>}
        </div>
        <button className="sidebar-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
          <LayoutDashboard size={18} />
        </button>
      </div>

      {sidebarOpen && user && (
        <div className="sidebar-profile">
          <div className="profile-avatar">
            {user.image
              ? <img src={imgSrc(user.image)} alt={user.name} />
              : <div className="avatar-fallback">{user.name?.[0]?.toUpperCase()}</div>
            }
            <div className="online-dot" />
          </div>
          <div className="profile-info">
            <p className="profile-name">{user.name}</p>
            <p className="profile-role">Restaurant Partner</p>
          </div>
        </div>
      )}

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${activeTab === item.id ? 'active' : ''} ${item.highlight ? 'nav-item-highlight' : ''}`}
            onClick={() => handleNav(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            {sidebarOpen && (
              <>
                <span className="nav-label">{item.label}</span>
                {item.badge > 0 && <span className="nav-badge">{item.badge}</span>}
              </>
            )}
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button className="logout-btn" onClick={onLogout}>
          <LogOut size={20} />
          {sidebarOpen && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
