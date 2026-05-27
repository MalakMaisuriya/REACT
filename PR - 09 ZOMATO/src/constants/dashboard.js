export const BASE_IMG = 'https://zomato-clone-api-5e4m.onrender.com';

export const CATEGORIES = ['Starter', 'Main Course', 'Dessert', 'Beverages', 'Snacks', 'Other'];

export const ORDER_STATUSES = [
  'pending', 'confirmed', 'preparing', 'out_for_delivery', 'delivered', 'cancelled',
];

export const STATUS_COLORS = {
  pending:          '#f59e0b',
  confirmed:        '#3b82f6',
  preparing:        '#8b5cf6',
  out_for_delivery: '#06b6d4',
  delivered:        '#22c55e',
  cancelled:        '#ef4444',
};

export const imgSrc = (path) =>
  path?.startsWith('http') ? path : `${BASE_IMG}${path}`;

export const statusLabel = (s) =>
  s.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
