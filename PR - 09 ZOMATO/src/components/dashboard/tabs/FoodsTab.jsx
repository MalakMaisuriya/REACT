import { Search, Filter, Plus, RefreshCw, Loader2, UtensilsCrossed } from 'lucide-react';
import FoodCard from '../FoodCard';
import EmptyState from '../EmptyState';
import { CATEGORIES } from '../../../constants/dashboard';

const FoodsTab = ({
  foods, foodLoading, foodSearch, setFoodSearch,
  foodCategory, setFoodCategory, fetchFoods,
  handleDeleteFood, handleToggleAvailable, openEditModal, openAddModal,
}) => (
  <>
    <div className="tab-toolbar">
      <div className="search-bar">
        <Search size={18} />
        <input
          placeholder="Search menu items..."
          value={foodSearch}
          onChange={(e) => setFoodSearch(e.target.value)}
        />
      </div>
      <div className="filter-bar">
        <Filter size={16} />
        <select value={foodCategory} onChange={(e) => setFoodCategory(e.target.value)}>
          <option value="">All Categories</option>
          {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
        </select>
      </div>
      <button className="btn-primary sm" onClick={openAddModal}>
        <Plus size={18} /> Add Item
      </button>
      <button className="btn-icon" onClick={fetchFoods}><RefreshCw size={18} /></button>
    </div>

    {foodLoading ? (
      <div className="loading-state"><Loader2 size={32} className="spin" /><p>Loading menu...</p></div>
    ) : (
      <>
        <div className="food-grid">
          {foods.map((food) => (
            <FoodCard
              key={food._id} food={food}
              onDelete={handleDeleteFood}
              onToggle={handleToggleAvailable}
              onEdit={openEditModal}
            />
          ))}
        </div>
        {foods.length === 0 && (
          <div className="full-empty">
            <EmptyState icon={<UtensilsCrossed size={56} />} text="No food items found" sub="Add your first menu item" />
            <button className="btn-primary" onClick={openAddModal}>
              <Plus size={18} /> Add Food Item
            </button>
          </div>
        )}
      </>
    )}
  </>
);

export default FoodsTab;
