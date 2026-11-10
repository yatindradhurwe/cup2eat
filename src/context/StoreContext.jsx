import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_PRODUCTS, INITIAL_ORDERS, INITIAL_LEADS, BRAND_INFO } from '../data/initialData';

const StoreContext = createContext();

export function StoreProvider({ children }) {
  // Products state
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('c2e_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  // Orders state
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('c2e_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  // B2B Wholesale Leads
  const [leads, setLeads] = useState(() => {
    const saved = localStorage.getItem('c2e_leads');
    return saved ? JSON.parse(saved) : INITIAL_LEADS;
  });

  // Cart state
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('c2e_cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Announcement Banner
  const [announcement, setAnnouncement] = useState(() => {
    const saved = localStorage.getItem('c2e_announcement');
    return saved ? JSON.parse(saved) : {
      active: true,
      text: "⚡ FESTIVE WHOLESALE OFFER: ₹3,999 for 396 Cups (Only ₹10.10/cup) • FREE Delivery All Over India 🇮🇳",
      linkText: "Order Bulk Carton",
      linkTarget: "#products"
    };
  });

  // Navigation & Modals
  const [currentView, setCurrentView] = useState('store'); // 'store' | 'admin'
  const [adminTab, setAdminTab] = useState('overview'); // 'overview' | 'orders' | 'inventory' | 'leads' | 'settings'
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isFssaiModalOpen, setIsFssaiModalOpen] = useState(false);
  const [selectedProductForModal, setSelectedProductForModal] = useState(null);
  const [lastCompletedOrder, setLastCompletedOrder] = useState(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('c2e_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('c2e_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('c2e_leads', JSON.stringify(leads));
  }, [leads]);

  useEffect(() => {
    localStorage.setItem('c2e_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('c2e_announcement', JSON.stringify(announcement));
  }, [announcement]);

  // Cart operations
  const addToCart = (product, flavour = 'Assorted', qty = 1) => {
    setCart(prevCart => {
      const existingIndex = prevCart.findIndex(
        item => item.id === product.id && item.flavour === flavour
      );
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].qty += qty;
        return updated;
      } else {
        return [...prevCart, {
          id: product.id,
          name: product.name,
          price: product.price,
          flavour: flavour,
          cupsCount: product.cupsCount,
          qty: qty,
          image: product.image
        }];
      }
    });
    setIsCartOpen(true);
  };

  const updateCartQty = (id, flavour, delta) => {
    setCart(prevCart => {
      return prevCart
        .map(item => {
          if (item.id === id && item.flavour === flavour) {
            const newQty = item.qty + delta;
            return newQty > 0 ? { ...item, qty: newQty } : null;
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  const removeFromCart = (id, flavour) => {
    setCart(prevCart => prevCart.filter(item => !(item.id === id && item.flavour === flavour)));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const cartCupsTotal = cart.reduce((sum, item) => sum + (item.cupsCount || 0) * item.qty, 0);

  // Place Order
  const createOrder = (orderData) => {
    const newOrderId = `C2E-${Math.floor(1000 + Math.random() * 9000)}`;
    const fullOrder = {
      id: newOrderId,
      date: new Date().toISOString(),
      orderStatus: 'Order Prepared',
      paymentStatus: orderData.paymentMethod === 'Cash on Delivery' ? 'Pending' : 'Paid',
      trackingNumber: `DTDC-${Math.floor(100000 + Math.random() * 900000)}`,
      items: cart,
      totalAmount: cartTotal,
      ...orderData
    };

    setOrders(prev => [fullOrder, ...prev]);
    setLastCompletedOrder(fullOrder);
    clearCart();
    setIsCheckoutOpen(false);
    return fullOrder;
  };

  // Update order status from Admin
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        return { ...order, orderStatus: newStatus };
      }
      return order;
    }));
  };

  // Add B2B lead
  const addLead = (leadData) => {
    const newLead = {
      id: `LEAD-${Math.floor(100 + Math.random() * 900)}`,
      date: new Date().toISOString().split('T')[0],
      status: 'New Inquiry',
      ...leadData
    };
    setLeads(prev => [newLead, ...prev]);
    return newLead;
  };

  const updateLeadStatus = (leadId, status) => {
    setLeads(prev => prev.map(lead => lead.id === leadId ? { ...lead, status } : lead));
  };

  // Update product in admin
  const updateProduct = (productId, updatedFields) => {
    setProducts(prev => prev.map(p => p.id === productId ? { ...p, ...updatedFields } : p));
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        orders,
        leads,
        cart,
        announcement,
        setAnnouncement,
        currentView,
        setCurrentView,
        adminTab,
        setAdminTab,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isFssaiModalOpen,
        setIsFssaiModalOpen,
        selectedProductForModal,
        setSelectedProductForModal,
        lastCompletedOrder,
        setLastCompletedOrder,
        addToCart,
        updateCartQty,
        removeFromCart,
        clearCart,
        cartTotal,
        cartCupsTotal,
        createOrder,
        updateOrderStatus,
        addLead,
        updateLeadStatus,
        updateProduct,
        brandInfo: BRAND_INFO
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
