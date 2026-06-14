import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  AlertCircle,
  Handshake,
  Shield,
  CheckCircle,
  Users,
  Calendar,
  ArrowRight,
  XCircle,
} from "lucide-react";
import { clubMembershipService, clubService } from "../../services/api";

const Clubs = () => {
  const navigate = useNavigate();
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [membership, setMembership] = useState(null);
  const [leaving, setLeaving] = useState(false);
  const [leaveReason, setLeaveReason] = useState("");
  const [joining, setJoining] = useState(false);
  const [showSingleClubPopup, setShowSingleClubPopup] = useState(false);

  const isLoggedIn = sessionStorage.getItem("userLoggedIn") === "true";
  const userEmail = sessionStorage.getItem("userEmail") || "";
  const userPhone = sessionStorage.getItem("userPhone") || "";

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [clubList, myClub] = await Promise.all([
        clubService.getPublic(),
        isLoggedIn
          ? clubMembershipService.getMyClub(userEmail, userPhone)
          : Promise.resolve({ membership: null }),
      ]);
      setClubs(clubList);
      setMembership(myClub.membership || null);
    } catch (error) {
      toast.error("Failed to load clubs. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleJoin = async (e, clubId) => {
    e.stopPropagation();
    if (!isLoggedIn) {
      toast.info("Please login / sign up before joining a club.");
      return;
    }
    if (membership) {
      setShowSingleClubPopup(true);
      return;
    }
    setJoining(true);
    try {
      await clubMembershipService.join(clubId, userEmail, userPhone);
      toast.success("Joined the brotherhood!");
      await loadData();
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to join");
    } finally {
      setJoining(false);
    }
  };

  const handleLeave = async () => {
    if (!membership || !membership.clubId) return;
    if (!leaveReason.trim()) {
      toast.error("Please provide a reason to leave.");
      return;
    }
    setLeaving(true);
    try {
      await clubMembershipService.leave(
        membership.clubId._id || membership.clubId,
        userEmail,
        userPhone,
        leaveReason.trim(),
      );
      toast.success("Left the club.");
      setLeaveReason("");
      await loadData();
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to leave");
    } finally {
      setLeaving(false);
    }
  };

  const goToClub = (club) => {
    const slug = club.slug || club.name.toLowerCase().replace(/ /g, "-");
    navigate(`/clubs/${slug}`, { state: { club } });
  };

  return (
    <section id="clubs" className="section-container py-24 bg-carbon text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
          <div>
            <span className="text-copper font-body tracking-ultra text-xs md:text-sm uppercase mb-2 block font-bold">The network</span>
            <h2 className="font-heading text-6xl md:text-8xl uppercase leading-none">Global <span className="text-transparent outline-title">Chapters</span></h2>
          </div>
          
          <button 
            onClick={() => navigate("/clubs/collaborate")}
            className="flex items-center gap-4 bg-white text-carbon px-8 py-4 font-heading text-lg uppercase hover:bg-copper transition-all duration-500"
          >
            <Handshake size={20} />
            Partner With BUC
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-copper/30 border-t-copper rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
            {clubs.map((club) => {
              const isMyClub = membership?.clubId && (membership.clubId._id || membership.clubId) === club.id;
              
              return (
                <div key={club.id} className="group border border-white/5 bg-carbon-light p-8 hover:border-copper/30 transition-all duration-500">
                  <div className="relative w-24 h-24 mb-8 grayscale group-hover:grayscale-0 transition-all duration-500">
                     {club.logoUrl ? (
                       <img src={club.logoUrl} alt={club.name} className="w-full h-full object-contain" />
                     ) : (
                       <div className="w-full h-full border border-white/10 flex items-center justify-center font-heading text-4xl text-white/10">
                         {club.name.charAt(0)}
                       </div>
                     )}
                  </div>
                  
                  <h3 className="font-heading text-3xl uppercase mb-2 group-hover:text-copper transition-colors">{club.name}</h3>
                  <p className="font-text text-steel-dim text-sm italic mb-8">"{club.moto || "Brotherhood on wheels."}"</p>
                  
                  <div className="flex gap-6 mb-8">
                     <div className="flex items-center gap-2">
                        <Users size={14} className="text-copper" />
                        <span className="font-body text-[10px] uppercase tracking-widest text-steel-dim">{club.participantCount || 0} RIDERS</span>
                     </div>
                     <div className="flex items-center gap-2">
                        <Calendar size={14} className="text-copper" />
                        <span className="font-body text-[10px] uppercase tracking-widest text-steel-dim">EST. {club.startedOn ? new Date(club.startedOn).getFullYear() : "2024"}</span>
                     </div>
                  </div>

                  <div className="flex gap-4">
                     {isMyClub ? (
                       <button className="flex-1 py-4 border border-copper/50 text-copper font-body text-[10px] uppercase tracking-widest bg-copper/5">
                         JOINED
                       </button>
                     ) : (
                       <button 
                         onClick={(e) => handleJoin(e, club.id)}
                         disabled={joining}
                         className="flex-1 py-4 bg-white text-carbon font-body text-[10px] uppercase tracking-widest hover:bg-copper transition-all duration-500"
                       >
                         {joining ? "..." : "JOIN CLUB"}
                       </button>
                     )}
                     <button 
                       onClick={() => goToClub(club)}
                       className="px-6 py-4 border border-white/10 text-white hover:bg-white/5 transition-colors"
                     >
                       <ArrowRight size={18} />
                     </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Current Membership Bar */}
        {isLoggedIn && membership && membership.clubId && (
          <div className="fixed bottom-0 left-0 right-0 z-[1000] p-6 bg-carbon/90 backdrop-blur-2xl border-t border-white/5 animate-slide-up">
             <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                   <div className="w-12 h-12 bg-copper/10 border border-copper/30 flex items-center justify-center rounded-full">
                      <CheckCircle size={20} className="text-copper" />
                   </div>
                   <div>
                      <span className="block font-body text-[10px] text-steel-dim uppercase tracking-[0.2em]">Active Membership</span>
                      <span className="block font-heading text-2xl uppercase">{membership.clubId.name}</span>
                   </div>
                </div>

                <div className="flex w-full md:w-auto gap-4">
                   <input 
                     type="text" 
                     placeholder="Share reason to leave..."
                     value={leaveReason}
                     onChange={(e) => setLeaveReason(e.target.value)}
                     className="flex-1 md:w-64 bg-transparent border border-white/10 px-6 py-3 font-body text-xs focus:border-red-500/50 outline-none transition-colors"
                   />
                   <button 
                     onClick={handleLeave}
                     disabled={leaving}
                     className="px-8 py-3 border border-red-500/30 text-red-500 font-body text-[10px] uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all duration-500"
                   >
                     {leaving ? "..." : "LEAVE CLUB"}
                   </button>
                </div>
             </div>
          </div>
        )}
      </div>

      {/* One Club Popup */}
      {showSingleClubPopup && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-carbon/95 backdrop-blur-xl">
           <div className="max-w-md w-full bg-carbon-light border border-white/10 p-10 text-center">
              <div className="w-20 h-20 bg-copper/10 border border-copper/30 flex items-center justify-center rounded-full mx-auto mb-8">
                 <AlertCircle size={32} className="text-copper" />
              </div>
              <h3 className="font-heading text-3xl uppercase mb-4">ONE CLUB LIMIT</h3>
              <p className="font-text text-steel-dim mb-10">
                To keep the community focused, BUC allows only one active club membership per rider. Leave your current chapter before joining a new one.
              </p>
              <button 
                onClick={() => setShowSingleClubPopup(false)}
                className="w-full py-4 bg-copper text-carbon font-heading text-lg uppercase hover:bg-white transition-all duration-500"
              >
                Got It
              </button>
           </div>
        </div>
      )}
    </section>
  );
};

export default Clubs;
