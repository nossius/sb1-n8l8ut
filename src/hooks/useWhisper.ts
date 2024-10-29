import { useState } from 'react';
import WhisperKit from 'whisperkit';

export const useWhisper = () => {
  const [isTranscribing, setIsTranscribing] = useState(false);

  const transcribe = async (audioUri: string) => {
    setIsTranscribing(true);
    try {
      const whisper = new WhisperKit();
      const result = await whisper.transcribe(audioUri);
      return result.text;
    } catch (err) {
      console.error('Transcription failed', err);
      return '';
    } finally {
      setIsTranscribing(false);
    }
  };

  return {
    transcribe,
    isTranscribing,
  };
};
</bortAction>

<boltAction type="file" filePath="src/components/NoteList.tsx">import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useObservable } from '@legendapp/state/react';
import { notesStore } from '../store/notes';
import NoteItem from './NoteItem';
import SearchBar from './SearchBar';
import FilterTabs from './FilterTabs';

export default function NoteList() {
  const notes = useObservable(notesStore.notes);
  const filter = useObservable(notesStore.filter);
  const searchQuery = useObservable(notesStore.searchQuery);

  const filteredNotes = notes.filter(note => {
    const matchesFilter = 
      filter === 'all' || 
      (filter === 'starred' && note.isStarred) ||
      (filter === 'shared' && note.isShared);

    const matchesSearch = 
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <View style={styles.container}>
      <SearchBar />
      <FilterTabs />
      <FlatList
        data={filteredNotes}
        renderItem={({ item }) => <NoteItem note={item} />}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  list: {
    padding: 16,
  },
});