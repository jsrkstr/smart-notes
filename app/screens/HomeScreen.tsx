import React, { useState } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { useNotes, Note } from '../contexts/NoteContext';
import NoteCard from '../components/NoteCard';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreenn: React.FC = () => {
  const { notes } = useNotes();
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [searchQuery, setSearchQuery] = useState('');

  const renderNoteCard = ({ item }: { item: Note }) => {
    if (
      searchQuery &&
      !item.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !item.content.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return null;
    }
    return (
      <TouchableOpacity onPress={() => router.push({ pathname: '/(tabs)/explore', params: { noteId: item.id } })}>
        <NoteCard note={item} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search your notes"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={notes}
        renderItem={renderNoteCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push({ pathname: '/(tabs)/explore' })}
      >
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    marginTop: '10%',
  },
  listContainer: {
    padding: 16,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#007AFF',
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
  searchBar: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
    marginHorizontal: 16,
    marginTop: 16,
  },
});

export default HomeScreenn;

