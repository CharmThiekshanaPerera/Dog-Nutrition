import AsyncStorage from '@react-native-async-storage/async-storage';

// Function to handle sign-in
export const signIn = async (email, password) => {
  try {
    const storedUser = await AsyncStorage.getItem(email);
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser.password === password) {
        return { success: true, data: parsedUser };
      } else {
        return { success: false, message: 'Incorrect password' };
      }
    } else {
      return { success: false, message: 'No account found with this email' };
    }
  } catch (error) {
    return { success: false, message: 'Failed to sign in' };
  }
};

// Function to handle sign-up
export const signUp = async (fullName, email, password) => {
  try {
    const existingUser = await AsyncStorage.getItem(email);
    if (existingUser) {
      return { success: false, message: 'This email is already registered' };
    }

    const userData = {
      fullName,
      email,
      password,
    };

    await AsyncStorage.setItem(email, JSON.stringify(userData));
    return { success: true };
  } catch (error) {
    return { success: false, message: 'Failed to sign up' };
  }
};
