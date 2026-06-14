import Certificate from '../models/Certificate.js';
import User from '../models/User.js';
import Event from '../models/Event.js';
import Club from '../models/Club.js';

// Admin: list certificates with optional filters
export const getCertificates = async (req, res) => {
  try {
    const { eventId, userEmail } = req.query;
    const filter = {};

    if (eventId) {
      filter.eventId = eventId;
    }

    if (userEmail) {
      const user = await User.findOne({ email: userEmail.toLowerCase() });
      if (user) {
        filter.userId = user._id;
      } else {
        return res.json([]);
      }
    }

    const certs = await Certificate.find(filter)
      .populate('userId', 'fullName email phone')
      .populate('eventId', 'title eventDate')
      .populate('clubId', 'name');

    res.json(certs);
  } catch (error) {
    console.error('Get certificates error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Admin: create or upsert a certificate record for a registration
export const createOrUpdateCertificate = async (req, res) => {
  try {
    const { userId, eventId, clubId, participantName } = req.body;

    if (!userId || !eventId || !participantName) {
      return res
        .status(400)
        .json({ message: 'userId, eventId and participantName are required' });
    }

    // Basic existence checks (best-effort, no need to block if missing)
    const [user, event] = await Promise.all([
      User.findById(userId),
      Event.findById(eventId),
    ]);
    if (!user || !event) {
      return res
        .status(400)
        .json({ message: 'Invalid user or event for certificate' });
    }

    let clubRef = null;
    if (clubId) {
      const club = await Club.findById(clubId);
      if (club) {
        clubRef = club._id;
      }
    }

    const cert = await Certificate.findOneAndUpdate(
      { userId: userId, eventId: eventId },
      {
        userId,
        eventId,
        clubId: clubRef,
        participantName,
        status: 'ready',
        generatedAt: new Date(),
      },
      { new: true, upsert: true, setDefaultsOnInsert: true },
    );

    res.status(201).json(cert);
  } catch (error) {
    console.error('Create certificate error:', error);
    res.status(400).json({ message: error.message });
  }
};
