import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
  StatusBar,
} from "react-native";
import { getDatabase, ref, push } from "firebase/database";
import { router } from "expo-router";

const img = require("../../assets/images/Sylani_landing.jpeg");

export default function LoanRequestPage() {
  const [formData, setFormData] = useState({
    cnic: "",
    name: "",
    phone: "",
    address: "",
    guarantorCnic: "",
    purpose: "",
    loan: "",
  });

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = () => {
    // Validation checks for empty fields
    if (
      !formData.cnic ||
      !formData.name ||
      !formData.phone ||
      !formData.address ||
      !formData.guarantorCnic ||
      !formData.purpose ||
      !formData.loan
    ) {
      Alert.alert("Error", "All fields must be filled out.");
      return;
    }
  
    // CNIC validation (should be 13 digits)
    if (formData.cnic.length !== 13 || isNaN(Number(formData.cnic))) {
      Alert.alert("Error", "CNIC should be 13 digits and must be numeric.");
      return;
    }
  
    // Guarantor CNIC validation (should be 13 digits and not the same as the user's CNIC)
    if (
      formData.guarantorCnic.length !== 13 ||
      isNaN(Number(formData.guarantorCnic))
    ) {
      Alert.alert(
        "Error",
        "Guarantor's CNIC should be 13 digits and must be numeric."
      );
      return;
    }
  
    if (formData.cnic === formData.guarantorCnic) {
      Alert.alert(
        "Error",
        "The guarantor's CNIC must belong to another person."
      );
      return;
    }
  
    // Phone validation (should be numeric)
    if (isNaN(Number(formData.phone))) {
      Alert.alert("Error", "Phone number must be numeric.");
      return;
    }
  
    // Loan validation (should be numeric)
    if (isNaN(Number(formData.loan)) || Number(formData.loan) <= 0) {
      Alert.alert("Error", "Loan amount must be a valid positive number.");
      return;
    }
  
    // All validations passed, save to database and navigate
    const database = getDatabase();
  
    // Include status field as 'Pending' by default
    const loanDataWithStatus = { ...formData, status: "Pending" };
  
    push(ref(database, "loanRequests"), loanDataWithStatus)
      .then(() => {
        Alert.alert("Form Submitted", "Your loan request has been saved successfully!");
        setFormData({
          cnic: "",
          name: "",
          phone: "",
          address: "",
          guarantorCnic: "",
          purpose: "",
          loan: "",
        });
        router.push("/beneficiary/token"); // Navigate to the next screen
      })
      .catch((error) => {
        Alert.alert("Error", "There was an error saving the data: " + error.message);
      });
  };
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar backgroundColor={"black"} barStyle={"light-content"} />
      <Image style={styles.logoImage} source={img} />
      <Text style={styles.logoText}>Sylani Welfare</Text>

      <View style={styles.instructionsBar}>
        <Text style={styles.instructionsText}>
          Please fill out all the fields accurately. Ensure you have a valid CNIC
          and details of your guarantor ready.
        </Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>Loan Request Form</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter CNIC of 13 Digits"
          value={formData.cnic}
          onChangeText={(text) => handleInputChange("cnic", text)}
          keyboardType="numeric"
        />

        <TextInput
          style={styles.input}
          placeholder="Enter Full Name"
          value={formData.name}
          onChangeText={(text) => handleInputChange("name", text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Enter Phone Number"
          value={formData.phone}
          onChangeText={(text) => handleInputChange("phone", text)}
          keyboardType="phone-pad"
        />

        <TextInput
          style={styles.input}
          placeholder="Enter Address"
          value={formData.address}
          onChangeText={(text) => handleInputChange("address", text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Enter Guarantor's CNIC"
          value={formData.guarantorCnic}
          onChangeText={(text) => handleInputChange("guarantorCnic", text)}
          keyboardType="numeric"
        />

        <TextInput
          style={styles.input}
          placeholder="Purpose of Visit (e.g., Financial Aid, Medical Assistance)"
          value={formData.purpose}
          onChangeText={(text) => handleInputChange("purpose", text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Enter how much loan you want"
          value={formData.loan}
          onChangeText={(text) => handleInputChange("loan", text)}
          keyboardType="numeric"
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit Loan Request</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#ccff33",
    padding: 20,
  },
  logoText: {
    color: "#008000",
    fontSize: 20,
    fontWeight: "bold",
    position: "absolute",
    top: 30,
    left: 75,
  },
  instructionsBar: {
    backgroundColor: "#ffc107",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  logoImage: {
    width: 50,
    height: 50,
    borderRadius: 80,
    marginBottom: 10,
    borderColor: "#ccff33",
    borderWidth: 2,
  },
  instructionsText: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
  },
  formContainer: {
    backgroundColor: "#008000",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  formTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#007BFF",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
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
});
