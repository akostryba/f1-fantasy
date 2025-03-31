import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [drivers, setDrivers] = useState({});
  const [userDriverNums, setUserDriverNums] = useState([1, 4]);

  return (
    <AppContext.Provider value={{ drivers, setDrivers, userDriverNums, setUserDriverNums}}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);