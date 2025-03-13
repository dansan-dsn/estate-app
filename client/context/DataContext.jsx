import React, { createContext, useState, useEffect, ReactNode } from "react";
import { propertyData } from "../utils/properties"; // Import properties.js

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Function to fetch data
  const fetchData = async () => {
    setIsRefreshing(true);
    setIsLoading(true);

    setTimeout(() => {
      setData(propertyData); // Fetching from properties.js
      setIsRefreshing(false);
      setIsLoading(false); // ✅ Now set isLoading to false after setting data
    }, 2000);
  };

  // Fetch data once when the provider mounts
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ data, isRefreshing, isLoading, fetchData }}>
      {children}
    </DataContext.Provider>
  );
};
