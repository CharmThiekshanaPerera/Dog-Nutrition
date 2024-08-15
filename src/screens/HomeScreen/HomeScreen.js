import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, FlatList, SafeAreaView, ScrollView } from 'react-native';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import CarouselComponent from './components/CarouselComponent';
import products from '../../data/products';

const Header = ({ navigation }) => (
  <View style={styles.headerContainer}>
    {/* Logo Section */}
    <View style={styles.logoContainer}>
      <Text style={styles.logoText}>Open</Text>
      <Text style={styles.logoHighlight}>Shop.</Text>
    </View>
    {/* Icons Section */}
    <View style={styles.iconRow}>
      <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')}>
        <MaterialCommunityIcons name="account-circle-outline" style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('FavoritesScreen')}>
        <MaterialCommunityIcons name="cards-heart-outline" style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('CartScreen')}>
        <MaterialCommunityIcons name="cart-outline" style={styles.icon} />
      </TouchableOpacity>
    </View>
  </View>
);

const SearchBar = ({ navigation }) => (
  <View style={styles.searchContainer}>
    <TextInput placeholder="Search for a product..." style={styles.searchInput} />
    <TouchableOpacity style={styles.searchIcon} onPress={() => navigation.navigate('DiscoverScreen')}>
      <Feather name="search" size={24} color="grey" />
    </TouchableOpacity>
  </View>
);

const BestSellerItem = ({ item }) => (
  <TouchableOpacity style={styles.productCard}>
    <Image style={styles.productThumbnail} source={{ uri: item.thumbnail }} />
    <Text style={styles.productTitle} numberOfLines={1} ellipsizeMode="tail">{item.title}</Text>
    <View style={styles.productInfo}>
      <Text style={styles.productPrice}>${item.price}</Text>
      <View style={styles.ratingContainer}>
        <MaterialCommunityIcons name="star" size={18} color="#FFBE5B" />
        <Text style={styles.productRating}>{item.rating}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
        {/* Header Section */}
        <Header navigation={navigation} />
        {/* Search Bar */}
        <SearchBar navigation={navigation} />
        {/* Banners Carousel */}
        <CarouselComponent />
        {/* Best Sellers Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Best Sellers</Text>
        </View>
      <ScrollView>
        
          <FlatList
            key={'two-columns'} // Static key to avoid the error
            data={products}
            renderItem={({ item }) => <BestSellerItem item={item} />}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2} // Set the number of columns to 2
            columnWrapperStyle={styles.columnWrapper} // Apply styles to the row
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.bestSellersList}
          />
       
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  logoHighlight: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF9900',
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 15,
    fontSize: 28,
    color: '#000',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E7E7E7',
    borderRadius: 8,
    marginHorizontal: 20,
    marginVertical: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  searchIcon: {
    marginLeft: 10,
  },
  sectionContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
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
    justifyContent: 'space-between', // Ensures even spacing between items
    margin: 10,
    //marginBottom:20
  },
  productCard: {
    width: '48%', // Adjusts width for two items per row
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    //marginBottom: 10,
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
});

export default HomeScreen;
