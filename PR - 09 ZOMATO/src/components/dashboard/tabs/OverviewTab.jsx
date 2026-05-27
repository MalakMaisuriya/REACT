import { IndianRupee, ShoppingBag, AlertCircle, UtensilsCrossed } from 'lucide-react';
import StatCard from '../StatCard';
import FoodCard from '../FoodCard';
import OrderRow from '../OrderRow';
import EmptyState from '../EmptyState';

const OverviewTab = ({
  totalRevenue, pendingCount, deliveredCount, availableFoods,
  foods, orders, orderMeta,
  handleDeleteFood, handleToggleAvailable, openEditModal,
  handleUpdateOrderStatus, setActiveTab,
}) => (
  <>
    <div className="stats-grid">
      <StatCard icon={<IndianRupee size={24} />} label="Revenue (Delivered)" value={`Rs. ${totalRevenue.toLocaleString()}`} color="green" trend="+12.5%" />
      <StatCard icon={<ShoppingBag size={24} />} label="Total Orders" value={orderMeta.total} color="blue" trend={`${deliveredCount} delivered`} />
      <StatCard icon={<AlertCircle size={24} />} label="Pending Orders" value={pendingCount} color="amber" trend="Needs attention" />
      <StatCard icon={<UtensilsCrossed size={24} />} label="Menu Items" value={`${availableFoods}/${foods.length}`} color="purple" trend="available" />
    </div>

    {/* Recent Orders */}
    <div className="section-card">
      <div className="section-card-header">
        <h3>Recent Orders</h3>
        <button className="btn-outline" onClick={() => setActiveTab('orders')}>View All</button>
      </div>
      {orders.slice(0, 5).map((order) => (
        <OrderRow key={order._id} order={order} onStatusChange={handleUpdateOrderStatus} compact />
      ))}
      {orders.length === 0 && <EmptyState icon={<ShoppingBag size={40} />} text="No orders yet" />}
    </div>

    {/* Menu Highlights */}
    <div className="section-card">
      <div className="section-card-header">
        <h3>Menu Highlights</h3>
        <button className="btn-outline" onClick={() => setActiveTab('foods')}>Manage Menu</button>
      </div>
      <div className="food-preview-grid">
        {foods.slice(0, 4).map((food) => (
          <FoodCard
            key={food._id} food={food} compact
            onDelete={handleDeleteFood}
            onToggle={handleToggleAvailable}
            onEdit={openEditModal}
          />
        ))}
      </div>
      {foods.length === 0 && <EmptyState icon={<UtensilsCrossed size={40} />} text="No menu items yet" />}
    </div>
  </>
);

export default OverviewTab;
