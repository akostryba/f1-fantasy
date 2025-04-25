import { Stack } from "expo-router";
import {AppProvider} from '@/context/AppContext.js';
import { View, Image, Text, StyleSheet } from 'react-native';

export default function RootLayout() {
  return (
    <AppProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: 'transparent',
          },
          headerBackground: () => (
            <View style={styles.headerBG} />
          ),
          headerTitle: () => (
            <View style={styles.header}>
              <Image
                source={require('@/assets/images/f1-logo.png')}
                style={styles.logo}
              />
              <Text style={styles.headerText}>Fantasy</Text>
            </View>
          ),
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 20,
          },
        }}
      >
        <Stack.Screen name='index' options={{title: 'Home'}} />
        <Stack.Screen name='team' options={{title: 'F1 Fantasy', animation: 'none'}} />
        <Stack.Screen name='drivers' options={{title: 'F1 Fantasy', animation: 'none'}} />
        <Stack.Screen name='league' options={{title: 'F1 Fantasy', animation: 'none'}} />
        <Stack.Screen name='auth' options={{title: 'F1 Fantasy'}} />
        <Stack.Screen name='addLeague' options={{title: 'F1 Fantasy'}} />
      </Stack>
    </AppProvider>
  )
}


const styles = StyleSheet.create({
  headerBG: {
    flex: 1,
    backgroundColor: '#15151e',
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 100
  },
  logo: {
    width: 80, 
    height: 40, 
    marginRight: 8, 
    resizeMode: 'contain',
  },
  headerText: { 
    color: '#fff', 
    fontSize: 25, 
    fontWeight: 'bold',
  }
})