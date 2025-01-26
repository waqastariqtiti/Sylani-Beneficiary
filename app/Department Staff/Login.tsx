import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, StatusBar, Image } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firbase.config";
import { useRouter } from "expo-router"; 
const img = require('../../assets/images/Sylani_landing.jpeg');

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields!");
      return;
    }
    
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        Alert.alert("Success", "Logged in successfully!");
        router.push("/Department Staff/Deshboard");
      })
      .catch((error) => {
        if (error.code === "auth/wrong-password") {
          setErrorMessage("The password you entered is incorrect.");
        } else if (error.code === "auth/user-not-found") {
          setErrorMessage("No user found with this email.");
        } else {
          setErrorMessage("An error occurred. Please try again.");
        }
      });
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'black'} barStyle={'light-content'} />
      <Image style={styles.logoImage} source={img} />
      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.title}>Department Staff!</Text>
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
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/Department Staff/Signup")}>
        <Text style={styles.link}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("/Department Staff/ForgotPassword")}>
        <Text style={[styles.link, { marginTop: 10 }]}>Forgot Password?</Text>
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
  logoImage: {
    width: 150,
    height: 150,
    borderRadius: 80,
    marginBottom: 10,
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
    backgroundColor: "#fff",
    color: "#ccff33",
    fontSize: 16,
  },
  button: {
    width: "100%",
    padding: 15,
    borderRadius: 8,
    backgroundColor: "#007BFF",
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
    color: "#9ef01a",
    fontSize: 16,
    textDecorationLine: "underline",
  },
  errorText: {
    color: "red",
    marginTop: 10,
    fontSize: 16,
    textAlign: "center",  // Center the error text
  },
});

export default LoginScreen;
