import { Stack } from "expo-router";

export default function RootLayout() {
  return (
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
      <Stack.Screen name='matchup' options={{title: 'Matchup'}} />
    </Stack>
  )
}
