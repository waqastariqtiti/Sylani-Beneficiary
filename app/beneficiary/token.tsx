import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  StatusBar,
  Image,
} from "react-native";
import { getDatabase, ref, onValue } from "firebase/database";
import { Pressable } from "react-native";
import { Link, router } from "expo-router";

const img = require("../../assets/images/Sylani_landing.jpeg");
type LoanRequest = {
  cnic: string;
  name: string;
  phone: string;
  address: string;
  guarantorCnic: string;
  purpose: string;
  loan: number;
  timestamp?: number;
  id?: string;
};

export default function TokenCardPage() {
  const [tokenData, setTokenData] = useState<LoanRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  useEffect(() => {
    const database = getDatabase();
    const tokenRef = ref(database, "loanRequests");
    onValue(tokenRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const lastEntry = Object.entries(data).pop();
        if (lastEntry) {
          setTokenData({
            id: lastEntry[0],
            ...(lastEntry[1] as LoanRequest), 
          });
          setUsername((lastEntry[1] as LoanRequest).name);
        }
      }
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#28a745" />
      </View>
    );
  }

  if (!tokenData) {
    return (
      <View style={styles.container}>
        <Text style={styles.noDataText}>No token data available!</Text>
      </View>
    );
  }

  const { cnic, name, phone, address, guarantorCnic, purpose, loan, timestamp } = tokenData;
  const createdAt = new Date(timestamp || Date.now()).toLocaleString();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar backgroundColor={"black"} barStyle={"light-content"} />
      <Text style={styles.headerText}>Sylani Welfare</Text>
      <Image style={styles.logoImage} source={img} />
      <Text style={styles.greetingText}>
        Hello {username || "User"} 
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Token Details</Text>

        <View style={styles.cardItem}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.value}>{name}</Text>
        </View>

        <View style={styles.cardItem}>
          <Text style={styles.label}>CNIC:</Text>
          <Text style={styles.value}>{cnic}</Text>
        </View>

        <View style={styles.cardItem}>
          <Text style={styles.label}>Phone:</Text>
          <Text style={styles.value}>{phone}</Text>
        </View>
        <View style={[styles.cardItem, { alignItems: "flex-start" }]}>
          <Text style={styles.label}>Address:</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.scrollableValue}
          >
            <Text style={styles.value}>{address}</Text>
          </ScrollView>
        </View>

        <View style={styles.cardItem}>
          <Text style={styles.label}>Guarantor CNIC:</Text>
          <Text style={styles.value}>{guarantorCnic}</Text>
        </View>

        <View style={styles.cardItem}>
          <Text style={styles.label}>Purpose:</Text>
          <Text style={styles.value}>{purpose}</Text>
        </View>

        <View style={styles.cardItem}>
          <Text style={styles.label}>Loan Amount:</Text>
          <Text style={styles.value}>{loan}</Text>
        </View>

        <View style={styles.cardItem}>
          <Text style={styles.label}>Created At:</Text>
          <Text style={styles.value}>{createdAt}</Text>
        </View>
        <Text style={styles.statusText}>Pending Acceptability...</Text>
      </View>
        <Pressable style={styles.backButton}>
      <Link href={"/Splash"}>
          <Text style={styles.backButtonText}>Back</Text>
      </Link>
        </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#008000",
    padding: 20,
  },
  headerText: {
    fontSize: 30,
    color: "#9ef01a",
    marginLeft: 70,
    marginTop: 50,
  },
  logoImage: {
    width: 150,
    height: 150,
    borderRadius: 80,
    marginBottom: 10,
    marginLeft: 95,
    marginTop: 10,
  },
  greetingText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ccff33",
  },
  noDataText: {
    fontSize: 18,
    color: "#333",
    textAlign: "center",
    marginTop: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    marginBottom:20,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#28a745",
    marginBottom: 15,
    textAlign: "center",
  },
  cardItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    color: "#555",
    fontWeight: "bold",
  },
  value: {
    fontSize: 16,
    color: "#333",
  },
  scrollableValue: {
    maxWidth: "70%",
  },
  statusText: {
    fontSize: 18,
    color: "#ffc107",
    fontWeight: "bold",
    textAlign: "center",
  },
  backButton: {
    marginTop: 0,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    height:50,
    width:130,
  },
  backButtonText: {
    color: "#38b000",
    fontSize: 16,
    fontWeight: "bold",
  },
});
