import mongoose from "mongoose";

const forumTopicSchema = new mongoose.Schema(
  {
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ForumCategory",
      required: true,
    },
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    authorName: { type: String, required: true, trim: true },
    authorEmail: { type: String, default: "", trim: true, lowercase: true },
    authorUserId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    likes: [{ type: String, trim: true, lowercase: true }],
    replyCount: { type: Number, default: 0 },
    isPinned: { type: Boolean, default: false },
    isLocked: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false },
    lastActivityAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

forumTopicSchema.index({ categoryId: 1, lastActivityAt: -1 });
forumTopicSchema.index({ title: "text", content: "text" });

const ForumTopic = mongoose.model("ForumTopic", forumTopicSchema);
export default ForumTopic;
