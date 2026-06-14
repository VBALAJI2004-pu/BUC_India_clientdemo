import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    eventDate: {
      type: Date,
      required: true,
    },
    eventTime: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    meetingPoint: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    // When enabled by admin, riders can download e-certificates
    certificateEnabled: {
      type: Boolean,
      default: false,
    },
    banner: {
      type: String,
      required: true,
    },
    bannerPublicId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const Event = mongoose.model('Event', eventSchema);
export default Event;
