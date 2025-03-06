import React, { createContext, useState, useContext, ReactNode } from "react";

// Define the type for the favorites state
type FavoritesState = {
  [key: string]: boolean; // Each property ID will have a boolean favorite state
};

// Define the type for the context value
interface FavoriteContextType {
  favorites: FavoritesState;
  toggleFavorite: (id: string) => void;
}

// Create the context with an initial undefined value
const FavoriteContext = createContext<FavoriteContextType | undefined>(undefined);

// Provider component props
interface FavoriteProviderProps {
  children: ReactNode;
}

// Create a provider component
export const FavoriteProvider: React.FC<FavoriteProviderProps> = ({ children }) => {
  const [favorites, setFavorites] = useState<FavoritesState>({});

  const toggleFavorite = (id: string) => {
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [id]: !prevFavorites[id],
    }));
  };

  return (
    <FavoriteContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
};

// Custom hook to use the Favorite context
export const useFavorite = (): FavoriteContextType => {
  const context = useContext(FavoriteContext);
  if (!context) {
    throw new Error("useFavorite must be used within a FavoriteProvider");
  }
  return context;
};
