import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
// import { Product } from './ProductInterface';

interface BarChartProps {
  xaxis: string[];
  yaxis: number[];
}

const BarChart: React.FC<BarChartProps> = ({ xaxis, yaxis }) => {
  const chartOptions: Highcharts.Options = {
    chart: {
      type: "bar",
    },
    title: {
      text: "Product Prices",
    },
    xAxis: {
      categories: xaxis,
      title: {
        text: "Product Title",
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: "Price (USD)",
        align: "high",
      },
      labels: {
        overflow: "justify",
      },
    },
    series: [
      {
        name: "Price",
        type: "bar",
        data: yaxis,
      },
    ],
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  );
};

export default BarChart;
