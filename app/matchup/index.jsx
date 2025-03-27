import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';

const MatchupScreen = () => {

    const [session, setSession] = useState(null);
    const [positions, setPositions] = useState([]);
    const [error, setError] = useState(null);
    const [drivers, setDrivers] = useState({});
    const [loadingDrivers, setLoadingDrivers] = useState(true);

    useEffect(() => {
        fetchSession();
        fetchDrivers();
    }, []);

    useEffect(() => {
        if(session) {
            fetchPositions();
        }
    }, [session]);

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

    return (  
        <View style={styles.container}>
            <Text style={styles.headerText}>Matchup Screen</Text>
            { positions.length>0 &&
            <FlatList 
                data={positions}
                keyExtractor={(item) => item.date + item.driver_number}
                renderItem={({item}) => (
                    <View style={styles.driverContainer}>
                        <Image source={{uri: drivers[item.driver_number]?.headshot_url}} style={styles.headshot} />
                        <View style={styles.details}>
                            <Text style={styles.driverName}>{drivers[item.driver_number]?.full_name || "error"}</Text>
                            <Text style={styles.driverPosition}>P{item.position}</Text>
                        </View>
                    </View>
                )}
            />
            }
            <Text>Error: {error}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 20,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    headshot: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: '#000',
    },
    driverContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#000',
        paddingVertical: 10,
    },
    details: {
        marginLeft: 10,
    },
    driverName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    driverPosition: {
        fontSize: 16,
    },
});
 
export default MatchupScreen;