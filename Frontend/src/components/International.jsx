import React from "react";
import { Globe, Shield, Zap, ArrowRight } from "lucide-react";

const International = () => {
  return (
    <div className="min-h-screen bg-carbon text-white pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Hero Section */}
        <div className="mb-24">
          <span className="text-copper font-body tracking-[0.5em] text-xs uppercase mb-4 block font-bold">Global Presence</span>
          <h1 className="font-heading text-6xl md:text-9xl uppercase leading-none mb-8">
            Beyond <span className="text-transparent outline-title">Borders</span>
          </h1>
          <p className="font-text text-steel-dim text-lg md:text-xl max-w-2xl">
            BUC India is expanding its horizon. Join the elite global network of riders who push limits and redefine brotherhood across continents.
          </p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-32">
          <div className="p-10 border border-white/5 bg-carbon-light relative group hover:border-copper/30 transition-all duration-500">
            <Globe className="text-copper mb-8 group-hover:scale-110 transition-transform duration-500" size={40} />
            <h3 className="font-heading text-3xl uppercase mb-4">Global Network</h3>
            <p className="font-text text-steel-dim text-sm leading-relaxed">
              Connect with international chapters and experience the thrill of riding in diverse terrains across the globe.
            </p>
          </div>
          <div className="p-10 border border-white/5 bg-carbon-light relative group hover:border-copper/30 transition-all duration-500">
            <Shield className="text-copper mb-8 group-hover:scale-110 transition-transform duration-500" size={40} />
            <h3 className="font-heading text-3xl uppercase mb-4">Cross-Border Support</h3>
            <p className="font-text text-steel-dim text-sm leading-relaxed">
              Our global logistics and support network ensures you're never alone, no matter where your adventure takes you.
            </p>
          </div>
          <div className="p-10 border border-white/5 bg-carbon-light relative group hover:border-copper/30 transition-all duration-500">
            <Zap className="text-copper mb-8 group-hover:scale-110 transition-transform duration-500" size={40} />
            <h3 className="font-heading text-3xl uppercase mb-4">International Rallies</h3>
            <p className="font-text text-steel-dim text-sm leading-relaxed">
              Exclusive early access to world-renowned motorcycle rallies and events for our premium global members.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="relative h-[60vh] flex items-center justify-center overflow-hidden border border-white/5 group">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558981403-c5f9899a28bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center grayscale opacity-30 group-hover:scale-105 transition-transform duration-700"></div>
          <div className="absolute inset-0 bg-carbon/60 backdrop-blur-[2px]"></div>
          
          <div className="relative z-10 text-center px-6">
            <h2 className="font-heading text-4xl md:text-6xl uppercase mb-8">Ready to go <span className="text-copper">Global?</span></h2>
            <button className="bg-copper text-carbon px-12 py-5 font-heading text-xl uppercase hover:bg-white transition-all duration-500 flex items-center gap-4 mx-auto group/btn">
              Enquire for International Chapter
              <ArrowRight className="group-hover/btn:translate-x-2 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default International;
