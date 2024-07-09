import {
  Box,
  Checkbox,
  Chip,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React from "react";
import { Product } from "../../model";

interface CustomMultiSelectProps {
  options: Product[];
  value: any;
  disable:boolean;
  handleChange: (event: SelectChangeEvent<number[]>) => void;
}

const CustomMultiSelect: React.FC<CustomMultiSelectProps> = ({
  options,
  value,
  disable,
  handleChange,
}) => {
  console.log(options);
  return (
    <FormControl sx={{ mt: 3 }} fullWidth>
      <InputLabel id="product-select-label">Chip</InputLabel>
      <Select
        labelId="product-select-label"
        id="product-select"
        multiple
        value={value}
        disabled={disable}
        onChange={handleChange}
        input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((item: number) => {
              const option = options.find((el) => el["id"] === item);
              return (
                option && <Chip key={option["title"]} label={option["title"]} />
              );
            })}
          </Box>
        )}
      >
        {options.map((item: Product) => (
          <MenuItem key={item["id"].toString()} value={item["id"]}>
            <Checkbox checked={value.indexOf(item["id"]) > -1} />
            <ListItemText primary={item["title"]} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CustomMultiSelect;
