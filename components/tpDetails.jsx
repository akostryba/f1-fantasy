import {View, Text, StyleSheet, TouchableOpacity, Image, FlatList} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import images from '@/static/tpImagePaths';


const DriverScoreDetail = ({driver, score}) => {
    return ( 
        <View style={modalStyles.qualiDetail}>
            <Image source={{uri: driver.headshot_url}} style={[modalStyles.smallHeadshot]} />
            <Text style={modalStyles.posText}>{driver.last_name}</Text>
            <Text style={modalStyles.pointText}>{score} PTS</Text>
        </View>
     );
};

const TPDetails = ({drivers, teamPrincipal, driver1, driver2, driver1Score, driver2Score, setShowTPDetails}) => {

    const firstName = teamPrincipal ? teamPrincipal.principal.split(' ')[0] : '';
    const lastName = teamPrincipal ? teamPrincipal.principal.split(' ').slice(1).join(' ') : '';
    
    return ( 
        <View style={modalStyles.modalContainer}>
            { teamPrincipal &&
                <View style={modalStyles.modalContent}>
                    <View style={modalStyles.closeButtonContainer}>
                        <TouchableOpacity onPress={() => setShowTPDetails(false)}>
                            <Ionicons name="close" size={24} color="#fff" />
                        </TouchableOpacity>
                    </View>
                    <View style={[modalStyles.topSection, {backgroundColor: teamPrincipal.color}]}>
                        <View style={modalStyles.topSectionContent}>
                            <Image source={images[teamPrincipal.key]} style={[modalStyles.headshot]} />
                            <View style={modalStyles.details}>
                                <Text style={modalStyles.driverFirstName}>{firstName || "error"}</Text>
                                <Text style={modalStyles.driverLastName}>{lastName.toUpperCase() || "error"}</Text>
                                <Text style={modalStyles.driverDetails}>{teamPrincipal.team}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={modalStyles.mainSection}>
                        <DriverScoreDetail driver={drivers[driver1]} score={driver1Score}/>
                        <DriverScoreDetail driver={drivers[driver2]} score={driver2Score}/>
                    </View>
                </View>
            }
        </View>
     );
}
 
const modalStyles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    modalContent: {
      height: '82%',
      backgroundColor: '#15151e',
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      flexDirection: 'col',
      overflow: 'hidden',
    },
    closeButtonContainer: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 1,
    },
    topSection: {
        height: '15%',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#fff',
    },
    topSectionContent: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        height: '100%',
    },
    pointText: {
      color: 'lightgrey',
      fontSize: 35,
      marginLeft: 'auto',
      marginRight: 5
    },
    posText: {
        marginLeft: 10,
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 35,
    },
    lapText: {
        marginLeft: 10,
        color: 'lightgrey',
        fontWeight: 'bold',
        fontSize: 12,
        lineHeight: 12,
    },
    headshot: {
        width: 100,
        height: 100,
    },
    details: {
        width: '70%',
        marginLeft: 10,
        marginBottom: 5,
    },
    driverFirstName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'lightgrey',
        
    },
    driverLastName: {
        fontSize: 40,
        lineHeight: 40,
        fontWeight: 'bold',
        color: '#fff',
    },
    driverDetails: {
        color: '#fff',
        fontSize: '12',
        lineHeight: '12',
        marginBottom: 5,
    },
    mainSection: {
        flexDirection: 'col',
        marginHorizontal: '10',
        marginTop: '10',
    },
    header:{
        color: "lightgrey",
        fontWeight: 'bold',
        marginBottom: '10',
    },
    qualiDetail: {
        backgroundColor: '#323248',
        borderRadius: 10,
        padding: 5,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    smallHeadshot:{
        marginHorizontal: 5,
        height: 50,
        width: 50,
        borderWidth: 1,
        borderColor: '#FF1801',
        borderRadius: 40,
        backgroundColor: '#fff'
    },
});


export default TPDetails;