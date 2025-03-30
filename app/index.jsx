import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { useRouter } from "expo-router";
import f1Logo from "@/assets/images/f1-logo.png";


const HomeScreen = () => {

  const router = useRouter();

  return (
    <View style={styles.container}>

      <Image source={f1Logo} style={styles.image} />
      <Text style={styles.title}>Welcome to F1 Fantasy!</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/team')}
      >
        <Text style={styles.buttonText}>Start</Text>

      </TouchableOpacity>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#15151e",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  image: {
    width: 200,
    height: 100,
    resizeMode: "contain",
  }
})

export default HomeScreen;
