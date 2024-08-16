import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddPaymentMethodScreen = ({ navigation }) => {
  const [selectedMethod, setSelectedMethod] = useState('');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
  });

  const handleSavePaymentMethod = async () => {
    if (selectedMethod === 'card') {
      // Validate card details
      if (!cardDetails.cardNumber || !cardDetails.cardHolder || !cardDetails.expiryDate || !cardDetails.cvv) {
        Alert.alert('Error', 'Please fill in all card details.');
        return;
      }
      const paymentMethod = {
        type: 'Card',
        details: cardDetails,
      };
      await savePaymentMethod(paymentMethod);
    } else if (selectedMethod === 'cash') {
      const paymentMethod = {
        type: 'Cash on Delivery',
      };
      await savePaymentMethod(paymentMethod);
    } else {
      Alert.alert('Error', 'Please select a payment method.');
    }
  };

  const savePaymentMethod = async (paymentMethod) => {
    try {
      const storedUser = await AsyncStorage.getItem('user');
      const user = storedUser ? JSON.parse(storedUser) : {};
      const updatedUser = {
        ...user,
        paymentMethods: [...(user.paymentMethods || []), paymentMethod],
      };
      await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
      Alert.alert('Success', 'Payment method added successfully!');
      navigation.goBack();
    } catch (error) {
      console.error('Error saving payment method:', error);
      Alert.alert('Error', 'Failed to save payment method.');
    }
  };

  const renderCardForm = () => (
    <View style={styles.cardFormContainer}>
      <TextInput
        style={styles.input}
        placeholder="Card Number"
        keyboardType="numeric"
        value={cardDetails.cardNumber}
        onChangeText={(text) => setCardDetails({ ...cardDetails, cardNumber: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Card Holder Name"
        value={cardDetails.cardHolder}
        onChangeText={(text) => setCardDetails({ ...cardDetails, cardHolder: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Expiry Date (MM/YY)"
        value={cardDetails.expiryDate}
        onChangeText={(text) => setCardDetails({ ...cardDetails, expiryDate: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="CVV"
        keyboardType="numeric"
        value={cardDetails.cvv}
        onChangeText={(text) => setCardDetails({ ...cardDetails, cvv: text })}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Payment Method</Text>

      {/* Payment Method Selection */}
      <TouchableOpacity
        style={[
          styles.option,
          selectedMethod === 'card' ? styles.selectedOption : {},
        ]}
        onPress={() => setSelectedMethod('card')}
      >
        <Text style={styles.optionText}>Credit/Debit Card</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.option,
          selectedMethod === 'cash' ? styles.selectedOption : {},
        ]}
        onPress={() => setSelectedMethod('cash')}
      >
        <Text style={styles.optionText}>Cash on Delivery</Text>
      </TouchableOpacity>

      {/* Show Card Form if Credit/Debit Card is Selected */}
      {selectedMethod === 'card' && renderCardForm()}

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSavePaymentMethod}>
        <Text style={styles.saveButtonText}>Save Payment Method</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  option: {
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    marginBottom: 15,
    alignItems: 'center',
  },
  selectedOption: {
    backgroundColor: '#0275d8',
  },
  optionText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  cardFormContainer: {
    marginVertical: 20,
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#5cb85c',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default AddPaymentMethodScreen;
