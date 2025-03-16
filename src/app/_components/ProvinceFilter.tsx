"use client";
import { useState, useEffect, MouseEvent } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import { useRouter } from "next/navigation";
import { getProvinces } from "../_lib/data-service";
import { province } from "../_types/modalTypes";
import { CiLocationOn } from "react-icons/ci";
import Spinner from "./Spinner";
import { MdClose } from "react-icons/md";

const ProvinceFilter = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [provinces, setProvinces] = useState<province[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const data = await getProvinces();
        setProvinces(data);
      } catch (err) {
        setError("Failed to load provinces");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProvinces();
  }, []);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProvinceSelect = (province: province) => {
    setSelectedProvince(province.province);

    const url = new URL(window.location.href);
    url.searchParams.set("province", province.province);

    router.push(url.toString());

    handleClose();
  };
  const handleRemoveProvince = () => {
    setSelectedProvince(null);

    const url = new URL(window.location.href);
    url.searchParams.delete("province");
    router.push(url.toString());

    handleClose();
  };

  return (
    <>
      <Button
        sx={{
          color: "rgba(0, 0, 0, 0.56)",
          padding: "0.5rem 1rem",
        }}
        className="flex gap-2 px-4 py-2 hover:bg-black-light-100 rounded transition-colors transition-border duration-[360ms] ease-in-out hover:text-black-primary text-black-secondary items-center hover:bg-opacity-90"
        onClick={handleClick}
      >
        <span className="text-base font-medium whitespace-nowrap">
          {selectedProvince ? selectedProvince : "استان ها"}
        </span>
        {selectedProvince ? (
          <MdClose
            className="text-lg cursor-pointer"
            size={20}
            onClick={handleRemoveProvince}
          />
        ) : (
          <CiLocationOn className="text-lg" size={20} />
        )}
      </Button>
      <Menu
        anchorEl={anchorEl}
        className="text-right"
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {loading ? (
          <MenuItem>
            <Spinner />
          </MenuItem>
        ) : error ? (
          <MenuItem>{error}</MenuItem>
        ) : (
          provinces.map((province) => (
            <MenuItem
              key={province.id}
              onClick={() => handleProvinceSelect(province)}
              className="text-right"
            >
              {province.province}
            </MenuItem>
          ))
        )}
      </Menu>
    </>
  );
};

export default ProvinceFilter;
