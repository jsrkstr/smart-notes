import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Note } from '../contexts/NoteContext';

interface NoteCardProps {
  note: Note;
}

const NoteCard: React.FC<NoteCardProps> = ({ note }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title} numberOfLines={1}>
        {note.title}
      </Text>
      <Text style={styles.content} numberOfLines={2}>
        {note.content}
      </Text>
      <Text style={styles.date}>
        {new Date(note.updatedAt).toLocaleDateString()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  content: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  date: {
    fontSize: 12,
    color: '#999',
    textAlign: 'right',
  },
});

export default NoteCard;

