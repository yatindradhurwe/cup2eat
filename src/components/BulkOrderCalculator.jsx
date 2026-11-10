import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Calculator, CheckCircle, Send, Phone, Building, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function BulkOrderCalculator() {
  const { addLead, brandInfo } = useStore();
  const [cupsCount, setCupsCount] = useState(2500);
  const [includeCustomStamp, setIncludeCustomStamp] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Form fields
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    phone: '',
    city: '',
    preferredFlavour: 'Assorted Mix'
  });

  // Calculate pricing tier
  let ratePerCup = 10.10;
  let tierDiscountName = 'Standard Wholesale';
  if (cupsCount >= 10000) {
    ratePerCup = 7.99;
    tierDiscountName = 'Enterprise Partner Tier (21% Off)';
  } else if (cupsCount >= 5000) {
    ratePerCup = 8.75;
    tierDiscountName = 'Commercial Roastery Tier (13% Off)';
  } else if (cupsCount >= 1500) {
    ratePerCup = 9.40;
    tierDiscountName = 'Active Café Tier (7% Off)';
  }

  const estimatedTotal = Math.round(cupsCount * ratePerCup);
  const plasticCupsSaved = cupsCount;
  const carbonOffsetKg = Math.round(cupsCount * 0.045); // ~45g CO2 saved per disposable plastic-lined paper cup

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    addLead({
      name: formData.name,
      businessName: formData.businessName || 'Undisclosed Cafe/Business',
      phone: formData.phone,
      city: formData.city || 'India',
      estimatedMonthlyCups: `${cupsCount.toLocaleString('en-IN')} cups/mo (${formData.preferredFlavour})`,
      notes: `Estimated quote: ₹${estimatedTotal.toLocaleString('en-IN')}. Custom stamp: ${includeCustomStamp ? 'Yes' : 'No'}.`
    });

    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.7 }
    });

    setSubmitted(true);
  };

  const handleWhatsAppQuote = () => {
    const text = `Hi Cup2Eat team! I calculated a wholesale quote on your website:\n- Business: ${formData.businessName || 'Café / Caterer'}\n- Volume: ${cupsCount.toLocaleString('en-IN')} cups/month\n- Preferred Flavour: ${formData.preferredFlavour}\n- Custom Stamp: ${includeCustomStamp ? 'Yes' : 'No'}\n- Estimated Quote: ₹${estimatedTotal.toLocaleString('en-IN')}\n\nPlease share your wholesale catalog and dispatch timeline!`;
    window.open(`https://wa.me/${brandInfo.whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="b2b-calc" className="py-20 bg-gradient-to-b from-[#0c1311] via-[#101e18] to-[#0c1311] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1b4332] border border-[#52b788]/40 text-[#a7f3d0] text-xs font-bold uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5 text-[#52b788]" />
            B2B Commercial Pricing Engine
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-['Playfair_Display',serif] text-white">
            Custom Volume & <span className="gold-gradient-text">Café Quote</span>
          </h2>
          <p className="text-base text-[#d1c7b7]">
            Calculate your custom tiered pricing, see your environmental savings, and get in touch with our founder Varun Khera directly.
          </p>
        </div>

        {/* Calculator Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Slider & Tier Display (Col 7) */}
          <div className="lg:col-span-7 p-8 rounded-3xl glass-panel border border-[#dfa552]/30 shadow-2xl flex flex-col justify-between space-y-6">
            
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase text-[#dfa552] tracking-wider">
                  Select Estimated Monthly Consumption:
                </span>
                <span className="text-2xl font-black text-white font-mono">
                  {cupsCount.toLocaleString('en-IN')} <span className="text-xs text-[#a3b18a] font-normal">Cups</span>
                </span>
              </div>

              {/* Range Slider */}
              <input
                type="range"
                min="500"
                max="25000"
                step="500"
                value={cupsCount}
                onChange={(e) => setCupsCount(Number(e.target.value))}
                className="w-full h-3 bg-[#1e382b] rounded-lg appearance-none cursor-pointer accent-[#dfa552]"
              />

              <div className="flex justify-between text-[11px] text-[#8e877c] mt-2 font-mono">
                <span>500 cups (Starter)</span>
                <span>5,000 cups</span>
                <span>15,000 cups</span>
                <span>25,000+ cups (Franchise)</span>
              </div>
            </div>

            {/* Calculated Tier Box */}
            <div className="p-5 rounded-2xl bg-[#091510] border border-[#52b788]/30 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#52b788] font-bold uppercase tracking-wider block">
                    {tierDiscountName}
                  </span>
                  <div className="text-3xl font-black text-white mt-1">
                    ₹{ratePerCup.toFixed(2)} <span className="text-xs text-[#d1c7b7] font-normal">/ cup</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-[#a3b18a] block">Estimated Total</span>
                  <div className="text-2xl font-black text-[#dfa552] mt-1">
                    ₹{estimatedTotal.toLocaleString('en-IN')}
                  </div>
                </div>
              </div>

              {/* Value Addons */}
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/10 text-xs">
                <div className="flex items-center gap-2 text-[#d8f3dc]">
                  <CheckCircle className="w-4 h-4 text-[#52b788]" />
                  <span>Free All-India Freight</span>
                </div>
                <div className="flex items-center gap-2 text-[#d8f3dc]">
                  <CheckCircle className="w-4 h-4 text-[#52b788]" />
                  <span>6-Month Shelf Life</span>
                </div>
                <div className="flex items-center gap-2 text-[#d8f3dc]">
                  <CheckCircle className="w-4 h-4 text-[#52b788]" />
                  <span>Vacuum Sealed Cartons</span>
                </div>
                <div className="flex items-center gap-2 text-[#d8f3dc]">
                  <CheckCircle className="w-4 h-4 text-[#52b788]" />
                  <span>Food Safety FSSAI Certified</span>
                </div>
              </div>

              {/* Custom Logo Toggle */}
              <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white">Custom Logo Wafer Embossing</div>
                  <div className="text-[10px] text-[#a3b18a]">Emboss your café or event brand name directly onto each cup</div>
                </div>
                <input
                  type="checkbox"
                  checked={includeCustomStamp}
                  onChange={(e) => setIncludeCustomStamp(e.target.checked)}
                  className="w-5 h-5 rounded accent-[#dfa552] cursor-pointer"
                />
              </div>
            </div>

            {/* Environmental Savings from this volume */}
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="p-3 rounded-xl bg-[#1b4332]/30 border border-[#52b788]/20">
                <div className="text-xl font-black text-[#52b788]">{plasticCupsSaved.toLocaleString('en-IN')}</div>
                <div className="text-[10px] text-[#d8f3dc]">Single-use cups eliminated</div>
              </div>
              <div className="p-3 rounded-xl bg-[#dfa552]/10 border border-[#dfa552]/20">
                <div className="text-xl font-black text-[#dfa552]">{carbonOffsetKg.toLocaleString('en-IN')} kg</div>
                <div className="text-[10px] text-[#faedcd]">Carbon footprint reduced</div>
              </div>
            </div>

          </div>

          {/* Inquiry Form Column (Col 5) */}
          <div className="lg:col-span-5 p-8 rounded-3xl glass-card border border-[#dfa552]/30 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Building className="w-5 h-5 text-[#dfa552]" />
                <h3 className="text-xl font-bold font-['Playfair_Display',serif] text-white">
                  Request B2B Wholesale Proposal
                </h3>
              </div>
              <p className="text-xs text-[#a3b18a] mb-6">
                Receive official quotation, sample box, and contract terms directly to your WhatsApp & Email.
              </p>

              {submitted ? (
                <div className="p-6 rounded-2xl bg-[#1b4332]/60 border border-[#52b788] text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-[#52b788] text-[#0d1613] flex items-center justify-center mx-auto text-2xl font-bold">
                    ✓
                  </div>
                  <h4 className="text-lg font-bold text-white">Quote Request Received!</h4>
                  <p className="text-xs text-[#d8f3dc] leading-relaxed">
                    Thank you, <strong>{formData.name}</strong>. Founder Varun Khera and the Cup2Eat commercial team will reach out to you within 2 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs text-[#fef08a] underline font-bold mt-2"
                  >
                    Submit another requirement
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  <div>
                    <label className="text-[11px] font-bold text-[#dfa552] uppercase block mb-1">
                      Your Name / Representative *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Varun or Chef Rohan"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#12221b] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#dfa552]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-[#dfa552] uppercase block mb-1">
                      Café / Restaurant / Business Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Aroma Artisan Café"
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      className="w-full bg-[#12221b] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#dfa552]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-bold text-[#dfa552] uppercase block mb-1">
                        Phone / WhatsApp *
                      </label>
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
                      <label className="text-[11px] font-bold text-[#dfa552] uppercase block mb-1">
                        City / State
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Ghaziabad / Delhi"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full bg-[#12221b] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#dfa552]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-[#dfa552] uppercase block mb-1">
                      Preferred Flavour Split
                    </label>
                    <select
                      value={formData.preferredFlavour}
                      onChange={(e) => setFormData({ ...formData, preferredFlavour: e.target.value })}
                      className="w-full bg-[#12221b] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#dfa552]"
                    >
                      <option value="Assorted Mix">Assorted Mix (Chocolate + Vanilla + Elaichi)</option>
                      <option value="Chocolate Heavy">70% Chocolate / 30% Vanilla</option>
                      <option value="Desi Elaichi Special">Desi Elaichi Heavy (Chai Special)</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#dfa552] via-[#e5ae5b] to-[#b37d2a] hover:from-[#e5ae5b] hover:to-[#dfa552] text-[#12231c] font-black text-xs uppercase tracking-wider shadow-xl transition-all hover:scale-[1.02] active:scale-98 flex items-center justify-center gap-2 mt-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Wholesale Inquiry</span>
                  </button>
                </form>
              )}
            </div>

            <div className="pt-4 border-t border-white/10 mt-4">
              <button
                onClick={handleWhatsAppQuote}
                className="w-full py-2.5 rounded-xl bg-[#1b4332] hover:bg-[#2d6a4f] text-[#d8f3dc] border border-[#52b788]/40 text-xs font-bold transition-all flex items-center justify-center gap-2"
              >
                <Phone className="w-3.5 h-3.5 text-[#52b788]" />
                <span>Quick WhatsApp Chat with Varun Khera</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
