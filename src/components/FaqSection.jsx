import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Phone, MessageSquare } from 'lucide-react';
import { useStore } from '../context/StoreContext';

const FAQS = [
  {
    q: "How long does the cup hold hot tea or coffee without leaking?",
    a: "Cup2Eat cups are scientifically baked with a dense natural grain wafer matrix that holds hot beverages up to 85°C for 40 to 45 minutes without any leakage or structural softening. You have plenty of time to enjoy your drink leisurely before taking your first crunchy bite!"
  },
  {
    q: "Is Cup2Eat 100% Vegetarian & FSSAI certified?",
    a: "Yes! Cup2Eat is 100% vegetarian, manufactured under strict Food Safety and Drug Administration regulations (FSSAI Registration #22725101003467). It contains zero animal products, gelatin, artificial plastic liners, or synthetic waxes."
  },
  {
    q: "What is the wholesale price and minimum order quantity?",
    a: "Our most popular wholesale carton contains 396 cups (100ml) priced at ₹3,999/- all-inclusive (only ~₹10.10 per cup) with FREE delivery all across India! For smaller trials, we offer a 72-cup café starter pack at ₹999."
  },
  {
    q: "What is the shelf life and storage requirement?",
    a: "Each cup has an airtight shelf life of 6 months from the date of manufacture. Store in a cool, dry place away from direct moisture, just like premium bakery biscuits."
  },
  {
    q: "Can I get custom logo embossing or branding for my café or wedding?",
    a: "Yes! For orders of 5,000 cups and above, we provide food-safe laser/mold wafer embossing with your café's logo or wedding couple monogram. Use our B2B Calculator above to request a sample."
  },
  {
    q: "How are the cups packaged to prevent breakage during transit?",
    a: "We use a proprietary 3-stage protective packaging system: vacuum-sealed food-grade inner sleeves, high-density shock-absorbing paper honeycombs, and a heavy-duty corrugated master box. In the rare case of any transit breakage, we offer 100% free immediate replacement."
  }
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);
  const { brandInfo } = useStore();

  return (
    <section className="py-20 bg-[#0c1311] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1b4332] border border-[#52b788]/40 text-[#a7f3d0] text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5 text-[#52b788]" />
            Everything You Need To Know
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-['Playfair_Display',serif] text-white">
            Frequently Asked <span className="gold-gradient-text">Questions</span>
          </h2>
          <p className="text-base text-[#d1c7b7]">
            Clear answers on durability, food safety compliance, shipping, and café adoption.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3.5">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl glass-card border border-white/10 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-white/5 transition-colors"
                >
                  <span className="text-sm sm:text-base font-bold text-white flex items-center gap-3">
                    <span className="text-xs font-mono text-[#dfa552]">0{idx + 1}.</span>
                    <span>{faq.q}</span>
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#dfa552] transition-transform duration-300 shrink-0 ${
                      isOpen ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#ccc3b5] leading-relaxed border-t border-white/5 bg-white/[0.02]">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions? */}
        <div className="mt-12 text-center p-6 rounded-2xl glass-panel border border-[#dfa552]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="text-sm font-bold text-white">Have a specific question about your location or bulk order?</h4>
            <p className="text-xs text-[#a3b18a] mt-0.5">Talk directly to founder Varun Khera on WhatsApp or Phone.</p>
          </div>
          <a
            href={`https://wa.me/${brandInfo.whatsappNumber}?text=Hi%20Varun!%20I%20have%20a%20question%20about%20Cup2Eat.`}
            target="_blank"
            rel="noreferrer"
            className="px-5 py-2.5 rounded-xl bg-[#1b4332] hover:bg-[#2d6a4f] text-[#d8f3dc] border border-[#52b788]/40 text-xs font-bold transition-all flex items-center gap-2 shrink-0"
          >
            <MessageSquare className="w-4 h-4 text-[#52b788]" />
            <span>Chat On WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  );
}
