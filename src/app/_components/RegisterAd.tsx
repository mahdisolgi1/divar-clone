"use client";

import { Button } from "@mui/material";
import { useState } from "react";
import { useUser } from "../_context/UserContext"; // assuming you have a UserContext
import SignUpModal from "./SignUpModal"; // import the SignUpModal
import { useRouter } from "next/navigation"; // Import useRouter for navigation

const RegisterAd: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const { user } = useUser(); // assuming useUser hook provides user state
  const router = useRouter(); // Next.js router for navigation

  const handleModalClose = () => setOpenModal(false);
  const handleModalOpen = () => setOpenModal(true);

  const handleClick = (event: React.MouseEvent) => {
    if (!user) {
      event.preventDefault();
      handleModalOpen(); // Open the sign-up modal if no user
    } else {
      router.push("/create-ad"); // Redirect to create-ad page
    }
  };

  return (
    <>
      <Button
        variant="contained"
        sx={{ background: "#a62626" }}
        className="hover:bg-[#be3737] hover:shadow-none whitespace-nowrap"
        onClick={handleClick}
      >
        ثبت آگهی
      </Button>

      {/* Conditionally render the modal if no user */}
      <SignUpModal open={openModal} handleClose={handleModalClose} />
    </>
  );
};

export default RegisterAd;
