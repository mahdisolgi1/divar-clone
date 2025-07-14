import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  Snackbar,
  CircularProgress,
} from "@mui/material";
import { useState, useEffect } from "react";
import LoginModal from "./LoginModal";
import { useUser } from "../_context/UserContext";

interface SignUpModalProps {
  open: boolean;
  handleClose: () => void;
  openLogin: () => void;
}

const SignUpModal: React.FC<SignUpModalProps> = ({ open, handleClose,openLogin }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const { signUp } = useUser();

  useEffect(() => {
    console.log('SignUpModal mounted, signUp function:', signUp);
  }, []);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 6;
  };

  const handleSignUp = async () => {
    console.log('handleSignUp called');
    // Reset messages
    setErrorMessage(null);
    setSuccessMessage(null);

    // Validate inputs
    if (!email || !password) {
      setErrorMessage("لطفا هر دو فیلد را پر کنید.");
      return;
    }

    if (!validateEmail(email)) {
      setErrorMessage("لطفا یک ایمیل معتبر وارد کنید.");
      return;
    }

    if (!validatePassword(password)) {
      setErrorMessage("رمز عبور باید حداقل 6 کاراکتر باشد.");
      return;
    }

    try {
      setLoading(true);
      const { error } = await signUp(email, password);
      
      console.log('SignUp attempt with email:', email);
      if (error) {
        if (error.includes("already registered")) {
          setErrorMessage("این ایمیل قبلاً ثبت شده است.");
        } else {
          setErrorMessage(error);
        }
      } else {
        setSuccessMessage("ثبت نام موفقیت آمیز! لطفاً ایمیل خود را برای تأیید حساب بررسی کنید.");
        setEmail("");
        setPassword("");
        
        setTimeout(() => {
          handleClose();
          setSuccessMessage(null);
        }, 3000);
      }
      console.log('SignUp result:', { error });
    } catch (error) {
      console.log('SignUp error:', error);
      setErrorMessage("خطایی در هنگام ثبت نام رخ داد. لطفا دوباره تلاش کنید.");
    } finally {
      setLoading(false);
    }
  };

  const handleLoginLinkClick = () => {
    handleClose();
    openLogin();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !loading) {
      handleSignUp();
    }
  };

  return (
    <>
      <Modal 
        open={open} 
        onClose={handleClose}
        aria-labelledby="signup-modal"
      >
        <Box sx={{
          ...modalStyle,
          width: { xs: '90%', sm: '400px' },
          maxWidth: '500px',
        }}>
          <Typography
            variant="h6"
            className="text-lg text-black-secondary dark:text-dark-white-secondary text-right "
          >
            ساخت حساب کاربری
          </Typography>
          
          <TextField
            label="ایمیل"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!errorMessage && errorMessage.includes("ایمیل")}
            sx={{ marginBottom: 2 }}
            disabled={loading}
          />
          
          <TextField
            label="رمز عبور"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!errorMessage && errorMessage.includes("رمز")}
            sx={{ marginBottom: 3,}}
            disabled={loading}
          />
          
          <Button
            disabled={loading}
            variant="contained"
            fullWidth
            sx={{
              background: "#a62626",
              height: "48px",
              "&:hover": {
                background: "#be3737",
              },
            }}
            onClick={handleSignUp}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "ثبت نام"
            )}
          </Button>

          {successMessage && (
            <Typography sx={{ color: 'green', marginTop: 2, textAlign: 'right' }}>
              {successMessage}
            </Typography>
          )}

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
            }}
            onClick={handleLoginLinkClick}
          >
            حساب دارید؟ ورود به حساب کاربری
          </Typography>
        </Box>
      </Modal>


    </>
  );
};

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "white",
  padding: "24px",
  borderRadius: "8px",
  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
};

export default SignUpModal;