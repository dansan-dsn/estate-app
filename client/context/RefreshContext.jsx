import React, { createContext, useState, useCallback } from "react";

const RefreshContext = createContext()

export const RefreshProvider = ({children}) => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
    }, 2000)
  },[])

  return (
      <RefreshContext.Provider value={{ refreshing, onRefresh }}>
        {children}
      </RefreshContext.Provider>
  )
}