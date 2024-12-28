import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { useNotes } from '../contexts/NoteContext';
import { Appbar, TextInput, FAB } from 'react-native-paper';

type NoteEditorScreenRouteProp = RouteProp<RootStackParamList, 'NoteEditor'>;
type NoteEditorScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'NoteEditor'>;

const NoteEditorScreen: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigation = useNavigation<NoteEditorScreenNavigationProp>();
  const route = useRoute<NoteEditorScreenRouteProp>();
  const { addNote, updateNote, getNoteById, deleteNote } = useNotes();

  useEffect(() => {
    setTitle('');
    setContent('');
    if (route.params?.noteId) {
      const note = getNoteById(route.params.noteId);
      if (note) {
        setTitle(note.title);
        setContent(note.content);
      }
    }
  }, [route.params?.noteId]);

  const handleSave = async () => {
    if (route.params?.noteId) {
      await updateNote({ id: route.params.noteId, title, content, updatedAt: Date.now() });
    } else {
      await addNote({ title, content });
    }
    navigation.goBack();
  };

  const handleDelete = async () => {
    if (route.params?.noteId) {
      await deleteNote(route.params.noteId);
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={handleSave} />
        <Appbar.Content title={''} />
        <Appbar.Action icon="archive-outline" onPress={handleDelete} />
      </Appbar.Header>
      <TextInput
        style={styles.titleInput}
        value={title}
        onChangeText={setTitle}
        placeholder="Title"
        mode="flat"
      />
      <TextInput
        style={styles.contentInput}
        value={content}
        onChangeText={setContent}
        placeholder="Note"
        multiline
        mode="flat"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  titleInput: {
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor: 'transparent',
  },
  contentInput: {
    flex: 1,
    fontSize: 16,
    backgroundColor: 'transparent',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#FF3B30',
  },
});

export default NoteEditorScreen;

