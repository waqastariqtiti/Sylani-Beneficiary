import { router } from "expo-router";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, Image  } from "react-native";
const img = require('../assets/images/Sylani_landing.jpeg');

export default function RoleSelectionPage() {
  return (

    <View style={styles.container}>
      <StatusBar backgroundColor={'black'} barStyle={'light-content'}/>
      {/* Title Section */}
      <Image style={styles.logoImage} source={img}/>
      <Text style={styles.title}>Please select your role to proceed</Text>

      {/* Role Buttons */}
      <View style={styles.rolesContainer}>
        <TouchableOpacity
          style={styles.roleButton}
          onPress={() => router.push('/auth/Login')}
        >
          <Text style={styles.roleText}>Login as Seeker</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.roleButton}
          onPress={() => router.push("/auth/Login")}
        >
          <Text style={styles.roleText}>Login as Admin</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.roleButton}
          onPress={() => router.push("/auth/Login")}
        >
          <Text style={styles.roleText}>Login as Receptionist</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.roleButton}
          onPress={() => router.push("/auth/Login")}
        >
          <Text style={styles.roleText}>Login as DepartmentStaff</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#38b000",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#ccff33",
    paddingBottom:30,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
    color: "#22577a",
  },
  rolesContainer: {
    width: "100%",
    alignItems: "center",
  },
  roleButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 15,
    width: "80%",
    alignItems: "center",
    textAlign:'center',
  },
  roleText: {
    color: "#9ef01a",
    fontSize: 16,
    fontWeight: "bold",
  },
  logoImage: {
    width: 150,
    height: 150,
    borderRadius: 80,
    marginBottom: 10,
  },
});
