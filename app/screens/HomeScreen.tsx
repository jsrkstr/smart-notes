import React, { useState } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { useNotes, Note } from '../contexts/NoteContext';
import NoteCard from '../components/NoteCard';
import { Searchbar, FAB, Appbar } from 'react-native-paper';
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
      <NoteCard note={item} onPress={() => router.push({ pathname: '/(tabs)/explore', params: { noteId: item.id } })} />
    );
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="My Notes" />
      </Appbar.Header>
      <Searchbar
        placeholder="Search your notes"
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchBar}
      />
      <FlatList
        data={notes}
        renderItem={renderNoteCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => router.push({ pathname: '/(tabs)/explore' })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  listContainer: {
    padding: 16,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: 'white',
  },
  searchBar: {
    margin: 16,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#eee',
  },
});

export default HomeScreenn;

