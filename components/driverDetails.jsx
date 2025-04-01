import {View, Text, StyleSheet, TouchableOpacity, Image, FlatList} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import qualiScoring from '@/scoring/qualiScoring.json';
import raceScoring from '@/scoring/raceScoring.json';
import {singlePitScore} from '@/utils/singlePitScore';


const ScoreDetail = ({selectedDriver, scoringFormat, sessionType}) => {
    let data = selectedDriver.qualiPosition;
    if (sessionType === "race"){
        data = selectedDriver.racePosition;
    }
    return ( 
        <View style={modalStyles.qualiDetail}>
            <Image source={{uri: selectedDriver.info.headshot_url}} style={[modalStyles.smallHeadshot]} />
            <Text style={modalStyles.posText}>P{data.position}</Text>
            <Text style={modalStyles.pointText}>{scoringFormat[data.position]} PTS</Text>
        </View>
     );
};

const DriverDetails = ({selectedDriver, setSelectedDriver, pitStops}) => {

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
                        <Text style={modalStyles.header}>Qualifying</Text>
                        <ScoreDetail selectedDriver={selectedDriver} scoringFormat={qualiScoring} sessionType={"quali"}/>

                        <Text style={modalStyles.header}>Race</Text>
                        <ScoreDetail selectedDriver={selectedDriver} scoringFormat={raceScoring} sessionType={"race"}/>
                        <Text style={modalStyles.header}>Pit Stops</Text>
                            <FlatList 
                                data={selectedDriver.pits}
                                keyExtractor={(item) => pitStops[item].driver_number + pitStops[item].lap_number}
                                renderItem={({item}) => (
                                    <View style={modalStyles.qualiDetail}>
                                        <Image source={{uri: selectedDriver.info.headshot_url}} style={[modalStyles.smallHeadshot]} />
                                        <View styles={modalStyles.pitDetails}>
                                            <Text style={modalStyles.posText}>{Number(pitStops[item].pit_duration).toFixed(1)}s</Text>
                                            <Text style={modalStyles.lapText}>#{item+1}</Text>
                                        </View>
                                        <Text style={modalStyles.pointText}>{singlePitScore(item)} PTS</Text>
                                    </View>
                                )}
                            />
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


export default DriverDetails;