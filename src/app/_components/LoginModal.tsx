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

interface LoginModalProps {
  open: boolean;
  handleClose: () => void;
  openSignUp: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ open, handleClose,openSignUp }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { login } = useUser();

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
    openSignUp();
  };

  return (
    <>
      <Modal open={open} onClose={handleClose}         aria-labelledby="login-modal"
      >
      
      <Box sx={{
          ...modalStyle,
          width: { xs: '90%', sm: '400px' },
          maxWidth: '500px',
        }}>.

          <Typography
            variant="h6"
            className="text-lg text-black-secondary text-right"
          >
            ورود به حساب کاربری
          </Typography>
          <TextField
            label="ایمیل"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="رمز عبور"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <Button
            variant="contained"
            fullWidth
            sx={{
              background: "#a62626",
              height: "48px",
              "&:hover": {
                background: "#be3737",
              },
            }}   onClick={handleLogin}
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
            sx={{ 
              marginTop: 2, 
              cursor: "pointer", 
              color: "#1976d2",
              textAlign: 'right'
            }}  onClick={handleSignUpLinkClick}
          >
            حساب ندارید؟ ثبت نام حساب کاربری
          </Typography>
        </Box>
      </Modal>

      {/* Snackbar for showing success or error messages */}
  

      {/* Sign Up Modal */}
    </>
  );
};

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "white",
  padding: "0 24px 24px 24px",
  borderRadius: "8px",
  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
};

export default LoginModal;
