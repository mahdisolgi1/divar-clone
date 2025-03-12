import React from "react";
import Checkbox from "@mui/material/Checkbox";
interface OTECheckBoxProps {
  isOTEChecked: boolean;
  onIsOTEcheckbox: (value: boolean) => void;
}

const OTECheckBox: React.FC<OTECheckBoxProps> = ({
  onIsOTEcheckbox,
  isOTEChecked,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onIsOTEcheckbox(event.target.checked);
  };

  return (
    <div>
      <label className="text-black-primary text-[0.875rem]">
        مایلم معاوضه کنم
      </label>
      <Checkbox
        onChange={handleChange}
        checked={isOTEChecked}
        sx={{
          "& .MuiSvgIcon-root": {
            backgroundColor: "white",
            borderRadius: "4px",
            transition: "background-color 0.3s ease",
          },
          "&.Mui-checked": {
            "& .MuiSvgIcon-root": {
              backgroundColor: "white",
              color: "red",
            },
          },
        }}
        inputProps={{ "aria-label": "red background checkbox" }}
      />
    </div>
  );
};

export default OTECheckBox;
