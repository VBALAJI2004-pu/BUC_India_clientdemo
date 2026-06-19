import User from "../models/User.js";
import ClubMembership from "../models/ClubMembership.js";

const ROLE_PRIORITY = {
  "BUC India Owner": 1,
  Founder: 2,
  "Co-Founder": 3,
  "Club Owner": 4,
  "Club Admin": 5,
  "Club Co-Admin": 6,
  Member: 7,
  Rider: 8,
};

const formatMembershipRole = (role = "") => {
  const r = role.toLowerCase();
  if (r.includes("founder") && !r.includes("co")) return "Founder";
  if (r.includes("co-founder")) return "Co-Founder";
  if (r.includes("co-admin")) return "Club Co-Admin";
  if (r.includes("admin")) return "Club Admin";
  if (r.includes("owner")) return "Club Owner";
  return "Member";
};

const resolveUserRole = (user, membership) => {
  if (user.registrationType === "PS") return "BUC India Owner";
  if (membership?.role) return formatMembershipRole(membership.role);
  return user.registrationType || "Rider";
};

export const getPublicUsers = async (req, res) => {
  try {
    const users = await User.find({ fullName: { $nin: [null, ""] } })
      .populate("clubId", "name")
      .sort({ createdAt: -1 })
      .select("fullName city state profileImage registrationType clubId");

    const memberships = await ClubMembership.find({ status: "active" })
      .populate("clubId", "name")
      .select("userId clubId role");

    const membershipByUser = new Map(
      memberships.map((m) => [String(m.userId), m]),
    );

    const directory = users.map((user) => {
      const membership = membershipByUser.get(String(user._id));
      const clubFromMembership =
        membership?.clubId && typeof membership.clubId === "object"
          ? membership.clubId.name
          : "";
      const clubFromUser =
        user.clubId && typeof user.clubId === "object"
          ? user.clubId.name
          : "";

      return {
        fullName: user.fullName || "",
        role: resolveUserRole(user, membership),
        clubName: clubFromMembership || clubFromUser || "",
        city: user.city || "",
        state: user.state || "",
        profileImage: user.profileImage || "",
      };
    });

    directory.sort(
      (a, b) =>
        (ROLE_PRIORITY[a.role] || 99) - (ROLE_PRIORITY[b.role] || 99) ||
        a.fullName.localeCompare(b.fullName),
    );

    res.json(directory);
  } catch (error) {
    console.error("Get public users error:", error);
    res.status(500).json({ message: error.message });
  }
};
