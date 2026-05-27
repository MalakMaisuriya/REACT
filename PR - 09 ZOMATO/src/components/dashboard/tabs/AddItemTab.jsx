import { Plus, ImagePlus, CheckCircle, Loader2 } from 'lucide-react';
import { CATEGORIES } from '../../../constants/dashboard';
import api from '../../../api/axiosInstance';
import toast from 'react-hot-toast';

const AddItemTab = ({
  foodForm, setFoodForm, foodImage, foodPreview,
  handleFoodImageChange, submitting, setSubmitting,
  fetchFoods, setFoodImage, setFoodPreview, setActiveTab,
}) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!foodForm.title || !foodForm.price) return toast.error('Title and price are required');
    setSubmitting(true);
    const fd = new FormData();
    Object.entries(foodForm).forEach(([k, v]) => fd.append(k, v));
    if (foodImage) fd.append('image', foodImage);
    try {
      await api.post('/foods', fd);
      toast.success('Food item added');
      setFoodForm({ title: '', price: '', category: 'Starter', description: '', isAvailable: true });
      setFoodImage(null);
      setFoodPreview(null);
      fetchFoods();
      setActiveTab('foods');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="add-item-page">
      <div className="add-item-card">
        <div className="add-item-header">
          <div className="add-item-icon-wrap"><Plus size={22} /></div>
          <div>
            <h3>Add New Menu Item</h3>
            <p>Fill in the details below to add a new dish to your menu</p>
          </div>
        </div>

        {/* Image Upload */}
        <div
          className="add-item-img-upload"
          onClick={() => document.getElementById('add-item-img').click()}
        >
          {foodPreview
            ? <img src={foodPreview} alt="preview" />
            : (
              <div className="add-item-img-placeholder">
                <ImagePlus size={36} />
                <span>Click to upload dish photo</span>
                <small>JPG, PNG - max 5 MB</small>
              </div>
            )
          }
          {foodPreview && (
            <div className="add-item-img-overlay">
              <ImagePlus size={20} />
              <span>Change photo</span>
            </div>
          )}
          <input id="add-item-img" type="file" accept="image/*" onChange={handleFoodImageChange} hidden />
        </div>

        <form onSubmit={handleSubmit} className="add-item-form">
          <div className="add-item-grid">
            <div className="add-form-group">
              <label>Dish Name *</label>
              <input
                type="text"
                placeholder="e.g. Paneer Tikka"
                value={foodForm.title}
                onChange={(e) => setFoodForm({ ...foodForm, title: e.target.value })}
              />
            </div>
            <div className="add-form-group">
              <label>Price (Rs.) *</label>
              <input
                type="number" min="0"
                placeholder="e.g. 220"
                value={foodForm.price}
                onChange={(e) => setFoodForm({ ...foodForm, price: e.target.value })}
              />
            </div>
            <div className="add-form-group">
              <label>Category</label>
              <select
                value={foodForm.category}
                onChange={(e) => setFoodForm({ ...foodForm, category: e.target.value })}
              >
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="add-form-group">
              <label>Availability</label>
              <div
                className={`avail-toggle ${foodForm.isAvailable ? 'on' : 'off'}`}
                onClick={() => setFoodForm({ ...foodForm, isAvailable: !foodForm.isAvailable })}
              >
                <div className="avail-toggle-knob" />
                <span>{foodForm.isAvailable ? 'Available' : 'Unavailable'}</span>
              </div>
            </div>
          </div>

          <div className="add-form-group full">
            <label>Description</label>
            <textarea
              rows={4}
              placeholder="Describe the dish - ingredients, taste, special notes..."
              value={foodForm.description}
              onChange={(e) => setFoodForm({ ...foodForm, description: e.target.value })}
            />
          </div>

          <div className="add-item-actions">
            <button type="button" className="btn-outline" onClick={() => setActiveTab('foods')}>
              Cancel
            </button>
            <button type="submit" className="btn-primary" disabled={submitting}>
              {submitting
                ? <><Loader2 size={18} className="spin" /> Adding Item...</>
                : <><CheckCircle size={18} /> Add to Menu</>
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItemTab;
