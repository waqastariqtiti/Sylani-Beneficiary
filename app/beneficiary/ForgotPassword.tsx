import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, StatusBar } from "react-native";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firbase.config";
import { useRouter } from "expo-router";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleForgotPassword = () => {
    if (!email) {
      Alert.alert("Error", "Please enter your email address!");
      return;
    }

    sendPasswordResetEmail(auth, email)
      .then(() => {
        Alert.alert("Success", "Password reset email sent!");
        router.push("/beneficiary/Login");
      })
      .catch((error) => {
        Alert.alert("Error", error.message);
      });
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'black'} barStyle={'light-content'} />
      <Text style={styles.title}>Forgot Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#A8DADC"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TouchableOpacity style={styles.button} onPress={handleForgotPassword}>
        <Text style={styles.buttonText}>Send Reset Link</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/beneficiary/Login")}>
        <Text style={styles.link}>Back to Login</Text>
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
  button: {
    width: "100%",
    padding: 15,
    borderRadius: 8,
    backgroundColor: "#38b000",
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#007BFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  link: {
    marginTop: 20,
    color: "#ccff33",
    fontSize: 16,
    textDecorationLine: "underline",
  },
});

export default ForgotPassword;
