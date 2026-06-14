import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Bike,
  Check,
  UserPlus,
  Share2,
} from "lucide-react";
import { toast } from "react-toastify";

const Registration = () => {
  const navigate = useNavigate();
  const freeFeatures = [
    "Access to all group rides across India",
    "Monthly newsletter with riding tips",
    "Full forum access and community support",
    "Event notifications and priority registration",
    "Safety workshops and training sessions",
    "Roadside assistance network",
    "Free community patches and stickers",
    "Connect with riders in your city",
    "Participate in charity rides",
    "Access to riding routes and maps",
  ];

  return (
    <section
      id="membership"
      className="py-20 bg-slate-950 border-t border-blue-500/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Join the{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-violet-600">
              Community
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Become part of India's largest motorcycle community. Connect with
            riders across the country - completely free!
          </p>
        </div>

        <div className="bg-gradient-to-br from-violet-600/10 via-blue-500/5 to-slate-950 rounded-3xl p-8 md:p-12 border border-violet-500/20 mb-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl -ml-32 -mb-32"></div>

          <div className="relative z-10">
            <div className="text-center mb-10">
              <h3 className="text-3xl font-bold text-white mb-4">
                🎉 Completely <span className="text-blue-500">FREE</span>{" "}
                Registration!
              </h3>
              <p className="text-xl text-gray-300">
                Join thousands of riders across India at no cost. Here's what you
                get:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {freeFeatures.map((feature, index) => (
                <div key={index} className="flex items-center text-gray-300 group">
                  <div className="h-8 w-8 rounded-full bg-violet-500/10 flex items-center justify-center mr-4 group-hover:bg-violet-500/20 transition-colors">
                    <Check className="h-4 w-4 text-violet-400" />
                  </div>
                  <span className="text-sm font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 bg-white/5 backdrop-blur-sm rounded-3xl p-8 md:p-10 border border-white/10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "1000+", label: "Active Members", color: "from-blue-500 to-indigo-500" },
              { value: "28", label: "States Covered", color: "from-violet-500 to-purple-600" },
              { value: "500+", label: "Cities Connected", color: "from-blue-500 to-cyan-500" },
              { value: "FREE", label: "Always & Forever", color: "from-green-500 to-emerald-600" }
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className={`text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r ${stat.color} mb-2`}>
                  {stat.value}
                </div>
                <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest leading-none">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-12">
          <button
            onClick={() => navigate("/signup")}
            className="btn-metallica px-12 py-4 flex items-center justify-center gap-3"
          >
            <UserPlus className="h-5 w-5" />
            <span>START YOUR JOURNEY</span>
          </button>

          <button
            className="px-10 py-4 rounded-xl font-bold text-gray-400 border border-white/10 hover:bg-white/5 hover:text-white transition-all flex items-center space-x-3"
          >
            <Share2 className="h-5 w-5" />
            <span>SHARE COMMUNITY</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Registration;
