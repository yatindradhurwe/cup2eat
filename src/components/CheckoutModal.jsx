import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, CheckCircle, ShieldCheck, QrCode, CreditCard, Banknote, Truck, ArrowRight, Printer } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CheckoutModal() {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartTotal,
    cartCupsTotal,
    createOrder,
    lastCompletedOrder,
    setLastCompletedOrder,
    brandInfo
  } = useStore();

  const [paymentMethod, setPaymentMethod] = useState('UPI Online');
  const [formData, setFormData] = useState({
    customerName: '',
    businessName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    notes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCheckoutOpen && !lastCompletedOrder) return null;

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    if (!formData.customerName || !formData.phone || !formData.address) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const order = createOrder({
        ...formData,
        paymentMethod: paymentMethod
      });

      confetti({
        particleCount: 75,
        spread: 70,
        origin: { y: 0.6 }
      });

      setIsSubmitting(false);
    }, 600);
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setLastCompletedOrder(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-[#0c1612] border border-[#dfa552]/40 rounded-3xl shadow-2xl overflow-hidden my-8">
        
        {/* Top Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-[#12241b]">
          <div className="flex items-center gap-2">
            <span className="text-xl">☕</span>
            <h3 className="text-lg font-bold text-white font-['Playfair_Display',serif]">
              {lastCompletedOrder ? 'Order Confirmed!' : 'Secure Checkout & Delivery Details'}
            </h3>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-lg text-[#aaa] hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content: Either Receipt or Checkout Form */}
        {lastCompletedOrder ? (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 rounded-full bg-[#1b4332] text-[#52b788] flex items-center justify-center mx-auto text-3xl font-bold border border-[#52b788]/50 shadow-lg">
                ✓
              </div>
              <h4 className="text-2xl font-black text-white font-['Playfair_Display',serif]">
                Thank You, {lastCompletedOrder.customerName}!
              </h4>
              <p className="text-xs text-[#a3b18a]">
                Your Cup2Eat order has been registered and is being prepared in our Indirapuram facility.
              </p>
            </div>

            {/* Order Invoice Summary Box */}
            <div className="p-5 rounded-2xl glass-card border border-[#dfa552]/30 space-y-4 text-xs font-mono">
              <div className="flex justify-between border-b border-white/10 pb-3">
                <div>
                  <div className="text-[10px] text-[#999] uppercase">Order Reference</div>
                  <div className="text-sm font-bold text-[#dfa552]">{lastCompletedOrder.id}</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-[#999] uppercase">Tracking Number</div>
                  <div className="text-sm font-bold text-[#52b788]">{lastCompletedOrder.trackingNumber}</div>
                </div>
              </div>

              <div>
                <div className="text-[10px] text-[#999] uppercase mb-2">Items Ordered:</div>
                {lastCompletedOrder.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between py-1 text-white">
                    <span>{item.name} ({item.flavour}) x{item.qty}</span>
                    <span className="text-[#fef08a]">₹{(item.price * item.qty).toLocaleString('en-IN')}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/10 pt-3 space-y-1">
                <div className="flex justify-between text-[#aaa]">
                  <span>Payment Method:</span>
                  <span className="text-white font-bold">{lastCompletedOrder.paymentMethod}</span>
                </div>
                <div className="flex justify-between text-[#aaa]">
                  <span>Delivery Address:</span>
                  <span className="text-white text-right max-w-xs">{lastCompletedOrder.address}, {lastCompletedOrder.city}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-white/10">
                  <span>Grand Total Paid:</span>
                  <span className="text-[#52b788]">₹{lastCompletedOrder.totalAmount.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => window.print()}
                className="flex-1 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <Printer className="w-4 h-4" />
                <span>Print Packing Slip</span>
              </button>
              <a
                href={`https://wa.me/${brandInfo.whatsappNumber}?text=Hi%20Varun!%20I%20just%20placed%20order%20${lastCompletedOrder.id}%20for%20₹${lastCompletedOrder.totalAmount}.%20Please%20confirm%20dispatch!`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3 rounded-xl bg-[#1b4332] hover:bg-[#2d6a4f] text-[#d8f3dc] border border-[#52b788]/40 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <span>Track on WhatsApp</span>
              </a>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmitOrder} className="p-6 sm:p-8 space-y-6">
            
            {/* Order Mini Summary */}
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between text-xs">
              <div>
                <span className="text-[#aaa]">Cart Summary: </span>
                <span className="font-bold text-white">{cart.length} item(s) • {cartCupsTotal} Cups</span>
              </div>
              <div className="text-right">
                <span className="text-base font-black text-[#dfa552]">₹{cartTotal.toLocaleString('en-IN')}</span>
                <span className="text-[10px] text-[#52b788] block">Free Delivery 🇮🇳</span>
              </div>
            </div>

            {/* Customer Details */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#dfa552]">
                1. Delivery & Contact Information
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="text-[11px] font-bold text-[#ccc] block mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Varun Sharma"
                    value={formData.customerName}
                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                    className="w-full bg-[#12221b] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#dfa552]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-[#ccc] block mb-1">Café / Business (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. Blue Tokai / Home"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    className="w-full bg-[#12221b] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#dfa552]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-[#ccc] block mb-1">Phone / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 9818192575"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#12221b] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#dfa552]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-[#ccc] block mb-1">Email (For Invoice)</label>
                  <input
                    type="email"
                    placeholder="e.g. orders@mycafe.in"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#12221b] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#dfa552]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#ccc] block mb-1">Full Delivery Address *</label>
                <textarea
                  required
                  rows="2"
                  placeholder="Shop / House No, Street, Landmark"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full bg-[#12221b] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#dfa552]"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-[#ccc] block mb-1">City *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ghaziabad"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-[#12221b] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#dfa552]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-[#ccc] block mb-1">State *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Uttar Pradesh"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full bg-[#12221b] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#dfa552]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-[#ccc] block mb-1">Pincode *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 201014"
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    className="w-full bg-[#12221b] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#dfa552]"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#dfa552]">
                2. Select Payment Method
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'UPI Online', label: 'UPI / QR Code', icon: QrCode, badge: 'Instant Dispatch' },
                  { id: 'Cash on Delivery', label: 'Cash on Delivery', icon: Banknote, badge: 'Verified OTP' },
                  { id: 'NEFT / NetBanking', label: 'B2B Bank NEFT', icon: CreditCard, badge: 'Tax Invoice' }
                ].map(method => {
                  const Icon = method.icon;
                  return (
                    <button
                      type="button"
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className={`p-3.5 rounded-2xl border text-left transition-all ${
                        paymentMethod === method.id
                          ? 'border-[#dfa552] bg-[#dfa552]/15 text-white shadow-lg'
                          : 'border-white/10 bg-white/5 text-[#a3b18a] hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Icon className="w-5 h-5 text-[#dfa552]" />
                        <span className="text-[9px] bg-white/10 px-1.5 py-0.5 rounded text-[#faedcd]">
                          {method.badge}
                        </span>
                      </div>
                      <div className="text-xs font-bold text-white">{method.label}</div>
                    </button>
                  );
                })}
              </div>

              {/* UPI Simulator Box */}
              {paymentMethod === 'UPI Online' && (
                <div className="p-4 rounded-2xl bg-[#091510] border border-[#52b788]/30 flex flex-col sm:flex-row items-center gap-4">
                  <div className="w-24 h-24 bg-white p-2 rounded-xl flex items-center justify-center shrink-0">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=upi://pay?pa=9818192575@upi&pn=Cup2Eat&am=${cartTotal}&cu=INR`}
                      alt="UPI QR Code"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="text-xs space-y-1">
                    <div className="font-bold text-white">Scan & Pay via any UPI App</div>
                    <div className="text-[#a3b18a]">GPay • PhonePe • Paytm • BHIM UPI</div>
                    <div className="text-[11px] font-mono text-[#fef08a]">UPI ID: 9818192575@upi</div>
                    <div className="text-[10px] text-[#52b788]">Auto-verified upon clicking Confirm Order below.</div>
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-[#dfa552] via-[#e5ae5b] to-[#b37d2a] hover:from-[#e5ae5b] hover:to-[#dfa552] text-[#12231c] font-black text-xs uppercase tracking-wider shadow-2xl transition-all hover:scale-[1.01] active:scale-98 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <span>Generating Order & Dispatch Ticket...</span>
              ) : (
                <>
                  <span>Confirm Order & Dispatch (₹{cartTotal.toLocaleString('en-IN')})</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
