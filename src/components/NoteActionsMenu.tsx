import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function NoteActionsMenu({ isVisible, onClose, onAction, note }) {
  const actions = [
    { icon: 'edit', label: 'Edit', action: 'edit' },
    { icon: 'mic', label: 'Record Subnote', action: 'record' },
    { icon: 'image', label: 'Attach Image', action: 'attach' },
    { icon: 'share', label: 'Share', action: 'share' },
    { icon: 'star-outline', label: 'Star', action: 'star' },
    { icon: 'delete-outline', label: 'Delete', action: 'delete' },
  ];

  const aiActions = [
    { icon: 'summarize', label: 'Summarize', action: 'summarize' },
    { icon: 'article', label: 'Blog Post', action: 'blog' },
    { icon: 'email', label: 'Email', action: 'email' },
    { icon: 'list-alt', label: 'To-Do List', action: 'todo' },
  ];

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableOpacity 
        style={styles.overlay} 
        activeOpacity={1} 
        onPress={onClose}
      >
        <View style={styles.menuContainer}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Actions</Text>
            {actions.map((action) => (
              <TouchableOpacity
                key={action.action}
                style={styles.menuItem}
                onPress={() => {
                  onAction(action.action, note);
                  onClose();
                }}
              >
                <MaterialIcons name={action.icon} size={24} color="#444" />
                <Text style={styles.menuText}>{action.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>AI Actions</Text>
            {aiActions.map((action) => (
              <TouchableOpacity
                key={action.action}
                style={styles.menuItem}
                onPress={() => {
                  onAction(action.action, note);
                  onClose();
                }}
              >
                <MaterialIcons name={action.icon} size={24} color="#444" />
                <Text style={styles.menuText}>{action.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  menuContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    maxHeight: '80%',
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
  },
  menuText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#444',
  },
});