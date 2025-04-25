import { View, Text, StyleSheet } from 'react-native';
import Navbar from '@/components/navbar';
import { useApp } from '@/context/AppContext.js';
import leagueService from '@/services/leagueService';
import rosterService from '@/services/rosterService';
import { useEffect, useState } from "react";
import { use } from 'react';

const LeagueScreen = () => {

    const { league } = useApp();
    
    const [leagueMembers, setLeagueMembers] = useState([]);

    useEffect(() => {
        const getLeagueMembers = async () => {
            if(!league) return;
            const response = await leagueService.getLeagueMembers(league);
            if(response.error) {
                console.error("Error fetching league members:", response.error);
                return;
            }
            setLeagueMembers(response);
        }

        getLeagueMembers();
    }, [league]);

    useEffect(() => {
        const fetchDrivers = async () => {
            if(!leagueMembers) return;
            const drivers = await Promise.all(leagueMembers.map(async (member) => {
                const response = await rosterService.getDrivers(member.$id);
                return {
                    ...member,
                    drivers: response
                }
            }));
            setLeagueMembers(drivers);

        }

        fetchDrivers();
    }, [leagueMembers]);

    
    return ( 
        <View style={styles.container}>
            <Navbar selected="league"/>

            {leagueMembers.map((member, index) => (
                <View key={index} style={styles.teamContainer}>
                    <Text style={styles.teamName}>{member.team_name}</Text>
                </View>
            ))}
        </View>
     );
}
 
export default LeagueScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 10,
        backgroundColor: '#15151e',
    },
    teamContainer: {
        padding: 10,
        marginVertical: 5,
        backgroundColor: '#1e1e2f',
        borderRadius: 8,
    },
    teamName: {
        fontSize: 18,
        color: '#fff',
    },
});