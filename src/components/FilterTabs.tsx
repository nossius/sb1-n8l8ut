import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { notesStore } from '../store/notes';
import { useObservable } from '@legendapp/state/react';

export default function FilterTabs() {
  const currentFilter = useObservable(notesStore.filter);

  const filters = [
    { label: 'All', value: 'all' },
    { label: 'Shared', value: 'shared' },
    { label: 'Starred', value: 'starred' },
  ];

  return (
    <View style={styles.container}>
      {filters.map((filter) => (
        <TouchableOpacity
          key={filter.value}
          style={[
            styles.tab,
            currentFilter === filter.value && styles.activeTab,
          ]}
          onPress={() => notesStore.filter.set(filter.value)}
        >
          <Text
            style={[
              styles.tabText,
              currentFilter === filter.value && styles.activeTabText,
            ]}
          >
            {filter.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
    borderRadius: 16,
    backgroundColor: '#f5f5f5',
  },
  activeTab: {
    backgroundColor: '#2196F3',
  },
  tabText: {
    fontSize: 14,
    color: '#666',
  },
  activeTabText: {
    color: '#fff',
  },
});