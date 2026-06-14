import mongoose from 'mongoose';

const clubMembershipSchema = new mongoose.Schema(
  {
    clubId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Club',
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    role: {
      type: String,
      enum: ['founder', 'co-founder', 'admin', 'co-admin', 'member'],
      default: 'member',
    },
    status: {
      type: String,
      enum: ['active', 'exited'],
      default: 'active',
    },
    exitReason: {
      type: String,
      trim: true,
      default: '',
    },
    exitedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

// Ensure a user can only have one active club membership at a time
clubMembershipSchema.index(
  { userId: 1, status: 1 },
  {
    unique: true,
    partialFilterExpression: { status: 'active' },
  }
);

clubMembershipSchema.index({ clubId: 1, status: 1 });

const ClubMembership = mongoose.model('ClubMembership', clubMembershipSchema);
export default ClubMembership;
