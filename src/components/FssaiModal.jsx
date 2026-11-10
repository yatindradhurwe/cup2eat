import React from 'react';
import { useStore } from '../context/StoreContext';
import { X, ShieldCheck, CheckCircle2, Download, Printer } from 'lucide-react';

export default function FssaiModal() {
  const { isFssaiModalOpen, setIsFssaiModalOpen, brandInfo } = useStore();

  if (!isFssaiModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-3xl bg-[#0c1612] border border-[#52b788]/50 rounded-3xl shadow-2xl overflow-hidden my-8">
        
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-[#12241b]">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-6 h-6 text-[#52b788]" />
            <div>
              <h3 className="text-base font-bold text-white font-['Playfair_Display',serif]">
                Official FSSAI Food Safety Registration Certificate
              </h3>
              <p className="text-[11px] text-[#a7f3d0]">
                Food Safety and Standards Authority of India • Govt. of Uttar Pradesh
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsFssaiModalOpen(false)}
            className="p-1.5 rounded-lg text-[#aaa] hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Certificate Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
          
          {/* Certificate Quick Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-white/5 border border-white/5">
              <span className="text-[#a3b18a] block text-[10px] uppercase font-mono">FSSAI Number</span>
              <span className="font-mono font-bold text-white text-sm">{brandInfo.fssaiNumber}</span>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/5">
              <span className="text-[#a3b18a] block text-[10px] uppercase font-mono">Business Category</span>
              <span className="font-bold text-[#52b788]">Wholesaler & Retailer</span>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/5">
              <span className="text-[#a3b18a] block text-[10px] uppercase font-mono">Jurisdiction</span>
              <span className="font-bold text-white">Ghaziabad, Uttar Pradesh</span>
            </div>
          </div>

          {/* Certificate Scan from user images */}
          <div className="rounded-2xl overflow-hidden border border-[#52b788]/40 bg-white p-2 shadow-2xl">
            <img
              src="/assets/images/fssai_story.jpg"
              alt="FSSAI Registration Certificate"
              className="w-full h-auto object-contain max-h-[500px] mx-auto rounded-xl"
            />
          </div>

          {/* Verification Details */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-[#ccc3b5] space-y-2">
            <div className="font-bold text-[#fef08a] flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#52b788]" />
              <span>Legally Verified Food Business Operator:</span>
            </div>
            <p>
              Address: <strong>{brandInfo.address}</strong>
            </p>
            <p>
              Act: <strong>Food Safety and Standards Act, 2006 (FSSA)</strong>
            </p>
            <p className="text-[11px] text-[#999]">
              This registration is instantly accessible on the official FoSCoS portal (Government of India) using registration number <strong>{brandInfo.fssaiNumber}</strong>.
            </p>
          </div>

          {/* Modal Actions */}
          <div className="flex gap-3 justify-end pt-2">
            <button
              onClick={() => window.print()}
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-2"
            >
              <Printer className="w-4 h-4" />
              <span>Print Certificate Copy</span>
            </button>
            <button
              onClick={() => setIsFssaiModalOpen(false)}
              className="px-6 py-2.5 rounded-xl bg-[#2d6a4f] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#3d8c68]"
            >
              Close
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
