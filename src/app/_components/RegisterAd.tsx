"use client";

import { Button } from "@mui/material";
import { useState } from "react";
import AuthModals from "./AuthModals"; 
import { useRouter } from "next/navigation"; 
import { useUser } from "../_context/UserContext";

const RegisterAd: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter(); 
  const { user } = useUser();

  const handleModalClose = () => setOpenModal(false);
  const handleModalOpen = () => setOpenModal(true);

  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault();
    if (user) {
      router.push("/ads/create-ad");
    } else {
      handleModalOpen(); 
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

      <AuthModals  open={openModal} handleClose={handleModalClose} />
    </>
  );
};

export default RegisterAd;