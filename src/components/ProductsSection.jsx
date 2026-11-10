import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ShoppingCart, Check, Star, Truck, ShieldCheck, Flame, Phone, Info } from 'lucide-react';

export default function ProductsSection() {
  const { products, addToCart, brandInfo } = useStore();
  const [selectedFlavours, setSelectedFlavours] = useState({});
  const [quantities, setQuantities] = useState({});

  const handleFlavourChange = (productId, flavour) => {
    setSelectedFlavours(prev => ({ ...prev, [productId]: flavour }));
  };

  const handleQtyChange = (productId, delta) => {
    setQuantities(prev => {
      const current = prev[productId] || 1;
      const next = Math.max(1, current + delta);
      return { ...prev, [productId]: next };
    });
  };

  const handleAddToCart = (product) => {
    const flavour = selectedFlavours[product.id] || product.flavoursAvailable[0];
    const qty = quantities[product.id] || 1;
    addToCart(product, flavour, qty);
  };

  const handleDirectWhatsApp = (product) => {
    const flavour = selectedFlavours[product.id] || product.flavoursAvailable[0];
    const qty = quantities[product.id] || 1;
    const total = product.price * qty;
    const msg = `Hi Cup2Eat! I want to order:\n- ${product.name}\n- Flavour: ${flavour}\n- Quantity: ${qty}\n- Total: ₹${total.toLocaleString('en-IN')}\n\nPlease confirm delivery address and bank/UPI details!`;
    window.open(`https://wa.me/${brandInfo.whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <section id="products" className="py-20 bg-[#09110e]/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#dfa552]/10 border border-[#dfa552]/30 text-[#fef08a] text-xs font-bold uppercase tracking-widest">
            <Flame className="w-3.5 h-3.5 text-[#fbbf24]" />
            Direct Factory Wholesale & Packs
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-['Playfair_Display',serif] text-white">
            Choose Your <span className="gold-gradient-text">Cup2Eat</span> Box
          </h2>
          <p className="text-base text-[#d1c7b7]">
            Whether you run a high-footfall café, catering business, or want to enjoy crispy tea at home — we deliver factory-fresh edible cups all over India.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map(product => {
            const currentFlavour = selectedFlavours[product.id] || product.flavoursAvailable[0];
            const currentQty = quantities[product.id] || 1;
            const isWholesale = product.id === 'prod-wholesale-396';

            return (
              <div
                key={product.id}
                className={`rounded-3xl glass-card transition-all duration-300 flex flex-col justify-between relative overflow-hidden group ${
                  isWholesale
                    ? 'border-2 border-[#dfa552] shadow-2xl shadow-amber-900/30 ring-1 ring-[#dfa552]/50'
                    : 'border border-white/10 hover:border-[#52b788]/40'
                }`}
              >
                {/* Highlight Badge */}
                {product.badge && (
                  <div
                    className={`absolute top-0 right-0 px-3.5 py-1 text-[11px] font-black uppercase tracking-wider rounded-bl-xl shadow-lg z-10 ${
                      isWholesale
                        ? 'bg-gradient-to-r from-[#dfa552] to-[#b37d2a] text-[#12231c]'
                        : 'bg-[#1b4332] text-[#6ee7b7] border-l border-b border-[#52b788]/40'
                    }`}
                  >
                    {product.badge}
                  </div>
                )}

                <div className="p-6">
                  {/* Image / Poster Box */}
                  <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-black/40 border border-white/10 mb-5 relative group-hover:scale-102 transition-transform">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-2 left-2 bg-[#0c1311]/90 backdrop-blur-md px-2 py-0.5 rounded text-[10px] text-[#fef08a] font-mono font-bold">
                      {product.pricePerCup}
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-xl font-bold font-['Playfair_Display',serif] text-white group-hover:text-[#dfa552] transition-colors leading-snug">
                    {product.name}
                  </h3>
                  <p className="text-xs text-[#a3b18a] mt-1 mb-4 leading-relaxed">
                    {product.tagline}
                  </p>

                  {/* Pricing Box */}
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 mb-5 flex items-baseline justify-between">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-black text-white">
                          ₹{product.price.toLocaleString('en-IN')}
                        </span>
                        {product.originalPrice && (
                          <span className="text-xs text-[#888] line-through">
                            ₹{product.originalPrice.toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-[#52b788] font-bold">
                        {product.discount} • Free Shipping 🇮🇳
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-bold text-[#dfa552]">{product.cupsCount} Cups</div>
                      <div className="text-[10px] text-[#999]">{product.capacity} each</div>
                    </div>
                  </div>

                  {/* Flavour Selector */}
                  <div className="mb-4">
                    <label className="text-[11px] font-bold text-[#dfa552] uppercase tracking-wider block mb-1.5">
                      Select Flavour:
                    </label>
                    <select
                      value={currentFlavour}
                      onChange={(e) => handleFlavourChange(product.id, e.target.value)}
                      className="w-full bg-[#12221b] border border-[#52b788]/30 rounded-xl px-3 py-2 text-xs text-[#faedcd] focus:outline-none focus:border-[#dfa552] transition-all"
                    >
                      {product.flavoursAvailable.map((flav, fIdx) => (
                        <option key={fIdx} value={flav} className="bg-[#0c1311] text-white">
                          {flav}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Feature Checklist */}
                  <ul className="space-y-1.5 text-[11px] text-[#ccc3b5] mb-6">
                    {product.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <Check className="w-3.5 h-3.5 text-[#52b788] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom Actions */}
                <div className="p-6 pt-0 space-y-3">
                  {/* Quantity selector */}
                  <div className="flex items-center justify-between p-2 rounded-xl bg-white/5 border border-white/5">
                    <span className="text-xs text-[#d1c7b7] font-medium">Quantity:</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleQtyChange(product.id, -1)}
                        className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold flex items-center justify-center text-sm"
                      >
                        -
                      </button>
                      <span className="w-8 text-center text-sm font-bold text-white font-mono">
                        {currentQty}
                      </span>
                      <button
                        onClick={() => handleQtyChange(product.id, 1)}
                        className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold flex items-center justify-center text-sm"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={() => handleAddToCart(product)}
                    className={`w-full py-3 rounded-xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg hover:scale-102 active:scale-98 ${
                      isWholesale
                        ? 'bg-gradient-to-r from-[#dfa552] to-[#b37d2a] text-[#12231c] hover:shadow-amber-500/20'
                        : 'bg-[#2d6a4f] hover:bg-[#3d8c68] text-white'
                    }`}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Add to Cart (₹{(product.price * currentQty).toLocaleString('en-IN')})</span>
                  </button>

                  {/* Direct WhatsApp Order */}
                  <button
                    onClick={() => handleDirectWhatsApp(product)}
                    className="w-full py-2 rounded-xl bg-white/5 hover:bg-[#1b4332] text-[#a7f3d0] border border-white/10 hover:border-[#52b788]/40 text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-all"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#52b788]" />
                    <span>Order via WhatsApp Direct</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Wholesale Note */}
        <div className="mt-12 p-6 rounded-2xl glass-panel border border-[#dfa552]/30 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#dfa552]/20 border border-[#dfa552]/40 flex items-center justify-center text-2xl shrink-0">
              📦
            </div>
            <div>
              <h4 className="text-base font-bold text-white">Need 1,000+ to 50,000+ Cups for Your Chain or Event?</h4>
              <p className="text-xs text-[#a3b18a] mt-0.5">
                We provide custom logo embossing, tailored flavour blends, and scheduled monthly supply contracts.
              </p>
            </div>
          </div>
          <a
            href="#b2b-calc"
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#dfa552] to-[#996e2e] text-[#12231c] text-xs font-black uppercase tracking-wider hover:scale-105 transition-all shrink-0 shadow-lg"
          >
            Calculate Bulk Quote &rarr;
          </a>
        </div>

      </div>
    </section>
  );
}
