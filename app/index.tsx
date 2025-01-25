import React, { useEffect } from 'react';
import { StyleSheet, Image, View, Animated } from 'react-native';
import { useRouter } from 'expo-router'; // Make sure to import the useRouter hook
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'react-native';
const Splash = require('./Splash');

const logo = require('../assets/images/logo.png');

const Index = () => {
  const router = useRouter();
  const scaleAnim = new Animated.Value(1); // Start at normal size (scale 1)

  useEffect(() => {
    // Start the animation
    Animated.timing(scaleAnim, {
      toValue: 1.1, // Slightly enlarge the logo
      duration: 2000, // 2 seconds animation
      useNativeDriver: true,
    }).start(() => {
      // Check if user is logged in or not after animation
      setTimeout(async () => {
        const userToken = await AsyncStorage.getItem('userToken');
        if (userToken) {
          // If user is logged in, navigate to Home page
          router.push('/Home');
        } else {
          // If user is not logged in, navigate to Splash page
          router.push("/Splash");
        }
      }, 2000); // Delay for 2 seconds after animation
    });
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'black'} barStyle={'light-content'}/>
      <Animated.View
        style={[
          styles.logoContainer,
          {
            transform: [
              {
                scale: scaleAnim, // Scale the logo based on animation
              },
            ],
          },
        ]}
      >
        <Image style={styles.logo} source={logo} />
      </Animated.View>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#008000', // Set the background color
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: 200,
    width: 280,
    borderRadius: 20, // Make the image circular
    borderWidth: 1, // Add a border
    borderColor: '#ccff33', // Set border color
  },
});
