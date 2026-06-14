import Club from '../models/Club.js';
import ClubMembership from '../models/ClubMembership.js';
import ClubExitLog from '../models/ClubExitLog.js';
import User from '../models/User.js';

// Helper to resolve or create user from email/phone, mirroring existing profile logic
const findUserByContact = async (email, phone) => {
  if (!email && !phone) return null;
  const query = {};
  if (email) query.email = email.toLowerCase();
  if (phone) query.phone = phone;
  return await User.findOne(query);
};

// Public: get the active club membership for a user (if any)
export const getMyClub = async (req, res) => {
  try {
    const { email, phone } = req.query;
    const user = await findUserByContact(email, phone);
    if (!user) {
      return res.json({ membership: null });
    }

    const membership = await ClubMembership.findOne({
      userId: user._id,
      status: 'active',
    }).populate('clubId', 'name logoUrl moto');

    res.json({ membership });
  } catch (error) {
    console.error('Get my club error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Public: join a club as a member (enforces one active club per user)
export const joinClub = async (req, res) => {
  try {
    const { clubId } = req.params;
    const { email, phone } = req.body;

    if (!email && !phone) {
      return res
        .status(400)
        .json({ message: 'Email or phone is required to join a club' });
    }

    const club = await Club.findById(clubId);
    if (!club || club.status !== 'approved') {
      return res
        .status(400)
        .json({ message: 'Club not found or not approved yet' });
    }

    const user = await findUserByContact(email, phone);
    if (!user) {
      return res.status(404).json({
        message:
          'User profile not found. Please complete your BUC profile before joining a club.',
      });
    }

    // Check for existing active membership to any club
    const existingActive = await ClubMembership.findOne({
      userId: user._id,
      status: 'active',
    }).populate('clubId', 'name');

    if (existingActive) {
      return res.status(400).json({
        message:
          existingActive.clubId && existingActive.clubId.name
            ? `You are already an active member of ${existingActive.clubId.name}. You cannot join a second club, but you can still register for rides.`
            : 'You already have an active club membership. You cannot join a second club, but you can still register for rides.',
      });
    }

    const membership = await ClubMembership.create({
      clubId: club._id,
      userId: user._id,
      role: 'member',
      status: 'active',
    });

    res.status(201).json(membership);
  } catch (error) {
    console.error('Join club error:', error);
    res.status(400).json({ message: error.message });
  }
};

// Public: leave current club with a reason
export const leaveClub = async (req, res) => {
  try {
    const { clubId } = req.params;
    const { email, phone, reason } = req.body;

    if (!reason || !reason.trim()) {
      return res
        .status(400)
        .json({ message: 'Please provide a reason for leaving the club' });
    }

    const user = await findUserByContact(email, phone);
    if (!user) {
      return res.status(404).json({
        message: 'User profile not found.',
      });
    }

    const membership = await ClubMembership.findOne({
      clubId,
      userId: user._id,
      status: 'active',
    });

    if (!membership) {
      return res
        .status(404)
        .json({ message: 'Active club membership not found' });
    }

    membership.status = 'exited';
    membership.exitReason = reason;
    membership.exitedAt = new Date();
    await membership.save();

    // Persist a separate exit log for BUC owner analytics
    await ClubExitLog.create({
      clubId,
      userId: user._id,
      reason: reason.trim(),
      exitedAt: membership.exitedAt,
    });

    res.json({ message: 'You have left the club successfully' });
  } catch (error) {
    console.error('Leave club error:', error);
    res.status(400).json({ message: error.message });
  }
};

// Admin: view membership records and exit reasons
export const getAllMemberships = async (req, res) => {
  try {
    const memberships = await ClubMembership.find()
      .populate('clubId', 'name logoUrl')
      .populate('userId', 'fullName email phone')
      .sort({ createdAt: -1 });

    res.json(memberships);
  } catch (error) {
    console.error('Get memberships error:', error);
    res.status(500).json({ message: error.message });
  }
};
