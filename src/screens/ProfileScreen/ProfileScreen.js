import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ProfileScreen component
const ProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    };

    getUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('user');
      navigation.navigate('AuthScreen'); // Navigate back to the Auth screen
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading user details...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.profileTitle}>Profile Details</Text>
      <View style={styles.detailContainer}>
        <Text style={styles.detailLabel}>Full Name:</Text>
        <Text style={styles.detailValue}>{user.fullName}</Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.detailLabel}>Email:</Text>
        <Text style={styles.detailValue}>{user.email}</Text>
      </View>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f8f9fa',
  },
  profileTitle: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  detailContainer: {
    marginBottom: 20,
  },
  detailLabel: {
    fontSize: 18,
    fontWeight: '500',
    color: '#666',
  },
  detailValue: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  logoutButton: {
    marginTop: 30,
    backgroundColor: '#d9534f',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#666',
  },
});

export default ProfileScreen;
