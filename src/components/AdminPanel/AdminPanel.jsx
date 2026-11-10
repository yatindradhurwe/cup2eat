import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Users,
  Settings,
  Store,
  TrendingUp,
  Clock,
  CheckCircle,
  Truck,
  Printer,
  Phone,
  Search,
  Filter,
  AlertTriangle,
  Plus,
  Save,
  DollarSign
} from 'lucide-react';

export default function AdminPanel() {
  const {
    currentView,
    setCurrentView,
    adminTab,
    setAdminTab,
    orders,
    updateOrderStatus,
    products,
    updateProduct,
    leads,
    updateLeadStatus,
    announcement,
    setAnnouncement,
    brandInfo
  } = useStore();

  const [orderFilter, setOrderFilter] = useState('All');
  const [orderSearch, setOrderSearch] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);
  const [selectedOrderForInvoice, setSelectedOrderForInvoice] = useState(null);
  const [announcementDraft, setAnnouncementDraft] = useState(announcement);
  const [bannerSavedAlert, setBannerSavedAlert] = useState(false);

  // Financial calculations
  const totalRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
  const totalCupsSold = orders.reduce((sum, o) => {
    return sum + (o.items || []).reduce((itemSum, item) => itemSum + ((item.cupsCount || 100) * (item.qty || 1)), 0);
  }, 0);
  const pendingOrders = orders.filter(o => o.orderStatus !== 'Delivered').length;

  // Filtered orders
  const filteredOrders = orders.filter(o => {
    const matchesFilter = orderFilter === 'All' || o.orderStatus === orderFilter;
    const matchesSearch =
      o.id.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.customerName.toLowerCase().includes(orderSearch.toLowerCase()) ||
      (o.businessName && o.businessName.toLowerCase().includes(orderSearch.toLowerCase())) ||
      o.phone.includes(orderSearch);
    return matchesFilter && matchesSearch;
  });

  const handleSaveBanner = (e) => {
    e.preventDefault();
    setAnnouncement(announcementDraft);
    setBannerSavedAlert(true);
    setTimeout(() => setBannerSavedAlert(false), 3000);
  };

  const handleWhatsAppCustomer = (order) => {
    const text = `Hi ${order.customerName}! This is Varun from Cup2Eat. Regarding your order ${order.id} for ₹${order.totalAmount}: Your shipment status is currently *${order.orderStatus}* with Tracking ID ${order.trackingNumber}. Let us know if you need any assistance!`;
    window.open(`https://wa.me/${order.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#070d0a] text-[#f4efe6] pt-4 pb-20">
      
      {/* Top Admin Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="p-4 sm:p-6 rounded-3xl glass-panel border border-[#dfa552]/40 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#dfa552] to-[#8c5d1e] flex items-center justify-center text-[#0d1613] font-black text-xl shadow-lg">
              C2E
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black font-['Playfair_Display',serif] text-white">
                  Cup2Eat Merchant & Operations Command
                </h1>
                <span className="bg-[#1b4332] text-[#6ee7b7] text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#52b788]/40">
                  Live DB
                </span>
              </div>
              <p className="text-xs text-[#a3b18a] mt-0.5">
                Managing orders, B2B wholesale inquiries, pricing, and live site content
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentView('store')}
              className="px-4 py-2.5 rounded-xl bg-[#2d6a4f] hover:bg-[#3d8c68] text-white text-xs font-bold transition-all shadow-md flex items-center gap-2"
            >
              <Store className="w-4 h-4 text-[#a7f3d0]" />
              <span>Switch to Customer Store View</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex overflow-x-auto gap-2 mt-4 pb-2">
          {[
            { id: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard },
            { id: 'orders', label: `Orders (${orders.length})`, icon: ShoppingBag, badge: pendingOrders > 0 ? `${pendingOrders} Pending` : null },
            { id: 'inventory', label: 'Packs & Pricing', icon: Package },
            { id: 'leads', label: `B2B Cafe Leads (${leads.length})`, icon: Users },
            { id: 'settings', label: 'Announcement & Settings', icon: Settings }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = adminTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setAdminTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  isActive
                    ? 'bg-[#dfa552] text-[#0d1613] shadow-lg shadow-amber-500/20'
                    : 'bg-white/5 text-[#d1c7b7] hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className="bg-[#1b4332] text-[#a7f3d0] text-[10px] px-1.5 py-0.2 rounded-full">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Tab Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* ==================== TAB 1: OVERVIEW ==================== */}
        {adminTab === 'overview' && (
          <div className="space-y-8">
            
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              
              <div className="p-5 rounded-2xl glass-card border border-[#dfa552]/30 flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#a3b18a] uppercase tracking-wider block font-medium">Total Revenue</span>
                  <div className="text-2xl font-black text-white mt-1 font-mono">
                    ₹{totalRevenue.toLocaleString('en-IN')}
                  </div>
                  <span className="text-[11px] text-[#52b788] flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3" /> +18.4% this week
                  </span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-[#dfa552]/20 text-[#dfa552] flex items-center justify-center">
                  <DollarSign className="w-6 h-6" />
                </div>
              </div>

              <div className="p-5 rounded-2xl glass-card border border-[#52b788]/30 flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#a3b18a] uppercase tracking-wider block font-medium">Total Orders</span>
                  <div className="text-2xl font-black text-white mt-1 font-mono">
                    {orders.length}
                  </div>
                  <span className="text-[11px] text-[#52b788] flex items-center gap-1 mt-1">
                    {pendingOrders} active processing
                  </span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-[#52b788]/20 text-[#52b788] flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6" />
                </div>
              </div>

              <div className="p-5 rounded-2xl glass-card border border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#a3b18a] uppercase tracking-wider block font-medium">Edible Cups Dispatched</span>
                  <div className="text-2xl font-black text-white mt-1 font-mono">
                    {totalCupsSold.toLocaleString('en-IN')}
                  </div>
                  <span className="text-[11px] text-[#dfa552] mt-1 block">
                    Zero plastic cups created
                  </span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-white/10 text-[#fef08a] flex items-center justify-center text-xl">
                  ☕
                </div>
              </div>

              <div className="p-5 rounded-2xl glass-card border border-[#52b788]/30 flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#a3b18a] uppercase tracking-wider block font-medium">B2B Cafe Leads</span>
                  <div className="text-2xl font-black text-white mt-1 font-mono">
                    {leads.length}
                  </div>
                  <span className="text-[11px] text-[#a7f3d0] mt-1 block">
                    Avg ~3,500 cups/mo inquiry
                  </span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-[#1b4332] text-[#52b788] flex items-center justify-center">
                  <Users className="w-6 h-6" />
                </div>
              </div>

            </div>

            {/* Recent Orders Quick Preview & Flavour Popularity */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Recent Orders Table (Col 8) */}
              <div className="lg:col-span-8 p-6 rounded-3xl glass-panel border border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#dfa552]" />
                    <span>Recent Customer Orders</span>
                  </h3>
                  <button
                    onClick={() => setAdminTab('orders')}
                    className="text-xs text-[#dfa552] hover:underline"
                  >
                    View All Orders &rarr;
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-white/10 text-[#a3b18a] font-mono uppercase text-[10px]">
                        <th className="py-2.5">Order ID</th>
                        <th>Customer / Café</th>
                        <th>Flavour / Item</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th className="text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {orders.slice(0, 4).map(o => (
                        <tr key={o.id} className="hover:bg-white/5 transition-colors">
                          <td className="py-3 font-mono font-bold text-[#dfa552]">{o.id}</td>
                          <td>
                            <div className="font-bold text-white">{o.customerName}</div>
                            <div className="text-[10px] text-[#a3b18a]">{o.businessName || o.city}</div>
                          </td>
                          <td className="text-[#ccc3b5]">
                            {o.items[0]?.name.split('(')[0]}
                            <span className="block text-[10px] text-[#dfa552]">
                              {o.items[0]?.flavour} x{o.items[0]?.qty}
                            </span>
                          </td>
                          <td className="font-mono font-bold text-white">
                            ₹{o.totalAmount.toLocaleString('en-IN')}
                          </td>
                          <td>
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              o.orderStatus === 'Delivered'
                                ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
                                : o.orderStatus === 'Dispatched'
                                ? 'bg-blue-950 text-blue-300 border border-blue-500/30'
                                : 'bg-amber-950 text-amber-300 border border-amber-500/30'
                            }`}>
                              {o.orderStatus}
                            </span>
                          </td>
                          <td className="text-right">
                            <button
                              onClick={() => handleWhatsAppCustomer(o)}
                              className="p-1.5 rounded-lg bg-[#1b4332] hover:bg-[#2d6a4f] text-[#52b788] transition-colors"
                              title="Message customer on WhatsApp"
                            >
                              <Phone className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Flavour Popularity / Inventory Share (Col 4) */}
              <div className="lg:col-span-4 p-6 rounded-3xl glass-panel border border-white/10 space-y-5">
                <h3 className="text-base font-bold text-white">Flavour Demand Split</h3>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-bold text-[#dfa552]">Assorted Box (Mix of All 3)</span>
                      <span className="font-mono text-[#a3b18a]">48%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 rounded-full w-[48%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-bold text-[#b07d56]">Rich Cocoa Chocolate</span>
                      <span className="font-mono text-[#a3b18a]">32%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                      <div className="h-full bg-[#5c3317] rounded-full w-[32%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-bold text-[#7c8868]">Royal Desi Elaichi</span>
                      <span className="font-mono text-[#a3b18a]">14%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                      <div className="h-full bg-[#52b788] rounded-full w-[14%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-bold text-[#faedcd]">Golden Sweet Vanilla</span>
                      <span className="font-mono text-[#a3b18a]">6%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                      <div className="h-full bg-[#faedcd] rounded-full w-[6%]" />
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 text-xs space-y-1.5">
                  <div className="font-bold text-[#52b788] flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Operations Note:</span>
                  </div>
                  <p className="text-[11px] text-[#a3b18a] leading-relaxed">
                    Carton boxes of 396 cups (₹3,999) constitute 78% of incoming volume. Factory packaging capacity in Indirapuram running at optimal speed.
                  </p>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ==================== TAB 2: ORDERS ==================== */}
        {adminTab === 'orders' && (
          <div className="space-y-6">
            
            {/* Filter and Search Bar */}
            <div className="p-4 rounded-2xl glass-panel border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 absolute left-3 top-3 text-[#a3b18a]" />
                <input
                  type="text"
                  placeholder="Search by Order ID, Name, Phone..."
                  value={orderSearch}
                  onChange={(e) => setOrderSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-[#0c1311] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#dfa552]"
                />
              </div>

              <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
                {['All', 'Order Prepared', 'Safety Packed', 'Dispatched', 'Delivered'].map(status => (
                  <button
                    key={status}
                    onClick={() => setOrderFilter(status)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                      orderFilter === status
                        ? 'bg-[#dfa552] text-[#0d1613]'
                        : 'bg-white/5 text-[#a3b18a] hover:bg-white/10'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {/* Orders List */}
            <div className="space-y-4">
              {filteredOrders.length === 0 ? (
                <div className="p-12 text-center rounded-2xl glass-card text-xs text-[#a3b18a]">
                  No orders found matching the filter.
                </div>
              ) : (
                filteredOrders.map(order => (
                  <div
                    key={order.id}
                    className="p-5 rounded-2xl glass-card border border-white/10 space-y-4 hover:border-[#dfa552]/40 transition-all"
                  >
                    {/* Top Row */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-sm font-bold text-[#dfa552] bg-[#dfa552]/10 px-2.5 py-1 rounded-lg">
                          {order.id}
                        </span>
                        <div>
                          <span className="font-bold text-white text-sm">{order.customerName}</span>
                          {order.businessName && (
                            <span className="text-xs text-[#a3b18a] ml-2">({order.businessName})</span>
                          )}
                          <span className="text-[11px] text-[#777] block sm:inline sm:ml-2">
                            {new Date(order.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-sm font-black text-white font-mono">
                          ₹{order.totalAmount.toLocaleString('en-IN')}
                        </span>
                        <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold">
                          {order.paymentMethod} • {order.paymentStatus}
                        </span>
                      </div>
                    </div>

                    {/* Middle Details */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                      
                      {/* Products */}
                      <div>
                        <span className="text-[#a3b18a] text-[10px] uppercase font-mono block mb-1">Items in Parcel:</span>
                        <div className="space-y-1">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="text-white flex justify-between">
                              <span>{item.name} ({item.flavour})</span>
                              <span className="text-[#dfa552] font-mono">x{item.qty}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Delivery Address */}
                      <div>
                        <span className="text-[#a3b18a] text-[10px] uppercase font-mono block mb-1">Destination:</span>
                        <p className="text-[#ccc3b5] leading-relaxed">
                          {order.address}, {order.city}, {order.state}
                        </p>
                        <p className="text-[#52b788] mt-1 font-mono">
                          Tracking: {order.trackingNumber}
                        </p>
                      </div>

                      {/* Actions & WhatsApp */}
                      <div className="flex flex-col justify-between items-start sm:items-end gap-2">
                        <div className="flex items-center gap-2">
                          <label className="text-[10px] text-[#a3b18a] uppercase font-mono">Status:</label>
                          <select
                            value={order.orderStatus}
                            onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                            className="bg-[#12221b] border border-[#52b788]/40 rounded-xl px-2.5 py-1 text-xs text-[#a7f3d0] font-bold focus:outline-none"
                          >
                            <option value="Order Prepared">Order Prepared</option>
                            <option value="Safety Packed">Safety Packed</option>
                            <option value="Dispatched">Dispatched</option>
                            <option value="Delivered">Delivered</option>
                          </select>
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={() => handleWhatsAppCustomer(order)}
                            className="px-3 py-1.5 rounded-xl bg-[#1b4332] hover:bg-[#2d6a4f] text-[#d8f3dc] border border-[#52b788]/40 text-xs font-bold flex items-center gap-1.5"
                          >
                            <Phone className="w-3.5 h-3.5 text-[#52b788]" />
                            <span>WhatsApp Customer</span>
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>
                ))
              )}
            </div>

          </div>
        )}

        {/* ==================== TAB 3: INVENTORY & PRICING ==================== */}
        {adminTab === 'inventory' && (
          <div className="space-y-6">
            <div className="p-5 rounded-2xl glass-panel border border-[#dfa552]/30 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">Wholesale Cartons & Pack Catalog</h3>
                <p className="text-xs text-[#a3b18a]">Directly update factory wholesale prices, stock status, and capacity details</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {products.map(prod => (
                <div
                  key={prod.id}
                  className="p-6 rounded-3xl glass-card border border-white/10 space-y-4"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-[#dfa552] uppercase block">{prod.id}</span>
                      <h4 className="text-lg font-bold text-white font-['Playfair_Display',serif]">{prod.name}</h4>
                      <p className="text-xs text-[#a3b18a]">{prod.tagline}</p>
                    </div>
                    <span className="text-xl font-mono font-black text-white">
                      ₹{prod.price.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2.5 text-xs">
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                      <span className="text-[10px] text-[#a3b18a] block">Pack Size</span>
                      <span className="font-bold text-white">{prod.cupsCount} Cups</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                      <span className="text-[10px] text-[#a3b18a] block">Current Stock</span>
                      <span className="font-bold text-[#52b788]">{prod.stockCount || 50} Boxes</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                      <span className="text-[10px] text-[#a3b18a] block">Status</span>
                      <span className="font-bold text-[#faedcd]">{prod.inStock ? 'In Stock' : 'Out of Stock'}</span>
                    </div>
                  </div>

                  {/* Quick Edit Pricing Controls */}
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-[#a3b18a]">Price (₹):</span>
                      <input
                        type="number"
                        defaultValue={prod.price}
                        onBlur={(e) => updateProduct(prod.id, { price: Number(e.target.value) })}
                        className="w-24 bg-[#0c1311] border border-white/10 rounded-lg px-2 py-1 text-xs text-white font-mono"
                      />
                    </div>
                    <button
                      onClick={() => updateProduct(prod.id, { inStock: !prod.inStock })}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        prod.inStock
                          ? 'bg-[#1b4332] text-[#6ee7b7] border border-[#52b788]/40'
                          : 'bg-red-950 text-red-300 border border-red-500/30'
                      }`}
                    >
                      {prod.inStock ? 'Active on Store' : 'Hidden / Sold Out'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================== TAB 4: B2B CAFE LEADS ==================== */}
        {adminTab === 'leads' && (
          <div className="space-y-6">
            <div className="p-5 rounded-2xl glass-panel border border-[#dfa552]/30 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">Commercial Wholesale Inquiries & Leads</h3>
                <p className="text-xs text-[#a3b18a]">Inquiries submitted by café chains, caterers, and corporate clients through the B2B calculator</p>
              </div>
            </div>

            <div className="space-y-4">
              {leads.map(lead => (
                <div
                  key={lead.id}
                  className="p-5 rounded-2xl glass-card border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-[#dfa552] bg-[#dfa552]/10 px-2 py-0.5 rounded font-bold">
                        {lead.id}
                      </span>
                      <h4 className="text-base font-bold text-white">{lead.name}</h4>
                      <span className="text-xs text-[#a3b18a]">({lead.businessName})</span>
                    </div>
                    <p className="text-xs text-[#ccc3b5]">
                      City: <strong className="text-white">{lead.city}</strong> • Estimated Consumption: <strong className="text-[#52b788]">{lead.estimatedMonthlyCups}</strong>
                    </p>
                    <p className="text-[11px] text-[#a3b18a] italic">
                      Notes: {lead.notes}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <select
                      value={lead.status}
                      onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                      className="bg-[#12221b] border border-white/10 rounded-xl px-3 py-1.5 text-xs text-[#faedcd] focus:outline-none"
                    >
                      <option value="New Inquiry">New Inquiry</option>
                      <option value="Sample Dispatched">Sample Dispatched</option>
                      <option value="Negotiating">Negotiating</option>
                      <option value="Closed Deal">Closed Deal</option>
                    </select>

                    <a
                      href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=Hi%20${lead.name}!%20This%20is%20Varun%20from%20Cup2Eat.%20I%20saw%20your%20inquiry%20for%20${lead.estimatedMonthlyCups}.%20Let%20us%20schedule%20a%20sample%20tasting%20box%20for%20your%20team.`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3.5 py-1.5 rounded-xl bg-[#1b4332] hover:bg-[#2d6a4f] text-[#d8f3dc] border border-[#52b788]/40 text-xs font-bold flex items-center gap-1.5"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#52b788]" />
                      <span>WhatsApp Lead</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================== TAB 5: SETTINGS & ANNOUNCEMENT ==================== */}
        {adminTab === 'settings' && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="p-6 rounded-3xl glass-card border border-[#dfa552]/30 space-y-6">
              <div>
                <h3 className="text-lg font-bold font-['Playfair_Display',serif] text-white">
                  Live Announcement Banner & Store Notice
                </h3>
                <p className="text-xs text-[#a3b18a]">
                  Changes here immediately update the top banner ticker seen by all visitors across the website.
                </p>
              </div>

              {bannerSavedAlert && (
                <div className="p-3 rounded-xl bg-[#1b4332] text-[#d8f3dc] text-xs font-bold flex items-center gap-2 border border-[#52b788]">
                  <CheckCircle className="w-4 h-4 text-[#52b788]" />
                  <span>Announcement banner updated successfully!</span>
                </div>
              )}

              <form onSubmit={handleSaveBanner} className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-xs font-bold text-white">Enable Top Announcement Bar</span>
                  <input
                    type="checkbox"
                    checked={announcementDraft.active}
                    onChange={(e) => setAnnouncementDraft({ ...announcementDraft, active: e.target.checked })}
                    className="w-5 h-5 accent-[#dfa552] rounded cursor-pointer"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#dfa552] uppercase block mb-1">
                    Banner Text
                  </label>
                  <textarea
                    rows="2"
                    value={announcementDraft.text}
                    onChange={(e) => setAnnouncementDraft({ ...announcementDraft, text: e.target.value })}
                    className="w-full bg-[#12221b] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#dfa552]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-[#dfa552] uppercase block mb-1">
                      Button / Link Text
                    </label>
                    <input
                      type="text"
                      value={announcementDraft.linkText}
                      onChange={(e) => setAnnouncementDraft({ ...announcementDraft, linkText: e.target.value })}
                      className="w-full bg-[#12221b] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#dfa552]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-[#dfa552] uppercase block mb-1">
                      Target Anchor / URL
                    </label>
                    <input
                      type="text"
                      value={announcementDraft.linkTarget}
                      onChange={(e) => setAnnouncementDraft({ ...announcementDraft, linkTarget: e.target.value })}
                      className="w-full bg-[#12221b] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#dfa552]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#dfa552] to-[#b37d2a] hover:from-[#e5ae5b] hover:to-[#dfa552] text-[#12231c] font-black text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Save & Publish Live Notice</span>
                </button>
              </form>
            </div>

            {/* Brand Contact & Official Info Summary */}
            <div className="p-6 rounded-3xl glass-panel border border-white/10 space-y-3 text-xs text-[#a3b18a]">
              <div className="font-bold text-white text-sm">Official Brand Reference:</div>
              <div>Brand: <strong>Cup2Eat (Varun Khera)</strong></div>
              <div>Registered FSSAI ID: <strong>{brandInfo.fssaiNumber}</strong></div>
              <div>Address: <strong>{brandInfo.address}</strong></div>
              <div>WhatsApp Business: <strong>+91 {brandInfo.phone}</strong></div>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
