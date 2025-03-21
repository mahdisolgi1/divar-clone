import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  Snackbar,
} from "@mui/material";
import { useState } from "react";
import { useUser } from "../_context/UserContext";
import LoginModal from "./LoginModal";

interface SignUpModalProps {
  open: boolean;
  handleClose: () => void;
}

const SignUpModal: React.FC<SignUpModalProps> = ({ open, handleClose }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const { signUp } = useUser();
  const [openLogin, setOpenLogin] = useState<boolean>(false);
  const handleSignUp = async () => {
    if (!email || !password) {
      setErrorMessage("Please fill out both fields.");
      return;
    }

    try {
      setLoading(true);
      const { error } = await signUp(email, password);
      if (error) {
        setErrorMessage(error);
        setLoading(false);
      } else {
        setSuccessMessage(
          "Sign up successful! Please check your email to confirm your account."
        );

        setTimeout(() => {
          handleClose();
          setSuccessMessage(null);
        }, 10000);
        setLoading(false);
      }
    } catch {
      setErrorMessage("An error occurred during sign up. Please try again.");
    }
  };

  const handleLoginLinkClick = () => {
    handleClose();
    setOpenLogin(true);
  };

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Typography
            variant="h6"
            className="text-lg text-black-secondary text-right"
          >
            ساخت حساب کاربری
          </Typography>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <Button
            disabled={loading}
            variant="contained"
            sx={{ background: "#a62626" }}
            className="hover:bg-[#be3737] hover:shadow-none text-right whitespace-nowrap"
            onClick={handleSignUp}
          >
            ثبت نام
          </Button>

          {successMessage && (
            <Typography sx={{ color: "red", marginTop: 2 }}>
              {successMessage}
            </Typography>
          )}

          <Typography
            variant="body2"
            sx={{ marginTop: 2, cursor: "pointer", color: "blue" }}
            onClick={handleLoginLinkClick}
          >
            حساب دارید؟ ورود به حساب کاربری
          </Typography>
        </Box>
      </Modal>

      {/* Snackbar for showing success or error messages */}
      <Snackbar
        open={!!errorMessage}
        message={errorMessage}
        autoHideDuration={6000}
        onClose={() => setErrorMessage(null)}
      />

      {/* Login Modal */}
      <LoginModal open={openLogin} handleClose={() => setOpenLogin(false)} />
    </>
  );
};

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "8px",
  boxShadow: 24,
};

export default SignUpModal;
