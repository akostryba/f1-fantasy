import {View, Image, Text, ActivityIndicator} from 'react-native';
import { StyleSheet } from 'react-native';
import images from '@/static/tpImagePaths';

const TPContainer = ({item, points}) => {
    return ( 
        item  &&
        <View style={styles.driverContainer}>
            <View style={[{backgroundColor: item.color}, styles.driverImage]}>
                <Image source={images[item.key]} style={[styles.headshot]} />
            </View>
            <View style={styles.details}>
                <Text style={styles.driverName}>{item.principal || "error"}</Text>
                <Text style={styles.driverDetails}>{item.team}</Text>
                {!true ? 
                    <ActivityIndicator style={styles.loading} size='small' color='#fff'/>
                    :
                    <>
                    <Text style={styles.driverPoints}>{points ? points.toFixed(1) : 0}</Text>
                    <Text style={styles.pointLabel}>PTS</Text>
                    </>
                }
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
 
export default TPContainer;