"use client";

import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import UserModal from "./UserModal";

const RegisterAd: React.FC = () => {
  const router = useRouter();

  const handleAuthenticated = () => {
    router.push("/ads/create-ad");
  };

  return (
    <UserModal onAuthenticated={handleAuthenticated}>
      <Button
        variant="contained"
        sx={{ background: "#a62626" }}
        className="hover:bg-[#be3737] hover:shadow-none dark:text-dark-black-primary whitespace-nowrap"
      >
        ثبت آگهی
      </Button>
    </UserModal>
  );
};

export default RegisterAd;