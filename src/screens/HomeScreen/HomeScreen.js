import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, FlatList, SafeAreaView } from 'react-native';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import categories from '../../data/categories';
import products from '../../data/products';

const Header = ({ navigation }) => (
  <View style={styles.headerContainer}>
    <View style={styles.logoContainer}>
      <Text style={styles.logoText}>Dog </Text>
      <Text style={styles.logoHighlight}>Nutrition</Text>
    </View>
    <View style={styles.iconRow}>
    <TouchableOpacity onPress={() => navigation.navigate('Articles')}>
        <Feather name="book-open" style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')}>
        <MaterialCommunityIcons name="account-circle-outline" style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('CartScreen')}>
        <MaterialCommunityIcons name="cart-outline" style={styles.icon} />
      </TouchableOpacity>
    </View>
  </View>
);

const CategoryItem = ({ item, navigation }) => (
  <TouchableOpacity
    style={styles.categoryItem}
    onPress={() => navigation.navigate('ProductScreen', { categoryId: item.id, categoryName: item.name })}
  >
    <Text style={styles.categoryText}>{item.name}</Text>
  </TouchableOpacity>
);

const BestSellerItem = ({ item, navigation }) => (
  <TouchableOpacity
    style={styles.productCard}
    onPress={() => navigation.navigate('ProductDetails', { product: item })}
  >
    <Image style={styles.productThumbnail} source={{ uri: item.thumbnail }} />
    <Text style={styles.productTitle} numberOfLines={1} ellipsizeMode="tail">
      {item.title}
    </Text>
    <View style={styles.productInfo}>
      <Text style={styles.productPrice}>${item.price}</Text>
      <View style={styles.ratingContainer}>
        <MaterialCommunityIcons name="star" size={18} color="#FFBE5B" />
        <Text style={styles.productRating}>{item.rating}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const SearchBar = ({ searchTerm, setSearchTerm }) => (
  <View style={styles.searchContainer}>
    <Feather name="search" size={20} color="#333" style={styles.searchIcon} />
    <TextInput
      style={styles.searchInput}
      placeholder="Search products..."
      value={searchTerm}
      onChangeText={(text) => setSearchTerm(text)}
    />
  </View>
);

const HomeScreen = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter products based on search term
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Section */}
      <Header navigation={navigation} />

      {/* Search Bar */}
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {/* Category List */}
      <View style={styles.categoryContainer}>
        <FlatList
          data={categories}
          renderItem={({ item }) => <CategoryItem item={item} navigation={navigation} />}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryList}
        />
      </View>

      {/* Best Sellers Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Best Sellers</Text>
        <FlatList
          data={filteredProducts}
          renderItem={({ item }) => <BestSellerItem item={item} navigation={navigation} />}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.bestSellersList}
          ListEmptyComponent={<Text style={styles.emptyText}>No products found.</Text>}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#ffffff',
    elevation: 4,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  logoHighlight: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ff6347',
  },
  iconRow: {
    flexDirection: 'row',
  },
  icon: {
    fontSize: 24,
    color: '#333',
    marginHorizontal: 12,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    margin: 16,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  searchIcon: {
    marginRight: 10,
  },
  categoryContainer: {
    marginVertical: 8,
  },
  categoryList: {
    paddingVertical: 10,
  },
  categoryItem: {
    backgroundColor: '#ffffff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  categoryText: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  sectionContainer: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  bestSellersList: {
    paddingBottom: 20,
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
    marginLeft: 5,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#888',
    marginTop: 20,
  },
});

export default HomeScreen;
