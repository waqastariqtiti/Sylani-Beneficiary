import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  StatusBar,
  Image,
} from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";
import { auth, database } from "../../firbase.config";
import { useRouter } from "expo-router";
const img = require('../../assets/images/Sylani_landing.jpeg');

const SignupScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const router = useRouter();

  const handleSignup = () => {
    if (!email || !password || !username) {
      Alert.alert("Error", "Please fill in all fields!");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const userId = userCredential.user.uid;
        console.log("User ID:", userId); 
        console.log("Saving to database...");

        const userRef = ref(database, `users/${userId}`);
        set(userRef, {
          email: email,
          username: username,
        })
          .then(() => {
            console.log("Data saved successfully!");
            Alert.alert("Success", "Account created successfully!");
            router.push("/Department Staff/Deshboard");
          })
          .catch((dbError) => {
            console.error("Database Error:", dbError);
            Alert.alert("Database Error", dbError.message);
          });
      })
      .catch((authError) => {
        console.error("Authentication Error:", authError);
        Alert.alert("Authentication Error", authError.message);
      });
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'black'} barStyle={'light-content'}/>
      <Image style={styles.logoImage} source={img}/>
      <Text style={styles.title}>Create an Account for a Department Staff!</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#A8DADC"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#A8DADC"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#A8DADC"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/Department Staff/Login")}>
        <Text style={styles.link}>Already have an account? Log In</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#008000",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#ccff33",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 15,
    marginVertical: 10,
    borderRadius: 8,
    backgroundColor: "#007BFF",
    color: "#ccff33",
    fontSize: 16,
  },
  logoImage: {
    width: 150,
    height: 150,
    borderRadius: 80,
    marginBottom: 10,
  },
  button: {
    width: "100%",
    padding: 15,
    borderRadius: 8,
    backgroundColor: "#004b23",
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#ccff33",
    fontSize: 18,
    fontWeight: "bold",
  },
  link: {
    marginTop: 20,
    color: "#023047",
    fontSize: 16,
    textDecorationLine: "underline",
  },
});

export default SignupScreen;
