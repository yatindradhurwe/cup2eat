import React from 'react';
import { useStore } from '../context/StoreContext';
import { ShieldCheck, Truck, Sparkles, Coffee, HeartHandshake, ArrowRight, Play, Award, CheckCircle } from 'lucide-react';

export default function Hero() {
  const { addToCart, products, setIsFssaiModalOpen } = useStore();
  const wholesaleProduct = products.find(p => p.id === 'prod-wholesale-396') || products[0];

  return (
    <section className="relative overflow-hidden pt-8 pb-20 lg:pt-16 lg:pb-32">
      {/* Background radial glows and atmospheric effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-[#2d6a4f]/20 via-[#dfa552]/15 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-12 right-10 w-96 h-96 bg-[#3d2314]/30 rounded-full blur-3xl pointer-events-none -z-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Brand Story & CTAs */}
          <div className="lg:col-span-7 space-y-7 text-center lg:text-left">
            
            {/* Pill Highlights */}
            <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1b4332]/80 border border-[#52b788]/50 text-[#6ee7b7] text-xs font-semibold tracking-wide shadow-md">
                <CheckCircle className="w-3.5 h-3.5 text-[#34d399]" />
                FSSAI Registered Brand
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#3d2314]/70 border border-[#dfa552]/40 text-[#fef08a] text-xs font-semibold shadow-md">
                <Sparkles className="w-3.5 h-3.5 text-[#fbbf24]" />
                Startup Mahakumbh Showcase
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#d8f3dc] text-xs font-medium">
                <Truck className="w-3.5 h-3.5 text-[#52b788]" />
                Free All-India Delivery
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-['Playfair_Display',serif] tracking-tight text-white leading-[1.12]">
                Eat Your <span className="gold-gradient-text italic font-serif">Drink!</span>
                <span className="block text-2xl sm:text-3xl lg:text-4xl font-normal font-['Outfit',sans-serif] text-[#dfa552] mt-2">
                  A Delicious & Sustainable Innovation.
                </span>
              </h1>
              <p className="text-base sm:text-lg text-[#d1c7b7] max-w-2xl font-normal leading-relaxed">
                Say goodbye to paper & plastic cups lined with toxic polyethylene. <strong className="text-white">Cup2Eat</strong> is India’s breakthrough crispy edible wafer cup baked for hot chai, specialty coffee, and desserts. Sip your favourite drink, then eat the cup!
              </p>
            </div>

            {/* Wholesale Special Highlight Banner */}
            <div className="p-4 rounded-2xl glass-card border border-[#dfa552]/40 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 bg-gradient-to-l from-[#dfa552] to-[#b37d2a] text-[#0d1613] text-[11px] font-black uppercase px-3 py-0.5 rounded-bl-xl tracking-wider">
                Direct Wholesale Offer
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#dfa552] to-[#996e2e] flex items-center justify-center text-[#12231c] font-black text-xl shadow-lg">
                    ₹10
                  </div>
                  <div className="text-left">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-black text-white">₹3,999/-</span>
                      <span className="text-sm line-through text-[#999]">₹5,999</span>
                      <span className="text-xs bg-[#2d6a4f] text-[#6ee7b7] px-2 py-0.5 rounded-full font-bold">396 Cups</span>
                    </div>
                    <p className="text-xs text-[#dfa552]">Includes Free Shipping Across India • 100ml Capacity</p>
                  </div>
                </div>

                <button
                  onClick={() => addToCart(wholesaleProduct, 'Assorted (All 3)', 1)}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#dfa552] via-[#e6b15e] to-[#b37d2a] hover:from-[#e6b15e] hover:to-[#dfa552] text-[#12231c] font-black text-xs uppercase tracking-wider shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <span>Order Carton Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#products"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#2d6a4f] hover:bg-[#3e8967] text-white font-bold text-sm shadow-xl shadow-emerald-950/40 border border-[#52b788]/40 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                <Coffee className="w-4 h-4 text-[#a7f3d0]" />
                <span>Explore All Packs & Flavours</span>
              </a>

              <a
                href="#simulator"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl glass-panel-subtle hover:bg-white/10 text-[#faedcd] border border-[#d4a373]/30 font-semibold text-sm transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4 text-[#dfa552] fill-[#dfa552]" />
                <span>Launch 3D Sip Simulator</span>
              </a>

              <button
                onClick={() => setIsFssaiModalOpen(true)}
                className="text-xs text-[#a3b18a] hover:text-[#faedcd] flex items-center gap-1 underline underline-offset-4 py-2"
              >
                <ShieldCheck className="w-4 h-4 text-[#52b788]" />
                <span>View FSSAI License #22725101003467</span>
              </button>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10 text-center">
              <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                <div className="text-xl sm:text-2xl font-black text-[#52b788]">45 Mins</div>
                <div className="text-[11px] text-[#a09a8e]">Hot Leak-Proof Hold</div>
              </div>
              <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                <div className="text-xl sm:text-2xl font-black text-[#dfa552]">3 Flavours</div>
                <div className="text-[11px] text-[#a09a8e]">Choc, Vanilla, Elaichi</div>
              </div>
              <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                <div className="text-xl sm:text-2xl font-black text-[#6ee7b7]">100% Zero</div>
                <div className="text-[11px] text-[#a09a8e]">Plastic & Landfill Waste</div>
              </div>
            </div>

          </div>

          {/* Right Column: Realistic 3D Visual Showpiece */}
          <div className="lg:col-span-5 relative flex justify-center">
            
            {/* Outer Glow Ring */}
            <div className="relative w-full max-w-md">
              
              {/* Main Realistic Cup Visual Box */}
              <div className="relative rounded-3xl p-6 glass-panel border border-[#dfa552]/30 shadow-2xl overflow-hidden group">
                
                {/* Floating tags */}
                <div className="absolute top-4 left-4 z-20 flex flex-col gap-1.5">
                  <span className="bg-[#1b4332]/90 border border-[#52b788]/50 text-[#d8f3dc] text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-md shadow-md flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#10b981] animate-ping" />
                    100ml Capacity
                  </span>
                  <span className="bg-[#4a2810]/90 border border-[#dfa552]/40 text-[#fef08a] text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-md shadow-md">
                    100% Edible Wafer
                  </span>
                </div>

                {/* Real Authentic Poster / Cup Rendering */}
                <div className="relative rounded-2xl overflow-hidden aspect-square border border-[#dfa552]/20 bg-gradient-to-b from-[#1b2a22] to-[#0d1612] flex items-center justify-center p-3 shadow-inner">
                  <img
                    src="/assets/images/poster_wholesale.jpg"
                    alt="Cup2Eat Edible Cups - Chocolate, Vanilla, Elaichi"
                    className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-700 shadow-2xl"
                  />
                  
                  {/* Subtle steam animations floating from the top */}
                  <div className="absolute top-10 left-1/4 -translate-x-1/2 w-8 h-16 pointer-events-none steam-1">
                    <div className="w-full h-full bg-gradient-to-t from-white/30 to-transparent blur-md rounded-full transform -rotate-12" />
                  </div>
                  <div className="absolute top-8 left-1/2 -translate-x-1/2 w-10 h-20 pointer-events-none steam-2">
                    <div className="w-full h-full bg-gradient-to-t from-white/35 to-transparent blur-md rounded-full transform rotate-6" />
                  </div>
                  <div className="absolute top-12 left-3/4 -translate-x-1/2 w-8 h-16 pointer-events-none steam-3">
                    <div className="w-full h-full bg-gradient-to-t from-white/30 to-transparent blur-md rounded-full" />
                  </div>

                  <div className="absolute bottom-3 inset-x-3 bg-gradient-to-t from-[#09110e] via-[#09110e]/90 to-transparent p-3 rounded-lg flex items-center justify-between">
                    <div>
                      <div className="text-xs font-black text-[#dfa552] uppercase tracking-wider">Flavours Available</div>
                      <div className="text-[11px] text-[#f4efe6] font-medium flex items-center gap-1.5 mt-0.5">
                        <span className="w-2 h-2 rounded-full bg-[#5c3317]" /> Chocolate
                        <span className="w-2 h-2 rounded-full bg-[#d4a373]" /> Vanilla
                        <span className="w-2 h-2 rounded-full bg-[#7c8868]" /> Elaichi
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-black text-[#52b788]">₹10 / cup</div>
                      <div className="text-[9px] text-[#aaa]">Wholesale Carton</div>
                    </div>
                  </div>
                </div>

                {/* Floating Award / Founder Badge */}
                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-[#2d6a4f] flex items-center justify-center text-white font-bold text-xs">
                      🏆
                    </div>
                    <div>
                      <p className="font-bold text-white text-[11px]">1st Position IPEM B-Plan</p>
                      <p className="text-[#a3b18a] text-[10px]">Founder: Varun Khera</p>
                    </div>
                  </div>
                  <a
                    href="https://www.instagram.com/cup2eat"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] text-[#dfa552] hover:text-[#fef08a] font-semibold flex items-center gap-1"
                  >
                    <span>@cup2eat on Instagram</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>

              </div>

              {/* Floating review card */}
              <div className="absolute -bottom-6 -left-6 bg-[#162720]/95 backdrop-blur-xl border border-[#52b788]/40 p-3.5 rounded-2xl shadow-2xl max-w-[240px] hidden sm:block animate-float">
                <div className="flex items-center gap-1 text-[#fbbf24] text-xs mb-1">
                  {"★".repeat(5)}
                  <span className="text-[10px] text-white ml-1 font-bold">5.0</span>
                </div>
                <p className="text-[11px] text-[#e0ded9] italic leading-tight">
                  "Customers in our cafe love taking a crunch of the cup right after finishing the chai!"
                </p>
                <p className="text-[9px] text-[#52b788] font-bold mt-1.5 uppercase tracking-wide">
                  — The Roast Room Café, Delhi
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
