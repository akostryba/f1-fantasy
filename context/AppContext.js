import React, { createContext, useState, useContext } from 'react';
import teamPrincipals from '@/static/teamPrincipals.json';
import { AuthProvider } from './AuthContext';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [drivers, setDrivers] = useState({});
  const [userDriverNums, setUserDriverNums] = useState([1, 4]);
  const [teamPrincipal, setTeamPrincipal] = useState(teamPrincipals["mercedes"]);
  const [league, setLeague] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [meetings, setMeetings] = useState([]);


  return (
    <AppContext.Provider value={{ drivers, setDrivers, userDriverNums, setUserDriverNums, teamPrincipal, setTeamPrincipal, league, setLeague, setSelectedTeam, selectedTeam, meetings, setMeetings}}>
      <AuthProvider>
        {children}
      </AuthProvider>
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);