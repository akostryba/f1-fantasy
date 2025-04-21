import databaseService from "./databaseService";
import { ID, Query } from "react-native-appwrite";

// Appwrite database and collection ID
const dbId = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID;
const colId = process.env.EXPO_PUBLIC_APPWRITE_COL_ROSTERS_ID;

const rosterService = {

    async getDrivers(teamId) {
        if (!teamId){
            console.error("Error: Missing teamId in getDrivers");
            return {
                data: [], error: "Team ID is missing"
            }
        }

        try {
            const response = await databaseService.listDocuments(dbId, colId, [
                Query.equal('team_id', teamId)
            ]);
            return response;
        } catch (error) {
            console.log("Error fetching drivers:", error.message);
            return { data: [], error: error.message};
        }
    },

    async addDriver(teamId, driverNumber) {
        const data = {
            team_id: teamId,
            driver_number: driverNumber.toString(),
        }

        const response = await databaseService.createDocument(dbId, colId, data, ID.unique());
        if(response?.error) {
            return { error: response.error };
        }

        return {data: response};
    },

    async removeDriver(id) {

        const response = await databaseService.deleteDocument(dbId, colId, id);
        if(response?.error) {
            return { error: response.error };
        }

        return {data: response};
    }

}

export default rosterService;