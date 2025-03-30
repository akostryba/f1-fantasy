import { useRouter } from 'expo-router';
import { View, Text, StyleSheet, FlatList, Image, Alert, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useApp } from '@/context/AppContext.jsx';
import DriverContainerStatic from '@/components/driverContainerStatic.jsx';

const DriversScreen = () => {

    const router = useRouter();
    const { drivers, userDriverNums } = useApp();
    const filteredDrivers = {...drivers};
    delete filteredDrivers[userDriverNums[0]];
    delete filteredDrivers[userDriverNums[1]];

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
                        style={styles.leftList}
                        renderItem={({item}) => (
                            <DriverContainerStatic item={item} />
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
        paddingLeft: 5,
    }
});
 
export default DriversScreen;