import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { Coffee, Flame, Clock, Award, Sparkles, RefreshCw, ShoppingCart, Check, Volume2 } from 'lucide-react';
import confetti from 'canvas-confetti';

const DRINKS = [
  {
    id: 'chai',
    name: 'Kadak Masala Chai',
    color: '#b35d25',
    liquidGradient: 'from-[#803810] via-[#c2652b] to-[#f49d37]',
    foamColor: '#f1dca7',
    temp: '82°C (Hot)',
    steam: true,
    desc: 'Traditional slow-brewed Indian spiced tea with ginger & cloves.',
    perfectFlavour: 'Royal Desi Elaichi'
  },
  {
    id: 'cappuccino',
    name: 'Barista Cappuccino',
    color: '#4a2c11',
    liquidGradient: 'from-[#3a200a] via-[#5c3718] to-[#8c572a]',
    foamColor: '#faebd7',
    temp: '74°C (Hot)',
    steam: true,
    desc: 'Silky espresso with velvety steamed milk froth & latte swirl.',
    perfectFlavour: 'Rich Cocoa Chocolate'
  },
  {
    id: 'icecream',
    name: 'Belgian Sundae / Gelato',
    color: '#ffffff',
    liquidGradient: 'from-[#fefae0] via-[#dda15e] to-[#bc6c25]',
    foamColor: '#ffffff',
    temp: '-4°C (Chilled)',
    steam: false,
    desc: 'Double scoop of creamy gelato topped with hot fudge and toasted nuts.',
    perfectFlavour: 'Golden Sweet Vanilla'
  },
  {
    id: 'coldcoffee',
    name: 'Cold Coffee Frappe',
    color: '#704214',
    liquidGradient: 'from-[#4e2f12] via-[#7a4c21] to-[#b07d56]',
    foamColor: '#f5ebe0',
    temp: '4°C (Iced)',
    steam: false,
    desc: 'Frothy whipped iced brew infused with cocoa drizzle.',
    perfectFlavour: 'Rich Cocoa Chocolate'
  }
];

const FLAVOUR_OPTIONS = [
  {
    id: 'chocolate',
    name: 'Rich Chocolate',
    waferColor: '#4a2810',
    waferBorder: '#78431b',
    texturePattern: 'radial-gradient(circle, #5a3014 20%, #3e1f0b 90%)',
    tagline: 'Deep roasted cocoa biscuit crust',
    accentText: 'text-[#d4a373]'
  },
  {
    id: 'vanilla',
    name: 'Sweet Vanilla',
    waferColor: '#b58349',
    waferBorder: '#e0a96d',
    texturePattern: 'radial-gradient(circle, #c7955b 20%, #9e6d34 90%)',
    tagline: 'Golden buttery wafer crunch',
    accentText: 'text-[#faedcd]'
  },
  {
    id: 'elaichi',
    name: 'Royal Elaichi',
    waferColor: '#606b52',
    waferBorder: '#839270',
    texturePattern: 'radial-gradient(circle, #6f7a60 20%, #4d5740 90%)',
    tagline: 'Green cardamom infused aromatic wafer',
    accentText: 'text-[#c3d1b3]'
  }
];

export default function InteractiveCupSimulator() {
  const { addToCart, products } = useStore();
  const [selectedFlavour, setSelectedFlavour] = useState(FLAVOUR_OPTIONS[0]);
  const [selectedDrink, setSelectedDrink] = useState(DRINKS[0]);
  const [isFilled, setIsFilled] = useState(false);
  const [bitesTaken, setBitesTaken] = useState(0);
  const [leakProofTimer, setLeakProofTimer] = useState(45);
  const [isPouring, setIsPouring] = useState(false);
  const [crumbParticles, setCrumbParticles] = useState([]);

  // Handle pouring
  const handlePour = () => {
    setIsPouring(true);
    setBitesTaken(0);
    setTimeout(() => {
      setIsFilled(true);
      setIsPouring(false);
      setLeakProofTimer(45);
    }, 700);
  };

  // Handle bite
  const handleTakeBite = () => {
    if (bitesTaken < 3) {
      setBitesTaken(prev => prev + 1);
      
      // Trigger mini confetti crumbs
      confetti({
        particleCount: 25,
        spread: 45,
        origin: { y: 0.6, x: 0.5 },
        colors: [selectedFlavour.waferColor, '#dfa552', '#f4efe6'],
        disableForReducedMotion: true
      });
    }
  };

  const handleReset = () => {
    setIsFilled(false);
    setBitesTaken(0);
    setLeakProofTimer(45);
  };

  // Find product to add
  const wholesaleProduct = products.find(p => p.id === 'prod-wholesale-396') || products[0];

  return (
    <section id="simulator" className="py-20 bg-gradient-to-b from-[#0c1311] via-[#12221b] to-[#0c1311] relative overflow-hidden">
      {/* Decorative background grid and blur */}
      <div className="absolute inset-0 bg-[radial-gradient(#dfa552_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#dfa552]/10 border border-[#dfa552]/30 text-[#fef08a] text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-[#fbbf24]" />
            Interactive 3D Experience
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-['Playfair_Display',serif] text-white">
            The <span className="gold-gradient-text">Taste & Sip</span> Simulator
          </h2>
          <p className="text-base text-[#d1c7b7]">
            Pick your crispy wafer flavor, pour your favorite drink, and experience why thousands of cafés and food lovers are switching to Cup2Eat.
          </p>
        </div>

        {/* Simulator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Controls Column */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Step 1: Choose Flavour */}
            <div className="p-5 rounded-2xl glass-panel border border-[#dfa552]/20 shadow-xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase text-[#dfa552] tracking-wider">Step 1: Choose Edible Cup Flavour</span>
                <span className="text-xs text-[#a3b18a] font-mono">100ml Wafer</span>
              </div>
              <div className="grid grid-cols-3 gap-2.5">
                {FLAVOUR_OPTIONS.map(flavour => (
                  <button
                    key={flavour.id}
                    onClick={() => {
                      setSelectedFlavour(flavour);
                      setBitesTaken(0);
                    }}
                    className={`p-3 rounded-xl text-left border transition-all flex flex-col justify-between ${
                      selectedFlavour.id === flavour.id
                        ? 'border-[#dfa552] bg-[#dfa552]/20 shadow-lg scale-[1.02]'
                        : 'border-white/10 bg-white/5 hover:border-white/30'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div
                        className="w-4 h-4 rounded-full border border-white/40 shadow-inner"
                        style={{ backgroundColor: flavour.waferColor }}
                      />
                      {selectedFlavour.id === flavour.id && (
                        <Check className="w-3.5 h-3.5 text-[#fef08a] ml-auto" />
                      )}
                    </div>
                    <div className="text-xs font-bold text-white leading-tight">{flavour.name}</div>
                  </button>
                ))}
              </div>
              <p className="text-xs text-[#b8afa2] italic pt-1">{selectedFlavour.tagline}</p>
            </div>

            {/* Step 2: Choose Beverage / Dessert */}
            <div className="p-5 rounded-2xl glass-panel border border-[#dfa552]/20 shadow-xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase text-[#dfa552] tracking-wider">Step 2: Choose Drink / Dessert</span>
                <span className="text-xs text-[#a3b18a] font-mono">{selectedDrink.temp}</span>
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                {DRINKS.map(drink => (
                  <button
                    key={drink.id}
                    onClick={() => {
                      setSelectedDrink(drink);
                      setIsFilled(false);
                      setBitesTaken(0);
                    }}
                    className={`p-3 rounded-xl text-left border transition-all ${
                      selectedDrink.id === drink.id
                        ? 'border-[#52b788] bg-[#1b4332]/60 shadow-lg scale-[1.02]'
                        : 'border-white/10 bg-white/5 hover:border-white/30'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-bold text-white mb-1">
                      <span>{drink.name}</span>
                      {selectedDrink.id === drink.id && (
                        <Check className="w-3.5 h-3.5 text-[#52b788]" />
                      )}
                    </div>
                    <div className="text-[10px] text-[#a3b18a] font-mono">{drink.temp}</div>
                  </button>
                ))}
              </div>
              <p className="text-xs text-[#b8afa2] italic pt-1">{selectedDrink.desc}</p>
            </div>

            {/* Step 3: Interactive Actions */}
            <div className="p-5 rounded-2xl glass-card border border-[#dfa552]/30 space-y-3">
              <span className="text-xs font-black uppercase text-[#dfa552] tracking-wider block">Step 3: Test Real Crispness</span>
              
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handlePour}
                  disabled={isPouring}
                  className={`flex-1 min-w-[140px] py-3 px-4 rounded-xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg ${
                    isPouring
                      ? 'bg-amber-800 text-amber-200'
                      : 'bg-gradient-to-r from-[#dfa552] via-[#e5ae5b] to-[#b37d2a] text-[#12231c] hover:scale-105 active:scale-95'
                  }`}
                >
                  <Coffee className="w-4 h-4" />
                  <span>{isFilled ? 'Re-Pour Drink 🫖' : 'Pour Drink Now 🫖'}</span>
                </button>

                <button
                  onClick={handleTakeBite}
                  disabled={!isFilled && bitesTaken === 0}
                  className="flex-1 min-w-[140px] py-3 px-4 rounded-xl bg-[#2d6a4f] hover:bg-[#3d8c68] text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>🍪 Take a Bite! ({bitesTaken}/3)</span>
                </button>

                <button
                  onClick={handleReset}
                  className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-[#d1c7b7] transition-all"
                  title="Reset Cup"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>

              {bitesTaken > 0 && (
                <div className="p-2.5 rounded-lg bg-[#2d6a4f]/20 border border-[#52b788]/40 text-xs text-[#d8f3dc] flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#fbbf24] shrink-0" />
                  <span>*CRUNCH!* Crisp wafer texture with pure {selectedFlavour.name} richness. Zero soggy sogginess!</span>
                </div>
              )}
            </div>

          </div>

          {/* Realistic Visual Display Column */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center">
            
            {/* Stage Plate */}
            <div className="w-full max-w-lg p-8 rounded-3xl glass-panel border border-[#dfa552]/40 shadow-2xl relative flex flex-col items-center">
              
              {/* Cup Status Badges */}
              <div className="w-full flex items-center justify-between mb-8 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10b981] animate-pulse" />
                  <span className="font-mono text-[#a7f3d0]">Leak-Proof Status: 100% Solid</span>
                </div>
                <div className="flex items-center gap-1.5 bg-[#dfa552]/20 text-[#fef08a] px-3 py-1 rounded-full font-bold">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Hold Time: {leakProofTimer} Mins</span>
                </div>
              </div>

              {/* Realistic SVG & CSS Cup Model */}
              <div className="relative w-64 h-80 flex flex-col items-center justify-end my-4">
                
                {/* Steam effect if hot drink & filled */}
                {isFilled && selectedDrink.steam && (
                  <div className="absolute -top-12 z-30 flex gap-4 pointer-events-none">
                    <div className="w-6 h-20 bg-gradient-to-t from-white/30 to-transparent blur-md rounded-full steam-1" />
                    <div className="w-8 h-24 bg-gradient-to-t from-white/40 to-transparent blur-md rounded-full steam-2" />
                    <div className="w-6 h-18 bg-gradient-to-t from-white/30 to-transparent blur-md rounded-full steam-3" />
                  </div>
                )}

                {/* Pour stream animation */}
                {isPouring && (
                  <div
                    className="absolute -top-16 w-3 h-48 rounded-full z-40 animate-pulse"
                    style={{ backgroundColor: selectedDrink.color }}
                  />
                )}

                {/* Cup Rim Top Opening (Ellipse) */}
                <div
                  className="relative w-48 h-16 rounded-[50%] z-20 transition-all duration-500 shadow-lg flex items-center justify-center overflow-hidden"
                  style={{
                    backgroundColor: selectedFlavour.waferColor,
                    borderColor: selectedFlavour.waferBorder,
                    borderWidth: '8px',
                    borderStyle: 'solid'
                  }}
                >
                  {/* Inside of Cup (Liquid Surface) */}
                  <div
                    className={`w-full h-full rounded-[50%] transition-all duration-700 relative flex items-center justify-center ${
                      isFilled
                        ? `bg-gradient-to-r ${selectedDrink.liquidGradient}`
                        : 'bg-[#18110a] shadow-inner'
                    }`}
                  >
                    {isFilled && (
                      <>
                        {/* Latte Art / Chai Cream Swirl */}
                        <div
                          className="w-24 h-8 rounded-[50%] opacity-80 blur-[1px] transform rotate-12 flex items-center justify-center"
                          style={{ backgroundColor: selectedDrink.foamColor }}
                        >
                          <span className="text-[10px] font-black text-[#693910] tracking-tighter opacity-70">
                            ☕ Cup2Eat
                          </span>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Bite Cutouts */}
                  {bitesTaken >= 1 && (
                    <div className="absolute -top-1 -right-1 w-10 h-10 bg-[#0c1311] rounded-full border border-dashed border-[#dfa552]/40" />
                  )}
                  {bitesTaken >= 2 && (
                    <div className="absolute -top-2 left-4 w-9 h-9 bg-[#0c1311] rounded-full border border-dashed border-[#dfa552]/40" />
                  )}
                  {bitesTaken >= 3 && (
                    <div className="absolute top-2 right-12 w-8 h-8 bg-[#0c1311] rounded-full border border-dashed border-[#dfa552]/40" />
                  )}
                </div>

                {/* Cup Body (Trapezoid Wafer) */}
                <div
                  className="relative w-44 h-56 transition-all duration-500 -mt-6 shadow-2xl overflow-hidden flex flex-col justify-between p-4"
                  style={{
                    clipPath: 'polygon(5% 0%, 95% 0%, 82% 100%, 18% 100%)',
                    background: selectedFlavour.texturePattern,
                    borderColor: selectedFlavour.waferBorder,
                    boxShadow: 'inset 0 0 25px rgba(0,0,0,0.6)'
                  }}
                >
                  {/* Wafer grid waffle lines overlay */}
                  <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(0,0,0,0.15)_25%,transparent_25%),linear-gradient(-45deg,rgba(0,0,0,0.15)_25%,transparent_25%)] [background-size:16px_16px] pointer-events-none" />

                  {/* Embossed Brand Stamp on Cup */}
                  <div className="relative z-10 mx-auto my-auto text-center border-2 border-[#dfa552]/40 bg-black/25 px-3 py-2 rounded-xl backdrop-blur-sm">
                    <div className="text-[10px] font-black uppercase tracking-widest text-[#dfa552]">CUP 2 EAT</div>
                    <div className="text-[8px] uppercase tracking-wider text-white/80">100% EDIBLE</div>
                  </div>

                  {/* Liquid fill Level indicator overlay */}
                  {isFilled && (
                    <div
                      className={`absolute bottom-0 inset-x-0 h-4/5 bg-gradient-to-t ${selectedDrink.liquidGradient} opacity-30 pointer-events-none transition-all duration-1000`}
                    />
                  )}
                </div>

                {/* Shadow underneath cup */}
                <div className="w-48 h-6 bg-black/60 rounded-[50%] blur-md -mt-2 -z-10" />
              </div>

              {/* Information Strip under cup */}
              <div className="w-full grid grid-cols-3 gap-2 mt-6 pt-4 border-t border-white/10 text-center">
                <div>
                  <div className="text-xs text-[#a3b18a]">Flavour Profile</div>
                  <div className="text-sm font-bold text-white mt-0.5">{selectedFlavour.name}</div>
                </div>
                <div>
                  <div className="text-xs text-[#a3b18a]">Hot Endurance</div>
                  <div className="text-sm font-bold text-[#52b788] mt-0.5">Up to 85°C</div>
                </div>
                <div>
                  <div className="text-xs text-[#a3b18a]">After Beverage</div>
                  <div className="text-sm font-bold text-[#dfa552] mt-0.5">100% Edible Snack</div>
                </div>
              </div>

              {/* Instant Add to Cart for This Flavour */}
              <div className="w-full mt-6">
                <button
                  onClick={() => addToCart(wholesaleProduct, selectedFlavour.name, 1)}
                  className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-[#dfa552] to-[#b37d2a] hover:from-[#e5ae5b] hover:to-[#dfa552] text-[#12231c] font-black text-xs uppercase tracking-wider shadow-xl transition-all hover:scale-[1.02] active:scale-98 flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Order 396 Cups in {selectedFlavour.name} (₹3,999)</span>
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
