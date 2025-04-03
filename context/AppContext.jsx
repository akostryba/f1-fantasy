import React, { createContext, useState, useContext } from 'react';
import teamPrincipals from '@/static/teamPrincipals.json';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [drivers, setDrivers] = useState({});
  const [userDriverNums, setUserDriverNums] = useState([1, 4]);
  const [teamPrincipal, setTeamPrincipal] = useState(teamPrincipals["mercedes"]);


  return (
    <AppContext.Provider value={{ drivers, setDrivers, userDriverNums, setUserDriverNums, teamPrincipal, setTeamPrincipal}}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);