import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout, fetchMe } from '../redux/authSlice';
import api from '../api/axiosInstance';
import toast from 'react-hot-toast';

const DEFAULT_FOOD_FORM = {
  title: '', price: '', category: 'Starter', description: '', isAvailable: true,
};

const useDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((s) => s.auth);

  // ── UI State ──────────────────────────────────────────────────────────────
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // ── Foods ─────────────────────────────────────────────────────────────────
  const [foods, setFoods] = useState([]);
  const [foodLoading, setFoodLoading] = useState(false);
  const [foodSearch, setFoodSearch] = useState('');
  const [foodCategory, setFoodCategory] = useState('');

  // ── Orders ────────────────────────────────────────────────────────────────
  const [orders, setOrders] = useState([]);
  const [orderLoading, setOrderLoading] = useState(false);
  const [orderStatus, setOrderStatus] = useState('');
  const [orderPage, setOrderPage] = useState(1);
  const [orderMeta, setOrderMeta] = useState({ total: 0, pages: 1 });

  // ── Food Modal (add/edit) ─────────────────────────────────────────────────
  const [modal, setModal] = useState(null); // null | 'add' | 'edit'
  const [editFood, setEditFood] = useState(null);
  const [foodForm, setFoodForm] = useState(DEFAULT_FOOD_FORM);
  const [foodImage, setFoodImage] = useState(null);
  const [foodPreview, setFoodPreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // ── Delete Confirmation ───────────────────────────────────────────────────
  const [deleteTarget, setDeleteTarget] = useState(null); // { id, title }
  const [deleting, setDeleting] = useState(false);

  // ── Fetch on mount ────────────────────────────────────────────────────────
  // ── API: Foods ────────────────────────────────────────────────────────────
  const fetchFoods = useCallback(async () => {
    setFoodLoading(true);
    try {
      const res = await api.get('/foods', {
        params: { search: foodSearch || undefined, category: foodCategory || undefined },
      });
      setFoods(res.data.data || []);
    } catch (e) { toast.error(e.message); }
    finally { setFoodLoading(false); }
  }, [foodCategory, foodSearch]);

  const handleToggleAvailable = async (food) => {
    const fd = new FormData();
    fd.append('isAvailable', !food.isAvailable);
    try {
      await api.put(`/foods/${food._id}`, fd);
      toast.success(`Marked as ${!food.isAvailable ? 'available' : 'unavailable'}`);
      fetchFoods();
    } catch (e) { toast.error(e.message); }
  };

  const handleDeleteFood = (id, title) => setDeleteTarget({ id, title });

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await api.delete(`/foods/${deleteTarget.id}`);
      toast.success('Food item deleted successfully');
      fetchFoods();
      setDeleteTarget(null);
    } catch (e) { toast.error(e.message); }
    finally { setDeleting(false); }
  };

  // ── API: Orders ───────────────────────────────────────────────────────────
  const fetchOrders = useCallback(async () => {
    setOrderLoading(true);
    try {
      const res = await api.get('/orders', {
        params: { status: orderStatus || undefined, page: orderPage, limit: 8 },
      });
      setOrders(res.data.data || []);
      setOrderMeta({ total: res.data.total || 0, pages: res.data.pages || 1 });
    } catch (e) { toast.error(e.message); }
    finally { setOrderLoading(false); }
  }, [orderPage, orderStatus]);

  useEffect(() => {
    dispatch(fetchMe());
  }, [dispatch]);

  useEffect(() => {
    void Promise.resolve().then(fetchFoods);
  }, [fetchFoods]);

  useEffect(() => {
    void Promise.resolve().then(fetchOrders);
  }, [fetchOrders]);

  const handleUpdateOrderStatus = async (orderId, status) => {
    try {
      await api.put(`/orders/${orderId}/status`, { status });
      toast.success('Order status updated');
      fetchOrders();
    } catch (e) { toast.error(e.message); }
  };

  // ── Modal Helpers ─────────────────────────────────────────────────────────
  const openAddModal = () => {
    setFoodForm(DEFAULT_FOOD_FORM);
    setFoodImage(null); setFoodPreview(null); setEditFood(null);
    setModal('add');
  };

  const openEditModal = (food) => {
    setFoodForm({
      title: food.title, price: food.price,
      category: food.category, description: food.description,
      isAvailable: food.isAvailable,
    });
    setFoodPreview(food.image?.startsWith('http') ? food.image : `https://zomato-clone-api-5e4m.onrender.com${food.image}`);
    setFoodImage(null); setEditFood(food); setModal('edit');
  };

  const closeModal = () => { setModal(null); setEditFood(null); };

  const handleFoodImageChange = (e) => {
    const file = e.target.files[0];
    if (file) { setFoodImage(file); setFoodPreview(URL.createObjectURL(file)); }
  };

  const handleFoodSubmit = async (e) => {
    e.preventDefault();
    if (!foodForm.title || !foodForm.price) return toast.error('Title and price are required');
    setSubmitting(true);
    const fd = new FormData();
    Object.entries(foodForm).forEach(([k, v]) => fd.append(k, v));
    if (foodImage) fd.append('image', foodImage);
    try {
      if (modal === 'add') {
        await api.post('/foods', fd);
        toast.success('Food item added');
      } else {
        await api.put(`/foods/${editFood._id}`, fd);
        toast.success('Food item updated!');
      }
      closeModal(); fetchFoods();
    } catch (e) { toast.error(e.message); }
    finally { setSubmitting(false); }
  };

  // ── Add Item Tab helpers ───────────────────────────────────────────────────
  const openAddItemTab = () => {
    setFoodForm(DEFAULT_FOOD_FORM);
    setFoodImage(null); setFoodPreview(null); setEditFood(null);
    setActiveTab('addItem');
  };

  // ── Auth ──────────────────────────────────────────────────────────────────
  const handleLogout = () => {
    dispatch(logout());
    toast.success('Logged out successfully');
    navigate('/login');
  };

  // ── Derived stats ─────────────────────────────────────────────────────────
  const totalRevenue = orders
    .filter((o) => o.status === 'delivered')
    .reduce((s, o) => s + o.totalAmount, 0);
  const pendingCount   = orders.filter((o) => o.status === 'pending').length;
  const deliveredCount = orders.filter((o) => o.status === 'delivered').length;
  const availableFoods = foods.filter((f) => f.isAvailable).length;

  return {
    // user / auth
    user, handleLogout,
    // ui
    activeTab, setActiveTab, sidebarOpen, setSidebarOpen,
    // foods
    foods, foodLoading, foodSearch, setFoodSearch, foodCategory, setFoodCategory,
    fetchFoods, handleDeleteFood, handleToggleAvailable,
    // orders
    orders, orderLoading, orderStatus, setOrderStatus,
    orderPage, setOrderPage, orderMeta, fetchOrders, handleUpdateOrderStatus,
    // modal
    modal, foodForm, setFoodForm, foodImage, foodPreview,
    submitting, handleFoodImageChange, handleFoodSubmit,
    openAddModal, openEditModal, closeModal,
    // delete
    deleteTarget, setDeleteTarget, deleting, confirmDelete,
    // add-item tab
    openAddItemTab,
    // stats
    totalRevenue, pendingCount, deliveredCount, availableFoods,
  };
};

export default useDashboard;
