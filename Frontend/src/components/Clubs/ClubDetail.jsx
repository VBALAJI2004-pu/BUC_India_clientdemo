import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
  ArrowLeft,
  Users,
  Calendar,
  Crown,
  Star,
  Shield,
  Images,
  Loader2,
  MapPin,
  Zap,
  CheckCircle
} from "lucide-react";
import { clubService } from "../../services/api";

const generateSlug = (name) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

const roleIcon = (role = "") => {
  const r = role.toLowerCase();
  if (r.includes("founder")) return <Crown size={14} className="text-copper" />;
  if (r.includes("admin")) return <Star size={14} className="text-copper" />;
  return <Shield size={14} className="text-copper" />;
};

const roleLabel = (role = "") =>
  role.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()) || "Member";

const ClubDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [club, setClub] = useState(location.state?.club || null);
  const [loading, setLoading] = useState(!location.state?.club);

  useEffect(() => {
    if (!club) fetchClub();
    // eslint-disable-next-line
  }, [slug]);

  const fetchClub = async () => {
    setLoading(true);
    try {
      const clubs = await clubService.getPublic();
      const found = clubs.find(
        (c) => (c.slug || generateSlug(c.name)) === slug
      );
      if (found) setClub(found);
      else navigate("/clubs", { replace: true });
    } catch (err) {
      navigate("/clubs", { replace: true });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-carbon flex flex-col items-center justify-center gap-4 text-white">
        <div className="w-12 h-12 border-4 border-copper/30 border-t-copper rounded-full animate-spin"></div>
        <p className="font-body text-xs tracking-widest uppercase opacity-50">Mobilizing Brotherhood...</p>
      </div>
    );
  }

  if (!club) return null;

  const joinDate = club.startedOn
    ? new Date(club.startedOn).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
      })
    : null;

  const yearsActive = club.startedOn
    ? new Date().getFullYear() - new Date(club.startedOn).getFullYear()
    : null;

  const leaders = [];
  if (club.founderName) {
    leaders.push({
      name: club.founderName,
      role: club.founderRole || "founder",
    });
  }
  if (Array.isArray(club.admins)) {
    club.admins.forEach((a) => {
      if (a.name) {
        leaders.push({
          name: a.name,
          role: a.role || "admin",
        });
      }
    });
  }

  const founders = leaders.filter((l) =>
    l.role?.toLowerCase().includes("founder")
  );
  const admins = leaders.filter(
    (l) => !l.role?.toLowerCase().includes("founder")
  );

  return (
    <div className="min-h-screen bg-carbon text-white">
      {/* Hero Banner */}
      <div className="relative h-[60vh] md:h-[70vh] overflow-hidden">
         {club.logoUrl ? (
            <img src={club.logoUrl} alt={club.name} className="w-full h-full object-cover grayscale opacity-30" />
         ) : (
            <div className="w-full h-full bg-gradient-to-b from-carbon-light to-carbon" />
         )}
         <div className="absolute inset-0 bg-gradient-to-t from-carbon via-carbon/50 to-transparent" />
         
         <div className="absolute inset-0 flex flex-col justify-end px-6 md:px-12 pb-20 max-w-7xl mx-auto w-full">
            <button
               onClick={() => navigate("/clubs")}
               className="flex items-center gap-2 font-body text-[10px] tracking-widest uppercase text-steel-dim hover:text-copper transition-colors mb-12"
            >
               <ArrowLeft size={14} />
               Explore Network
            </button>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
               <div className="flex flex-col md:flex-row gap-8 items-start md:items-end">
                  <div className="w-32 h-32 md:w-48 md:h-48 bg-carbon-light border border-white/10 p-4 shrink-0">
                     {club.logoUrl ? (
                        <img src={club.logoUrl} alt={club.name} className="w-full h-full object-contain" />
                     ) : (
                        <div className="w-full h-full flex items-center justify-center font-heading text-6xl text-white/5">
                           {club.name.charAt(0)}
                        </div>
                     )}
                  </div>
                  <div>
                     <h1 className="font-heading text-6xl md:text-8xl uppercase leading-none mb-4">{club.name}</h1>
                     <p className="font-text text-copper italic text-lg opacity-80 uppercase tracking-widest">"{club.moto || "Brotherhood over everything."}"</p>
                  </div>
               </div>

               <div className="flex flex-wrap gap-4">
                  <div className="bg-white/5 border border-white/10 px-6 py-4 backdrop-blur-md">
                     <span className="block font-body text-[10px] text-steel-dim uppercase tracking-widest mb-1">Chapter Size</span>
                     <span className="block font-heading text-2xl">{club.participantCount || 0} RIDERS</span>
                  </div>
                  <div className="bg-copper/10 border border-copper/30 px-6 py-4 backdrop-blur-md">
                     <span className="block font-body text-[10px] text-copper uppercase tracking-widest mb-1">Status</span>
                     <div className="flex items-center gap-2">
                        <CheckCircle size={16} className="text-copper" />
                        <span className="block font-heading text-2xl text-copper">BUC VERIFIED</span>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-24">
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
            {/* Left: About */}
            <div className="lg:col-span-8 space-y-20">
               <section>
                  <h2 className="font-heading text-3xl uppercase mb-8 flex items-center gap-4">
                     <Zap size={24} className="text-copper" />
                     The Ethos
                  </h2>
                  <p className="font-text text-steel-dim text-xl leading-relaxed whitespace-pre-wrap">
                     {club.showcaseText || "This chapter has not yet defined their public ethos statement. Rest assured, they represent the highest standards of the brotherhood."}
                  </p>
               </section>

               <section>
                  <h2 className="font-heading text-3xl uppercase mb-12 flex items-center gap-4">
                     <Images size={24} className="text-copper" />
                     The Vault
                  </h2>
                  <div className="aspect-video bg-carbon-light border border-white/5 flex flex-col items-center justify-center text-center p-12">
                     <Images size={48} className="text-white/10 mb-6" />
                     <h3 className="font-heading text-2xl uppercase mb-2">Restricted Access</h3>
                     <p className="font-body text-xs tracking-widest uppercase text-steel-dim">Gallery coming soon to the public network.</p>
                  </div>
               </section>
            </div>

            {/* Right: Leadership & Meta */}
            <div className="lg:col-span-4 space-y-12">
               {/* Leadership */}
               <div className="bg-carbon-light border border-white/5 p-10">
                  <h3 className="font-body text-[10px] uppercase tracking-[0.3em] text-copper mb-8">Command Structure</h3>
                  
                  <div className="space-y-8">
                     {founders.map((leader, i) => (
                        <div key={i} className="flex items-center gap-6">
                           <div className="w-16 h-16 bg-carbon border border-white/10 flex items-center justify-center font-heading text-2xl text-copper">
                              {leader.name.charAt(0)}
                           </div>
                           <div>
                              <p className="font-heading text-xl uppercase leading-none mb-1">{leader.name}</p>
                              <div className="flex items-center gap-2">
                                 {roleIcon(leader.role)}
                                 <span className="font-body text-[10px] uppercase tracking-widest text-steel-dim">{roleLabel(leader.role)}</span>
                              </div>
                           </div>
                        </div>
                     ))}
                     
                     {admins.map((leader, i) => (
                        <div key={i} className="flex items-center gap-6">
                           <div className="w-16 h-16 bg-carbon border border-white/10 flex items-center justify-center font-heading text-2xl text-white/20">
                              {leader.name.charAt(0)}
                           </div>
                           <div>
                              <p className="font-heading text-xl uppercase leading-none mb-1">{leader.name}</p>
                              <div className="flex items-center gap-2">
                                 {roleIcon(leader.role)}
                                 <span className="font-body text-[10px] uppercase tracking-widest text-steel-dim">{roleLabel(leader.role)}</span>
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>

               {/* Meta Stats */}
               <div className="space-y-4">
                  <div className="flex justify-between p-6 border border-white/5 font-body">
                     <span className="text-[10px] uppercase tracking-widest text-steel-dim">Active Since</span>
                     <span className="text-xs uppercase text-white font-bold">{joinDate || "N/A"}</span>
                  </div>
                  <div className="flex justify-between p-6 border border-white/5 font-body">
                     <span className="text-[10px] uppercase tracking-widest text-steel-dim">Loyalty Rank</span>
                     <span className="text-xs uppercase text-copper font-bold">{yearsActive > 0 ? `ELITE CHAPTER` : "INITIATE"}</span>
                  </div>
                  <div className="flex justify-between p-6 border border-white/5 font-body">
                     <span className="text-[10px] uppercase tracking-widest text-steel-dim">Location</span>
                     <span className="text-xs uppercase text-white font-bold">{club.city || "INDIA"}</span>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default ClubDetail;
