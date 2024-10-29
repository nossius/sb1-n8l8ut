import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import { format } from 'date-fns';
import { MaterialIcons } from '@expo/vector-icons';
import NoteActionsMenu from './NoteActionsMenu';
import { deleteNote, toggleStarred } from '../store/notes';

export default function NoteItem({ note }) {
  const [sound, setSound] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  async function playSound() {
    try {
      const { sound } = await Audio.Sound.createAsync({ uri: note.audioUrl });
      setSound(sound);
      await sound.playAsync();
      setIsPlaying(true);
      
      sound.setOnPlaybackStatusUpdate(status => {
        if (status.didJustFinish) {
          setIsPlaying(false);
        }
      });
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  }

  async function handleAction(action, note) {
    switch (action) {
      case 'delete':
        deleteNote(note.id);
        break;
      case 'star':
        toggleStarred(note.id);
        break;
      // Implement other actions
    }
  }

  React.useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{note.title}</Text>
        <Text style={styles.date}>
          {format(new Date(note.createdAt), 'MMM d, yyyy')}
        </Text>
      </View>
      
      <Text style={styles.content} numberOfLines={2}>
        {note.content}
      </Text>
      
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.playButton} 
          onPress={playSound}
        >
          <MaterialIcons 
            name={isPlaying ? "pause" : "play-arrow"} 
            size={24} 
            color="#2196F3" 
          />
          <Text style={styles.duration}>
            {Math.floor(note.duration / 60)}:{(note.duration % 60).toString().padStart(2, '0')}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.menuButton}
          onPress={() => setShowMenu(true)}
        >
          <MaterialIcons name="more-vert" size={24} color="#666" />
        </TouchableOpacity>
      </View>

      <NoteActionsMenu
        isVisible={showMenu}
        onClose={() => setShowMenu(false)}
        onAction={handleAction}
        note={note}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  date: {
    fontSize: 14,
    color: '#666',
  },
  content: {
    fontSize: 16,
    color: '#444',
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  duration: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666',
  },
  menuButton: {
    padding: 8,
  },
});