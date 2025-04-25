import { View, Text, StyleSheet } from 'react-native';
import Navbar from '@/components/navbar';

const LeagueScreen = () => {
    return ( 
        <View style={styles.container}>
            <Navbar selected="league"/>
        </View>
     );
}
 
export default LeagueScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 10,
        backgroundColor: '#15151e',
    },
});