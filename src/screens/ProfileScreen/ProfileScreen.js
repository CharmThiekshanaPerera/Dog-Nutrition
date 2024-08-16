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

    if (route.params?.refresh) {
      fetchUserData();
    }
  }, [route.params?.refresh]);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('user');
      navigation.navigate('AuthScreen');
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
      <View style={styles.profileHeader}>
        {/* {user.profilePhoto ? (
          <Image source={{ uri: user.profilePhoto }} style={styles.profilePhoto} />
        ) : (
          <View style={styles.profilePhotoPlaceholder}>
            <Text style={styles.profilePhotoText}>Profile Photo</Text>
          </View>
        )}
        <TouchableOpacity style={styles.changePhotoButton} onPress={handleProfilePhotoChange}>
          <Text style={styles.changePhotoButtonText}>Change Photo</Text>
        </TouchableOpacity> */}
      </View>

      <View style={styles.card}>
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>Full Name:</Text>
          {isEditing ? (
            <TextInput
              style={styles.detailValueInput}
              value={user.fullName}
              onChangeText={(text) => setUser({ ...user, fullName: text })}
            />
          ) : (
            <Text style={styles.cardDetail}>{user.fullName}</Text>
          )}
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>Email:</Text>
          {isEditing ? (
            <TextInput
              style={styles.detailValueInput}
              value={user.email}
              onChangeText={(text) => setUser({ ...user, email: text })}
            />
          ) : (
            <Text style={styles.cardDetail}>{user.email}</Text>
          )}
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>Address:</Text>
          {isEditing ? (
            <TextInput
              style={styles.detailValueInput}
              value={user.address}
              onChangeText={(text) => setUser({ ...user, address: text })}
            />
          ) : (
            <Text style={styles.cardDetail}>{user.address}</Text>
          )}
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>Payment Method:</Text>
          <Text style={styles.cardDetail}>{user.paymentMethod ? user.paymentMethod.type : 'None'}</Text>
        </View>
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
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePhoto: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#ddd',
    marginBottom: 10,
  },
  profilePhotoPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  profilePhotoText: {
    fontSize: 16,
    color: '#555',
  },
  changePhotoButton: {
    backgroundColor: '#ff6347',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    elevation: 2,
  },
  changePhotoButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    elevation: 2,
    marginBottom: 16,
    padding: 16,
  },
  cardContent: {
    flexDirection: 'column',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  cardDetail: {
    fontSize: 16,
    color: '#666',
  },
  detailValueInput: {
    fontSize: 16,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    backgroundColor: '#fff',
  },
  saveButton: {
    backgroundColor: '#4caf50',
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  editButton: {
    backgroundColor: '#2196f3',
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  addPaymentButton: {
    backgroundColor: '#ff9800',
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  addPaymentButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#f44336',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginTop: 50,
  },
});

export default ProfileScreen;
