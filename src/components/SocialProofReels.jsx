import React, { useState } from 'react';
import { REVIEWS, BRAND_INFO } from '../data/initialData';
import { Star, CheckCircle, Sparkles, MessageCircle, ArrowRight } from 'lucide-react';
import { InstagramIcon } from './Icons';

const HIGHLIGHT_STORIES = [
  {
    title: "Order Prepared",
    subtitle: "Fresh Batch Baked Daily",
    image: "/assets/images/fssai_story.jpg",
    tag: "Batch 2026-B"
  },
  {
    title: "Safety Packing",
    subtitle: "Hygienic Sealed Sleeves",
    image: "/assets/images/fssai_story.jpg",
    tag: "Food Grade"
  },
  {
    title: "Free Delivery IN",
    subtitle: "Pan-India Free Express",
    image: "/assets/images/poster_wholesale.jpg",
    tag: "Doorstep"
  },
  {
    title: "FSSAI Registered",
    subtitle: "Govt. of UP Certified",
    image: "/assets/images/fssai_story.jpg",
    tag: "Certified"
  }
];

export default function SocialProofReels() {
  const [activeTab, setActiveTab] = useState('testimonials');

  return (
    <section className="py-20 bg-[#09110e] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#dfa552]/10 border border-[#dfa552]/30 text-[#fef08a] text-xs font-bold uppercase tracking-widest">
            <InstagramIcon className="w-3.5 h-3.5 text-[#fbbf24]" />
            Instagram & Cafe Love
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-['Playfair_Display',serif] text-white">
            Loved By <span className="gold-gradient-text">Cafés & Foodies</span>
          </h2>
          <p className="text-base text-[#d1c7b7]">
            Join over 1,000+ cafés, restaurants, catering events, and eco-conscious beverage lovers across India.
          </p>
        </div>

        {/* Stories Bar */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#dfa552]">
              Instagram Live Highlights @cup2eat
            </span>
            <a
              href={BRAND_INFO.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="text-xs text-[#52b788] hover:text-[#a7f3d0] flex items-center gap-1 font-semibold"
            >
              <span>Follow on Instagram</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {HIGHLIGHT_STORIES.map((story, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl glass-card border border-white/10 hover:border-[#dfa552]/40 transition-all group flex flex-col justify-between"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full p-0.5 bg-gradient-to-tr from-[#dfa552] to-[#52b788]">
                    <div className="w-full h-full rounded-full bg-[#0c1311] flex items-center justify-center text-[10px] font-bold text-white">
                      ☕
                    </div>
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-xs font-bold text-white truncate">{story.title}</div>
                    <div className="text-[10px] text-[#a3b18a] truncate">{story.subtitle}</div>
                  </div>
                </div>

                <div className="rounded-xl overflow-hidden aspect-[4/3] bg-black/40 border border-white/5 relative">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded text-[9px] text-[#52b788] font-bold uppercase">
                    {story.tag}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Verified Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((rev, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl glass-panel border border-white/10 hover:border-[#52b788]/40 transition-all flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center gap-1 text-[#fbbf24] text-sm mb-3">
                  {"★".repeat(rev.rating)}
                  <span className="text-xs text-white/70 ml-2 font-mono">5.0 / 5.0</span>
                </div>
                <p className="text-sm text-[#e0ded9] italic leading-relaxed">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-white flex items-center gap-1.5">
                    <span>{rev.name}</span>
                    <CheckCircle className="w-3.5 h-3.5 text-[#52b788]" />
                  </div>
                  <div className="text-[11px] text-[#a3b18a]">{rev.role}</div>
                  <div className="text-[10px] text-[#777]">{rev.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner with Instagram handle */}
        <div className="mt-12 text-center p-6 rounded-2xl glass-card border border-[#dfa552]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <InstagramIcon className="w-8 h-8 text-[#dfa552]" />
            <div className="text-left">
              <div className="text-base font-bold text-white">Join the #Cup2Eat Movement</div>
              <div className="text-xs text-[#a3b18a]">Tag @cup2eat in your cafe reels to be featured on our page!</div>
            </div>
          </div>
          <a
            href={BRAND_INFO.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-pink-600 via-rose-500 to-amber-500 text-white text-xs font-bold uppercase tracking-wider hover:opacity-95 transition-opacity"
          >
            Visit Instagram @cup2eat
          </a>
        </div>

      </div>
    </section>
  );
}
