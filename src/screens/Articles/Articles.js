import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';

// Sample data for articles, videos, and guides
const articles = [
  {
    id: 1,
    title: 'The Best Diet for Your Dog',
    description: 'Learn about the best foods to keep your dog healthy and happy.',
    image: 'https://smb.ibsrv.net/imageresizer/image/article_manager/1200x1200/11872/1084356/heroimage0.138108001702399367.jpg',
  },
  {
    id: 2,
    title: 'Understanding Dog Nutrition by Breed',
    description: 'How different breeds have unique dietary needs.',
    image: 'https://smb.ibsrv.net/imageresizer/image/article_manager/1200x1200/22503/281242/heroimage0.431596001617991260.jpg',
  },
];

const videos = [
  {
    id: 1,
    title: 'Dog Nutrition Basics',
    thumbnail: 'https://primopup.com/wp-content/uploads/2017/08/Dog-Nutrition_opt-800x518.jpg',
  },
  {
    id: 2,
    title: 'Feeding Your Puppy',
    thumbnail: 'https://example.com/images/puppy_video.jpg',
  },
];

const guides = [
  {
    id: 1,
    title: 'Guide to Feeding Senior Dogs',
    description: 'Tips and tricks to ensure your older dog stays healthy.',
    image: 'https://example.com/images/senior_dog_guide.jpg',
  },
  {
    id: 2,
    title: 'Essential Vitamins and Supplements',
    description: 'A guide to key nutrients for your dog’s diet.',
    image: 'https://example.com/images/supplements_guide.jpg',
  },
];

const Articles = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>Dog Nutrition Articles</Text>
      <View style={styles.sectionContainer}>
        {articles.map((article) => (
          <View key={article.id} style={styles.card}>
            <Image source={{ uri: article.image }} style={styles.cardImage} />
            <Text style={styles.cardTitle}>{article.title}</Text>
            <Text style={styles.cardDescription}>{article.description}</Text>
            <TouchableOpacity style={styles.readMoreButton}>
              <Text style={styles.readMoreText}>Read More</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Nutrition Videos</Text>
      <View style={styles.sectionContainer}>
        {videos.map((video) => (
          <View key={video.id} style={styles.card}>
            <Image source={{ uri: video.thumbnail }} style={styles.cardImage} />
            <Text style={styles.cardTitle}>{video.title}</Text>
            <TouchableOpacity style={styles.watchButton}>
              <Text style={styles.watchButtonText}>Watch Video</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Nutrition Guides</Text>
      <View style={styles.sectionContainer}>
        {guides.map((guide) => (
          <View key={guide.id} style={styles.card}>
            <Image source={{ uri: guide.image }} style={styles.cardImage} />
            <Text style={styles.cardTitle}>{guide.title}</Text>
            <Text style={styles.cardDescription}>{guide.description}</Text>
            <TouchableOpacity style={styles.readMoreButton}>
              <Text style={styles.readMoreText}>Read Guide</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 16,
    color: '#333',
  },
  sectionContainer: {
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    elevation: 3,
  },
  cardImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: '#555',
    marginBottom: 12,
  },
  readMoreButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  readMoreText: {
    color: '#fff',
    fontWeight: '600',
  },
  watchButton: {
    backgroundColor: '#28a745',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  watchButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default Articles;
