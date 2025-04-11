import { useRouter } from 'expo-router';
import { View, Text, StyleSheet, FlatList, Image, Alert, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useApp } from '@/context/AppContext.js';
import DriverContainerStatic from '@/components/driverContainerStatic.jsx';
import TPContainerStatic from '@/components/tpContainerStatic';
import Popover from 'react-native-popover-view';
import {Dimensions} from 'react-native';
import teamPrincipals from '@/static/teamPrincipals.json';
import rosterService from '@/services/rosterService.js';

const DriversScreen = () => {

    const router = useRouter();
    const { drivers, userDriverNums, setUserDriverNums, teamPrincipal, setTeamPrincipal, selectedTeam } = useApp();
    const filteredDrivers = {...drivers};
    if (userDriverNums[0]){
        delete filteredDrivers[userDriverNums[0].driver_number];
    }
    if (userDriverNums[1]){
        delete filteredDrivers[userDriverNums[1].driver_number];
    }
    const userDriver1 = drivers[userDriverNums[0]?.driver_number] || null;
    const userDriver2 = drivers[userDriverNums[1]?.driver_number] || null;

    const filteredTPs = {...teamPrincipals};
    delete filteredTPs[teamPrincipal.key];

    const deviceWidth = Dimensions.get('window').width;

    const swapDriver = async (currentDriverIndex, newDriverNum) => {
        console.log(userDriverNums);
        if (userDriverNums[currentDriverIndex]){
            console.log('removing');
            const responseDelete = await rosterService.removeDriver(userDriverNums[currentDriverIndex].$id);
        }
        console.log(selectedTeam, newDriverNum, currentDriverIndex);
        const response = await rosterService.addDriver(selectedTeam, newDriverNum);
        console.log(response);
        setUserDriverNums((prevDriverNums) => {
            const newDriverNums = [...prevDriverNums];
            newDriverNums[currentDriverIndex] = response.data;
            return newDriverNums;
        });
        router.replace('/team', { animation: 'none' });
    }

    const swapTP = (newTP) => {
        setTeamPrincipal(newTP);
        router.replace('/team', { animation: 'none' });
    }
    
    return (
        <View style={styles.container}>
            <View style={styles.navBar}>
                <Text style={styles.navText}>Home</Text>
                <TouchableOpacity onPress={() => router.replace('/team', { animation: 'none' })}>
                    <Text style={styles.navText}>Team</Text>
                </TouchableOpacity>
                <Text style={[styles.navText, styles.underlined]}>Drivers</Text>
                <Text style={styles.navText}>League</Text>
            </View>
            <Text style={[styles.label]}>Available Drivers</Text>
            <FlatList 
                data={Object.values(filteredDrivers)}
                keyExtractor={(item) => item.driver_number}
                style={styles.list}
                renderItem={({item}) => (
                    <Popover
                        popoverStyle={{width: deviceWidth - 20}}
                        from={(
                        <TouchableOpacity style={styles.driverOption}>
                            <DriverContainerStatic item={item} displayArrow={true}/>
                        </TouchableOpacity>
                        )}>
                        <View style={styles.popoverView}>
                            <Text style={styles.popoverLabel}>Swap Driver:</Text>
                            <View style={styles.selectedDriver}>
                                <DriverContainerStatic item={item}/>
                            </View>
                            <Text style={styles.popoverLabel}>For...</Text>
                            <TouchableOpacity style={styles.driverOption} onPress={() => {swapDriver(0, item.driver_number)}}>
                                <DriverContainerStatic item={userDriver1}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.driverOption} onPress={() => {swapDriver(1, item.driver_number)}}>
                                <DriverContainerStatic item={userDriver2}/>
                            </TouchableOpacity>
                        </View>
                    </Popover>
                )}
            />
            <Text style={[styles.label]}>Available Team Principals</Text>
            <FlatList 
                data={Object.values(filteredTPs)}
                keyExtractor={(item) => item.key}
                style={styles.list}
                renderItem={({item}) => (
                    <Popover
                        popoverStyle={{width: deviceWidth - 20}}
                        from={(
                        <TouchableOpacity style={styles.driverOption}>
                            <TPContainerStatic item={item} displayArrow={true}/>
                        </TouchableOpacity>
                        )}>
                        <View style={styles.popoverView}>
                            <Text style={styles.popoverLabel}>Swap Team Principal:</Text>
                            <View style={styles.selectedDriver}>
                                <TPContainerStatic item={item}/>
                            </View>
                            <Text style={styles.popoverLabel}>For...</Text>
                            <TouchableOpacity style={styles.driverOption} onPress={() => {swapTP(item)}}>
                                <TPContainerStatic item={teamPrincipal}/>
                            </TouchableOpacity>
                        </View>
                    </Popover>
                )}
            />
        </View>
      );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 10,
        backgroundColor: '#15151e',
    },
    navBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 15,
        paddingHorizontal: 20,
    },
    navText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'lightgrey',
    },
    underlined: {
        borderBottomWidth: 2,
        borderBottomColor: '#FF1801',
        paddingBottom: 5,
    },
    label: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 5,
        paddingLeft: 20,
    },
    popoverView:{
        width: '100%',
        backgroundColor: '#15151e',
        padding: 10,
        borderWidth: 1,
        borderColor: '#fff',
        color: '#fff',
        borderRadius: 10,
    },
    popoverLabel: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
        padding: 10,
    },
    selectedDriver: {
        marginBottom: 15,
        backgroundColor: '#323248',
        height: 'auto',
    },
    driverOption: {
        marginBottom: 10,
    },
    list: {
        paddingHorizontal: 20,
        marginHorizontal: 10,
        marginBottom: 20,
        borderWidth: 2,
        borderColor: 'darkgrey',
        borderRadius: 10,
        padding: 10,
    },
});
 
export default DriversScreen;