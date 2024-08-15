import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import categories from '../../data/categories';

const CategoryItem = ({ item, navigation }) => (
  <TouchableOpacity
    style={styles.categoryCard}
    onPress={() => navigation.navigate('ProductScreen', { categoryId: item.id, categoryName: item.name })}
  >
    <Image style={styles.categoryImage} source={{ uri: item.image }} />
    <Text style={styles.categoryTitle}>{item.name}</Text>
  </TouchableOpacity>
);

const CategoryScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerTitle}>Categories</Text>
      <FlatList
        data={categories}
        renderItem={({ item }) => <CategoryItem item={item} navigation={navigation} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.categoryList}
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
  categoryList: {
    paddingHorizontal: 20,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  categoryCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    marginBottom: 10,
  },
  categoryImage: {
    width: 80,
    height: 80,
    borderRadius: 50,
    marginBottom: 10,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CategoryScreen;
