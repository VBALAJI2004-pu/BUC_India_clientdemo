import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { CheckCircle, XCircle, Trash2, Eye } from "lucide-react";
import { membershipApplicationService } from "../../services/api";

const MembershipApplicationManagement = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const data = await membershipApplicationService.getAll();
      setApplications(Array.isArray(data) ? data : []);
    } catch {
      toast.error("Failed to load applications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleStatus = async (id, status) => {
    try {
      await membershipApplicationService.updateStatus(id, status);
      toast.success(`Application ${status}`);
      load();
      setSelected(null);
    } catch {
      toast.error("Update failed");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this application?")) return;
    try {
      await membershipApplicationService.delete(id);
      toast.success("Deleted");
      load();
      setSelected(null);
    } catch {
      toast.error("Delete failed");
    }
  };

  const filtered = applications.filter(
    (a) => filter === "all" || a.status === filter,
  );

  const statusBadge = (status) => {
    const colors = {
      pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
      approved: "bg-green-500/20 text-green-400 border-green-500/30",
      rejected: "bg-red-500/20 text-red-400 border-red-500/30",
    };
    return (
      <span
        className={`px-2 py-1 text-[8px] uppercase font-bold tracking-widest border ${colors[status] || colors.pending}`}
      >
        {status}
      </span>
    );
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-4xl uppercase text-white">
            Membership Applications
          </h1>
          <p className="font-body text-[10px] uppercase tracking-widest text-steel-dim mt-1">
            Separate from event registrations
          </p>
        </div>
        <div className="flex gap-2">
          {["all", "pending", "approved", "rejected"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 font-body text-[10px] uppercase tracking-widest ${filter === f ? "bg-copper text-carbon" : "border border-white/10 text-steel-dim"}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="py-20 flex justify-center">
          <div className="w-10 h-10 border-4 border-copper/30 border-t-copper rounded-full animate-spin" />
        </div>
      ) : (
        <div className="border border-white/5 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-carbon-light font-body text-[10px] uppercase tracking-widest text-steel-dim">
              <tr>
                <th className="p-4">Name</th>
                <th className="p-4 hidden md:table-cell">Contact</th>
                <th className="p-4 hidden lg:table-cell">Location</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((app) => (
                <tr key={app._id} className="border-t border-white/5 hover:bg-white/5">
                  <td className="p-4 font-heading uppercase">{app.fullName}</td>
                  <td className="p-4 hidden md:table-cell font-body text-xs text-steel-dim">
                    {app.email}<br />{app.phone}
                  </td>
                  <td className="p-4 hidden lg:table-cell font-body text-xs">
                    {[app.city, app.state].filter(Boolean).join(", ")}
                  </td>
                  <td className="p-4">{statusBadge(app.status)}</td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelected(app)}
                        className="p-2 border border-white/10 hover:border-copper"
                        title="View"
                      >
                        <Eye size={14} />
                      </button>
                      {app.status === "pending" && (
                        <>
                          <button
                            onClick={() => handleStatus(app._id, "approved")}
                            className="p-2 border border-green-500/30 text-green-400 hover:bg-green-500/10"
                          >
                            <CheckCircle size={14} />
                          </button>
                          <button
                            onClick={() => handleStatus(app._id, "rejected")}
                            className="p-2 border border-red-500/30 text-red-400 hover:bg-red-500/10"
                          >
                            <XCircle size={14} />
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => handleDelete(app._id)}
                        className="p-2 border border-white/10 text-steel-dim hover:text-red-400"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <p className="p-12 text-center font-body text-steel-dim uppercase tracking-widest text-sm">
              No applications found.
            </p>
          )}
        </div>
      )}

      {selected && (
        <div className="fixed inset-0 z-[3000] flex items-center justify-center p-4 bg-carbon/90 backdrop-blur-md">
          <div className="max-w-lg w-full bg-carbon-light border border-white/10 p-8 max-h-[80vh] overflow-y-auto">
            <h2 className="font-heading text-2xl uppercase mb-6">{selected.fullName}</h2>
            <div className="space-y-3 font-body text-sm text-steel-dim mb-6">
              <p><strong className="text-white">Email:</strong> {selected.email}</p>
              <p><strong className="text-white">Phone:</strong> {selected.phone}</p>
              <p><strong className="text-white">Location:</strong> {[selected.city, selected.state].join(", ")}</p>
              <p><strong className="text-white">Bike:</strong> {selected.bike}</p>
              <p><strong className="text-white">Experience:</strong> {selected.experience || "—"}</p>
              <p><strong className="text-white">Motivation:</strong> {selected.motivation}</p>
            </div>
            <div className="flex gap-3">
              {selected.status === "pending" && (
                <>
                  <button
                    onClick={() => handleStatus(selected._id, "approved")}
                    className="flex-1 py-3 bg-green-600 text-white font-body text-xs uppercase tracking-widest"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleStatus(selected._id, "rejected")}
                    className="flex-1 py-3 bg-red-600/80 text-white font-body text-xs uppercase tracking-widest"
                  >
                    Reject
                  </button>
                </>
              )}
              <button
                onClick={() => setSelected(null)}
                className="flex-1 py-3 border border-white/10 font-body text-xs uppercase tracking-widest"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MembershipApplicationManagement;
