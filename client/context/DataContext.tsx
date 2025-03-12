import React, { createContext, useState, useEffect, ReactNode } from "react";
import { propertyData } from "../utils/properties"; // Import properties.js

// Define TypeScript interface for Property
interface Property {
  id: string;
  name: string;
  price: number;
  location: string;
  latitude: number;
  longitude: number;
  propertyType: string;
  bed: number;
  bath: number;
  distance: number;
  broker: string;
  description: string;
  image: any;
  status?: string;
}

// Define DataContextProps
interface DataContextProps {
  data: Property[];
  isRefreshing: boolean;
  fetchData: () => void;
}

// Create the DataContext with default undefined value
export const DataContext = createContext<DataContextProps | undefined>(
  undefined
);

// Define props for DataProvider
interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [data, setData] = useState<Property[]>([]);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  // Function to fetch data
  const fetchData = async () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setData(propertyData); // Fetching from properties.js
      setIsRefreshing(false);
    }, 2000);
  };

  // Fetch data once when the provider mounts
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ data, isRefreshing, fetchData }}>
      {children}
    </DataContext.Provider>
  );
};
