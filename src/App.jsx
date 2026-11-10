import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import InteractiveCupSimulator from './components/InteractiveCupSimulator';
import FlavourShowcase from './components/FlavourShowcase';
import ProductsSection from './components/ProductsSection';
import BulkOrderCalculator from './components/BulkOrderCalculator';
import EcoImpactCalculator from './components/EcoImpactCalculator';
import BrandCredentials from './components/BrandCredentials';
import SocialProofReels from './components/SocialProofReels';
import FaqSection from './components/FaqSection';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import FssaiModal from './components/FssaiModal';
import AdminPanel from './components/AdminPanel/AdminPanel';
import { Phone } from 'lucide-react';

function AppContent() {
  const { currentView, brandInfo } = useStore();

  if (currentView === 'admin') {
    return (
      <div className="min-h-screen bg-[#070d0a]">
        <AdminPanel />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0c1311] text-[#f4efe6] flex flex-col selection:bg-[#dfa552] selection:text-[#0c1311]">
      <Navbar />
      
      <main className="flex-1">
        <Hero />
        <InteractiveCupSimulator />
        <FlavourShowcase />
        <ProductsSection />
        <BulkOrderCalculator />
        <EcoImpactCalculator />
        <BrandCredentials />
        <SocialProofReels />
        <FaqSection />
      </main>

      <Footer />

      {/* Global Modals & Drawers */}
      <CartDrawer />
      <CheckoutModal />
      <FssaiModal />

      {/* Floating WhatsApp Action Pill */}
      <a
        href={`https://wa.me/${brandInfo.whatsappNumber}?text=Hi%20Cup2Eat!%20I%20am%20interested%20in%20ordering%20edible%20cups.`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-[#25D366] hover:bg-[#20ba59] text-white p-3.5 sm:px-4 sm:py-3 rounded-full shadow-2xl flex items-center gap-2.5 font-bold text-xs uppercase tracking-wider hover:scale-110 active:scale-95 transition-all border-2 border-white/20 group"
        title="Chat on WhatsApp with Founder"
      >
        <Phone className="w-5 h-5 fill-white group-hover:rotate-12 transition-transform" />
        <span className="hidden sm:inline">WhatsApp Order</span>
      </a>
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}
