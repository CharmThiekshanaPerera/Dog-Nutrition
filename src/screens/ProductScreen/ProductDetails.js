import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const ProductDetails = ({ route, navigation }) => {
  const { product } = route.params;

  const handleAddToCart = () => {
    // Logic to add product to cart
    console.log('Added to Cart:', product.title);
    // You can navigate to the Cart screen or show a toast message here.
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: product.thumbnail }} style={styles.productImage} />
      <Text style={styles.productTitle}>{product.title}</Text>
      <Text style={styles.productPrice}>${product.price}</Text>
      <Text style={styles.productCategory}>{product.category}</Text>
      <Text style={styles.productDescription}>{product.description}</Text>

      <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
        <Text style={styles.addToCartText}>Add to Cart</Text>
        <MaterialCommunityIcons name="cart-plus" size={24} color="#fff" />
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#ffffff',
  },
  productImage: {
    width: '100%',
    height: 300,
    borderRadius: 12,
    marginBottom: 20,
  },
  productTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ff6347',
    marginBottom: 10,
  },
  productCategory: {
    fontSize: 18,
    color: '#888',
    marginBottom: 20,
  },
  productDescription: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  addToCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ff6347',
    paddingVertical: 12,
    borderRadius: 8,
  },
  addToCartText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    marginRight: 8,
  },
});

export default ProductDetails;
