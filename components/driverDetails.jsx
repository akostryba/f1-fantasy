import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const DriverDetails = ({selectedDriver, setSelectedDriver}) => {
    return ( 
        <View style={modalStyles.modalContainer}>
            { selectedDriver &&
                <View style={modalStyles.modalContent}>
                    <View style={modalStyles.closeButtonContainer}>
                        <TouchableOpacity onPress={() => setSelectedDriver(null)}>
                            <Ionicons name="close" size={24} color="#fff" />
                        </TouchableOpacity>
                    </View>
                    <View style={[modalStyles.topSection, {backgroundColor: '#' + selectedDriver.info.team_colour}]}>
                        <View style={modalStyles.topSectionContent}>
                            <Image source={{uri: selectedDriver.info.headshot_url}} style={[modalStyles.headshot]} />
                            <View style={modalStyles.details}>
                                <Text style={modalStyles.driverFirstName}>{selectedDriver.info.first_name || "error"}</Text>
                                <Text style={modalStyles.driverLastName}>{selectedDriver.info.last_name.toUpperCase() || "error"}</Text>
                                <Text style={modalStyles.driverDetails}>#{selectedDriver.info.driver_number} | {selectedDriver.info.team_name}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={modalStyles.mainSection}>
                        <Text style={modalStyles.modalText}>Test</Text>
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
    modalText: {
      color: '#fff',
      fontSize: 20,
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
});


export default DriverDetails;