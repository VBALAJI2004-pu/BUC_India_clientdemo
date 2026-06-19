import User from "../models/User.js";
import ClubMembership from "../models/ClubMembership.js";
import ForumCategory from "../models/ForumCategory.js";
import ForumTopic from "../models/ForumTopic.js";
import ForumReply from "../models/ForumReply.js";

const findUserByContact = async (email, phone) => {
  if (!email && !phone) return null;
  const query = {};
  if (email) query.email = email.toLowerCase();
  if (phone) query.phone = phone;
  return User.findOne(query);
};

const DEFAULT_CATEGORIES = [
  { name: "General Discussion", slug: "general", displayOrder: 1 },
  { name: "Ride Planning", slug: "rides", displayOrder: 2 },
  { name: "Bike Maintenance", slug: "maintenance", displayOrder: 3 },
  { name: "Gear Reviews", slug: "gear", displayOrder: 4 },
  { name: "Events", slug: "events", displayOrder: 5 },
  { name: "New Rider Help", slug: "newbie", displayOrder: 6 },
];

const ensureDefaultCategories = async () => {
  for (const cat of DEFAULT_CATEGORIES) {
    await ForumCategory.findOneAndUpdate(
      { slug: cat.slug },
      { ...cat, isActive: true },
      { upsert: true, new: true },
    );
  }
};

export const getCategories = async (req, res) => {
  try {
    await ensureDefaultCategories();
    const categories = await ForumCategory.find({ isActive: true }).sort({
      displayOrder: 1,
    });

    const counts = await ForumTopic.aggregate([
      { $group: { _id: "$categoryId", count: { $sum: 1 } } },
    ]);
    const countMap = new Map(counts.map((c) => [String(c._id), c.count]));

    res.json(
      categories.map((cat) => ({
        id: cat._id,
        name: cat.name,
        slug: cat.slug,
        description: cat.description,
        topicCount: countMap.get(String(cat._id)) || 0,
      })),
    );
  } catch (error) {
    console.error("Get forum categories error:", error);
    res.status(500).json({ message: error.message });
  }
};

export const getTopics = async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.min(50, parseInt(req.query.limit, 10) || 10);
    const skip = (page - 1) * limit;
    const { category, search } = req.query;

    const filter = {};
    if (category && category !== "all") {
      const cat = await ForumCategory.findOne({
        $or: [{ slug: category }, { _id: category }],
      });
      if (cat) filter.categoryId = cat._id;
    }

    if (search?.trim()) {
      filter.$text = { $search: search.trim() };
    }

    const [topics, total] = await Promise.all([
      ForumTopic.find(filter)
        .populate("categoryId", "name slug")
        .sort({ isPinned: -1, isFeatured: -1, lastActivityAt: -1 })
        .skip(skip)
        .limit(limit),
      ForumTopic.countDocuments(filter),
    ]);

    res.json({
      topics: topics.map((t) => ({
        id: t._id,
        title: t.title,
        content: t.content,
        preview:
          t.content.length > 180 ? `${t.content.slice(0, 180)}...` : t.content,
        authorName: t.authorName,
        category: t.categoryId?.slug || "general",
        categoryName: t.categoryId?.name || "General",
        replies: t.replyCount,
        likes: t.likes.length,
        isPinned: t.isPinned,
        isLocked: t.isLocked,
        isFeatured: t.isFeatured,
        lastActivity: t.lastActivityAt,
        createdAt: t.createdAt,
      })),
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit) || 1,
      },
    });
  } catch (error) {
    console.error("Get forum topics error:", error);
    res.status(500).json({ message: error.message });
  }
};

export const getTopicById = async (req, res) => {
  try {
    const topic = await ForumTopic.findById(req.params.id).populate(
      "categoryId",
      "name slug",
    );
    if (!topic) {
      return res.status(404).json({ message: "Topic not found" });
    }

    const replies = await ForumReply.find({ topicId: topic._id })
      .sort({ createdAt: 1 })
      .limit(200);

    res.json({
      topic: {
        id: topic._id,
        title: topic.title,
        content: topic.content,
        authorName: topic.authorName,
        category: topic.categoryId?.slug,
        categoryName: topic.categoryId?.name,
        likes: topic.likes.length,
        isPinned: topic.isPinned,
        isLocked: topic.isLocked,
        isFeatured: topic.isFeatured,
        createdAt: topic.createdAt,
      },
      replies: replies.map((r) => ({
        id: r._id,
        content: r.content,
        authorName: r.authorName,
        likes: r.likes.length,
        createdAt: r.createdAt,
      })),
    });
  } catch (error) {
    console.error("Get forum topic error:", error);
    res.status(500).json({ message: error.message });
  }
};

export const createTopic = async (req, res) => {
  try {
    const { title, content, categorySlug, email, phone } = req.body;
    if (!title?.trim() || !content?.trim()) {
      return res
        .status(400)
        .json({ message: "Title and content are required" });
    }

    const user = await findUserByContact(email, phone);
    if (!user) {
      return res.status(401).json({
        message: "Please login to post in the forum",
      });
    }

    await ensureDefaultCategories();
    const category = categorySlug
      ? await ForumCategory.findOne({ slug: categorySlug, isActive: true })
      : await ForumCategory.findOne({ slug: "general" });

    if (!category) {
      return res.status(400).json({ message: "Invalid category" });
    }

    const topic = await ForumTopic.create({
      categoryId: category._id,
      title: title.trim(),
      content: content.trim(),
      authorName: user.fullName || "Anonymous Rider",
      authorEmail: user.email || "",
      authorUserId: user._id,
      lastActivityAt: new Date(),
    });

    res.status(201).json({ id: topic._id, message: "Topic created" });
  } catch (error) {
    console.error("Create forum topic error:", error);
    res.status(400).json({ message: error.message });
  }
};

export const createReply = async (req, res) => {
  try {
    const { content, email, phone } = req.body;
    const { id } = req.params;

    if (!content?.trim()) {
      return res.status(400).json({ message: "Reply content is required" });
    }

    const topic = await ForumTopic.findById(id);
    if (!topic) {
      return res.status(404).json({ message: "Topic not found" });
    }
    if (topic.isLocked) {
      return res.status(403).json({ message: "This topic is locked" });
    }

    const user = await findUserByContact(email, phone);
    if (!user) {
      return res.status(401).json({ message: "Please login to reply" });
    }

    const reply = await ForumReply.create({
      topicId: topic._id,
      content: content.trim(),
      authorName: user.fullName || "Anonymous Rider",
      authorEmail: user.email || "",
      authorUserId: user._id,
    });

    topic.replyCount += 1;
    topic.lastActivityAt = new Date();
    await topic.save();

    res.status(201).json({ id: reply._id, message: "Reply posted" });
  } catch (error) {
    console.error("Create forum reply error:", error);
    res.status(400).json({ message: error.message });
  }
};

export const toggleTopicLike = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    const topic = await ForumTopic.findById(req.params.id);
    if (!topic) {
      return res.status(404).json({ message: "Topic not found" });
    }

    const key = email.toLowerCase();
    const idx = topic.likes.indexOf(key);
    if (idx >= 0) topic.likes.splice(idx, 1);
    else topic.likes.push(key);
    await topic.save();

    res.json({ likes: topic.likes.length, liked: idx < 0 });
  } catch (error) {
    console.error("Toggle topic like error:", error);
    res.status(400).json({ message: error.message });
  }
};

export const toggleReplyLike = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    const reply = await ForumReply.findById(req.params.id);
    if (!reply) {
      return res.status(404).json({ message: "Reply not found" });
    }

    const key = email.toLowerCase();
    const idx = reply.likes.indexOf(key);
    if (idx >= 0) reply.likes.splice(idx, 1);
    else reply.likes.push(key);
    await reply.save();

    res.json({ likes: reply.likes.length, liked: idx < 0 });
  } catch (error) {
    console.error("Toggle reply like error:", error);
    res.status(400).json({ message: error.message });
  }
};

export const adminDeleteTopic = async (req, res) => {
  try {
    await ForumReply.deleteMany({ topicId: req.params.id });
    await ForumTopic.findByIdAndDelete(req.params.id);
    res.json({ message: "Topic deleted" });
  } catch (error) {
    console.error("Admin delete topic error:", error);
    res.status(500).json({ message: error.message });
  }
};

export const adminUpdateTopic = async (req, res) => {
  try {
    const { isLocked, isPinned, isFeatured } = req.body;
    const update = {};
    if (isLocked !== undefined) update.isLocked = !!isLocked;
    if (isPinned !== undefined) update.isPinned = !!isPinned;
    if (isFeatured !== undefined) update.isFeatured = !!isFeatured;

    const topic = await ForumTopic.findByIdAndUpdate(req.params.id, update, {
      new: true,
    });
    if (!topic) {
      return res.status(404).json({ message: "Topic not found" });
    }
    res.json(topic);
  } catch (error) {
    console.error("Admin update topic error:", error);
    res.status(400).json({ message: error.message });
  }
};

export const adminDeleteReply = async (req, res) => {
  try {
    const reply = await ForumReply.findByIdAndDelete(req.params.id);
    if (!reply) {
      return res.status(404).json({ message: "Reply not found" });
    }
    await ForumTopic.findByIdAndUpdate(reply.topicId, {
      $inc: { replyCount: -1 },
    });
    res.json({ message: "Reply deleted" });
  } catch (error) {
    console.error("Admin delete reply error:", error);
    res.status(500).json({ message: error.message });
  }
};

export const getRecentDiscussions = async (req, res) => {
  try {
    const topics = await ForumTopic.find()
      .populate("categoryId", "name slug")
      .sort({ lastActivityAt: -1 })
      .limit(5);

    res.json(
      topics.map((t) => ({
        id: t._id,
        title: t.title,
        authorName: t.authorName,
        categoryName: t.categoryId?.name,
        replies: t.replyCount,
        lastActivity: t.lastActivityAt,
      })),
    );
  } catch (error) {
    console.error("Get recent discussions error:", error);
    res.status(500).json({ message: error.message });
  }
};
