import {View, Image, Text, ActivityIndicator} from 'react-native';
import { StyleSheet } from 'react-native';
import raceScoring from '@/scoring/raceScoring.json';
import driverPlaceholderImg from '@/assets/images/driver-placeholder.png';

const DriverContainer = ({item}) => {
    console.log(item);
    return ( 
        item.info  ?
        <View style={styles.driverContainer}>
            <View style={[{backgroundColor: '#' + item.info.team_colour}, styles.driverImage]}>
                <Image source={{uri: item.info.headshot_url}} style={[styles.headshot]} />
            </View>
            <View style={styles.details}>
                <Text style={styles.driverName}>{item.info.broadcast_name || "error"}</Text>
                <Text style={styles.driverDetails}>#{item.info.driver_number} | {item.info.team_name}</Text>
                {item.racePosition === undefined ? 
                    <ActivityIndicator style={styles.loading} size='small' color='#fff'/>
                    :
                    <>
                    <Text style={styles.driverPoints}>{Number(item.score).toFixed(1)}</Text>
                    <Text style={styles.pointLabel}>PTS</Text>
                    </>
                }
            </View>
        </View>
        :
        <View style={styles.driverContainer}>
            <View style={[{backgroundColor: 'darkgrey'}, styles.driverImage]}>
            <Image source={driverPlaceholderImg} style={[styles.headshot]} />
            </View>
            <View style={styles.details}>
                <Text style={styles.driverName}>Empty</Text>
                <Text style={styles.driverPoints}>0</Text>
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
    loading: {
        marginVertical: 10,
    }
});
 
export default DriverContainer;