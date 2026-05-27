import { X, Upload, Loader2 } from 'lucide-react';
import { CATEGORIES } from '../../constants/dashboard';

const FoodModal = ({
  modal, foodForm, setFoodForm, foodPreview,
  handleFoodImageChange, handleFoodSubmit, submitting, onClose,
}) => {
  if (!modal) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{modal === 'add' ? 'Add Food Item' : 'Edit Food Item'}</h3>
          <button className="btn-icon" onClick={onClose}><X size={20} /></button>
        </div>

        {/* Image upload */}
        <div
          className="modal-img-upload"
          onClick={() => document.getElementById('food-img-input').click()}
        >
          {foodPreview
            ? <img src={foodPreview} alt="preview" />
            : <div className="modal-img-placeholder"><Upload size={28} /><span>Upload Image</span></div>
          }
          <input
            id="food-img-input"
            type="file"
            accept="image/*"
            onChange={handleFoodImageChange}
            hidden
          />
        </div>

        <form onSubmit={handleFoodSubmit} className="modal-form">
          <div className="form-row">
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                placeholder="Paneer Tikka"
                value={foodForm.title}
                onChange={(e) => setFoodForm({ ...foodForm, title: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Price (Rs.)</label>
              <input
                type="number"
                placeholder="220"
                value={foodForm.price}
                onChange={(e) => setFoodForm({ ...foodForm, price: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Category</label>
            <select
              value={foodForm.category}
              onChange={(e) => setFoodForm({ ...foodForm, category: e.target.value })}
            >
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              rows={3}
              placeholder="Describe the dish..."
              value={foodForm.description}
              onChange={(e) => setFoodForm({ ...foodForm, description: e.target.value })}
            />
          </div>

          <div className="form-check">
            <input
              type="checkbox"
              id="isAvailable"
              checked={foodForm.isAvailable}
              onChange={(e) => setFoodForm({ ...foodForm, isAvailable: e.target.checked })}
            />
            <label htmlFor="isAvailable">Available on menu</label>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-outline" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary" disabled={submitting}>
              {submitting
                ? <><Loader2 size={16} className="spin" /> Saving...</>
                : modal === 'add' ? 'Add Item' : 'Save Changes'
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FoodModal;
