import React, { useEffect } from 'react';
import { StyleSheet, Image, View, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'react-native';
const Splash = require('./Splash');

const logo = require('../assets/images/logo.png');

const Index = () => {
  const router = useRouter();
  const scaleAnim = new Animated.Value(1); 

  useEffect(() => {
    Animated.timing(scaleAnim, {
      toValue: 1.1,
      duration: 2000, 
      useNativeDriver: true,
    }).start(() => {
      setTimeout(async () => {
        const userToken = await AsyncStorage.getItem('userToken');
        if (userToken) {
          router.push('/LoginAs');
        } else {
          router.push("/Splash");
        }
      }, 2000); 
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
                scale: scaleAnim, 
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
    backgroundColor: '#008000', 
    justifyContent: 'center',
    alignItems: 'center', 
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: 200,
    width: 280,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccff33',
  },
});
