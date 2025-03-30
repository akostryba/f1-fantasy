import { View, Text, StyleSheet, FlatList, Image, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import raceScoring from '@/scoring/raceScoring.json';
import qualiScoring from '@/scoring/qualiScoring.json';
import placeholderProfile from '@/assets/images/profile.avif';
import DriverContainer from '@/components/driverContainer.jsx';
import {fetchPosition, fetchSession, fetchDrivers, fetchMeeting} from '@/api/OpenF1.js';

const TeamScreen = () => {

    const [userDrivers, setUserDrivers] = useState([]);
    const [meeting, setMeeting] = useState(null);
    const [raceSession, setRaceSession] = useState(null);
    const [qualiSession, setQualiSession] = useState(null);
    const [drivers, setDrivers] = useState({});
    const [loadingDrivers, setLoadingDrivers] = useState(true);
    const [loadingSession, setLoadingSession] = useState(true);
    const [loadingPositions, setLoadingPositions] = useState(true);
    const [userPoints, setUserPoints] = useState(0);
    const [reloadTrigger, setReloadTrigger] = useState(0); 

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
        if (Object.keys(drivers).length>0 || !meeting) {
            return;
        }
        const getDrivers = async () => {
            setLoadingDrivers(true);
            try{
                const fetchedDrivers=  await fetchDrivers(meeting);
                setDrivers(fetchedDrivers);
                setUserDrivers([{"info": fetchedDrivers[1]}, {"info":fetchedDrivers[44]}]);
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
                const [verPos, hamPos, verQualiPos, hamQualiPos] = await Promise.all([
                    fetchPosition(raceSession, 1),
                    fetchPosition(raceSession, 44),
                    fetchPosition(qualiSession, 1),
                    fetchPosition(qualiSession, 44)
                ]);

                setUserDrivers(prev => {
                    const newDrivers = [
                        { ...prev[0], racePosition: verPos, qualiPosition: verQualiPos },
                        { ...prev[1], racePosition: hamPos, qualiPosition: hamQualiPos }
                    ];
                    
                    const driverOnePoints = calculateScore(newDrivers[0]);
                    const driverTwoPoints = calculateScore(newDrivers[1]);
                    
                    setUserPoints(driverOnePoints + driverTwoPoints);
                    
                    return [
                        { ...newDrivers[0], score: driverOnePoints },
                        { ...newDrivers[1], score: driverTwoPoints }
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

    const handleReload = () => {
        setReloadTrigger(prev => prev + 1);
        setLoadingDrivers(true);
        setLoadingSession(true);
        setLoadingPositions(true);
    }

    // console.log(loadingDrivers, loadingPositions, loadingSession);
    // console.log(userDrivers);

    return (  
        <View style={styles.container}>
            <Text style={styles.headerText}>Team</Text>
            <View style={styles.profilesContainer}>
                <View style={styles.profileLeft}>
                    <Image source={placeholderProfile} style={[styles.profilePicture]} />
                    <Text style={{color: '#fff'}}>User 1</Text>
                    <Text style={styles.totalPoints}>{userPoints.toFixed(1)}</Text>
                </View>
            </View>
            { loadingDrivers || loadingPositions || loadingSession || !userDrivers[0].racePosition || !userDrivers[0].info ?
                <ActivityIndicator style={styles.loading} size='large' color='#fff'/>
                :
                <View style={styles.listsContainer}>
                    <FlatList 
                        data={userDrivers}
                        keyExtractor={(item) => item.racePosition.date + item.info.driver_number}
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