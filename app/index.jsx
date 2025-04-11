import { StyleSheet, Text, TouchableOpacity, View, Image, Alert, FlatList } from "react-native";
import { useRouter } from "expo-router";
import { useApp } from "@/context/AppContext";
import f1Logo from "@/assets/images/f1-logo.png";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import teamService from "@/services/teamService";
import leagueService from "@/services/leagueService";
import rosterService from "@/services/rosterService";


const HomeScreen = () => {

  const router = useRouter();
  const { setLeague, setSelectedTeam, setUserDriverNums } = useApp();

  const { user, loading:authLoading } = useAuth();
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    if (!authLoading && !user) {
        router.replace('/auth');
    }
  }, [user, authLoading]);

  useEffect(() => {
    const fetchTeams = async () => {
      if(!authLoading && user) {
        const response = await teamService.getTeams(user.$id);
        if (response.error) {
          console.error("Error fetching teams:", response.error);
          Alert.alert("Error", response.error);
          return;
        }

        const teamsData = response.data;
        const teamsWithLeagues = await Promise.all(
          teamsData.map(async (team) => {
            const leagueResponse = await leagueService.getLeague(team.league_id);
            if (leagueResponse.error) {
              console.error("Error fetching league:", leagueResponse.error);
              return null;
            }
            return {
              ...team,
              league: leagueResponse.data[0],
            };
        }));
        setTeams(teamsWithLeagues);
      }
    }

    fetchTeams();
  },[user, authLoading]);

  const selectLeague = async (leagueId, teamId) => {
    setLeague(leagueId);
    setSelectedTeam(teamId);
    const drivers = await rosterService.getDrivers(teamId);
    setUserDriverNums([drivers.data[0]?.driver_number || null, drivers.data[1]?.driver_number] || null);
    router.push(`/team`)
  }

  return (
    <View style={styles.container}>

      <View style={styles.topRow}>
        <Text style={styles.leagueLabel}>Leagues</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => router.push('/addLeague')}
        >
          <Text style={styles.addSymbol}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        style={styles.leagueList}
        data={teams}
        keyExtractor={(team) => team.$id}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.leagueContainer}
            onPress={() => selectLeague(item.league_id, item.$id)}>
            <Text style={styles.leagueName}>{item.league.name}</Text>
          </TouchableOpacity>
        )}
      />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#15151e",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  image: {
    width: 200,
    height: 100,
    resizeMode: "contain",
  },
  leagueLabel: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
    borderBottomWidth: 1,
    borderColor: "#fff",

  },
  addSymbol: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  leagueContainer: {
    backgroundColor: "#1e1e2f",
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
    width: "100%",
  },
  leagueName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  leagueList: {
    width: "100%",
    marginBottom: 20,
  },
})

export default HomeScreen;
