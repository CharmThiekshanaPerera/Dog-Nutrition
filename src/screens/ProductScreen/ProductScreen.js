import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, SafeAreaView, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import products from '../../data/products';

const ProductItem = ({ item, handleAddToCart }) => (
  <View style={styles.productCard}>
    <Image style={styles.productThumbnail} source={{ uri: item.thumbnail }} />
    <Text style={styles.productTitle} numberOfLines={1} ellipsizeMode="tail">
      {item.title}
    </Text>
    <Text style={styles.productCategory}>{item.categoryName}</Text>
    <View style={styles.productInfo}>
      <Text style={styles.productPrice}>${item.price}</Text>
      <View style={styles.ratingContainer}>
        <Text style={styles.productRating}>{item.rating}</Text>
      </View>
    </View>
    <TouchableOpacity style={styles.addToCartButton} onPress={() => handleAddToCart(item)}>
      <Text style={styles.addToCartText}>Add to Cart</Text>
      <MaterialCommunityIcons name="cart-plus" size={20} color="#fff" />
    </TouchableOpacity>
  </View>
);

const ProductScreen = ({ route, navigation }) => {
  const { categoryId, categoryName } = route.params;

  // Filter products based on the selected category
  const filteredProducts = products.filter(product => product.categoryId === categoryId);

  const handleAddToCart = async (product) => {
    try {
      const cart = await AsyncStorage.getItem('cart');
      const cartItems = cart ? JSON.parse(cart) : [];

      const productInCart = cartItems.find((item) => item.id === product.id);

      if (productInCart) {
        productInCart.quantity += 1;
      } else {
        cartItems.push({ ...product, quantity: 1 });
      }

      await AsyncStorage.setItem('cart', JSON.stringify(cartItems));
      Alert.alert('Success', 'Item added to cart!', [
        { text: 'Go to Cart', onPress: () => navigation.navigate('CartScreen') },
      ]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerTitle}>{categoryName}</Text>
      <FlatList
        data={filteredProducts}
        renderItem={({ item }) => <ProductItem item={item} handleAddToCart={handleAddToCart} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.productList}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
  },
  productList: {
    paddingHorizontal: 20,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  productCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    marginBottom: 10,
  },
  productThumbnail: {
    width: '100%',
    height: 180,
    borderRadius: 8,
    marginBottom: 10,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
  },
  productCategory: {
    fontSize: 14,
    color: '#888',
    marginBottom: 5,
  },
  productInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productRating: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  addToCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ff6347',
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 10,
  },
  addToCartText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    marginRight: 5,
  },
});

export default ProductScreen;
