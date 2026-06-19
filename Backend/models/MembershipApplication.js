import mongoose from "mongoose";

const membershipApplicationSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    city: { type: String, default: "", trim: true },
    state: { type: String, default: "", trim: true },
    bike: { type: String, default: "", trim: true },
    experience: { type: String, default: "", trim: true },
    motivation: { type: String, default: "", trim: true },
    termsAccepted: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    adminNotes: { type: String, default: "" },
    reviewedAt: { type: Date },
  },
  { timestamps: true },
);

const MembershipApplication = mongoose.model(
  "MembershipApplication",
  membershipApplicationSchema,
);
export default MembershipApplication;
