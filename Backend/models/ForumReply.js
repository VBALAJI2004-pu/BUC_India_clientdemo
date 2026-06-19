import mongoose from "mongoose";

const forumReplySchema = new mongoose.Schema(
  {
    topicId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ForumTopic",
      required: true,
    },
    content: { type: String, required: true },
    authorName: { type: String, required: true, trim: true },
    authorEmail: { type: String, default: "", trim: true, lowercase: true },
    authorUserId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    likes: [{ type: String, trim: true, lowercase: true }],
  },
  { timestamps: true },
);

forumReplySchema.index({ topicId: 1, createdAt: 1 });

const ForumReply = mongoose.model("ForumReply", forumReplySchema);
export default ForumReply;
