import React from 'react';
import { FLAVOUR_DETAILS } from '../data/initialData';
import { useStore } from '../context/StoreContext';
import { Sparkles, Utensils, Clock, CheckCircle2, ShoppingBag } from 'lucide-react';

export default function FlavourShowcase() {
  const { addToCart, products } = useStore();
  const wholesaleProduct = products.find(p => p.id === 'prod-wholesale-396') || products[0];

  return (
    <section id="flavours" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1b4332] border border-[#52b788]/40 text-[#a7f3d0] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#52b788]" />
            Gourmet Craftsmanship
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-['Playfair_Display',serif] text-white">
            Available in <span className="gold-gradient-text">Three Signature</span> Flavours
          </h2>
          <p className="text-base text-[#d1c7b7]">
            Baked using premium grain flours, unrefined natural cane sweeteners, and authentic aromatic spices. Zero artificial wax, zero polyethylene.
          </p>
        </div>

        {/* Flavours Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FLAVOUR_DETAILS.map((flavour, idx) => (
            <div
              key={flavour.id}
              className="rounded-3xl glass-card border border-white/10 hover:border-[#dfa552]/40 transition-all duration-300 p-6 flex flex-col justify-between group hover:-translate-y-2 relative overflow-hidden"
            >
              {/* Flavour color glow accent */}
              <div
                className="absolute top-0 right-0 w-36 h-36 rounded-bl-full opacity-20 group-hover:opacity-35 transition-opacity"
                style={{ backgroundColor: flavour.color }}
              />

              <div>
                {/* Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full text-white shadow-sm"
                    style={{ backgroundColor: flavour.color }}
                  >
                    {flavour.tag}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-[#a3b18a]">
                    <Clock className="w-3.5 h-3.5 text-[#dfa552]" />
                    <span>{flavour.crispTime} Crunch</span>
                  </div>
                </div>

                {/* Flavour Name */}
                <h3 className="text-2xl font-bold font-['Playfair_Display',serif] text-white group-hover:text-[#dfa552] transition-colors mb-2">
                  {flavour.name}
                </h3>

                <p className="text-sm text-[#ccc3b5] leading-relaxed mb-6">
                  {flavour.description}
                </p>

                {/* Best Paired With */}
                <div className="mb-6 space-y-2">
                  <div className="text-xs font-black uppercase text-[#dfa552] tracking-wider flex items-center gap-1.5">
                    <Utensils className="w-3.5 h-3.5" />
                    <span>Perfect Pairings</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-[#e2ded6]">
                    {flavour.bestPairedWith.map((pair, pIdx) => (
                      <li key={pIdx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#52b788] shrink-0" />
                        <span>{pair}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Ingredients transparency */}
                <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-[11px] text-[#a8a196] space-y-1">
                  <div className="font-bold text-[#dfa552]">Wholesome Ingredients:</div>
                  <div>{flavour.ingredients}</div>
                </div>
              </div>

              {/* Order this flavour button */}
              <div className="mt-6 pt-4 border-t border-white/10">
                <button
                  onClick={() => addToCart(wholesaleProduct, flavour.name, 1)}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#1b4332] hover:bg-[#2d6a4f] text-[#d8f3dc] border border-[#52b788]/40 text-xs font-bold transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-3.5 h-3.5 text-[#52b788]" />
                  <span>Order Carton in {flavour.name.split(' ')[0]} (₹3,999)</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
