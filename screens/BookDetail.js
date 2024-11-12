import React from 'react';
import { SafeAreaView, View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { db } from '../firebaseConfig';
import { doc, updateDoc, arrayUnion, getDoc } from 'firebase/firestore';
import { colors } from '../styles';

export default function BookDetail({ route, navigation }) {
  const { book } = route.params;
  const userId = 'USER_ID'; // Replace with the actual user ID

  const handleBorrowBook = async () => {
    try {
      const userRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const borrowedBooks = userDoc.data().borrowedBooks || [];

        // Check if the user has already borrowed 3 books
        if (borrowedBooks.length >= 3) {
          Alert.alert('Limit Reached', 'You cannot borrow more than three books at a time.');
          return;
        }

        // Check if the book is already borrowed
        const alreadyBorrowed = borrowedBooks.some((b) => b.id === book.id);
        if (alreadyBorrowed) {
          Alert.alert('Already Borrowed', `You have already borrowed "${book.name}".`);
          return;
        }

        // Add the book to borrowedBooks
        await updateDoc(userRef, {
          borrowedBooks: arrayUnion({
            id: book.id,
            name: book.name,
            author: book.author,
            coverUrl: book.coverUrl,
          }),
        });

        Alert.alert('Success', `You have borrowed "${book.name}"`);
        navigation.goBack();
      } else {
        Alert.alert('Error', 'User not found.');
      }
    } catch (error) {
      console.error('Error borrowing book: ', error);
      Alert.alert('Error', 'Could not borrow the book.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        {book.coverUrl && (
          <Image source={{ uri: book.coverUrl }} style={styles.coverImage} />
        )}
      </View>

      <View style={styles.detailContainer}>
        <Text style={styles.title}>{book.name}</Text>
        <Text style={styles.author}>by {book.author}</Text>
        <Text style={styles.summary}>{book.summary}</Text>
        <Text style={styles.rating}>Rating: {book.rating}</Text>

        <TouchableOpacity style={styles.borrowButton} onPress={handleBorrowBook}>
          <Text style={styles.borrowButtonText}>Borrow Book</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  coverImage: {
    width: '90%',
    height: 250,
    borderRadius: 15,
    resizeMode: 'cover',
  },
  detailContainer: {
    padding: 20,
    backgroundColor: colors.white,
    marginHorizontal: 15,
    borderRadius: 10,
    marginTop: -30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: 8,
  },
  author: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 15,
  },
  summary: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  rating: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
    textAlign: 'center',
    marginBottom: 25,
  },
  borrowButton: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  borrowButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
