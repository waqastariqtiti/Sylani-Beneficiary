import { Link } from "expo-router";
import React from "react";
import { Image, StatusBar } from "react-native";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
const Sylani = require('../assets/images/Sylani_landing.jpeg');

export default function LandingPage() {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'black'} barStyle={'light-content'}/>
      {/* Logo Bar */}
      <View style={styles.logoBar}>
        <Image source={Sylani} style={styles.logoImage} />
        <Text style={styles.welcomeText}>Welcome to Sylani Beneficial</Text>
      </View>

      {/* Content Section */}
      <View style={styles.cardsContainer}>
        {/* Login Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Login</Text>
          <Text style={styles.cardTitle}>If you have an account</Text>
          <TouchableOpacity style={styles.button}>
          <Link href={'/signupAs'}>
            <Text style={styles.buttonText}>Go to Login</Text>
          </Link>
          </TouchableOpacity>
        </View>

        {/* Signup Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Sign Up</Text>
          <Text style={styles.cardTitle}>if dont have an account</Text>
          <TouchableOpacity style={styles.button}>
          <Link href={'/auth/Signup'}>
            <Text style={styles.buttonText}>Go to Signup</Text>
          </Link>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#38b000",
    alignItems: "center",
  },
  logoBar: {
    width: "100%",
    backgroundColor: "#38b000",
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 100,
  },
  logoImage: {
    width: 150,
    height: 150,
    borderRadius: 80,
    marginBottom: 10,
  },
  welcomeText: {
    color: "#ccff33",
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginTop:20,
  },
  cardsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 200,
    gap: 26,
  },
  card: {
    backgroundColor: "white",
    width: 150,
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#ccff33",
    fontWeight: "bold",
    fontSize: 16,
  },
});
