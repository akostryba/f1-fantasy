import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import positionScoring from '@/scoring/positionScoring.json';
import placeholderProfile from '@/assets/images/profile.avif';
import DriverContainer from '@/components/driverContainer.jsx';

const MatchupScreen = () => {

    const [session, setSession] = useState(null);
    const [positions, setPositions] = useState([]);
    const [opponentPositions, setOpponentPositions] = useState([]);
    const [drivers, setDrivers] = useState({});
    const [loadingDrivers, setLoadingDrivers] = useState(true);
    const [userPoints, setUserPoints] = useState(0);
    const [opponentPoints, setOpponentPoints] = useState(0);

    useEffect(() => {
        fetchSession();
        fetchDrivers();
    }, []);

    useEffect(() => {
        if(session) {
            fetchPositions();
        }
    }, [session]);

    useEffect(() => {
        setUserPoints(updateScore(positions));
    }, [positions]);

    useEffect(() => {
        setOpponentPoints(updateScore(opponentPositions));
    }, [opponentPositions]);

    const fetchSession = async () => {
        await fetch('https://api.openf1.org/v1/sessions?session_key=latest')
            .then(response => response.json())
            .then(jsonContent => setSession(jsonContent.at(0).session_key));
    }

    const fetchPosition = async (session_key, driver_number) => {
        const response = await fetch('https://api.openf1.org/v1/position?session_key=' + session_key + '&driver_number=' + driver_number);
        const jsonContent = await response.json();

        const finalPositions = Object.values(
            jsonContent.reduce((acc, item) => {
                const driverNumber = item.driver_number;
                // Always overwrite with the latest position for the driver
                acc[driverNumber] = item;
                return acc;
            }, {})
        );
        console.log(finalPositions[0]);
        return finalPositions[0];
    }

    const fetchPositions = async() =>{
        const verPos = await fetchPosition(session, 1);
        const hamPos = await fetchPosition(session, 44);
        setPositions([verPos, hamPos]);

        const piaPos = await fetchPosition(session, 81);
        const rusPos = await fetchPosition(session, 63);
        setOpponentPositions([piaPos, rusPos]);
    }
    
    const fetchDrivers = async () => {
        setLoadingDrivers(true);
        const response = await fetch('https://api.openf1.org/v1/drivers');
        const jsonContent = await response.json();

        const driversByNumber = jsonContent.reduce((acc, driver) => {
            acc[driver.driver_number] = driver;
            return acc;
        }, {});
        setDrivers(driversByNumber);
        setLoadingDrivers(false);
    }

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
            { positions.length>0 &&
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
        justifyContent: 'space-evenly',
        borderColor: '#fff',
        borderTopWidth: 1,
        borderBottomWidth: 1,
    },
    profileLeft: {
        borderColor: '#fff',
        borderRightWidth: 1,
        width: '50%',
        alignItems: 'center',
        paddingVertical: 10,
    },
    profileRight: {
        width: '50%',
        alignItems: 'center',
        paddingVertical: 10,
    },
    totalPoints: {
        fontSize: 35,
        fontWeight: 'bold',
        marginTop: 5,
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
        width: 75,
        height: 75,
        borderRadius: 50,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#FF1801'
    }
});
 
export default MatchupScreen;