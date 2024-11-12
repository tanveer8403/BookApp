import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { db } from '../firebaseConfig';
import { doc, updateDoc, arrayRemove, onSnapshot } from 'firebase/firestore';
import { colors, globalStyles } from '../styles';

export default function Borrowed() {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const userId = 'USER_ID'; // Replace with the actual user ID

  useEffect(() => {
    const userDocRef = doc(db, 'users', userId);
    const unsubscribe = onSnapshot(userDocRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        setBorrowedBooks(docSnapshot.data().borrowedBooks || []);
      }
    });

    return unsubscribe;
  }, []);

  const handleReturnBook = async (book) => {
    const userDocRef = doc(db, 'users', userId);
    await updateDoc(userDocRef, {
      borrowedBooks: arrayRemove(book),
    });
    alert(`You have returned "${book.name}"`);
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <Text style={globalStyles.title}>Borrowed Books</Text>
      {borrowedBooks.length === 0 ? (
        <Text style={styles.noDataText}>No borrowed books.</Text>
      ) : (
        <FlatList
          data={borrowedBooks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.bookItem}>
              <Text style={styles.bookTitle}>{item.name}</Text>
              <Text style={styles.bookAuthor}>by {item.author}</Text>
              <TouchableOpacity onPress={() => handleReturnBook(item)}>
                <Text style={styles.returnButton}>Return Book</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  noDataText: {
    textAlign: 'center',
    fontSize: 18,
    color: colors.textSecondary,
    marginTop: 20,
  },
  bookItem: {
    padding: 15,
    backgroundColor: colors.white,
    borderRadius: 8,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  bookAuthor: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 10,
  },
  returnButton: {
    color: colors.accent,
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
});