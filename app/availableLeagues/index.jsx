import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import leagueService from '@/services/leagueService';
import teamService from '@/services/teamService';

const AvailableLeaguesScreen = () => {
  const [leagues, setLeagues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(null); // which league is being joined
  const { user, authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        if (!authLoading && user) {
          setLoading(true);
          const response = await leagueService.getAvailableLeagues(user.$id);
          
          if (response.error) {
            Alert.alert("Error", response.error);
            setLoading(false);
            return;
          }
          
          const leaguesWithMemberCount = await Promise.all(
            response.map(async (league) => {
              const memberResponse = await leagueService.getLeagueMembers(league.$id);
              return {
                ...league,
                memberCount: memberResponse.error ? 0 : memberResponse.length
              };
            })
          );
          
          setLeagues(leaguesWithMemberCount);
        }
      } catch (error) {
        console.error("Error fetching leagues:", error);
        Alert.alert("Error", "Failed to fetch available leagues");
      } finally {
        setLoading(false);
      }
    };

    fetchLeagues();
  }, [user, authLoading]);

  const handleJoinLeague = async (leagueId) => {
    try {
      setJoining(leagueId);
      
      if (!user) {
        Alert.alert("Error", "You must be logged in to join a league");
        return;
      }

      const response = await teamService.joinLeague(user.$id, leagueId);
      
      if (response.error) {
        Alert.alert("Error", response.error);
        return;
      }

      Alert.alert(
        "You've joined the league successfully!",
        [{ text: "OK", onPress: () => router.replace('/') }]
      );
    } catch (error) {
      console.error("Error joining league:", error);
      Alert.alert("Error", "Failed to join league");
    } finally {
      setJoining(null);
    }
  };

  const renderLeague = ({ item }) => {
    const isJoining = joining === item.$id;
    const hasSpace = item.memberCount < item.max_teams;

    return (
      <View style={styles.leagueContainer}>
        <View style={styles.leagueInfo}>
          <Text style={styles.leagueName}>{item.name}</Text>
          <Text style={styles.leagueCapacity}>
            Members: {item.memberCount} / {item.max_teams}
          </Text>
        </View>
        <TouchableOpacity 
          style={[
            styles.joinButton, 
            !hasSpace && styles.disabledButton,
            isJoining && styles.loadingButton
          ]}
          onPress={() => hasSpace && handleJoinLeague(item.$id)}
          disabled={!hasSpace || isJoining}
        >
          {isJoining ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.joinButtonText}>{hasSpace ? "Join" : "Full"}</Text>
          )}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Available Leagues</Text>
      
      {loading ? (
        <ActivityIndicator size="large" color="#fff" style={styles.loader} />
      ) : leagues.length > 0 ? (
        <FlatList
          data={leagues}
          renderItem={renderLeague}
          keyExtractor={(item) => item.$id}
          style={styles.leagueList}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No available leagues found</Text>
          <TouchableOpacity 
            style={styles.createButton}
            onPress={() => router.push('/addLeague')}
          >
            <Text style={styles.createButtonText}>Create League</Text>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#15151e',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  leagueList: {
    width: '100%',
    flexGrow: 0,
  },
  listContent: {
    paddingBottom: 10,
  },
  leagueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#323248',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
  leagueInfo: {
    flex: 1,
  },
  leagueName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  leagueCapacity: {
    fontSize: 14,
    color: 'lightgrey',
  },
  joinButton: {
    backgroundColor: '#FF1801',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  joinButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#666',
  },
  loadingButton: {
    backgroundColor: '#823c35',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 20,
  },
  createButton: {
    backgroundColor: '#FF1801',
    borderRadius: 10,
    padding: 15,
    width: '80%',
    alignItems: 'center',
  },
  createButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
  },
  backButton: {
    backgroundColor: '#323248',
    borderRadius: 10,
    padding: 15,
    marginTop: 10,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default AvailableLeaguesScreen;