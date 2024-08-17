import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, ScrollView, Linking } from 'react-native';

// Sample data
const articles = [
  {
    id: 1,
    title: 'The Best Diet for Your Dog',
    description: 'Learn about the best foods to keep your dog healthy and happy.',
    image: 'https://i.shgcdn.com/1fb6d2f4-b7d0-4db7-839d-034ccf1fa36a/-/format/auto/-/preview/3000x3000/-/quality/lighter/',
    link: 'https://example.com/dog-food-article',
  },
  {
    id: 2,
    title: 'Understanding Dog Nutrition by Breed',
    description: 'How different breeds have unique dietary needs.',
    image: 'https://smb.ibsrv.net/imageresizer/image/article_manager/1200x1200/22503/281242/heroimage0.431596001617991260.jpg',
    link: 'https://example.com/breed-nutrition',
  },
];

const videos = [
  {
    id: 1,
    title: 'Dog Nutrition Basics',
    thumbnail: 'https://cdn.shopify.com/s/files/1/2061/7349/files/shutterstock_2182132735_600x600.jpg?v=1680588737',
    link: 'https://youtu.be/RM5Lvfk39Dg?si=I8rKvp3yWeT7WIZ5',
  },
  {
    id: 2,
    title: 'Feeding Your Puppy',
    thumbnail: 'https://www.purina.co.uk/sites/default/files/2020-12/Feeding%20Your%20Puppy%20-%20The%20Complete%20GuideTEASER.jpg',
    link: 'https://youtu.be/B7tk3JTKv_k?si=o55RdfEPLhY1aGPa',
  },
];

const guides = [
  {
    id: 1,
    title: 'Guide to Feeding Senior Dogs',
    description: 'Tips and tricks to ensure your older dog stays healthy.',
    image: 'https://www.seniordogrevolution.com/wp-content/uploads/2024/06/best-senior-dog-food.jpg',
    link: 'https://example.com/senior-dog-guide',
  },
  {
    id: 2,
    title: 'Essential Vitamins and Supplements',
    description: 'A guide to key nutrients for your dog’s diet.',
    image: 'https://media.post.rvohealth.io/wp-content/uploads/2022/12/woman-organizing-her-health-supplements-thumbnail-732x549.jpg',
    link: 'https://example.com/supplements-guide',
  },
];

// Function to handle link opening
const openLink = (url) => {
  Linking.openURL(url).catch((err) => console.error("Failed to open URL:", err));
};

// Main ArticlesScreen component
const ArticlesScreen = () => {
  const renderArticleItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardDescription}>{item.description}</Text>
      <TouchableOpacity style={styles.button} onPress={() => openLink(item.link)}>
        <Text style={styles.buttonText}>Read More</Text>
      </TouchableOpacity>
    </View>
  );

  const renderVideoItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.thumbnail }} style={styles.cardImage} />
      <Text style={styles.cardTitle}>{item.title}</Text>
      <TouchableOpacity style={styles.button} onPress={() => openLink(item.link)}>
        <Text style={styles.buttonText}>Watch Video</Text>
      </TouchableOpacity>
    </View>
  );

  const renderGuideItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardDescription}>{item.description}</Text>
      <TouchableOpacity style={styles.button} onPress={() => openLink(item.link)}>
        <Text style={styles.buttonText}>Read Guide</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>Articles</Text>
      <FlatList
        data={articles}
        renderItem={renderArticleItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />

      <Text style={styles.sectionTitle}>Videos</Text>
      <FlatList
        data={videos}
        renderItem={renderVideoItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />

      <Text style={styles.sectionTitle}>Guides</Text>
      <FlatList
        data={guides}
        renderItem={renderGuideItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </ScrollView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  listContainer: {
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginRight: 16,
    width: 250,
    elevation: 3,
  },
  cardImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  cardDescription: {
    fontSize: 14,
    color: '#555',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#ff6347',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default ArticlesScreen;
