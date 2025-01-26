import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert, TouchableOpacity, StatusBar } from "react-native";
import { getDatabase, ref, onValue, update } from "firebase/database"; // Import update method from Firebase
import { useRouter } from "expo-router"; // Import the useRouter hook

type LoanRequestParams = {
  id: string;
  name: string;
  cnic: string;
  loan: string;
  phone: string;
  address: string;
  guarantorCnic: string;
  purpose: string;
  status: string; 
};

export default function LoanRequestPreview() {
  const [loanRequest, setLoanRequest] = useState<LoanRequestParams | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter(); 
  useEffect(() => {
    const database = getDatabase();
    const loanRequestRef = ref(database, "loanRequests");
    onValue(loanRequestRef, (snapshot) => {
      const data = snapshot.val();

      if (data) {        const loanRequests = Object.values(data) as LoanRequestParams[]; 
        const latestLoanRequest = loanRequests[loanRequests.length - 1]; 
        setLoanRequest(latestLoanRequest);
      } else {
        Alert.alert("Error", "No loan request data found.");
      }
      setLoading(false);
    });
  }, []);

  const handleStatusChange = (status: string) => {
    if (loanRequest) {
      const database = getDatabase();
      const loanRequestRef = ref(database, `loanRequests/${loanRequest.id}`); 
      update(loanRequestRef, { status })
        .then(() => {
          Alert.alert("Success", `Application ${status} successfully.`);
          setLoanRequest((prevState) => {
            if (prevState) {
              return { ...prevState, status };
            }
            return null;
          });
          router.push("/Reception/Deshboard");
        })
        .catch((error) => {
          Alert.alert("Error", `Failed to update application status: ${error.message}`);
        });
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!loanRequest) {
    return (
      <View style={styles.container}>
        <Text>No loan request data available.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
        <StatusBar backgroundColor={'black'} barStyle={'light-content'}/>

      <Text style={styles.title}>Loan Request Details</Text>
      <View style={styles.card}>
        <Text style={styles.cardText}>
          <Text style={styles.label}>ID: </Text>
          {loanRequest.id}
        </Text>
        <Text style={styles.cardText}>
          <Text style={styles.label}>Name: </Text>
          {loanRequest.name}
        </Text>
        <Text style={styles.cardText}>
          <Text style={styles.label}>CNIC: </Text>
          {loanRequest.cnic}
        </Text>
        <Text style={styles.cardText}>
          <Text style={styles.label}>Loan Amount: </Text>
          {loanRequest.loan}
        </Text>
        <Text style={styles.cardText}>
          <Text style={styles.label}>Phone Number: </Text>
          {loanRequest.phone}
        </Text>
        <Text style={styles.cardText}>
          <Text style={styles.label}>Address: </Text>
          {loanRequest.address}
        </Text>
        <Text style={styles.cardText}>
          <Text style={styles.label}>Guarantor CNIC: </Text>
          {loanRequest.guarantorCnic}
        </Text>
        <Text style={styles.cardText}>
          <Text style={styles.label}>Purpose: </Text>
          {loanRequest.purpose}
        </Text>
        <Text style={styles.cardText}>
          <Text style={styles.label}>Status: </Text>
          {loanRequest.status || "Pending"}
        </Text>
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[styles.button, styles.acceptButton]}
          onPress={() => handleStatusChange("Accepted")}
        >
          <Text style={styles.buttonText}>Accept Application</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.denyButton]}
          onPress={() => handleStatusChange("Denied")}
        >
          <Text style={styles.buttonText}>Deny Application</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#004b23",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    width: "90%",
    marginBottom: 20,
  },
  cardText: {
    fontSize: 18,
    marginBottom: 10,
    color: "#004b23",
  },
  label: {
    fontWeight: "bold",
    color: "#212529",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 20,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    width: "40%",
    alignItems: "center",
  },
  acceptButton: {
    backgroundColor: "#28a745",
  },
  denyButton: {
    backgroundColor: "#dc3545",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
