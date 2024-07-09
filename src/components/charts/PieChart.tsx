import React, { useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { CategoryModel } from "../../model";

const PieChart: React.FC<{ data: CategoryModel[] }> = ({ data }) => {
  useEffect(() => {
    // Prepare data in Highcharts format
    const chartData = data.map((category, index) => ({
      name: category["name"],
      y: index + 10, // Assigning arbitrary values for illustration
    }));

    // Highcharts configuration options
    const options = {
      chart: {
        type: "pie",
      },
      title: {
        text: "Pie Chart with Categories",
      },
      series: [
        {
          name: "Categories",
          data: chartData,
        },
      ],
    };

    // Render the chart
    (Highcharts as any).chart("pie-chart-container", options);
  }, [data]);

  return (
    <div
      id="pie-chart-container"
      style={{ width: "100%", height: "400px" }}
    ></div>
  );
};

export default PieChart;
