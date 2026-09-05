import { useState } from "react";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";
interface AuthModalsProps {
    open: boolean;
    handleClose: () => void;
  }
  const AuthModals = ({open }:AuthModalsProps)        => {
    const [openLogin, setOpenLogin] = useState(true);
    const [openSignUp, setOpenSignUp] = useState(false);
  
    return (
      <>{open &&(<>
        <LoginModal
          open={openLogin}
          handleClose={() => setOpenLogin(false)}
          openSignUp={() => {
            setOpenLogin(false);
            setOpenSignUp(true);
          }}
        />
        <SignUpModal
          open={openSignUp}
          handleClose={() => setOpenSignUp(false)}
          openLogin={() => {
            setOpenSignUp(false);
            setOpenLogin(true);
        }}
        />
        </>
        )}
      </>
    );
  };
  export default AuthModals;