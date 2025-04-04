import { Stack } from "expo-router";
import {AppProvider} from '@/context/AppContext.js';

export default function RootLayout() {
  return (
    <AppProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#FF1801",
          },
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
        <Stack.Screen name='auth' options={{title: 'F1 Fantasy'}} />
      </Stack>
    </AppProvider>
  )
}
