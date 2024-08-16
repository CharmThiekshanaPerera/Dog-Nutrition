import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { signIn, signUp } from './authService';

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
const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    const response = await signIn(email, password);
    if (response.success) {
      Alert.alert('Success', 'Welcome back, ' + response.data.fullName);
      navigation.navigate('ProfileScreen', { user: response.data }); // Navigate to ProfileScreen with user data
    } else {
      Alert.alert('Error', response.message);
    }
  };

  return (
    <View style={styles.formContainer}>
      <InputField icon="mail" placeholder="Email" value={email} onChangeText={setEmail} />
      <InputField icon="lock" placeholder="Password" value={password} onChangeText={setPassword} isPassword={true} />
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
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    const response = await signUp(fullName, email, password);
    if (response.success) {
      Alert.alert('Success', 'Account created successfully');
      navigation.navigate('ProfileScreen', { user: { fullName, email } }); // Navigate to ProfileScreen with user data
    } else {
      Alert.alert('Error', response.message);
    }
  };

  return (
    <View style={styles.formContainer}>
      <InputField icon="user" placeholder="Full Name" value={fullName} onChangeText={setFullName} />
      <InputField icon="mail" placeholder="Email" value={email} onChangeText={setEmail} />
      <InputField icon="lock" placeholder="Password" value={password} onChangeText={setPassword} isPassword={true} />
      <InputField
        icon="lock"
        placeholder="Re-enter Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        isPassword={true}
      />
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>SIGN UP</Text>
      </TouchableOpacity>
    </View>
  );
};

const Tab = createMaterialTopTabNavigator();

const AuthScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* App Logo */}
      <View style={styles.logoContainer}>
        <Text style={styles.logoTextPrimary}>Open</Text>
        <Text style={styles.logoTextSecondary}>Shop.</Text>
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
            <Tab.Screen name="Sign In" component={SignIn} />
            <Tab.Screen name="Sign Up" component={SignUp} />
          </Tab.Navigator>
        </NavigationContainer>
      </View>

      {/* Guest Sign-In Button */}
      <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')} style={styles.guestButton}>
        <Text style={styles.guestButtonText}>Sign in as a Guest</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#f8f9fa',
  },
  logoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  logoTextPrimary: {
    fontSize: 32,
    fontWeight: '800',
    color: '#000',
  },
  logoTextSecondary: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FF9900',
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
});

export default AuthScreen;
