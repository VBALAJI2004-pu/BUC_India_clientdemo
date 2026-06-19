import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Pin, Lock, Star, Trash2 } from "lucide-react";
import { forumService } from "../../services/api";

const ForumManagement = () => {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const data = await forumService.getTopics({ page: 1, limit: 50 });
      setTopics(data.topics || []);
    } catch {
      toast.error("Failed to load forum topics");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const toggle = async (id, field, current) => {
    try {
      await forumService.adminUpdateTopic(id, { [field]: !current });
      toast.success("Updated");
      load();
    } catch {
      toast.error("Update failed");
    }
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this topic and all replies?")) return;
    try {
      await forumService.adminDeleteTopic(id);
      toast.success("Deleted");
      load();
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-4xl uppercase text-white">Forum Moderation</h1>
        <p className="font-body text-[10px] uppercase tracking-widest text-steel-dim mt-1">
          Lock, feature, pin, or delete topics
        </p>
      </div>

      {loading ? (
        <div className="py-20 flex justify-center">
          <div className="w-10 h-10 border-4 border-copper/30 border-t-copper rounded-full animate-spin" />
        </div>
      ) : (
        <div className="space-y-3">
          {topics.map((topic) => (
            <div
              key={topic.id}
              className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 border border-white/5 bg-carbon-light"
            >
              <div>
                <h3 className="font-heading text-lg uppercase">{topic.title}</h3>
                <p className="font-body text-[10px] text-steel-dim uppercase tracking-widest">
                  {topic.authorName} · {topic.replies} replies · {topic.likes} likes
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => toggle(topic.id, "isPinned", topic.isPinned)}
                  className={`p-2 border text-[10px] uppercase ${topic.isPinned ? "border-copper text-copper" : "border-white/10 text-steel-dim"}`}
                  title="Pin"
                >
                  <Pin size={14} />
                </button>
                <button
                  onClick={() => toggle(topic.id, "isFeatured", topic.isFeatured)}
                  className={`p-2 border text-[10px] uppercase ${topic.isFeatured ? "border-copper text-copper" : "border-white/10 text-steel-dim"}`}
                  title="Feature"
                >
                  <Star size={14} />
                </button>
                <button
                  onClick={() => toggle(topic.id, "isLocked", topic.isLocked)}
                  className={`p-2 border text-[10px] uppercase ${topic.isLocked ? "border-red-400 text-red-400" : "border-white/10 text-steel-dim"}`}
                  title="Lock"
                >
                  <Lock size={14} />
                </button>
                <button
                  onClick={() => remove(topic.id)}
                  className="p-2 border border-red-500/30 text-red-400"
                  title="Delete"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
          {topics.length === 0 && (
            <p className="text-center py-12 font-body text-steel-dim uppercase tracking-widest text-sm">
              No forum topics yet.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default ForumManagement;
