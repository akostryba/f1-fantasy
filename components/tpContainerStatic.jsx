import {View, Image, Text, ActivityIndicator} from 'react-native';
import { StyleSheet } from 'react-native';
import raceScoring from '@/scoring/raceScoring.json';
import { Ionicons } from '@expo/vector-icons';
import images from '@/static/tpImagePaths';

const TPContainerStatic = ({item, displayArrow}) => {
    const firstName = item?.principal?.split(' ')[0] || "error";
    const lastName = item?.principal?.split(' ')[1] || "error";
    return ( 
        item  &&
        <View style={styles.driverContainer}>
            <View style={[{backgroundColor: item.color}, styles.driverImage]}>
                <Image source={images[item.key]} style={[styles.headshot]} />
            </View>
            <View style={styles.details}>
                <Text style={styles.driverFirstName}>{firstName || "error"}</Text>
                <Text style={styles.driverLastName}>{lastName.toUpperCase() || "error"}</Text>
                <Text style={styles.driverDetails}>{item.team}</Text>
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
        fontSize: 12,
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
 
export default TPContainerStatic;