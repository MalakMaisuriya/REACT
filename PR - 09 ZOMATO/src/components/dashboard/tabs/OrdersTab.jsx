import { Filter, RefreshCw, Loader2, Package } from 'lucide-react';
import OrderRow from '../OrderRow';
import EmptyState from '../EmptyState';
import { ORDER_STATUSES, statusLabel } from '../../../constants/dashboard';

const OrdersTab = ({
  orders, orderLoading, orderStatus, setOrderStatus,
  orderPage, setOrderPage, orderMeta, fetchOrders, handleUpdateOrderStatus,
}) => (
  <>
    <div className="tab-toolbar">
      <div className="filter-bar">
        <Filter size={16} />
        <select
          value={orderStatus}
          onChange={(e) => { setOrderStatus(e.target.value); setOrderPage(1); }}
        >
          <option value="">All Statuses</option>
          {ORDER_STATUSES.map((s) => (
            <option key={s} value={s}>{statusLabel(s)}</option>
          ))}
        </select>
      </div>
      <button className="btn-icon" onClick={fetchOrders}><RefreshCw size={18} /></button>
      <span className="meta-info">{orderMeta.total} total orders</span>
    </div>

    {orderLoading ? (
      <div className="loading-state"><Loader2 size={32} className="spin" /><p>Loading orders...</p></div>
    ) : (
      <>
        <div className="orders-list">
          {orders.map((order) => (
            <OrderRow key={order._id} order={order} onStatusChange={handleUpdateOrderStatus} />
          ))}
          {orders.length === 0 && (
            <EmptyState icon={<Package size={56} />} text="No orders found" sub="Orders will appear here" />
          )}
        </div>
        {orderMeta.pages > 1 && (
          <div className="pagination">
            <button disabled={orderPage <= 1} onClick={() => setOrderPage((p) => p - 1)}>Prev</button>
            <span>Page {orderPage} of {orderMeta.pages}</span>
            <button disabled={orderPage >= orderMeta.pages} onClick={() => setOrderPage((p) => p + 1)}>Next</button>
          </div>
        )}
      </>
    )}
  </>
);

export default OrdersTab;
