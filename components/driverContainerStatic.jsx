import {View, Image, Text, ActivityIndicator} from 'react-native';
import { StyleSheet } from 'react-native';
import raceScoring from '@/scoring/raceScoring.json';
import { Ionicons } from '@expo/vector-icons';
import driverPlaceholderImg from '@/assets/images/driver-placeholder.png';


const DriverContainerStatic = ({item, displayArrow}) => {
    return ( 
        item  ?
        <View style={styles.driverContainer}>
            <View style={[{backgroundColor: '#' + item.team_colour}, styles.driverImage]}>
                <Image source={{uri: item.headshot_url}} style={[styles.headshot]} />
            </View>
            <View style={styles.details}>
                <Text style={styles.driverFirstName}>{item.first_name || "error"}</Text>
                <Text style={styles.driverLastName}>{item.last_name.toUpperCase() || "error"}</Text>
                <Text style={styles.driverDetails}>#{item.driver_number} | {item.team_name}</Text>
            </View>
            {displayArrow && <View style={styles.iconContainer}>
                <Ionicons name="chevron-forward" size={24} color="#fff" />
            </View>}
        </View>
        :
        <View style={styles.driverContainer}>
            <View style={[{backgroundColor: 'darkgrey'}, styles.driverImage]}>
                <Image source={driverPlaceholderImg} style={[styles.headshot]} />
            </View>
            <View style={styles.details}>
                <Text style={styles.driverLastName}>Empty</Text>
                <Text style={styles.driverDetails}>#0</Text>
            </View>
            {displayArrow && <View style={styles.iconContainer}>
                <Ionicons name="chevron-forward" size={24} color="#fff" />
            </View>}
        </View>
     );
}

const styles = StyleSheet.create({
    headshot: {
        width: 85,
        height: 80,
        
    },
    driverContainer: {
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#fff',
        width: '100%',
        overflow: 'hidden',
    },
    driverImage: {
        width: '28%',
        alignItems: 'center',
        paddingTop: '5',
        borderBottomWidth: 1,
        borderRightWidth: 1, 
        borderColor: '#fff',
        overflow: 'hidden',
    },
    details: {
        paddingTop: 2,
        paddingLeft: 10,
        justifyContent: 'center',
    },
    driverFirstName: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'lightgrey',
    },
    driverLastName: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff',
        marginRight: 5,
        lineHeight: 35,
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