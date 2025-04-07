import databaseService from "./databaseService";
import { ID, Query } from "react-native-appwrite";

// Appwrite database and collection ID
const dbId = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID;
const colId = process.env.EXPO_PUBLIC_APPWRITE_COL_LEAGUES_ID;

const leagueService = {

    async getLeague(leagueId){
        if(!leagueId){
            console.error("Error: Missing leagueId in getLeague");
            return {
                data: [], error: "League ID is missing"
            }
        }

        try {
            const response = await databaseService.listDocuments(dbId, colId, leagueId);
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
    }

};

export default leagueService;