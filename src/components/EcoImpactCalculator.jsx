import React, { useState } from 'react';
import { Leaf, Droplets, Trash2, Trees, ShieldAlert, Sparkles, ArrowRight } from 'lucide-react';

export default function EcoImpactCalculator() {
  const [dailyCups, setDailyCups] = useState(300);
  const [timeframe, setTimeframe] = useState(365); // days (1 year default)

  const totalCups = dailyCups * timeframe;
  const plasticWasteKg = Math.round(totalCups * 0.015); // ~15g plastic lining & wax per disposable cup
  const co2ReducedKg = Math.round(totalCups * 0.048);
  const treesSaved = (totalCups / 8000).toFixed(1);
  const landfillLiters = Math.round(totalCups * 0.12);

  return (
    <section id="impact" className="py-20 bg-gradient-to-b from-[#0c1311] via-[#14231b] to-[#0c1311] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1b4332] border border-[#52b788]/40 text-[#a7f3d0] text-xs font-bold uppercase tracking-wider">
            <Leaf className="w-3.5 h-3.5 text-[#52b788]" />
            Measurable Sustainability
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-['Playfair_Display',serif] text-white">
            Calculate Your <span className="gold-gradient-text">Zero Waste Impact</span>
          </h2>
          <p className="text-base text-[#d1c7b7]">
            Paper cups are deceptively green: nearly all are lined with non-biodegradable polyethylene plastic that sheds billions of microplastics into hot tea. Here is the difference you create with Cup2Eat:
          </p>
        </div>

        {/* Impact Playground */}
        <div className="max-w-4xl mx-auto p-8 rounded-3xl glass-panel border border-[#52b788]/30 shadow-2xl space-y-8">
          
          {/* Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold uppercase text-[#dfa552] tracking-wider">
                  Cups Served Per Day:
                </span>
                <span className="text-2xl font-black text-white font-mono">{dailyCups}</span>
              </div>
              <input
                type="range"
                min="50"
                max="2000"
                step="50"
                value={dailyCups}
                onChange={(e) => setDailyCups(Number(e.target.value))}
                className="w-full h-3 bg-[#1e382b] rounded-lg appearance-none cursor-pointer accent-[#52b788]"
              />
              <div className="flex justify-between text-[10px] text-[#8e877c] mt-1 font-mono">
                <span>50 cups</span>
                <span>500 cups</span>
                <span>1,000 cups</span>
                <span>2,000 cups/day</span>
              </div>
            </div>

            {/* Timeframe Buttons */}
            <div>
              <span className="text-xs font-bold uppercase text-[#dfa552] tracking-wider block mb-2">
                Impact Period:
              </span>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: '1 Month', days: 30 },
                  { label: '1 Year', days: 365 },
                  { label: '3 Years', days: 1095 }
                ].map(opt => (
                  <button
                    key={opt.days}
                    onClick={() => setTimeframe(opt.days)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                      timeframe === opt.days
                        ? 'bg-[#52b788] text-[#0d1613] shadow-lg'
                        : 'bg-white/5 text-[#d1c7b7] hover:bg-white/10'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            
            <div className="p-4 rounded-2xl bg-[#1b4332]/40 border border-[#52b788]/30 text-center space-y-1">
              <div className="w-10 h-10 rounded-full bg-[#1b4332] text-[#52b788] flex items-center justify-center mx-auto mb-2">
                <Trash2 className="w-5 h-5" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white font-mono">
                {plasticWasteKg.toLocaleString('en-IN')} <span className="text-xs font-normal text-[#a7f3d0]">kg</span>
              </div>
              <div className="text-[11px] text-[#ccc3b5]">Plastic Waste Prevented</div>
            </div>

            <div className="p-4 rounded-2xl bg-[#dfa552]/10 border border-[#dfa552]/30 text-center space-y-1">
              <div className="w-10 h-10 rounded-full bg-[#3d2314] text-[#dfa552] flex items-center justify-center mx-auto mb-2">
                <Leaf className="w-5 h-5" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white font-mono">
                {co2ReducedKg.toLocaleString('en-IN')} <span className="text-xs font-normal text-[#fef08a]">kg</span>
              </div>
              <div className="text-[11px] text-[#ccc3b5]">CO₂ Carbon Offset</div>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center space-y-1">
              <div className="w-10 h-10 rounded-full bg-white/10 text-[#a7f3d0] flex items-center justify-center mx-auto mb-2">
                <Trees className="w-5 h-5" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white font-mono">
                {treesSaved}
              </div>
              <div className="text-[11px] text-[#ccc3b5]">Trees Equivalent Saved</div>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/20 text-center space-y-1">
              <div className="w-10 h-10 rounded-full bg-emerald-900/60 text-emerald-400 flex items-center justify-center mx-auto mb-2">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-[#52b788] font-mono">
                {totalCups.toLocaleString('en-IN')}
              </div>
              <div className="text-[11px] text-[#ccc3b5]">Zero Landfill Cups</div>
            </div>

          </div>

          {/* Contrast Comparison */}
          <div className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-3">
            <h4 className="text-sm font-bold text-[#dfa552] flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-[#fbbf24]" />
              <span>Cup2Eat vs Standard Disposable Cups</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3 rounded-xl bg-red-950/20 border border-red-800/30 text-red-200 space-y-1">
                <div className="font-bold text-red-400">❌ Standard Paper / Plastic Cups:</div>
                <p className="text-[11px] leading-relaxed">
                  Lined with low-density polyethylene (LDPE). Exposes consumers to 25,000+ microplastic particles per 15-minute hot drink. Takes 30+ years to decompose in landfills.
                </p>
              </div>
              <div className="p-3 rounded-xl bg-[#1b4332]/40 border border-[#52b788]/40 text-emerald-200 space-y-1">
                <div className="font-bold text-emerald-400">✓ Cup2Eat Edible Wafer Cups:</div>
                <p className="text-[11px] leading-relaxed">
                  100% natural baked grain wafer. 0% plastic lining, 0% microplastics. 100% edible snack or degrades completely within days if discarded.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center pt-2">
            <a
              href="#products"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#52b788] to-[#2d6a4f] hover:from-[#6ee7b7] hover:to-[#52b788] text-[#0c1311] font-black text-xs uppercase tracking-wider shadow-xl hover:scale-105 active:scale-95 transition-all"
            >
              <span>Make The Sustainable Switch (Wholesale Carton ₹3,999)</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
