import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import TwoWheelerIcon from "@mui/icons-material/TwoWheeler";
import EventIcon from "@mui/icons-material/Event";
import GroupsIcon from "@mui/icons-material/Groups";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import ForumIcon from "@mui/icons-material/Forum";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import RegistrationForm from "./RegistrationForm.jsx";
const buclogo = "/logo.jpg";
import { profileService } from "../services/api";

const navigation = [
  { name: "Events", path: "/events", icon: <EventIcon /> },
  { name: "Gallery", path: "/gallery", icon: <PhotoLibraryIcon /> },
  { name: "Members", path: "/members", icon: <GroupsIcon /> },
  { name: "Forum", path: "/forum", icon: <ForumIcon /> },
  { name: "Clubs", path: "/clubs", icon: <TwoWheelerIcon /> },
];

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);

  const handler = () =>
    setIsLoggedIn(sessionStorage.getItem("userLoggedIn") === "true");
  const loginHandler = () => {
    handler();
    const email = sessionStorage.getItem("userEmail");
    const phone = sessionStorage.getItem("userPhone");
    if (email || phone) {
      fetchProfile(email, phone);
    } else {
      setUserProfile(null);
    }
  };

  useEffect(() => {
    loginHandler();
    const openReg = () => setShowRegistrationForm(true);
    window.addEventListener("user-login-change", loginHandler);
    window.addEventListener("storage", loginHandler);
    window.addEventListener("open-registration", openReg);
    return () => {
      window.removeEventListener("user-login-change", loginHandler);
      window.removeEventListener("storage", loginHandler);
      window.removeEventListener("open-registration", openReg);
    };
  }, []);

  const fetchProfile = async (email, phone) => {
    try {
      const profile = await profileService.get(email || "", phone || "");
      if (profile) setUserProfile(profile);
    } catch (err) {
      console.warn("Profile fetch failed:", err);
    }
  };

  const handleLogout = () => {
    sessionStorage.clear();
    setIsLoggedIn(false);
    setUserProfile(null);
    window.dispatchEvent(new Event("user-login-change"));
    navigate("/");
    setIsMenuOpen(false);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          bgcolor: "rgba(15, 18, 20, 0.85)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Toolbar
          sx={{
            maxWidth: "1440px",
            width: "100%",
            mx: "auto",
            px: { xs: 3, sm: 5 },
            minHeight: { xs: 72, sm: 84 } /* Increased height to ~80-90px */,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Left: Logo */}
          <Box
            onClick={() => handleNavigation("/")}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              cursor: "pointer",
              flex: 1 /* Takes exactly 1/3 of the space */,
              justifyContent: "flex-start",
            }}
          >
            <Avatar
              src={buclogo}
              alt="BUC India"
              sx={{
                width: 56,
                height: 56,
                border: "2px solid",
                borderColor: "rgba(255,255,255,0.1)",
                boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
              }}
            />
            <Box>
              <Typography
                variant="subtitle1"
                sx={{
                  fontFamily: "'Audiowide', 'Inter', sans-serif",
                  fontWeight: 900 /* Bold typography */,
                  color: "text.primary",
                  fontSize: {
                    xs: "1.4rem",
                    sm: "1.6rem",
                  } /* Larger font size */,
                  lineHeight: 1.1,
                  letterSpacing: "-0.5px" /* Modern tight tracking */,
                }}
              >
                Buc_India
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: "text.secondary" /* Light grey */,
                  fontSize: "0.75rem",
                  letterSpacing: "0.5px",
                  fontWeight: 500,
                  display: { xs: "none", sm: "block" },
                }}
              >
                Ride Together, Stand Together
              </Typography>
            </Box>
          </Box>

          {/* Center: Desktop Nav — Premium Pill Style */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              justifyContent: "center" /* Perfectly centered */,
              gap: 1 /* Expanded spacing */,
              bgcolor: "rgba(255, 255, 255, 0.03)",
              borderRadius: "999px",
              border: "1px solid",
              borderColor: "rgba(255, 255, 255, 0.08)",
              p: 0.75,
              backdropFilter: "blur(20px)" /* Apple-like glassmorphism */,
              boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
            }}
          >
            {navigation.map((item) => (
              <Button
                key={item.name}
                onClick={() => handleNavigation(item.path)}
                sx={{
                  color:
                    location.pathname === item.path
                      ? "white"
                      : "text.secondary",
                  bgcolor:
                    location.pathname === item.path
                      ? "primary.main"
                      : "transparent",
                  fontWeight: location.pathname === item.path ? 700 : 500,
                  fontSize: "0.9rem",
                  letterSpacing: "0.2px",
                  px: 3 /* Increased padding */,
                  py: 1.2 /* Increased padding */,
                  borderRadius: "999px",
                  textTransform: "none",
                  minWidth: "auto",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  "&:hover": {
                    bgcolor:
                      location.pathname === item.path
                        ? "primary.dark"
                        : "rgba(255, 255, 255, 0.08)",
                    color: "white",
                  },
                }}
              >
                {item.name}
              </Button>
            ))}
          </Box>

          {/* Right: Desktop Actions */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: 2,
              flex: 1 /* Takes exact 1/3 of the space to keep nav centered */,
              justifyContent: "flex-end",
            }}
          >
            {isLoggedIn ? (
              <Button
                onClick={() => handleNavigation("/profile")}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  textTransform: "none",
                  color: "text.primary",
                  borderRadius: "999px",
                  px: 2,
                  py: 0.75,
                  border: "1px solid rgba(255,255,255,0.1)",
                  "&:hover": { bgcolor: "rgba(255, 255, 255, 0.05)" },
                }}
              >
                <Avatar
                  src={userProfile?.profileImage}
                  sx={{
                    width: 36,
                    height: 36,
                    bgcolor: "primary.main",
                    fontSize: "0.9rem",
                  }}
                >
                  {getInitials(userProfile?.fullName)}
                </Avatar>
                <Box sx={{ textAlign: "left", flexShrink: 0 }}>
                  <Typography
                    variant="caption"
                    sx={{
                      color: "text.primary",
                      fontWeight: 700,
                      display: "block",
                      lineHeight: 1.2,
                    }}
                  >
                    {userProfile?.fullName || "Member"}
                  </Typography>
                </Box>
              </Button>
            ) : (
              <>
                <Button
                  variant="text"
                  size="large"
                  onClick={() => handleNavigation("/login")}
                  sx={{
                    color: "text.secondary",
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    textTransform: "none",
                    "&:hover": { color: "white" },
                  }}
                >
                  Login
                </Button>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => handleNavigation("/signup")}
                  sx={{
                    fontSize: "0.9rem",
                    fontWeight: 700,
                    px: 3.5,
                    py: 1.2,
                    borderRadius: "999px",
                    textTransform: "none",
                    boxShadow: "0 4px 20px rgba(59, 130, 246, 0.3)",
                  }}
                >
                  Join Now
                </Button>
              </>
            )}
          </Box>

          {/* Mobile Hamburger */}
          <IconButton
            sx={{ display: { md: "none" }, ml: "auto", color: "text.primary" }}
            onClick={() => setIsMenuOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        PaperProps={{
          sx: {
            width: 280,
            bgcolor: "background.paper",
            borderLeft: "1px solid",
            borderColor: "divider",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            p: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Avatar src={buclogo} sx={{ width: 32, height: 32 }} />
            <Typography
              variant="subtitle2"
              sx={{
                fontFamily: "'Audiowide', sans-serif",
                fontWeight: 700,
                color: "text.primary",
              }}
            >
              Buc_India
            </Typography>
          </Box>
          <IconButton onClick={() => setIsMenuOpen(false)} size="small">
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider />

        <List sx={{ px: 1, py: 2 }}>
          {navigation.map((item) => (
            <ListItemButton
              key={item.name}
              onClick={() => handleNavigation(item.path)}
              selected={location.pathname === item.path}
              sx={{ borderRadius: 1, mb: 0.5 }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 36,
                  color:
                    location.pathname === item.path
                      ? "primary.main"
                      : "text.secondary",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.name}
                primaryTypographyProps={{
                  fontWeight: location.pathname === item.path ? 700 : 500,
                  fontSize: "0.875rem",
                }}
              />
            </ListItemButton>
          ))}
        </List>

        <Divider />

        <Box sx={{ p: 2 }}>
          {isLoggedIn ? (
            <>
              <ListItemButton
                onClick={() => handleNavigation("/profile")}
                sx={{ borderRadius: 2, mb: 1 }}
              >
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <Avatar
                    src={userProfile?.profileImage}
                    sx={{
                      width: 28,
                      height: 28,
                      bgcolor: "primary.main",
                      fontSize: "0.7rem",
                    }}
                  >
                    {getInitials(userProfile?.fullName)}
                  </Avatar>
                </ListItemIcon>
                <ListItemText
                  primary={userProfile?.fullName || "Member"}
                  secondary="View Profile"
                  primaryTypographyProps={{
                    fontSize: "0.875rem",
                    fontWeight: 600,
                  }}
                  secondaryTypographyProps={{ fontSize: "0.7rem" }}
                />
              </ListItemButton>
              <ListItemButton
                onClick={handleLogout}
                sx={{ borderRadius: 2, color: "error.main" }}
              >
                <ListItemIcon sx={{ minWidth: 36, color: "error.main" }}>
                  <LogoutIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primary="Logout"
                  primaryTypographyProps={{
                    fontSize: "0.875rem",
                    fontWeight: 600,
                  }}
                />
              </ListItemButton>
            </>
          ) : (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Button
                variant="outlined"
                fullWidth
                startIcon={<LoginIcon />}
                onClick={() => handleNavigation("/login")}
                sx={{ textTransform: "none" }}
              >
                Login
              </Button>
              <Button
                variant="contained"
                fullWidth
                startIcon={<PersonAddIcon />}
                onClick={() => handleNavigation("/signup")}
                sx={{ textTransform: "none" }}
              >
                Sign Up
              </Button>
            </Box>
          )}
        </Box>
      </Drawer>

      <RegistrationForm
        isOpen={showRegistrationForm}
        onClose={() => setShowRegistrationForm(false)}
        type="community"
      />
    </>
  );
};

export default Header;
