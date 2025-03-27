import {View, Image, Text} from 'react-native';
import { StyleSheet } from 'react-native';
import positionScoring from '@/scoring/positionScoring.json';

const DriverContainer = ({drivers, item}) => {
    return ( 
        item && Object.keys(drivers).length>0 &&
        <View style={styles.driverContainer}>
            <View style={[{backgroundColor: '#' + drivers[item.driver_number]?.team_colour}, styles.driverImage]}>
                <Image source={{uri: drivers[item.driver_number]?.headshot_url}} style={[styles.headshot]} />
            </View>
            <View style={styles.details}>
                <Text style={styles.driverName}>{drivers[item.driver_number]?.broadcast_name || "error"}</Text>
                <Text style={styles.driverDetails}>#{drivers[item.driver_number]?.driver_number} | {drivers[item.driver_number]?.team_name}</Text>
                <Text style={styles.driverPoints}>{Number(positionScoring[item.position]).toFixed(1)}</Text>
                <Text style={styles.pointLabel}>PTS</Text>
            </View>
        </View>
     );
}

const styles = StyleSheet.create({
    headshot: {
        width: 75,
        height: 75,
    },
    driverContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#fff',
        width: '100%',
        marginBottom: 10,
        overflow: 'hidden',
    },
    driverImage: {
        width: '100%',
        alignItems: 'center',
        paddingTop: '5',
        borderBottomWidth: 1,
        borderColor: '#fff',
    },
    details: {
        paddingTop: 5,
    },
    driverName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
    },
    driverPoints: {
        marginTop: 5,
        textAlign: 'center',
        fontSize: 25,
        fontWeight: 'bold',
        color: '#fff',
    },
    driverDetails: {
        color: '#fff',
        fontSize: '12',
        textAlign: 'center',
    },
    pointLabel: {
        color: 'lightgrey',
        fontSize: '10',
        fontWeight: "bold",
        textAlign: 'center',
        marginBottom: 10,
    },
});
 
export default DriverContainer;