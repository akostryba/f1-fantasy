import {View, Image, Text, ActivityIndicator} from 'react-native';
import { StyleSheet } from 'react-native';
import raceScoring from '@/scoring/raceScoring.json';
import { Ionicons } from '@expo/vector-icons';

const DriverContainerStatic = ({item}) => {
    return ( 
        item  &&
        <View style={styles.driverContainer}>
            <View style={[{backgroundColor: '#' + item.team_colour}, styles.driverImage]}>
                <Image source={{uri: item.headshot_url}} style={[styles.headshot]} />
            </View>
            <View style={styles.details}>
                <Text style={styles.driverFirstName}>{item.first_name || "error"}</Text>
                <Text style={styles.driverLastName}>{item.last_name.toUpperCase() || "error"}</Text>
                <Text style={styles.driverDetails}>#{item.driver_number} | {item.team_name}</Text>
            </View>
            <View style={styles.iconContainer}>
                <Ionicons name="chevron-forward" size={24} color="#fff" />
            </View>
        </View>
     );
}

const styles = StyleSheet.create({
    headshot: {
        width: 95,
        height: 95,
    },
    driverContainer: {
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#fff',
        width: '100%',
        marginBottom: 10,
        overflow: 'hidden',
    },
    driverImage: {
        width: '30%',
        alignItems: 'center',
        paddingTop: '5',
        borderBottomWidth: 1,
        borderRightWidth: 1, 
        borderColor: '#fff',
    },
    details: {
        paddingTop: 2,
        paddingLeft: 10,
        justifyContent: 'center',
    },
    driverFirstName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'lightgrey',
    },
    driverLastName: {
        fontSize: 35,
        fontWeight: 'bold',
        color: '#fff',
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
    },
    loading: {
        marginVertical: 10,
    },
    iconContainer: {
        justifyContent: 'center',
        paddingHorizontal: 10,
        marginLeft: 'auto',
    }
});
 
export default DriverContainerStatic;