import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, StatusBar, Image } from "react-native";
import { useRouter } from "expo-router";
const img = require('../../assets/images/Sylani_landing.jpeg');

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    // Log input for debugging purposes
    console.log("Email:", trimmedEmail);
    console.log("Password:", trimmedPassword);

    if (!trimmedEmail || !trimmedPassword) {
      setErrorMessage("Please fill in all fields!");
      return;
    }

    // Check for admin credentials
    if (
      trimmedEmail.toLowerCase() === "tariqwaqasttii@gmail.com" &&
      trimmedPassword === "waqassaad"
    ) {
      setErrorMessage(""); // Clear any previous error messages
      router.push("/admin/Dashboard"); // Navigate to the admin dashboard
    } else {
      setErrorMessage("Access Denied: You are not an admin!");
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'black'} barStyle={'light-content'} />
      <Image style={styles.logoImage} source={img} />
      <Text style={styles.title}>Welcome Back!</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#A8DADC"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          setErrorMessage(""); // Clear error message on input change
        }}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#A8DADC"
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          setErrorMessage(""); // Clear error message on input change
        }}
        secureTextEntry
      />
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/admin/ForgotPassword")}>
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
    color: "black",
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
    textAlign: "center",
  },
});

export default LoginScreen;
