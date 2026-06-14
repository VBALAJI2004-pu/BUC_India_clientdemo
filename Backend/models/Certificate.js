import mongoose from 'mongoose';

const certificateSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
      required: true,
    },
    clubId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Club',
      default: null,
    },
    participantName: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ['ready'],
      default: 'ready',
    },
    generatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

certificateSchema.index({ userId: 1, eventId: 1 }, { unique: true });

const Certificate = mongoose.model('Certificate', certificateSchema);
export default Certificate;
