import { View, Text, StyleSheet, FlatList, Image, Alert, ActivityIndicator } from 'react-native';

const DriversScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.navText}>Team</Text>
            <Text style={styles.navText}>Drivers</Text>
        </View>
      );
}
 
export default DriversScreen;