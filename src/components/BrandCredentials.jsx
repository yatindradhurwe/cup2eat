import React from 'react';
import { useStore } from '../context/StoreContext';
import { ShieldCheck, Award, Box, Truck, FileText, CheckCircle2, ExternalLink } from 'lucide-react';

export default function BrandCredentials() {
  const { setIsFssaiModalOpen, brandInfo } = useStore();

  return (
    <section id="credentials" className="py-20 bg-[#0c1311] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1b4332] border border-[#52b788]/40 text-[#a7f3d0] text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-[#52b788]" />
            Trust, Compliance & Quality
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-['Playfair_Display',serif] text-white">
            100% Certified, <span className="gold-gradient-text">Award Winning</span>
          </h2>
          <p className="text-base text-[#d1c7b7]">
            Every Cup2Eat wafer cup is manufactured in a certified, hygienic facility complying with strict Food Safety and Standards Authority of India (FSSAI) guidelines.
          </p>
        </div>

        {/* Credentials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          
          {/* Card 1: FSSAI Certificate */}
          <div className="p-7 rounded-3xl glass-card border border-[#52b788]/30 hover:border-[#52b788] transition-all flex flex-col justify-between group">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#1b4332] border border-[#52b788]/50 flex items-center justify-center text-white mb-5 shadow-lg group-hover:scale-105 transition-transform">
                <FileText className="w-7 h-7 text-[#52b788]" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#52b788] block mb-1">
                Govt. Registered Food Operator
              </span>
              <h3 className="text-xl font-bold font-['Playfair_Display',serif] text-white mb-2">
                FSSAI License Certificate
              </h3>
              <p className="text-xs text-[#ccc3b5] leading-relaxed mb-4">
                Registered under the Department of Food Safety and Drug Administration, Government of Uttar Pradesh under the FSS Act, 2006.
              </p>
              
              <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-xs space-y-1 font-mono text-[#a3b18a]">
                <div>Reg No: <span className="text-white font-bold">{brandInfo.fssaiNumber}</span></div>
                <div>Location: <span className="text-white">Indirapuram, Ghaziabad (UP)</span></div>
              </div>
            </div>

            <button
              onClick={() => setIsFssaiModalOpen(true)}
              className="mt-6 w-full py-2.5 rounded-xl bg-[#1b4332] hover:bg-[#2d6a4f] text-[#d8f3dc] border border-[#52b788]/40 text-xs font-bold transition-all flex items-center justify-center gap-2"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Inspect FSSAI Certificate</span>
            </button>
          </div>

          {/* Card 2: 1st Position Award & Mahakumbh */}
          <div className="p-7 rounded-3xl glass-card border border-[#dfa552]/30 hover:border-[#dfa552] transition-all flex flex-col justify-between group">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#3d2314] border border-[#dfa552]/50 flex items-center justify-center text-white mb-5 shadow-lg group-hover:scale-105 transition-transform">
                <Award className="w-7 h-7 text-[#fbbf24]" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#dfa552] block mb-1">
                Recognized Innovation
              </span>
              <h3 className="text-xl font-bold font-['Playfair_Display',serif] text-white mb-2">
                Startup Awards & Showcases
              </h3>
              <p className="text-xs text-[#ccc3b5] leading-relaxed mb-4">
                Awarded <strong>1st Position</strong> in the Inter-Institutional Business Plan Competition at IPEM College for revolutionary eco-packaging. Selected for the prestigious <strong>Startup Mahakumbh</strong> at Bharat Mandapam, New Delhi.
              </p>

              <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-xs space-y-1 text-[#faedcd]">
                <div>Founder: <strong className="text-white">Varun Khera</strong></div>
                <div>Mission: <strong className="text-white">Zero Single-Use Waste Across India</strong></div>
              </div>
            </div>

            <a
              href="https://www.instagram.com/cup2eat"
              target="_blank"
              rel="noreferrer"
              className="mt-6 w-full py-2.5 rounded-xl bg-[#3d2314] hover:bg-[#54321c] text-[#fef08a] border border-[#dfa552]/40 text-xs font-bold transition-all flex items-center justify-center gap-2"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>View Awards on Instagram</span>
            </a>
          </div>

          {/* Card 3: Safety Packaging & All-India Delivery */}
          <div className="p-7 rounded-3xl glass-card border border-white/10 hover:border-[#52b788]/40 transition-all flex flex-col justify-between group">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#152720] border border-white/20 flex items-center justify-center text-white mb-5 shadow-lg group-hover:scale-105 transition-transform">
                <Box className="w-7 h-7 text-[#52b788]" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#a7f3d0] block mb-1">
                Zero Transit Breakage
              </span>
              <h3 className="text-xl font-bold font-['Playfair_Display',serif] text-white mb-2">
                Vacuum Safety Packing
              </h3>
              <p className="text-xs text-[#ccc3b5] leading-relaxed mb-4">
                Packaged in food-grade multi-layer sealed sleeves with cushioned air chambers. Every wholesale carton is guaranteed to reach your café intact, crisp, and fresh.
              </p>

              <div className="space-y-1.5 text-xs text-[#e2ded6]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#52b788]" />
                  <span>Moisture-proof foil barrier</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#52b788]" />
                  <span>Doorstep delivery via DTDC / BlueDart</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#52b788]" />
                  <span>Replacement guarantee for transit damage</span>
                </div>
              </div>
            </div>

            <a
              href="#products"
              className="mt-6 w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 text-xs font-bold transition-all flex items-center justify-center gap-2"
            >
              <Truck className="w-3.5 h-3.5 text-[#52b788]" />
              <span>Order Wholesale with Free Freight</span>
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
