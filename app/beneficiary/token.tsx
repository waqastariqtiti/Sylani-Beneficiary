import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
} from "react-native";
import { getDatabase, ref, set } from "firebase/database";

const TokenGenerationScreen = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    purpose: "",
  });

  const [generatedToken, setGeneratedToken] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Function to generate a unique token
  const generateToken = () => {
    const timestamp = Date.now(); // Current timestamp
    const randomNum = Math.floor(Math.random() * 1000); // Random number
    return `${timestamp}-${randomNum}`;
  };

  // Generate token and save data when form is submitted
  const handleSubmit = () => {
    if (formData.name && formData.phone && formData.date && formData.purpose) {
      const token = generateToken();  // Generate unique token
      setGeneratedToken(token);
      saveAppointmentToFirebase(token);
      setIsSubmitted(true);
    } else {
      Alert.alert("Error", "Please fill out all fields.");
    }
  };

  // Save the appointment data and generated token to Firebase
  const saveAppointmentToFirebase = (token: string) => {
    const database = getDatabase();
    const newAppointmentRef = ref(database, 'appointments/' + token);
  
    set(newAppointmentRef, {
      ...formData,
      token,
    })
      .then(() => {
        Alert.alert("Success", "Your appointment has been saved successfully!");
      })
      .catch((error) => {
        Alert.alert("Error", "There was an error saving the appointment: " + error.message);
      });
  };
  
  

  return (
    <View style={styles.container}>
      {!isSubmitted ? (
        <>
          <Text style={styles.title}>Appointment Request</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter Full Name"
            value={formData.name}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
          />

          <TextInput
            style={styles.input}
            placeholder="Enter Phone Number"
            value={formData.phone}
            onChangeText={(text) => setFormData({ ...formData, phone: text })}
            keyboardType="phone-pad"
          />

          <TextInput
            style={styles.input}
            placeholder="Enter Appointment Date"
            value={formData.date}
            onChangeText={(text) => setFormData({ ...formData, date: text })}
          />

          <TextInput
            style={styles.input}
            placeholder="Enter Purpose"
            value={formData.purpose}
            onChangeText={(text) => setFormData({ ...formData, purpose: text })}
          />

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Generate Token</Text>
          </TouchableOpacity>
        </>
      ) : (
        <View style={styles.tokenContainer}>
          <Text style={styles.title}>Your Appointment Token</Text>
          <Text style={styles.token}>{generatedToken}</Text>

          <Text style={styles.detailsTitle}>Appointment Details:</Text>
          <View style={styles.detailsContainer}>
            <Text style={styles.detailText}>Name: {formData.name}</Text>
            <Text style={styles.detailText}>Phone: {formData.phone}</Text>
            <Text style={styles.detailText}>Date: {formData.date}</Text>
            <Text style={styles.detailText}>Purpose: {formData.purpose}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#f1f1f1",
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
    width: "100%",
  },
  submitButton: {
    backgroundColor: "#28a745",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  tokenContainer: {
    alignItems: "center",
  },
  token: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#28a745",
    marginBottom: 20,
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  detailsContainer: {
    marginBottom: 20,
  },
  detailText: {
    fontSize: 16,
    color: "#555",
    marginBottom: 5,
  },
});

export default TokenGenerationScreen;
