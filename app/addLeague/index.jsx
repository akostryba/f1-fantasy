import { StyleSheet, Text, TouchableOpacity, View, TextInput, Alert } from "react-native";
import { useState } from "react";
import leagueService from "@/services/leagueService";
import teamService from "@/services/teamService";
import { useRouter } from 'expo-router';
import { useAuth } from "@/context/AuthContext";

const AddLeagueScreen = () => {

    const router = useRouter();
    const { user } = useAuth();

    const [maxTeams, setMaxTeams] = useState("");
    const [teamName, setTeamName] = useState("");

    const handleMaxTeamsChange = (value) => {
        const numericValue = parseInt(value,10);
        if (!isNaN(numericValue) && numericValue >= 1 && numericValue <= 10) {
            setMaxTeams(value);
        } else {
            setMaxTeams("");
        }
    }
2
    const handleSubmit = async () => {
        const numericValue = parseInt(maxTeams,10);
        
        const response = await leagueService.createLeague(user.$id, teamName, numericValue);
        if (response.error) {
            Alert.alert("Error", response.error);
            return;
        }
        else{
            const teamResponse = await teamService.joinLeague(user.$id, response.data.$id);
            if (teamResponse.error) {
                Alert.alert("Error", teamResponse.error);
                return;
            }
            else{
                Alert.alert("Success", "League created successfully");
                router.replace('/');
            }
        }
    }

    return ( 
        <View style={styles.container}>
            <Text style={styles.header}>Add League</Text>

            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>League Name</Text>
                <TextInput style={styles.input} value={teamName} onChangeText={setTeamName} placeholder="F1 Fantasy League" placeholderTextColor="lightgrey"/>
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Max Teams</Text>
                <TextInput 
                    style={styles.input} 
                    placeholder="Enter max teams" 
                    placeholderTextColor="lightgrey"
                    keyboardType="numeric" 
                    value={maxTeams}
                    onChangeText={handleMaxTeamsChange}
                />
            </View>
            <TouchableOpacity style={styles.button} onPress={async () => await handleSubmit()}>
                <Text style={styles.buttonText}>Create League</Text>
            </TouchableOpacity>
        </View>
     );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#15151e",
      },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#fff",
        marginBottom: 20,
        textAlign: "center",
    },
    inputContainer: {
        marginBottom: 20,
    },
    inputLabel: {
        fontSize: 16,
        color: "#fff",
        marginBottom: 5,
    },
    input: {
        height: 40,
        borderColor: "#fff",
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        color: "#fff",
        placeholderTextColor: "#fff",
    },
    button: {
        backgroundColor: "#FF1801",
        paddingVertical: 15,
        borderRadius: 5,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
});
 
export default AddLeagueScreen;