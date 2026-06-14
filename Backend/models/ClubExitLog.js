import mongoose from 'mongoose';

const clubExitLogSchema = new mongoose.Schema(
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
    reason: {
      type: String,
      trim: true,
      required: true,
    },
    exitedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

const ClubExitLog = mongoose.model('ClubExitLog', clubExitLogSchema);
export default ClubExitLog;
