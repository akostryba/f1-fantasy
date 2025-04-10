import databaseService from "./databaseService";
import { ID, Query } from "react-native-appwrite";

// Appwrite database and collection ID
const dbId = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID;
const colId = process.env.EXPO_PUBLIC_APPWRITE_COL_TEAMS_ID;

const teamService = {
    
    async getTeams(userId){
        if(!userId){
            console.error("Error: Missing userId in getTeams");
            return {
                data: [], error: "User ID is missing"
            }
        }

        try {
            const response = await databaseService.listDocuments(dbId, colId, [
                Query.equal('owner_id', userId)
            ]);
            return response;
        } catch (error) {
            console.log("Error fetching teams:", error.message);
            return { data: [], error: error.message};
        }
    },

    // join league AKA create team
    async joinLeague(userId, leagueId){
        const data = {
            owner_id: userId,
            created_at: new Date().toISOString(),
            league_id: leagueId,
        }

        const response = await databaseService.createDocument(dbId, colId, data, ID.unique());
        if (response?.error){
            return {error: response.error};
        }
        return {data: response};
    }
};

export default teamService;