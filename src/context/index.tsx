import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { CategoryModel, ChartModel, DataContextModel, Product } from "../model";

const DataContext = createContext<DataContextModel | undefined>(undefined);

const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<CategoryModel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [chartData, setChartData] = useState<ChartModel>({
    xaxis: [],
    yaxis: [],
  });

  async function getAllCategory() {
    try {
      const res = await fetch("https://dummyjson.com/products/categories");
      const json = await res.json();
      setData(json);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }
  useEffect(() => {
    setLoading(true);
    getAllCategory();
  }, []);

  const toggleSpinner = (arg: boolean) => {
    setLoading(arg);
  };
  const handleBarChartData = (arg: Product[]) => {
    const xaxis = [];
    const yaxis = [];
    for (let value of arg) {
      xaxis.push(value["title"]);
      yaxis.push(value["price"]);
    }
    setChartData({ xaxis, yaxis });
  };

  return (
    <DataContext.Provider
      value={{ data, loading, chartData, handleBarChartData, toggleSpinner }}
    >
      {children}
    </DataContext.Provider>
  );
};

const useData = (): DataContextModel => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};

export { DataProvider, useData };
