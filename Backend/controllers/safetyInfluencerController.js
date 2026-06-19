import SafetyInfluencer from "../models/SafetyInfluencer.js";
import { cloudinary } from "../middleware/cloudinaryConfig.js";

const parseBool = (value) => value === true || value === "true";

const buildPayload = (body, file, existing = null) => {
  const payload = {
    name: body.name?.trim() || existing?.name || "",
    designation: body.designation?.trim() ?? existing?.designation ?? "",
    organization: body.organization?.trim() ?? existing?.organization ?? "",
    shortDescription:
      body.shortDescription?.trim() ?? existing?.shortDescription ?? "",
    fullArticle: body.fullArticle ?? existing?.fullArticle ?? "",
    instagramUrl: body.instagramUrl?.trim() ?? existing?.instagramUrl ?? "",
    facebookUrl: body.facebookUrl?.trim() ?? existing?.facebookUrl ?? "",
    twitterUrl: body.twitterUrl?.trim() ?? existing?.twitterUrl ?? "",
    websiteUrl: body.websiteUrl?.trim() ?? existing?.websiteUrl ?? "",
    youtubeUrl: body.youtubeUrl?.trim() ?? existing?.youtubeUrl ?? "",
    displayOrder: Number(body.displayOrder ?? existing?.displayOrder ?? 0),
    isActive:
      body.isActive !== undefined
        ? parseBool(body.isActive)
        : (existing?.isActive ?? true),
  };

  if (file) {
    payload.profilePhoto = file.path;
    payload.profilePhotoPublicId = file.filename;
  }

  return payload;
};

const destroyPhoto = async (publicId) => {
  if (!publicId) return;
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (err) {
    console.error("Error deleting image from Cloudinary:", err);
  }
};

export const getPublicInfluencers = async (req, res) => {
  try {
    const influencers = await SafetyInfluencer.find({ isActive: true }).sort({
      displayOrder: 1,
      createdAt: -1,
    });
    res.json(influencers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllInfluencers = async (req, res) => {
  try {
    const influencers = await SafetyInfluencer.find().sort({
      displayOrder: 1,
      createdAt: -1,
    });
    res.json(influencers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createInfluencer = async (req, res) => {
  try {
    if (!req.body.name?.trim()) {
      return res.status(400).json({ message: "Name is required" });
    }
    if (!req.file) {
      return res.status(400).json({ message: "Profile photo is required" });
    }

    const influencer = new SafetyInfluencer(buildPayload(req.body, req.file));
    const saved = await influencer.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateInfluencer = async (req, res) => {
  try {
    const influencer = await SafetyInfluencer.findById(req.params.id);
    if (!influencer) {
      return res.status(404).json({ message: "Influencer not found" });
    }

    const updates = buildPayload(req.body, null, influencer);

    if (req.file) {
      await destroyPhoto(influencer.profilePhotoPublicId);
      updates.profilePhoto = req.file.path;
      updates.profilePhotoPublicId = req.file.filename;
    }

    Object.assign(influencer, updates);
    const saved = await influencer.save();
    res.json(saved);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteInfluencer = async (req, res) => {
  try {
    const influencer = await SafetyInfluencer.findById(req.params.id);
    if (!influencer) {
      return res.status(404).json({ message: "Influencer not found" });
    }

    await destroyPhoto(influencer.profilePhotoPublicId);
    await SafetyInfluencer.findByIdAndDelete(req.params.id);
    res.json({ message: "Influencer deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
