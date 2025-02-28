import React from "react";
import Checkbox from "@mui/material/Checkbox";

const CheckBoxes: React.FC = () => {
  const [checked, setChecked] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    <div onChange={handleChange}>
      <label className="text-black-primary text-[0.875rem]">
        مایلم معاوضه کنم
      </label>
      <Checkbox
        checked={checked}
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

export default CheckBoxes;
