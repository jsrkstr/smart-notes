import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { useNotes } from '../contexts/NoteContext';
import { Ionicons } from '@expo/vector-icons';

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
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={handleSave} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#007AFF" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
          <Ionicons name="save-outline" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.titleInput}
        value={title}
        onChangeText={setTitle}
        placeholder="Note Title"
        placeholderTextColor="#999"
      />
      <TextInput
        style={styles.contentInput}
        value={content}
        onChangeText={setContent}
        placeholder="Start typing..."
        placeholderTextColor="#999"
        multiline
      />
      {route.params?.noteId && (
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Ionicons name="trash-outline" size={24} color="white" />
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: '10%',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    padding: 8,
  },
  saveButton: {
    padding: 8,
  },
  titleInput: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: 16,
    paddingHorizontal: 16,
    color: '#333',
  },
  contentInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    textAlignVertical: 'top',
    paddingHorizontal: 16,
  },
  deleteButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#FF3B30',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
});

export default NoteEditorScreen;

