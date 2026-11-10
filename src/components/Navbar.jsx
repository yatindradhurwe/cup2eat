import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ShoppingBag, Phone, ShieldCheck, Sparkles, LayoutDashboard, Store, Menu, X } from 'lucide-react';

export default function Navbar() {
  const { cart, setIsCartOpen, currentView, setCurrentView, announcement, brandInfo } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const totalItemsCount = cart.reduce((acc, item) => acc + item.qty, 0);

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Announcement Bar */}
      {announcement.active && (
        <div className="bg-gradient-to-r from-[#1b3d2b] via-[#3a2212] to-[#1b3d2b] border-b border-[#dfa552]/30 text-xs md:text-sm py-2 px-4 text-center text-[#faedcd] flex items-center justify-center gap-2 font-medium">
          <Sparkles className="w-3.5 h-3.5 text-[#f59e0b] animate-pulse" />
          <span>{announcement.text}</span>
          {announcement.linkText && (
            <a
              href={announcement.linkTarget}
              className="underline font-bold text-[#fef08a] hover:text-white ml-2 inline-flex items-center"
            >
              {announcement.linkText} &rarr;
            </a>
          )}
        </div>
      )}

      {/* Main Navigation Bar */}
      <nav className="glass-panel border-b border-[#d4a373]/20 shadow-2xl backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo & Brand Identity */}
          <div className="flex items-center gap-3">
            <a href="#" className="flex items-center gap-3 group">
              <div className="relative w-12 h-12 rounded-full p-0.5 bg-gradient-to-tr from-[#dfa552] via-[#2d6a4f] to-[#f4d35e] shadow-lg group-hover:scale-105 transition-transform">
                <div className="w-full h-full rounded-full bg-[#0d1e16] flex flex-col items-center justify-center border border-[#d4a373]/40">
                  <span className="text-[9px] font-black tracking-widest text-[#dfa552] leading-none">CUP</span>
                  <span className="text-[12px] font-extrabold text-[#52b788] leading-none my-0.5">2</span>
                  <span className="text-[9px] font-black tracking-widest text-[#dfa552] leading-none">EAT</span>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-['Playfair_Display',serif] text-2xl font-bold tracking-tight text-white group-hover:text-[#dfa552] transition-colors">
                    Cup<span className="text-[#52b788]">2</span>Eat
                  </span>
                  <span className="bg-[#2d6a4f]/50 border border-[#52b788]/40 text-[#a7f3d0] text-[10px] font-semibold px-1.5 py-0.5 rounded-full flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-ping" />
                    Edible
                  </span>
                </div>
                <span className="text-[11px] text-[#d4a373] tracking-wider uppercase font-medium">
                  Eat Your Drink! ☕🍨
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center space-x-7 text-sm font-medium text-[#e2d9cc]">
            <a href="#simulator" className="hover:text-[#dfa552] transition-colors flex items-center gap-1.5">
              <span>Sip Simulator</span>
              <span className="text-[10px] bg-[#d4a373]/20 text-[#fef08a] px-1.5 py-0.2 rounded font-mono">3D</span>
            </a>
            <a href="#flavours" className="hover:text-[#dfa552] transition-colors">Flavours</a>
            <a href="#products" className="hover:text-[#dfa552] transition-colors">Wholesale & Packs</a>
            <a href="#b2b-calc" className="hover:text-[#dfa552] transition-colors">B2B Calculator</a>
            <a href="#impact" className="hover:text-[#dfa552] transition-colors">Eco Impact</a>
            <a href="#credentials" className="hover:text-[#dfa552] transition-colors flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-[#52b788]" />
              <span>FSSAI License</span>
            </a>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            {/* WhatsApp Quick Order button */}
            <a
              href={`https://wa.me/${brandInfo.whatsappNumber}?text=Hi%20Cup2Eat!%20I%20am%20interested%20in%20ordering%20your%20edible%20cups.`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 bg-[#1b4332] hover:bg-[#2d6a4f] text-[#d8f3dc] border border-[#52b788]/40 px-3.5 py-2 rounded-xl text-xs font-semibold shadow-md transition-all hover:scale-105"
            >
              <Phone className="w-3.5 h-3.5 text-[#52b788]" />
              <span>+91 9818192575</span>
            </a>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-xl bg-gradient-to-br from-[#2a1e17] to-[#12231c] border border-[#dfa552]/40 text-[#fef08a] hover:border-[#dfa552] hover:scale-105 transition-all shadow-lg"
              title="View Cart & Checkout"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItemsCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#dfa552] text-[#12231c] font-black text-xs w-5 h-5 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                  {totalItemsCount}
                </span>
              )}
            </button>

            {/* Admin Switcher Toggle */}
            <button
              onClick={() => setCurrentView(currentView === 'store' ? 'admin' : 'store')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all shadow-md ${
                currentView === 'admin'
                  ? 'bg-gradient-to-r from-[#dfa552] to-[#b37d2a] text-[#0d1613] shadow-amber-500/20'
                  : 'bg-[#192b23] hover:bg-[#253f34] text-[#9ae6b4] border border-[#52b788]/30'
              }`}
            >
              {currentView === 'admin' ? (
                <>
                  <Store className="w-4 h-4" />
                  <span>Customer View</span>
                </>
              ) : (
                <>
                  <LayoutDashboard className="w-4 h-4 text-[#52b788]" />
                  <span>Admin Panel</span>
                </>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#e2d9cc] hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0e1814] border-b border-[#d4a373]/20 px-4 pt-3 pb-6 space-y-3">
            <a
              href="#simulator"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-[#fef08a] py-2 border-b border-white/5 font-semibold"
            >
              ☕ 3D Sip & Pour Simulator
            </a>
            <a
              href="#flavours"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-[#e2d9cc] py-2 border-b border-white/5"
            >
              Our 3 Delicious Flavours
            </a>
            <a
              href="#products"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-[#e2d9cc] py-2 border-b border-white/5"
            >
              Wholesale Cartons (₹3,999 for 396)
            </a>
            <a
              href="#b2b-calc"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-[#e2d9cc] py-2 border-b border-white/5"
            >
              B2B Cafe & Event Calculator
            </a>
            <a
              href="#credentials"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-[#e2d9cc] py-2 border-b border-white/5"
            >
              FSSAI Registration & Story
            </a>
            <a
              href={`https://wa.me/${brandInfo.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-[#1b4332] py-2.5 rounded-lg text-emerald-200 font-bold text-sm mt-3"
            >
              <Phone className="w-4 h-4" />
              <span>Direct WhatsApp: +91 9818192575</span>
            </a>
          </div>
        )}
      </nav>
    </header>
  );
}
