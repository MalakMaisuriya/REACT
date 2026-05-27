import useDashboard from '../hooks/useDashboard';
import Sidebar     from '../components/dashboard/Sidebar';
import Topbar      from '../components/dashboard/Topbar';
import DeleteModal from '../components/dashboard/DeleteModal';
import FoodModal   from '../components/dashboard/FoodModal';
import OverviewTab from '../components/dashboard/tabs/OverviewTab';
import FoodsTab    from '../components/dashboard/tabs/FoodsTab';
import AddItemTab  from '../components/dashboard/tabs/AddItemTab';
import OrdersTab   from '../components/dashboard/tabs/OrdersTab';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const dash = useDashboard();

  return (
    <div className={`dashboard-layout ${dash.sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      {/* ── Sidebar ── */}
      <Sidebar
        user={dash.user}
        activeTab={dash.activeTab}
        setActiveTab={dash.setActiveTab}
        sidebarOpen={dash.sidebarOpen}
        setSidebarOpen={dash.setSidebarOpen}
        onOpenAddItem={dash.openAddItemTab}
        onLogout={dash.handleLogout}
        pendingCount={dash.pendingCount}
      />

      {/* ── Main ── */}
      <main className="main-content">
        <Topbar activeTab={dash.activeTab} user={dash.user} />

        <div className="content-body">
          {dash.activeTab === 'overview' && (
            <OverviewTab
              totalRevenue={dash.totalRevenue}
              pendingCount={dash.pendingCount}
              deliveredCount={dash.deliveredCount}
              availableFoods={dash.availableFoods}
              foods={dash.foods}
              orders={dash.orders}
              orderMeta={dash.orderMeta}
              handleDeleteFood={dash.handleDeleteFood}
              handleToggleAvailable={dash.handleToggleAvailable}
              openEditModal={dash.openEditModal}
              handleUpdateOrderStatus={dash.handleUpdateOrderStatus}
              setActiveTab={dash.setActiveTab}
            />
          )}

          {dash.activeTab === 'foods' && (
            <FoodsTab
              foods={dash.foods}
              foodLoading={dash.foodLoading}
              foodSearch={dash.foodSearch}
              setFoodSearch={dash.setFoodSearch}
              foodCategory={dash.foodCategory}
              setFoodCategory={dash.setFoodCategory}
              fetchFoods={dash.fetchFoods}
              handleDeleteFood={dash.handleDeleteFood}
              handleToggleAvailable={dash.handleToggleAvailable}
              openEditModal={dash.openEditModal}
              openAddModal={dash.openAddModal}
            />
          )}

          {dash.activeTab === 'addItem' && (
            <AddItemTab
              foodForm={dash.foodForm}
              setFoodForm={dash.setFoodForm}
              foodImage={dash.foodImage}
              foodPreview={dash.foodPreview}
              handleFoodImageChange={dash.handleFoodImageChange}
              submitting={dash.submitting}
              setSubmitting={dash.setSubmitting}
              fetchFoods={dash.fetchFoods}
              setFoodImage={dash.setFoodImage}
              setFoodPreview={dash.setFoodPreview}
              setActiveTab={dash.setActiveTab}
            />
          )}

          {dash.activeTab === 'orders' && (
            <OrdersTab
              orders={dash.orders}
              orderLoading={dash.orderLoading}
              orderStatus={dash.orderStatus}
              setOrderStatus={dash.setOrderStatus}
              orderPage={dash.orderPage}
              setOrderPage={dash.setOrderPage}
              orderMeta={dash.orderMeta}
              fetchOrders={dash.fetchOrders}
              handleUpdateOrderStatus={dash.handleUpdateOrderStatus}
            />
          )}
        </div>
      </main>

      {/* ── Modals ── */}
      <DeleteModal
        deleteTarget={dash.deleteTarget}
        deleting={dash.deleting}
        onConfirm={dash.confirmDelete}
        onCancel={() => dash.setDeleteTarget(null)}
      />

      <FoodModal
        modal={dash.modal}
        foodForm={dash.foodForm}
        setFoodForm={dash.setFoodForm}
        foodPreview={dash.foodPreview}
        handleFoodImageChange={dash.handleFoodImageChange}
        handleFoodSubmit={dash.handleFoodSubmit}
        submitting={dash.submitting}
        onClose={dash.closeModal}
      />
    </div>
  );
};

export default Dashboard;
