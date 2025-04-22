import databaseService from "./databaseService";
import { ID, Query } from "react-native-appwrite";

// Appwrite database and collection ID
const dbId = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID;
const colId = process.env.EXPO_PUBLIC_APPWRITE_COL_LEAGUES_ID;
const teamsColId = process.env.EXPO_PUBLIC_APPWRITE_COL_TEAMS_ID;

const leagueService = {

    async getLeague(leagueId){
        if(!leagueId){
            console.error("Error: Missing leagueId in getLeague");
            return {
                data: [], error: "League ID is missing"
            }
        }

        try {
            const response = await databaseService.listDocuments(dbId, colId, [
                Query.equal('$id', leagueId)
            ]);
            return response;
        } catch (error) {
            console.log("Error fetching league:", error.message);
            return { data: [], error: error.message};
        }
    },

    async createLeague(userId, leagueName, maxTeams){
        if (!leagueName) {
            return { error: "League name is required" };
        }

        const data = {
            race_director: userId,
            name: leagueName ? leagueName : "F1 Fantasy League",
            created_at: new Date().toISOString(),
            max_teams: maxTeams || 10
        }

        const response = await databaseService.createDocument(dbId, colId, data, ID.unique());
        if (response.error) {
            console.error("Error creating league:", response.error);
            return { error: response.error };
        }
        return {data: response};
    },

    async getAvailableLeagues(userId) {
        try {
            // Get all leagues that exist
            const allLeagues = await databaseService.listDocuments(dbId, colId);
            
            if (!allLeagues || allLeagues.error) {
                console.error("Error fetching leagues:", allLeagues?.error || "No response");
                return { error: allLeagues?.error || "Failed to fetch leagues" };
            }
            
            // Get teams that user has
            const userTeams = await databaseService.listDocuments(dbId, teamsColId, [
                Query.equal('owner_id', userId)
            ]);
            
            if (!userTeams || userTeams.error) {
                console.error("Error fetching user teams:", userTeams?.error || "No response");
                return { error: userTeams?.error || "Failed to fetch user teams" };
            }
            
            const userLeagueIds = userTeams.data.map(team => team.league_id);
            
            // Only show leagues that the user isn't already in
            const availableLeagues = allLeagues.data.filter(
                league => !userLeagueIds.includes(league.$id)
            );
            
            return availableLeagues;
        } catch (error) {
            console.error("Error in getAvailableLeagues:", error.message);
            return { error: error.message };
        }
    },

    async getLeagueMembers(leagueId) {
        if(!leagueId) {
            console.error("Error: Missing leagueId in getLeagueMembers");
            return { error: "League ID is missing" };
        }

        try {
            const response = await databaseService.listDocuments(dbId, teamsColId, [
                Query.equal('league_id', leagueId)
            ]);
            
            if (!response || response.error) {
                console.error("Error fetching league members:", response?.error || "No response");
                return { error: response?.error || "Failed to fetch league members" };
            }
            
            return response.data;
        } catch (error) {
            console.error("Error in getLeagueMembers:", error.message);
            return { error: error.message };
        }
    }
};

export default leagueService;