import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';

const MatchupScreen = () => {
    return (  
        <View style={styles.container}>
            <Text style={styles.headerText}>Matchup Screen</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});
 
export default MatchupScreen;