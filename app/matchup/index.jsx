import { View, Text, StyleSheet, FlatList, Image, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import positionScoring from '@/scoring/positionScoring.json';
import placeholderProfile from '@/assets/images/profile.avif';
import DriverContainer from '@/components/driverContainer.jsx';
import {fetchPosition, fetchSession, fetchDrivers} from '@/api/OpenF1.js';

const MatchupScreen = () => {

    const [session, setSession] = useState(null);
    const [positions, setPositions] = useState([]);
    const [opponentPositions, setOpponentPositions] = useState([]);
    const [drivers, setDrivers] = useState({});
    const [loadingDrivers, setLoadingDrivers] = useState(true);
    const [loadingSession, setLoadingSession] = useState(true);
    const [loadingPositions, setLoadingPositions] = useState(true);
    const [userPoints, setUserPoints] = useState(0);
    const [opponentPoints, setOpponentPoints] = useState(0);

    useEffect(() => {
        const getSession = async () => {
            setLoadingSession(true);
            const session = await fetchSession();
            setSession(session);
            setLoadingSession(false);
        };
        const getDrivers = async () => {
            setLoadingDrivers(true);
            const drivers = await fetchDrivers();
            setDrivers(drivers);
            setLoadingDrivers(false);
        }

        try{
            getSession();
            getDrivers();
        } catch (error) {
            Alert.alert('Error: ' + error.message);
            console.error(error);
        }
    }, []);

    useEffect(() => {

        const fetchPositions = async() =>{
            setLoadingPositions(true);
            const verPos = await fetchPosition(session, 1);
            const hamPos = await fetchPosition(session, 44);
            setPositions([verPos, hamPos]);
    
            const piaPos = await fetchPosition(session, 81);
            const rusPos = await fetchPosition(session, 63);
            setOpponentPositions([piaPos, rusPos]);
            setLoadingPositions(false);
        }

        if(session) {
            try{
                fetchPositions();
            }
            catch(error){
                Alert.alert('Error: ' + error.message);
                console.error(error);
            }
        }
    }, [session]);

    useEffect(() => {
        setUserPoints(updateScore(positions));
    }, [positions]);

    useEffect(() => {
        setOpponentPoints(updateScore(opponentPositions));
    }, [opponentPositions]);

    const updateScore = (positions) => {
        let totalPoints = 0;
        positions.forEach((position) => {
            const points = Number(positionScoring[position.position]);
            if (points) {
                totalPoints += points;
            }
        });
        return totalPoints;
    }

    return (  
        <View style={styles.container}>
            <Text style={styles.headerText}>Matchup Screen</Text>
            <View style={styles.profilesContainer}>
                <View style={styles.profileLeft}>
                    <Image source={placeholderProfile} style={[styles.profilePicture]} />
                    <Text style={{color: '#fff'}}>User 1</Text>
                    <Text style={styles.totalPoints}>{userPoints.toFixed(1)}</Text>
                </View>
                <View style={styles.profileRight}>
                    <Image source={placeholderProfile} style={[styles.profilePicture]} />
                    <Text style={{color: '#fff'}}>User 2</Text>
                    <Text style={styles.totalPoints}>{opponentPoints.toFixed(1)}</Text>
                </View>
            </View>
            { loadingDrivers || loadingPositions || loadingSession ?
                <ActivityIndicator style={styles.loading} size='large' color='#fff'/>
                :
                <View style={styles.listsContainer}>
                    <FlatList 
                        data={positions}
                        keyExtractor={(item) => item.date + item.driver_number}
                        style={styles.leftList}
                        renderItem={({item}) => (
                            <DriverContainer drivers={drivers} item={item} />
                        )}
                    />
                    <FlatList 
                        data={opponentPositions}
                        keyExtractor={(item) => item.date + item.driver_number}
                        style={styles.rightList}
                        renderItem={({item}) => (
                            <DriverContainer drivers={drivers} item={item} />
                        )}
                    />
                </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 20,
        backgroundColor: '#15151e',
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#fff',
    },
    profilesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    profileLeft: {
        borderRadius: 10,
        width: '48%',
        alignItems: 'center',
        paddingVertical: 5,
        backgroundColor: '#323248',
    },
    profileRight: {
        borderRadius: 10,
        width: '48%',
        alignItems: 'center',
        paddingVertical: 5,
        backgroundColor: '#323248',
    },
    totalPoints: {
        fontSize: 35,
        fontWeight: 'bold',
        color: '#fff',
    },
    listsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    leftList: {
        width: '50%',
        padding: 10
    },
    rightList: {
        width: '50%',
        padding: 10,
    },
    profilePicture: {
        width: 65,
        height: 65,
        borderRadius: 50,
        marginBottom: 5,
        borderWidth: 1,
        borderColor: '#FF1801'
    },
    loading: {
        marginTop: 20,
    }
});
 
export default MatchupScreen;