import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Users,
  Crown,
  Star,
  Shield,
  Loader2,
  Zap,
  CheckCircle,
} from "lucide-react";
import { clubService } from "../../services/api";

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
  const [club, setClub] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClub = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await clubService.getPublicBySlug(slug);
        setClub(data);
      } catch {
        setError("Club not found");
        setTimeout(() => navigate("/clubs", { replace: true }), 2000);
      } finally {
        setLoading(false);
      }
    };
    fetchClub();
  }, [slug, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-carbon flex flex-col items-center justify-center gap-4 text-white">
        <Loader2 className="w-12 h-12 text-copper animate-spin" />
        <p className="font-body text-xs tracking-widest uppercase opacity-50">
          Loading chapter...
        </p>
      </div>
    );
  }

  if (error || !club) {
    return (
      <div className="min-h-screen bg-carbon flex items-center justify-center text-white">
        <p className="font-body text-red-400 uppercase tracking-widest">{error}</p>
      </div>
    );
  }

  const joinDate = club.startedOn
    ? new Date(club.startedOn).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
      })
    : null;

  const renderLeader = (leader, i) => (
    <div key={i} className="flex items-center gap-6">
      <div className="w-16 h-16 bg-carbon border border-white/10 flex items-center justify-center font-heading text-2xl text-copper">
        {leader.name.charAt(0)}
      </div>
      <div>
        <p className="font-heading text-xl uppercase leading-none mb-1">
          {leader.name}
        </p>
        <div className="flex items-center gap-2">
          {roleIcon(leader.role)}
          <span className="font-body text-[10px] uppercase tracking-widest text-steel-dim">
            {roleLabel(leader.role)}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-carbon text-white">
      <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        {club.logoUrl ? (
          <img
            src={club.logoUrl}
            alt={club.name}
            className="w-full h-full object-cover grayscale opacity-30"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-b from-carbon-light to-carbon" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-carbon via-carbon/50 to-transparent" />

        <div className="absolute inset-0 flex flex-col justify-end px-6 md:px-12 pb-16 max-w-7xl mx-auto w-full">
          <button
            onClick={() => navigate("/clubs")}
            className="flex items-center gap-2 font-body text-[10px] tracking-widest uppercase text-steel-dim hover:text-copper transition-colors mb-8"
          >
            <ArrowLeft size={14} />
            Explore Network
          </button>

          <div className="flex flex-col md:flex-row md:items-end gap-8">
            <div className="w-28 h-28 md:w-40 md:h-40 bg-carbon-light border border-white/10 p-4 shrink-0">
              {club.logoUrl ? (
                <img
                  src={club.logoUrl}
                  alt={club.name}
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center font-heading text-5xl text-white/5">
                  {club.name.charAt(0)}
                </div>
              )}
            </div>
            <div>
              <h1 className="font-heading text-5xl md:text-7xl uppercase leading-none mb-2">
                {club.name}
              </h1>
              <p className="font-text text-copper italic uppercase tracking-widest">
                &ldquo;{club.moto || "Brotherhood over everything."}&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8 space-y-16">
            <section>
              <h2 className="font-heading text-3xl uppercase mb-6 flex items-center gap-4">
                <Zap size={24} className="text-copper" />
                The Ethos
              </h2>
              <p className="font-text text-steel-dim text-lg leading-relaxed whitespace-pre-wrap">
                {club.showcaseText ||
                  "This chapter has not yet defined their public ethos statement."}
              </p>
            </section>

            <section>
              <h2 className="font-heading text-3xl uppercase mb-8 flex items-center gap-4">
                <Users size={24} className="text-copper" />
                Active Members ({club.participantCount || 0})
              </h2>
              {!club.members?.length ? (
                <div className="py-12 border border-dashed border-white/10 text-center">
                  <p className="font-body text-steel-dim uppercase tracking-widest text-sm">
                    No active members listed yet.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {club.members.map((member, i) => (
                    <div
                      key={`${member.fullName}-${i}`}
                      className="flex items-center gap-4 p-4 border border-white/5 bg-carbon-light"
                    >
                      <div className="w-14 h-14 rounded-full border border-copper/30 overflow-hidden shrink-0">
                        <img
                          src={member.profileImage || "/logo.jpg"}
                          alt={member.fullName}
                          loading="lazy"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-heading text-lg uppercase">
                          {member.fullName}
                        </p>
                        <p className="font-body text-[10px] uppercase tracking-widest text-steel-dim">
                          {roleLabel(member.role)} ·{" "}
                          {[member.city, member.state].filter(Boolean).join(", ") ||
                            "India"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>

          <div className="lg:col-span-4 space-y-8">
            <div className="bg-carbon-light border border-white/5 p-8">
              <h3 className="font-body text-[10px] uppercase tracking-[0.3em] text-copper mb-6">
                Command Structure
              </h3>
              <div className="space-y-6">
                {club.owner && renderLeader(club.owner, "owner")}
                {club.admins?.map((a, i) => renderLeader(a, `admin-${i}`))}
                {club.coAdmins?.map((a, i) => renderLeader(a, `co-${i}`))}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between p-5 border border-white/5 font-body">
                <span className="text-[10px] uppercase tracking-widest text-steel-dim">
                  Active Since
                </span>
                <span className="text-xs uppercase font-bold">
                  {joinDate || "N/A"}
                </span>
              </div>
              <div className="flex justify-between p-5 border border-copper/20 font-body bg-copper/5">
                <span className="text-[10px] uppercase tracking-widest text-copper">
                  Status
                </span>
                <span className="text-xs uppercase font-bold text-copper flex items-center gap-2">
                  <CheckCircle size={14} /> BUC Verified
                </span>
              </div>
            </div>

            <p className="font-body text-[10px] text-steel-dim uppercase tracking-widest leading-relaxed">
              Club membership is managed by club owners and admins. Public
              visitors can view members but cannot join directly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClubDetail;
