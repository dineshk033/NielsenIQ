import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";

function CustomSelect({ value, options, handleChange }) {
  return (
    <FormControl required fullWidth>
      <InputLabel id="category-select">Category</InputLabel>
      <Select
        labelId="category-select"
        id="category-select-id"
        label="Category"
        value={value}
        placeholder="Select Category"
        onChange={handleChange}
      >
        {options.map((item) => (
          <MenuItem key={item["slug"]} value={item["slug"]}>
            {item["name"]}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default CustomSelect;
