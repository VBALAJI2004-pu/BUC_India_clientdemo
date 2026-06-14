import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    role: {
      type: String,
      enum: ['founder', 'co-founder', 'admin', 'co-admin'],
      default: 'admin',
    },
    email: { type: String, trim: true, lowercase: true },
    phone: { type: String, trim: true },
  },
  { _id: false }
);

const clubSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    logoUrl: {
      type: String,
      default: '',
    },
    logoPublicId: {
      type: String,
      default: '',
    },
    startedOn: {
      type: Date,
    },
    firstRideImageUrl: {
      type: String,
      default: '',
    },
    firstRideImagePublicId: {
      type: String,
      default: '',
    },
    moto: {
      type: String,
      trim: true,
      default: '',
    },
    showcaseText: {
      type: String,
      trim: true,
      default: '',
    },
    governmentIdNumber: {
      type: String,
      trim: true,
      default: '',
    },
    governmentIdImageUrl: {
      type: String,
      default: '',
    },
    governmentIdImagePublicId: {
      type: String,
      default: '',
    },
    founderPassportUrl: {
      type: String,
      default: '',
    },
    founderPassportPublicId: {
      type: String,
      default: '',
    },
    founder: adminSchema,
    admins: [adminSchema],
    createdBy: {
      email: { type: String, trim: true, lowercase: true },
      phone: { type: String, trim: true },
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

const Club = mongoose.model('Club', clubSchema);
export default Club;
