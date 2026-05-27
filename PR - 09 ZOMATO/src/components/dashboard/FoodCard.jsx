import { UtensilsCrossed, Eye, EyeOff, Edit3, Trash2 } from 'lucide-react';
import { BASE_IMG } from '../../constants/dashboard';

const FoodCard = ({ food, onDelete, onToggle, onEdit, compact }) => {
  const src = food.image?.startsWith('http') ? food.image : `${BASE_IMG}${food.image}`;

  return (
    <div className={`food-card ${compact ? 'compact' : ''} ${!food.isAvailable ? 'unavailable' : ''}`}>
      <div className="food-card-img">
        {food.image
          ? <img src={src} alt={food.title} />
          : <div className="food-img-placeholder"><UtensilsCrossed size={32} /></div>}
        <span className={`avail-badge ${food.isAvailable ? 'avail' : 'unavail'}`}>
          {food.isAvailable ? 'Available' : 'Unavailable'}
        </span>
      </div>
      <div className="food-card-body">
        <div className="food-cat-pill">{food.category}</div>
        <h4 className="food-title">{food.title}</h4>
        {!compact && <p className="food-desc">{food.description}</p>}
        <p className="food-price">Rs. {food.price}</p>
        <div className="food-actions">
          <button className="btn-icon sm" title="Toggle availability" aria-label="Toggle availability" onClick={() => onToggle(food)}>
            {food.isAvailable ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
          <button className="btn-icon sm" title="Edit" aria-label="Edit item" onClick={() => onEdit(food)}>
            <Edit3 size={16} />
          </button>
          <button className="btn-icon sm danger" title="Delete" aria-label="Delete item" onClick={() => onDelete(food._id, food.title)}>
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
