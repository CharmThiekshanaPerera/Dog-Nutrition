import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import products from '../../data/products';

const ProductItem = ({ item }) => (
  <TouchableOpacity style={styles.productCard}>
    <Image style={styles.productThumbnail} source={{ uri: item.thumbnail }} />
    <Text style={styles.productTitle} numberOfLines={1} ellipsizeMode="tail">{item.title}</Text>
    <Text style={styles.productCategory}>{item.categoryName}</Text>
    <View style={styles.productInfo}>
      <Text style={styles.productPrice}>${item.price}</Text>
      <View style={styles.ratingContainer}>
        <Text style={styles.productRating}>{item.rating}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const ProductScreen = ({ route }) => {
  const { categoryId, categoryName } = route.params;

  // Filter products based on the selected category
  const filteredProducts = products.filter(product => product.categoryId === categoryId);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerTitle}>{categoryName}</Text>
      <FlatList
        data={filteredProducts}
        renderItem={({ item }) => <ProductItem item={item} />}
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
});

export default ProductScreen;
