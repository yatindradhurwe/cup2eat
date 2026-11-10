import React from 'react';
import { useStore } from '../context/StoreContext';
import { X, Trash2, ShoppingBag, ArrowRight, Phone, ShieldCheck, Truck } from 'lucide-react';

export default function CartDrawer() {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    updateCartQty,
    removeFromCart,
    clearCart,
    cartTotal,
    cartCupsTotal,
    setIsCheckoutOpen,
    brandInfo
  } = useStore();

  if (!isCartOpen) return null;

  const handleWhatsAppCheckout = () => {
    let itemsText = cart
      .map(
        (item, idx) =>
          `${idx + 1}. ${item.name} (${item.flavour}) x ${item.qty} = ₹${(item.price * item.qty).toLocaleString('en-IN')}`
      )
      .join('\n');

    const msg = `*NEW ORDER - CUP2EAT*\n\nItems:\n${itemsText}\n\n*Total Amount:* ₹${cartTotal.toLocaleString('en-IN')}\n*Total Cups:* ${cartCupsTotal} Cups (100ml)\n*Delivery:* Free All Over India 🇮🇳\n\nPlease share delivery address and payment link/QR!`;

    window.open(`https://wa.me/${brandInfo.whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const handleProceedToOnlineCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0d1613] border-l border-[#dfa552]/30 shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-5 border-b border-white/10 flex items-center justify-between bg-[#14231b]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#dfa552]" />
              <h2 className="text-lg font-bold text-white font-['Playfair_Display',serif]">
                Your Edible Cup Cart
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-lg text-[#aaa] hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Item List */}
          <div className="p-5 overflow-y-auto flex-1 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto text-[#dfa552]">
                  <ShoppingBag className="w-8 h-8 opacity-40" />
                </div>
                <div className="text-base font-bold text-white">Your cart is empty</div>
                <p className="text-xs text-[#a3b18a] max-w-xs mx-auto">
                  Add a Wholesale Master Box (396 cups) or a Café Starter Pack to experience edible cups!
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-2.5 rounded-xl bg-[#2d6a4f] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#3d8c68] transition-colors"
                >
                  Browse Wholesale Packs
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between text-xs text-[#a3b18a] pb-2 border-b border-white/5">
                  <span>{cart.length} Product line(s)</span>
                  <button
                    onClick={clearCart}
                    className="text-red-400 hover:text-red-300 flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Clear all</span>
                  </button>
                </div>

                {cart.map((item, idx) => (
                  <div
                    key={`${item.id}-${item.flavour}-${idx}`}
                    className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 flex gap-3.5 items-center justify-between"
                  >
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-black/40 border border-white/10 shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-white truncate">{item.name}</h4>
                      <div className="text-[11px] text-[#dfa552] font-semibold mt-0.5">
                        Flavour: {item.flavour}
                      </div>
                      <div className="text-xs font-bold text-[#52b788] mt-1 font-mono">
                        ₹{item.price.toLocaleString('en-IN')} each
                      </div>
                    </div>

                    {/* Quantity & Delete */}
                    <div className="flex flex-col items-end gap-2">
                      <button
                        onClick={() => removeFromCart(item.id, item.flavour)}
                        className="text-[#888] hover:text-red-400 transition-colors p-1"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      <div className="flex items-center gap-1.5 bg-black/40 border border-white/10 rounded-lg p-1">
                        <button
                          onClick={() => updateCartQty(item.id, item.flavour, -1)}
                          className="w-5 h-5 rounded bg-white/10 text-white flex items-center justify-center text-xs font-bold"
                        >
                          -
                        </button>
                        <span className="w-6 text-center text-xs font-bold text-white font-mono">
                          {item.qty}
                        </span>
                        <button
                          onClick={() => updateCartQty(item.id, item.flavour, 1)}
                          className="w-5 h-5 rounded bg-white/10 text-white flex items-center justify-center text-xs font-bold"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Free Delivery Banner in Cart */}
                <div className="p-3 rounded-xl bg-[#1b4332]/40 border border-[#52b788]/30 flex items-center gap-2.5 text-xs text-[#a7f3d0]">
                  <Truck className="w-4 h-4 text-[#52b788] shrink-0" />
                  <span>Free All-India Insured Shipping applied to your order! 🇮🇳</span>
                </div>
              </>
            )}
          </div>

          {/* Footer Summary & Checkout CTAs */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-white/10 bg-[#121f18] space-y-3.5">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-[#a3b18a]">
                  <span>Total Cups:</span>
                  <span className="font-bold text-white font-mono">{cartCupsTotal} Cups (100ml)</span>
                </div>
                <div className="flex justify-between text-[#a3b18a]">
                  <span>Delivery Charges:</span>
                  <span className="font-bold text-[#52b788]">FREE (Special Offer)</span>
                </div>
                <div className="flex justify-between text-[#a3b18a]">
                  <span>FSSAI Compliance:</span>
                  <span className="font-bold text-[#a7f3d0]">100% Certified</span>
                </div>
                <div className="flex justify-between text-base font-black text-white pt-2 border-t border-white/10">
                  <span>Grand Total:</span>
                  <span className="gold-gradient-text font-mono text-lg">
                    ₹{cartTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <button
                onClick={handleProceedToOnlineCheckout}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#dfa552] via-[#e5ae5b] to-[#b37d2a] hover:from-[#e5ae5b] hover:to-[#dfa552] text-[#12231c] font-black text-xs uppercase tracking-wider shadow-xl transition-all hover:scale-[1.01] active:scale-98 flex items-center justify-center gap-2"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleWhatsAppCheckout}
                className="w-full py-2.5 rounded-xl bg-[#1b4332] hover:bg-[#2d6a4f] text-[#d8f3dc] border border-[#52b788]/40 text-xs font-bold transition-all flex items-center justify-center gap-2"
              >
                <Phone className="w-3.5 h-3.5 text-[#52b788]" />
                <span>Quick Checkout via WhatsApp Direct</span>
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
