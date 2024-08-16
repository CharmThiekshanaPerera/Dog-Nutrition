import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'react-native-image-picker';

const ProfileScreen = ({ route, navigation }) => {
  const [user, setUser] = useState({
    fullName: '',
    email: '',
    address: '',
    profilePhoto: null,
    paymentMethod: null,
  });
  const [isEditing, setIsEditing] = useState(false);

  const fetchUserData = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  useEffect(() => {
    fetchUserData();

    // Reload user data if coming from AddPaymentMethodScreen with refresh parameter
    if (route.params?.refresh) {
      fetchUserData();
    }
  }, [route.params?.refresh]);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('user');
      navigation.navigate('AuthScreen'); // Navigate back to the Auth screen
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleProfilePhotoChange = async () => {
    ImagePicker.launchImageLibrary({}, async (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.error('ImagePicker Error: ', response.error);
      } else if (response.assets) {
        const photoUri = response.assets[0].uri;
        setUser({ ...user, profilePhoto: photoUri });
        await AsyncStorage.setItem('user', JSON.stringify({ ...user, profilePhoto: photoUri }));
      }
    });
  };

  const handleSaveChanges = async () => {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(user));
      setIsEditing(false);
      Alert.alert('Success', 'Profile updated successfully');
    } catch (error) {
      console.error('Error saving profile changes:', error);
    }
  };

  if (!user.fullName && !isEditing) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading user details...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.profilePhotoContainer} onPress={handleProfilePhotoChange}>
        {user.profilePhoto ? (
          <Image source={{ uri: user.profilePhoto }} style={styles.profilePhoto} />
        ) : (
          <Text style={styles.addPhotoText}>Add Photo</Text>
        )}
      </TouchableOpacity>

      <View style={styles.detailContainer}>
        <Text style={styles.detailLabel}>Full Name:</Text>
        {isEditing ? (
          <TextInput
            style={styles.detailValueInput}
            value={user.fullName}
            onChangeText={(text) => setUser({ ...user, fullName: text })}
          />
        ) : (
          <Text style={styles.detailValue}>{user.fullName}</Text>
        )}
      </View>

      <View style={styles.detailContainer}>
        <Text style={styles.detailLabel}>Email:</Text>
        {isEditing ? (
          <TextInput
            style={styles.detailValueInput}
            value={user.email}
            onChangeText={(text) => setUser({ ...user, email: text })}
          />
        ) : (
          <Text style={styles.detailValue}>{user.email}</Text>
        )}
      </View>

      <View style={styles.detailContainer}>
        <Text style={styles.detailLabel}>Address:</Text>
        {isEditing ? (
          <TextInput
            style={styles.detailValueInput}
            value={user.address}
            onChangeText={(text) => setUser({ ...user, address: text })}
          />
        ) : (
          <Text style={styles.detailValue}>{user.address}</Text>
        )}
      </View>

      <View style={styles.detailContainer}>
        <Text style={styles.detailLabel}>Payment Method:</Text>
        <Text style={styles.detailValue}>{user.paymentMethod ? user.paymentMethod.type : 'None'}</Text>
      </View>

      {isEditing ? (
        <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      ) : (
        <>
          <TouchableOpacity style={styles.editButton} onPress={() => setIsEditing(true)}>
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.addPaymentButton} onPress={() => navigation.navigate('AddPaymentMethodScreen')}>
            <Text style={styles.addPaymentButtonText}>Add Payment Method</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  profilePhotoContainer: {
    alignSelf: 'center',
    marginBottom: 30,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profilePhoto: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  addPhotoText: {
    fontSize: 18,
    color: '#666',
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
  detailValueInput: {
    fontSize: 20,
    fontWeight: '600',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    color: '#000',
  },
  editButton: {
    marginTop: 30,
    backgroundColor: '#5bc0de',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  saveButton: {
    marginTop: 30,
    backgroundColor: '#5cb85c',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  addPaymentButton: {
    marginTop: 20,
    backgroundColor: '#0275d8',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  addPaymentButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  logoutButton: {
    marginTop: 20,
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
