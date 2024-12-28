import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Paragraph, Title } from 'react-native-paper';
import { Note } from '../contexts/NoteContext';

interface NoteCardProps {
  note: Note;
  onPress: () => void;
}

const NoteCard: React.FC<NoteCardProps> = ({ note, onPress }) => {
  return (
    <Card style={styles.card} onPress={onPress} mode='outlined'>
      <Card.Content>
        <Title numberOfLines={1}>{note.title}</Title>
        <Paragraph numberOfLines={2}>{note.content}</Paragraph>
        <Paragraph style={styles.date}>
          {new Date(note.updatedAt).toLocaleDateString()}
        </Paragraph>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    backgroundColor: 'white',
    borderColor: '#eee'
  },
  date: {
    fontSize: 12,
    color: '#999',
    alignSelf: 'flex-end',
    marginTop: 8,
  },
});

export default NoteCard;
