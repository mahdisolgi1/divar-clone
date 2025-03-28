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
import SignUpModal from "./SignUpModal";

interface LoginModalProps {
  open: boolean;
  handleClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ open, handleClose }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { login } = useUser();
  const [openSignUp, setOpenSignUp] = useState<boolean>(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setErrorMessage("Please fill out both fields.");
      return;
    }

    try {
      const { error } = await login(email, password);
      if (error) {
        setErrorMessage(error);
      } else {
        handleClose();
      }
    } catch {
      setErrorMessage("An error occurred during login. Please try again.");
    }
  };

  const handleSignUpLinkClick = () => {
    handleClose();
    setOpenSignUp(true);
  };

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Typography
            variant="h6"
            className="text-lg text-black-secondary text-right"
          >
            ورود به حساب کاربری
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
            variant="contained"
            sx={{ background: "#a62626" }}
            className="hover:bg-[#be3737] hover:shadow-none text-right whitespace-nowrap"
            onClick={handleLogin}
          >
            ورود
          </Button>

          {errorMessage && (
            <Typography sx={{ color: "red", marginTop: 2 }}>
              {errorMessage}
            </Typography>
          )}

          <Typography
            variant="body2"
            sx={{ marginTop: 2, cursor: "pointer", color: "blue" }}
            onClick={handleSignUpLinkClick}
          >
            حساب ندارید؟ ثبت نام حساب کاربری
          </Typography>
        </Box>
      </Modal>

      {/* Snackbar for showing success or error messages */}
      {errorMessage && (
        <Snackbar
          open={!!errorMessage}
          message={errorMessage}
          autoHideDuration={6000}
          onClose={() => setErrorMessage(null)}
        />
      )}

      {/* Sign Up Modal */}
      <SignUpModal open={openSignUp} handleClose={() => setOpenSignUp(false)} />
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

export default LoginModal;
