import React, { useState } from "react";

const Members = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("all");
  const [isLoggedIn] = useState(
    sessionStorage.getItem("userLoggedIn") === "true",
  );

  const members = []; // Assuming members are fetched or defined elsewhere

  const filteredMembers = members.filter((member) => {
    const matchesSearch =
      member.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.bike?.toLowerCase().includes(searchTerm.toLowerCase());

    if (filterBy === "all") return matchesSearch;
    if (filterBy === "officers")
      return (
        matchesSearch &&
        ["President", "Treasurer", "Secretary", "Road Captain"].includes(member.role)
      );
    return matchesSearch;
  });

  const stats = [
    { value: "500+", label: "ACTIVE RIDERS" },
    { value: "1", label: "NATION" },
    { value: "2.5k", label: "COMPLETED RIDES" },
    { value: "20k", label: "KILOMETERS" },
  ];

  return (
    <section id="members" className="section-container py-24 bg-carbon text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
          <div>
            <span className="text-copper font-body tracking-ultra text-xs md:text-sm uppercase mb-2 block font-bold">The Pack</span>
            <h2 className="font-heading text-6xl md:text-8xl uppercase leading-none">Our <span className="text-transparent outline-title">Brotherhood</span></h2>
          </div>
          
          <div className="w-full md:w-auto flex flex-col md:flex-row gap-4">
             <input 
               type="text" 
               placeholder="SEARCH RIDERS..."
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               className="bg-transparent border border-white/10 px-6 py-3 font-body text-xs tracking-widest uppercase focus:border-copper outline-none transition-colors min-w-[300px]"
             />
              <select 
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
                className="bg-transparent border border-white/10 px-6 py-3 font-body text-xs tracking-widest uppercase focus:border-copper outline-none transition-colors appearance-none cursor-pointer"
              >
                <option value="all" className="bg-carbon text-white">All Members</option>
                <option value="officers" className="bg-carbon text-white">Club Officers</option>
                <option value="new" className="bg-carbon text-white">New Members</option>
                <option value="veterans" className="bg-carbon text-white">Veteran Members</option>
              </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {filteredMembers.length > 0 ? (
             filteredMembers.map((member) => (
                <div key={member.id} className="group p-8 border border-white/5 bg-carbon-light hover:border-copper/30 transition-all duration-500">
                  <div className="flex items-center gap-6 mb-8">
                     <div className="w-20 h-20 rounded-full border border-copper/30 overflow-hidden">
                        <img src={member.avatar || "/default-avatar.jpg"} alt={member.name} className="w-full h-full object-cover" />
                     </div>
                     <div>
                        <h3 className="font-heading text-2xl uppercase">{member.name}</h3>
                        <span className="text-copper font-body text-[10px] tracking-widest uppercase">{member.role}</span>
                     </div>
                  </div>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between border-b border-white/5 pb-2">
                       <span className="text-steel-dim font-body text-[10px] uppercase tracking-widest">Location</span>
                       <span className="font-body text-xs uppercase text-white">{member.location}</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-2">
                       <span className="text-steel-dim font-body text-[10px] uppercase tracking-widest">Machine</span>
                       <span className="font-body text-xs uppercase text-white">{member.bike}</span>
                    </div>
                  </div>
                  
                  <button className="w-full py-4 border border-white/10 font-body text-[10px] uppercase tracking-widest hover:bg-white hover:text-carbon transition-all duration-500">
                    View Profile
                  </button>
                </div>
             ))
          ) : (
            <div className="col-span-full py-20 text-center border border-dashed border-white/10">
               <p className="font-body text-steel-dim uppercase tracking-widest text-sm italic">
                 No brothers found with these criteria. Try another search.
               </p>
            </div>
          )}
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 pt-20 border-t border-white/5">
           {stats.map((stat, i) => (
             <div key={i} className="text-center">
                <span className="font-heading text-6xl text-white block mb-2">{stat.value}</span>
                <span className="font-body text-[10px] text-copper tracking-[0.3em] font-bold uppercase">{stat.label}</span>
             </div>
           ))}
        </div>

        {!isLoggedIn && (
          <div className="mt-32 p-16 border border-copper/20 bg-gradient-to-br from-copper/5 to-transparent text-center">
             <h3 className="font-heading text-4xl md:text-6xl uppercase mb-6 leading-none">Join The <span className="text-transparent outline-title">Elite</span></h3>
             <p className="font-text text-steel-dim text-lg mb-10 max-w-xl mx-auto">
               Become a part of India's most prestigious riding brotherhood. Exclusive access to premium rallies and events.
             </p>
             <button 
                onClick={() => window.dispatchEvent(new Event("open-registration"))}
                className="bg-copper text-carbon px-12 py-5 font-heading text-xl uppercase hover:bg-white transition-all duration-500"
             >
                Apply For Membership
             </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Members;
