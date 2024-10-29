import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { notesStore } from '../store/notes';

export default function SearchBar() {
  return (
    <View style={styles.container}>
      <MaterialIcons name="search" size={24} color="#666" />
      <TextInput
        style={styles.input}
        placeholder="Search notes..."
        onChangeText={(text) => notesStore.searchQuery.set(text)}
        value={notesStore.searchQuery.get()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
  },
  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#333',
  },
});