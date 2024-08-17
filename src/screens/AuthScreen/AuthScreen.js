import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import your logo image
import appLogo from '../../../assets/logo.jpg'; // Adjust the path according to your project structure

// InputField component
const InputField = ({ icon, placeholder, value, onChangeText, isPassword = false }) => (
  <View style={styles.inputContainer}>
    <AntDesign name={icon} size={24} style={styles.inputIcon} />
    <TextInput
      placeholder={placeholder}
      secureTextEntry={isPassword}
      style={styles.inputText}
      placeholderTextColor="#808080"
      value={value}
      onChangeText={onChangeText}
    />
  </View>
);

// SignIn screen component
const SignIn = ({ navigation, onSignInSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser !== null) {
        const user = JSON.parse(storedUser);
        if (user.email === email && user.password === password) {
          onSignInSuccess(); // Trigger loading and navigation in the main component
        } else {
          Alert.alert('Invalid Credentials', 'Please check your email or password.');
        }
      } else {
        Alert.alert('No User Found', 'Please sign up first.');
      }
    } catch (error) {
      console.error('Error during sign-in:', error);
    }
  };

  return (
    <View style={styles.formContainer}>
      <InputField icon="mail" placeholder="Email" value={email} onChangeText={setEmail} />
      <InputField icon="lock" placeholder="Password" isPassword={true} value={password} onChangeText={setPassword} />
      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>SIGN IN</Text>
      </TouchableOpacity>
    </View>
  );
};

// SignUp screen component
const SignUp = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Password Mismatch', 'Please make sure both passwords match.');
      return;
    }

    const newUser = {
      fullName,
      email,
      password,
    };

    try {
      await AsyncStorage.setItem('user', JSON.stringify(newUser));
      Alert.alert('Sign Up Successful', 'You can now sign in.');
      navigation.navigate('Sign In'); // Navigate to Sign In screen
    } catch (error) {
      console.error('Error during sign-up:', error);
    }
  };

  return (
    <View style={styles.formContainer}>
      <InputField icon="user" placeholder="Full Name" value={fullName} onChangeText={setFullName} />
      <InputField icon="mail" placeholder="Email" value={email} onChangeText={setEmail} />
      <InputField icon="lock" placeholder="Password" isPassword={true} value={password} onChangeText={setPassword} />
      <InputField icon="lock" placeholder="Re-enter Password" isPassword={true} value={confirmPassword} onChangeText={setConfirmPassword} />
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>SIGN UP</Text>
      </TouchableOpacity>
    </View>
  );
};

const Tab = createMaterialTopTabNavigator();

const AuthScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  // Main loading function
  const performLoadingActions = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setLoading(false);
        Alert.alert('Sign In Successful', 'Welcome back!');
        navigation.navigate('HomeScreen'); // Navigate to ProfileScreen
        resolve();
      }, 2000); // Simulate loading with a 2-second delay
    });
  };

  // Handle sign-in success
  const handleSignInSuccess = async () => {
    setLoading(true);
    await performLoadingActions(); // Handle loading and navigation
  };

  return (
    <View style={styles.container}>
      {/* App Logo */}
      <View style={styles.logoContainer}>
        <Image source={appLogo} style={styles.logoImage} />
        <View style={styles.logoTextContainer}>
          <Text style={styles.logoTextPrimary}>Dog </Text>
          <Text style={styles.logoTextSecondary}>Nutrition</Text>
        </View>
      </View>

      {/* Tab Navigator */}
      <View style={styles.tabContainer}>
        <NavigationContainer independent={true}>
          <Tab.Navigator
            screenOptions={{
              tabBarActiveTintColor: '#000',
              tabBarIndicatorStyle: { backgroundColor: '#000' },
              tabBarLabelStyle: { fontWeight: '600' },
            }}
          >
            <Tab.Screen name="Sign In">
              {(props) => <SignIn {...props} onSignInSuccess={handleSignInSuccess} />}
            </Tab.Screen>
            <Tab.Screen name="Sign Up" component={SignUp} />
          </Tab.Navigator>
        </NavigationContainer>
      </View>

      {/* Guest Sign-In Button */}
      {/* <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')} style={styles.guestButton}>
        <Text style={styles.guestButtonText}>Sign in as a Guest</Text>
      </TouchableOpacity> */}
    </View>
  );
};

// ProfileScreen component
const ProfileScreen = () => (
  <View style={styles.container}>
    <Text style={styles.profileText}>Welcome to your profile!</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#f8f9fa',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logoImage: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 10,
    borderRadius:20
  },
  logoTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoTextPrimary: {
    fontSize: 36,
    fontWeight: '700',
    color: '#333',
    fontFamily: 'Arial', // You can change this to a custom font if needed
  },
  logoTextSecondary: {
    fontSize: 36,
    fontWeight: '700',
    color: '#ff6347', // Tomato color
    marginLeft: 5,
  },
  logoTextPrimary: {
    fontSize: 32,
    fontWeight: '800',
    color: '#000',
  },

  tabContainer: {
    flex: 1,
    marginTop: 20,
  },
  formContainer: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#d1d1d1',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  inputIcon: {
    color: '#808080',
  },
  inputText: {
    flex: 1,
    marginLeft: 10,
    paddingVertical: 10,
    color: '#000',
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  guestButton: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  guestButtonText: {
    color: '#808080',
    textDecorationLine: 'underline',
    fontWeight: '500',
  },
  profileText: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 50,
  },
});

export default AuthScreen;
