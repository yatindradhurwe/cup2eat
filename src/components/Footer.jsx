import React from 'react';
import { useStore } from '../context/StoreContext';
import { Phone, Mail, MapPin, ShieldCheck, Heart, Sparkles, LayoutDashboard } from 'lucide-react';
import { InstagramIcon } from './Icons';

export default function Footer() {
  const { brandInfo, setIsFssaiModalOpen, setCurrentView } = useStore();

  return (
    <footer className="bg-[#070d0a] border-t border-[#dfa552]/20 pt-16 pb-10 text-[#d1c7b7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-column footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          
          {/* Col 1: Brand & Founder */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full p-0.5 bg-gradient-to-tr from-[#dfa552] to-[#52b788]">
                <div className="w-full h-full rounded-full bg-[#0d1e16] flex items-center justify-center font-black text-xs text-[#dfa552]">
                  C2E
                </div>
              </div>
              <span className="font-['Playfair_Display',serif] text-2xl font-bold text-white">
                Cup<span className="text-[#52b788]">2</span>Eat
              </span>
            </div>

            <p className="text-xs text-[#a3b18a] leading-relaxed">
              Eat Your Drink! India’s premier crispy edible wafer cups designed to eliminate millions of single-use disposable cups from cafés, weddings, and events.
            </p>

            <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-xs text-[#fef08a] space-y-1">
              <div>Founder: <strong className="text-white">{brandInfo.founder}</strong></div>
              <div>FSSAI Reg: <strong className="text-white">{brandInfo.fssaiNumber}</strong></div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              Explore Products
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#products" className="hover:text-[#dfa552] transition-colors flex items-center gap-1.5">
                  <span>Wholesale Master Carton (396 Cups)</span>
                  <span className="text-[10px] bg-[#dfa552]/20 text-[#fef08a] px-1 rounded">₹3,999</span>
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-[#dfa552] transition-colors">
                  Café Trial Starter Pack (72 Cups)
                </a>
              </li>
              <li>
                <a href="#flavours" className="hover:text-[#dfa552] transition-colors">
                  Rich Cocoa Chocolate Cups
                </a>
              </li>
              <li>
                <a href="#flavours" className="hover:text-[#dfa552] transition-colors">
                  Golden Sweet Vanilla Cups
                </a>
              </li>
              <li>
                <a href="#flavours" className="hover:text-[#dfa552] transition-colors">
                  Royal Desi Elaichi (Cardamom)
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Sustainability & Tools */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              Interactive Tools
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#simulator" className="hover:text-[#dfa552] transition-colors">
                  ☕ 3D Sip & Pour Simulator
                </a>
              </li>
              <li>
                <a href="#b2b-calc" className="hover:text-[#dfa552] transition-colors">
                  📊 B2B Cafe Volume Discount Calculator
                </a>
              </li>
              <li>
                <a href="#impact" className="hover:text-[#dfa552] transition-colors">
                  🌱 Zero-Waste Carbon Offset Calculator
                </a>
              </li>
              <li>
                <button
                  onClick={() => setIsFssaiModalOpen(true)}
                  className="hover:text-[#52b788] transition-colors flex items-center gap-1 text-left"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#52b788]" />
                  <span>Inspect UP Govt. FSSAI License</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentView('admin');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#dfa552] transition-colors flex items-center gap-1 text-left font-bold text-[#dfa552]"
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span>Open Merchant Admin Panel</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Official Contact */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              Direct Contact
            </h4>
            <div className="space-y-2.5 text-xs">
              <a
                href={`https://wa.me/${brandInfo.whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 text-[#52b788] shrink-0" />
                <span>+91 {brandInfo.phone}</span>
              </a>

              <a
                href={brandInfo.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <InstagramIcon className="w-4 h-4 text-[#dfa552] shrink-0" />
                <span>Instagram: {brandInfo.instagram}</span>
              </a>

              <div className="flex items-start gap-2 text-[#aaa]">
                <MapPin className="w-4 h-4 text-[#52b788] shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  {brandInfo.address}
                </span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={`https://wa.me/${brandInfo.whatsappNumber}?text=Hi%20Varun!%20I%20want%20to%20place%20an%20order.`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1b4332] text-[#d8f3dc] text-xs font-bold hover:bg-[#2d6a4f] transition-all"
              >
                <span>Instant WhatsApp Order</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#888] gap-4">
          <div>
            &copy; {new Date().getFullYear()} <strong>Cup2Eat</strong>. All rights reserved. Registered under FSS Act, 2006.
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[#a7f3d0]">Free Pan-India Delivery 🇮🇳</span>
            <span>•</span>
            <span className="text-[#dfa552]">Zero Landfill Waste ♻️</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
