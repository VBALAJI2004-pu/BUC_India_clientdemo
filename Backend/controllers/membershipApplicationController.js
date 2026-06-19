import MembershipApplication from "../models/MembershipApplication.js";

export const submitApplication = async (req, res) => {
  try {
    const {
      fullName,
      phone,
      email,
      city,
      state,
      bike,
      experience,
      motivation,
      termsAccepted,
    } = req.body;

    if (!fullName?.trim() || !phone?.trim() || !email?.trim()) {
      return res
        .status(400)
        .json({ message: "Full name, phone, and email are required" });
    }

    if (!termsAccepted || termsAccepted === "false") {
      return res
        .status(400)
        .json({ message: "You must accept the terms and conditions" });
    }

    const application = await MembershipApplication.create({
      fullName: fullName.trim(),
      phone: phone.trim(),
      email: email.trim().toLowerCase(),
      city: city?.trim() || "",
      state: state?.trim() || "",
      bike: bike?.trim() || "",
      experience: experience?.trim() || "",
      motivation: motivation?.trim() || "",
      termsAccepted: true,
      status: "pending",
    });

    res.status(201).json({
      message: "Membership application submitted successfully",
      id: application._id,
    });
  } catch (error) {
    console.error("Submit membership application error:", error);
    res.status(400).json({ message: error.message });
  }
};

export const getAllApplications = async (req, res) => {
  try {
    const applications = await MembershipApplication.find().sort({
      createdAt: -1,
    });
    res.json(applications);
  } catch (error) {
    console.error("Get membership applications error:", error);
    res.status(500).json({ message: error.message });
  }
};

export const updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, adminNotes } = req.body;

    if (!["pending", "approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const application = await MembershipApplication.findByIdAndUpdate(
      id,
      {
        status,
        adminNotes: adminNotes || "",
        reviewedAt: new Date(),
      },
      { new: true },
    );

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.json(application);
  } catch (error) {
    console.error("Update membership application error:", error);
    res.status(400).json({ message: error.message });
  }
};

export const deleteApplication = async (req, res) => {
  try {
    const application = await MembershipApplication.findByIdAndDelete(
      req.params.id,
    );
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }
    res.json({ message: "Application deleted" });
  } catch (error) {
    console.error("Delete membership application error:", error);
    res.status(500).json({ message: error.message });
  }
};
