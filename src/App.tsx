import * as React from "react";
import Container from "@mui/material/Container";
import { Grid } from "@mui/material";
import FilterSection from "./components/FilterSection";
import PieChart from "./components/charts/PieChart";
import Spinner from "./components/Spinner";
import { useData } from "./context";
import BarChart from "./components/charts/BarChart";

export default function App() {
  const { loading, chartData, data } = useData();
  const [applied, setApplied] = React.useState(false);

  return (
    <Container maxWidth="lg" sx={{ m: 5 }}>
      <Grid
        container
        className="ne-relative"
        spacing={2}
        sx={{ height: "calc(100vh - 100px)" }}
      >
        <Spinner open={loading} />
        <Grid item xs={11} md={4}>
          <FilterSection
            handleRun={(arg) => setApplied(arg)}
            applied={applied}
          />
        </Grid>
        <Grid item xs={11} md={8} alignSelf={"center"}>
          {!applied && <PieChart data={data} />}
          {applied && (
            <BarChart xaxis={chartData.xaxis} yaxis={chartData.yaxis} />
          )}
        </Grid>
      </Grid>
    </Container>
  );
}
