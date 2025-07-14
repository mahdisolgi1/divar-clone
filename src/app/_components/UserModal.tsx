"use client";

import { useState } from "react";
import AuthModals from "./AuthModals";
import { useUser } from "../_context/UserContext";

interface UserModalProps {
  onAuthenticated?: () => void;
  children: React.ReactNode;
  className?: string;
}

const UserModal: React.FC<UserModalProps> = ({ 
  onAuthenticated, 
  children, 
  className 
}) => {
  const [openModal, setOpenModal] = useState(false);
  const { user } = useUser();

  const handleModalClose = () => setOpenModal(false);
  const handleModalOpen = () => setOpenModal(true);

  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault();
    if (user) {
      onAuthenticated?.();
    } else {
      handleModalOpen();
    }
  };

  return (
    <>
      <div onClick={handleClick} className={className}>
        {children}
      </div>

      <AuthModals open={openModal} handleClose={handleModalClose} />
    </>
  );
};

export default UserModal;
