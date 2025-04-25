import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const Navbar = ({selected}) => {

    const router = useRouter();

    return ( 
        <View style={styles.navBar}>
            <TouchableOpacity onPress={() => router.replace({pathname: '/'}, { animation: 'none' })}>
                <Text style={[styles.navText, selected==="home" && styles.underlined]}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.replace({pathname: '/team'}, { animation: 'none' })}>
                <Text style={[styles.navText, selected==="team" && styles.underlined]}>Team</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.replace({pathname: '/drivers'}, { animation: 'none' })}>
                <Text style={[styles.navText, selected==="drivers" && styles.underlined]}>Drivers</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.replace({pathname: '/league'}, { animation: 'none' })}>
                <Text style={[styles.navText, selected==="league" && styles.underlined]}>League</Text>
            </TouchableOpacity>
        </View>
     );
}
 
export default Navbar;

const styles = StyleSheet.create({
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
});