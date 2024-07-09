import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomSelect from "../CustomSelect";
import { SelectChangeEvent } from "@mui/material/Select";
import CustomMultiSelect from "../CustomMultiSelect";
import { useData } from "../../context";
import { Product } from "../../model";

const FilterSection: React.FC<{
  applied: boolean;
  handleRun: (arg: boolean) => void;
}> = ({ applied, handleRun }) => {
  const [category, setCategory] = useState<string>("");
  const { data, toggleSpinner, handleBarChartData } = useData();
  const [productList, setProductList] = useState<Product[]>([]);
  const [product, setProduct] = useState<number[]>([]);
  const [disable, setDisable] = useState<boolean>(true);
  /**get all category */
  async function getProductByCatg(arg: string) {
    try {
      if (arg) {
        toggleSpinner(true);

        const res = await fetch(
          `https://dummyjson.com/products/category/${arg}`
        );
        const data = await res.json();
        console.log(data);
        setProductList(data["products"]);
        toggleSpinner(false);
      }
    } catch (error) {}
  }

  useEffect(() => {
    getProductByCatg(category);
  }, [category]);

  const onCategoriesChange = (event: SelectChangeEvent<typeof category>) => {
    setCategory(event.target.value);
    setProduct([]);
    setDisable(false);
  };
  const onProductChange = (event: SelectChangeEvent<number[]>) => {
    const {
      target: { value },
    } = event;
    console.log(value);
    if (typeof value !== "string") {
      setProduct(value);
    }
  };

  const handleSubmit = () => {
    var temp: any[] = [];
    if (product.length == 0) {
      temp = productList;
    } else {
      temp = productList.filter((el) => product.includes(el["id"]));
    }
    toggleSpinner(true);
    setTimeout(() => {
      handleBarChartData(temp);
      toggleSpinner(false);
      handleRun(true);
    }, 3000);
    setDisable(true);
  };
  const reset = () => {
    setCategory("");
    setProduct([]);
    setProductList([]);
    handleRun(false);
    setDisable(false);
  };
  return (
    <Paper sx={{ border: "1px solid", p: 3, height: "100%" }} elevation={0}>
      <Stack flexDirection="row" justifyContent="space-between">
        <Typography variant="h6">Filters</Typography>
        <Button variant="text" onClick={() => reset()}>
          Reset
        </Button>
      </Stack>
      <Box component="form" mt={3}>
        <CustomSelect
          options={data}
          value={category}
          handleChange={onCategoriesChange}
        />
        <CustomMultiSelect
          options={productList}
          value={product}
          disable={!category}
          handleChange={onProductChange}
        />
        <Button
          fullWidth
          variant="contained"
          disabled={disable || !category}
          onClick={handleSubmit}
          sx={{ my: 2 }}
        >
          Run Report
        </Button>
      </Box>
    </Paper>
  );
};

export default FilterSection;
