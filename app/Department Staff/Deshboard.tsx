import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  StatusBar,
} from "react-native";
import { getDatabase, ref, onValue, remove } from "firebase/database";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const img = require("../../assets/images/Sylani_landing.jpeg");

interface LoanRequest {
  id: string;
  cnic: string;
  name: string;
  loan: string;
  status?: string;
}

export default function AdminAccepted() {
  const [loanRequests, setLoanRequests] = useState<LoanRequest[]>([]);
  const router = useRouter();

  useEffect(() => {
    const database = getDatabase();
    const loanRequestsRef = ref(database, "loanRequests");

    const unsubscribe = onValue(loanRequestsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const formattedData: LoanRequest[] = Object.entries(data).map(
          ([id, value]) => ({
            id,
            name: (value as LoanRequest).name,
            cnic: (value as LoanRequest).cnic,
            loan: (value as LoanRequest).loan,
            status: (value as LoanRequest).status,
          })
        );
        const acceptedLoanRequests = formattedData.filter(
          (request) => request.status === "accepted"
        );

        setLoanRequests(acceptedLoanRequests);
      } else {
        setLoanRequests([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = (id: string) => {
    const database = getDatabase();
    const loanRequestRef = ref(database, `loanRequests/${id}`);

    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this request?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            remove(loanRequestRef)
              .then(() => {
                Alert.alert("Success", "Request deleted successfully.");
              })
              .catch((error) => {
                Alert.alert(
                  "Error",
                  "Failed to delete request: " + error.message
                );
              });
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={"black"} barStyle={"light-content"} />

      <View style={styles.header}>
        <Text style={styles.headerTextLeft}>Department Staff</Text>
        <Text style={styles.headerTextRight}>Sylani Welfare</Text>
      </View>
      <Image style={styles.logoImage} source={img} />
      <Text
        style={{
          fontSize: 26,
          fontWeight: "bold",
          color: "#ccff33",
          marginTop: 20,
          marginLeft: 70,
        }}
      >
        Dashboard
      </Text>
      <ScrollView contentContainerStyle={styles.main}>
        {loanRequests.length === 0 ? (
          <Text style={styles.noDataText}>
            No accepted loan requests available.
          </Text>
        ) : (
          loanRequests.map((request) => (
            <View key={request.id} style={styles.card}>
              <Text style={styles.cardText}>
                <Text style={styles.label}>Name: </Text>
                {request.name}
              </Text>
              <Text style={styles.cardText}>
                <Text style={styles.label}>CNIC: </Text>
                {request.cnic}
              </Text>
              <Text style={styles.cardText}>
                <Text style={styles.label}>Loan Amount: </Text>
                {request.loan}
              </Text>
              <TouchableOpacity
                style={styles.previewButton}
                onPress={() =>
                  router.push({
                    pathname: "/admin/prview",
                    params: {
                      id: request.id,
                      name: request.name,
                      cnic: request.cnic,
                      loan: request.loan,
                    },
                  })
                }
              >
                <Text style={styles.previewButtonText}>Preview</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDelete(request.id)}
              >
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => router.push("/admin/Dashboard")}
        >
          <MaterialIcons name="dashboard" size={24} color="#ffffff" />
          <Text style={styles.iconText}>Dashboard</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => router.push("/admin/denied")}
        >
          <MaterialIcons name="block" size={24} color="#ffffff" />
          <Text style={styles.iconText}>Denied</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => router.push("/admin/given")}
        >
          <MaterialIcons name="check-circle" size={24} color="#ffffff" />
          <Text style={styles.iconText}>Accepted</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => router.push("/Splash")}
        >
          <MaterialIcons name="logout" size={24} color="#ffffff" />
          <Text style={styles.iconText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#008000",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#004b23",
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  headerTextLeft: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ccff33",
  },
  headerTextRight: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ccff33",
  },
  logoImage: {
    width: 150,
    height: 150,
    borderRadius: 80,
    marginBottom: 0,
    marginLeft: 120,
    marginTop: 30,
  },
  main: {
    padding: 20,
  },
  noDataText: {
    fontSize: 18,
    color: "#6c757d",
    textAlign: "center",
    marginTop: 20,
  },
  card: {
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 5,
    color: "#004b23",
  },
  label: {
    fontWeight: "bold",
    color: "#212529",
  },
  previewButton: {
    backgroundColor: "#28a745",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  previewButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  deleteButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  deleteButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#004b23",
    paddingVertical: 10,
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  iconButton: {
    alignItems: "center",
  },
  iconText: {
    color: "#ffffff",
    fontSize: 12,
    marginTop: 5,
  },
});
