import { View, Text, StyleSheet, FlatList, Image, Alert, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import raceScoring from '@/scoring/raceScoring.json';
import qualiScoring from '@/scoring/qualiScoring.json';
import placeholderProfile from '@/assets/images/profile.avif';
import DriverContainer from '@/components/driverContainer.jsx';
import {fetchPosition, fetchSession, fetchDrivers, fetchMeeting, fetchPits} from '@/api/OpenF1.js';
import { useApp } from '@/context/AppContext.jsx';

const TeamScreen = () => {

    const [userDrivers, setUserDrivers] = useState([]);
    const [meeting, setMeeting] = useState(null);
    const [raceSession, setRaceSession] = useState(null);
    const [qualiSession, setQualiSession] = useState(null);
    const { drivers, setDrivers, userDriverNums } = useApp();
    const [loadingDrivers, setLoadingDrivers] = useState(true);
    const [loadingSession, setLoadingSession] = useState(true);
    const [loadingPositions, setLoadingPositions] = useState(true);
    const [userPoints, setUserPoints] = useState(0);
    const [reloadTrigger, setReloadTrigger] = useState(0); 

    const router = useRouter();

    useEffect(() => {
        const fetchMeetingData = async () => {
            try{
                const meetingData = await fetchMeeting();
                setMeeting(meetingData);
            } catch (error) {
                Alert.alert('Error',error.message,[
                            { text: 'Cancel', style: 'cancel' },
                            { text: 'Retry', onPress: handleReload }
                            ]
                );
                console.error(error);
            }
        };
        fetchMeetingData();
    }, [reloadTrigger]);

    useEffect(() => {
        if (userDrivers[0]?.info || !meeting) {
            return;
        }
        const getDrivers = async () => {
            setLoadingDrivers(true);
            try{
                const fetchedDrivers=  await fetchDrivers(meeting);
                setDrivers(fetchedDrivers);
                setUserDrivers([{"info": fetchedDrivers[userDriverNums[0]]}, {"info":fetchedDrivers[userDriverNums[1]]}]);
            } catch (error) {
                Alert.alert('Error',error.message,[
                    { text: 'Cancel', style: 'cancel' },
                    { text: 'Retry', onPress: handleReload }
                    ]
                );
                console.error(error);
            }
            setLoadingDrivers(false);
            
        }
        getDrivers();
    }, [meeting])

    useEffect(() => {
        if (!meeting || Object.keys(drivers).length === 0) return;

        const getSessions = async () => {
            setLoadingSession(true);
            try {
                const [race, quali] = await Promise.all([
                    fetchSession('Race', meeting),
                    fetchSession('Qualifying', meeting)
                ]);
                setRaceSession(race);
                setQualiSession(quali);
            } catch (error) {
                Alert.alert('Error',error.message,[
                    { text: 'Cancel', style: 'cancel' },
                    { text: 'Retry', onPress: handleReload }
                    ]
                );
                console.error(error);
            } finally {
                setLoadingSession(false);
            }
        };

        getSessions();
    }, [meeting, drivers]);

    useEffect(() => {
        const fetchAndCalculatePositions = async () => {
            if (!raceSession || !qualiSession) return;

            setLoadingPositions(true);
            try {
                const [dr1Pos, dr2Pos, dr1QualiPos, dr2QualiPos] = await Promise.all([
                    fetchPosition(raceSession, userDriverNums[0]),
                    fetchPosition(raceSession, userDriverNums[1]),
                    fetchPosition(qualiSession, userDriverNums[0]),
                    fetchPosition(qualiSession, userDriverNums[1])
                ]);

                const [dr1Pits, dr2Pits] = await Promise.all([
                    fetchPits(raceSession, userDriverNums[0]),
                    fetchPits(raceSession, userDriverNums[1]),
                ]);

                setUserDrivers(prev => {
                    const newDrivers = [
                        { ...prev[0], racePosition: dr1Pos, qualiPosition: dr1QualiPos, pits: dr1Pits },
                        { ...prev[1], racePosition: dr2Pos, qualiPosition: dr2QualiPos, pits: dr2Pits }
                    ];
                    
                    const driverOnePoints = calculateScore(newDrivers[0]) + calculatePitScore(dr1Pits);;
                    const driverTwoPoints = calculateScore(newDrivers[1]) + calculatePitScore(dr2Pits);;
                    
                    setUserPoints(driverOnePoints + driverTwoPoints);
                    
                    return [
                        { ...newDrivers[0], score: driverOnePoints},
                        { ...newDrivers[1], score: driverTwoPoints}
                    ];
                });
            } catch (error) {
                Alert.alert('Error',error.message,[
                    { text: 'Cancel', style: 'cancel' },
                    { text: 'Retry', onPress: handleReload }
                    ]
                );
                console.error(error);
            } finally {
                setLoadingPositions(false);
            }
        };

        fetchAndCalculatePositions();
    }, [raceSession, qualiSession]);

    const calculateScore = (driver) => {

        const quali = driver.qualiPosition;
        const race = driver.racePosition;
        let totalPoints = 0;
        totalPoints += Number(qualiScoring[quali.position]);
        totalPoints += Number(raceScoring[race.position]);
        return totalPoints;
    }

    const calculatePitScore = (data) => {
        let total = 0;
        for (let i = 0; i < data.length; i++) {
            const pitStop = data[i].pit_duration/10;
            if (pitStop >= 3) {
                continue;
            } else if (pitStop >=2.5) {
                total += 2;
            } else if (pitStop >= 2.2) {
                total+= 5;
            } else if (pitStop >= 2) {
                total+= 10;
            } else if (pitStop > 0.1) {
                total+= 20;
            }
        }
        return total;
    }

    const handleReload = () => {
        setReloadTrigger(prev => prev + 1);
        setLoadingDrivers(true);
        setLoadingSession(true);
        setLoadingPositions(true);
    }


    return (  
        <View style={styles.container}>
            <View style={styles.navBar}>
                <Text style={styles.navText}>Home</Text>
                <Text style={[styles.navText, styles.underlined]}>Team</Text>
                <TouchableOpacity onPress={() => router.replace({pathname: '/drivers', params: {drivers: JSON.stringify(drivers)}}, { animation: 'none' })}>
                    <Text style={styles.navText}>Drivers</Text>
                </TouchableOpacity>
                <Text style={styles.navText}>League</Text>
            </View>
            <View style={styles.profilesContainer}>
                <View style={styles.profileLeft}>
                    <Image source={placeholderProfile} style={[styles.profilePicture]} />
                    <Text style={{color: '#fff'}}>User 1</Text>
                    <Text style={styles.totalPoints}>{userPoints.toFixed(1)}</Text>
                </View>
            </View>
            {  !userDrivers.length>0 ?
                <ActivityIndicator style={styles.loading} size='large' color='#fff'/>
                :
                <View style={styles.listsContainer}>
                    <FlatList 
                        data={userDrivers}
                        keyExtractor={(item) => item.info.driver_number}
                        style={styles.leftList}
                        renderItem={({item}) => (
                            <DriverContainer item={item} />
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
        paddingVertical: 10,
        backgroundColor: '#15151e',
    },
    navBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 15,
        paddingHorizontal: 20,
    },
    navText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'lightgrey',
    },
    underlined: {
        borderBottomWidth: 2,
        borderBottomColor: '#FF1801',
        paddingBottom: 5,
    },
    profilesContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    profileLeft: {
        borderRadius: 10,
        width: '95%',
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
 
export default TeamScreen;