import React, { createContext, useState, useContext } from 'react';

// Create a context
const FavoriteContext = createContext();

// Create a provider component
export const FavoriteProvider = ({ children }) => {
  const [favorites, setFavorites] = useState({});

  const toggleFavorite = (id) => {
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
export const useFavorite = () => useContext(FavoriteContext);
