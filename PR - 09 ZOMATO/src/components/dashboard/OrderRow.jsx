import { useState } from 'react';
import { Package, Loader2 } from 'lucide-react';
import { STATUS_COLORS, ORDER_STATUSES, statusLabel } from '../../constants/dashboard';

const OrderRow = ({ order, onStatusChange, compact }) => {
  const [updating, setUpdating] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleChange = async (e) => {
    setUpdating(true);
    await onStatusChange(order._id, e.target.value);
    setUpdating(false);
  };

  return (
    <div className={`order-row ${compact ? 'compact' : ''}`}>
      <div className="order-row-main" onClick={() => !compact && setExpanded(!expanded)}>
        <div className="order-id">
          <Package size={16} />
          <span>#{order._id.slice(-6).toUpperCase()}</span>
        </div>
        <div className="order-address">{order.deliveryAddress}</div>
        <div className="order-amount">Rs. {order.totalAmount}</div>
        <div className="order-items-count">{order.items?.length} item(s)</div>
        <div className="order-status-wrapper">
          <div className="status-dot" style={{ background: STATUS_COLORS[order.status] }} />
          <span className="status-text" style={{ color: STATUS_COLORS[order.status] }}>
            {statusLabel(order.status)}
          </span>
        </div>
        {!compact && (
          <div className="order-actions" onClick={(e) => e.stopPropagation()}>
            <select
              value={order.status}
              onChange={handleChange}
              disabled={updating || ['delivered', 'cancelled'].includes(order.status)}
              className="status-select"
            >
              {ORDER_STATUSES.map((s) => (
                <option key={s} value={s}>{statusLabel(s)}</option>
              ))}
            </select>
            {updating && <Loader2 size={16} className="spin" />}
          </div>
        )}
      </div>

      {expanded && !compact && (
        <div className="order-items-detail">
          {order.items?.map((item, i) => (
            <div key={i} className="order-item-detail">
              <span>{item.foodId?.title || 'Item'}</span>
              <span>x{item.quantity}</span>
              <span>Rs. {item.price * item.quantity}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderRow;
