import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { db } from '../firebaseConfig';
import { collection, onSnapshot } from 'firebase/firestore';
import { MaterialIcons } from '@expo/vector-icons';

export default function BooksList({ navigation }) {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'books'), (snapshot) => {
      const booksData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBooks(booksData);
    });

    return () => unsubscribe(); // Clean up on unmount
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header image to attract attention */}
      <Image
        source={{ uri: '/Users/tanveer/Downloads/BookApp-main/pexels-tuurt-626986.jpg' }}
        style={styles.headerImage}
      />

      {/* Screen title */}
      <Text style={styles.title}>Explore Our Books</Text>

      {/* List of books */}
      {books.length === 0 ? (
        <Text style={styles.noDataText}>No books available</Text>
      ) : (
        <FlatList
          data={books}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.bookItem}
              onPress={() => navigation.navigate('Book Detail', { book: item })}
            >
              <Text style={styles.bookTitle}>{item.name}</Text>
              <Text style={styles.bookAuthor}>by {item.author}</Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.listContainer}
        />
      )}

      {/* Floating action button to add books */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('Add Book')}
      >
        <MaterialIcons name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fb',
  },
  headerImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4a4a4a',
    textAlign: 'center',
    marginVertical: 15,
  },
  noDataText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    color: '#6e6e6e',
  },
  listContainer: {
    paddingHorizontal: 15,
    paddingBottom: 80,
  },
  bookItem: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginVertical: 8,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  bookAuthor: {
    fontSize: 14,
    color: '#777',
    marginTop: 2,
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#32a852',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
});
