import mongoose from "mongoose";

const safetyInfluencerSchema = new mongoose.Schema(
  {
    profilePhoto: { type: String, default: "" },
    profilePhotoPublicId: { type: String, default: "" },
    name: { type: String, required: true, trim: true },
    designation: { type: String, default: "", trim: true },
    organization: { type: String, default: "", trim: true },
    shortDescription: { type: String, default: "", trim: true },
    fullArticle: { type: String, default: "" },
    instagramUrl: { type: String, default: "", trim: true },
    facebookUrl: { type: String, default: "", trim: true },
    twitterUrl: { type: String, default: "", trim: true },
    websiteUrl: { type: String, default: "", trim: true },
    youtubeUrl: { type: String, default: "", trim: true },
    displayOrder: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

const SafetyInfluencer = mongoose.model("SafetyInfluencer", safetyInfluencerSchema);
export default SafetyInfluencer;
