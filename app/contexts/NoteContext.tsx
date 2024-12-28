import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Note {
  id: string;
  title: string;
  content: string;
  updatedAt: number;
}

interface NoteContextType {
  notes: Note[];
  addNote: (note: Omit<Note, 'id' | 'updatedAt'>) => Promise<void>;
  updateNote: (note: Note) => Promise<void>;
  deleteNote: (id: string) => Promise<void>;
  getNoteById: (id: string) => Note | undefined;
}

const NoteContext = createContext<NoteContextType | undefined>(undefined);

export const useNotes = () => {
  const context = useContext(NoteContext);
  if (!context) {
    throw new Error('useNotes must be used within a NoteProvider');
  }
  return context;
};

export const NoteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      const storedNotes = await AsyncStorage.getItem('notes');
      if (storedNotes) {
        setNotes(JSON.parse(storedNotes));
      }
    } catch (error) {
      console.error('Error loading notes:', error);
    }
  };

  const saveNotes = async (updatedNotes: Note[]) => {
    try {
      await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
    } catch (error) {
      console.error('Error saving notes:', error);
    }
  };

  const addNote = async (note: Omit<Note, 'id' | 'updatedAt'>) => {
    const newNote: Note = {
      ...note,
      id: Date.now().toString(),
      updatedAt: Date.now(),
    };
    const updatedNotes = [...notes, newNote];
    setNotes(updatedNotes);
    await saveNotes(updatedNotes);
  };

  const updateNote = async (updatedNote: Note) => {
    const updatedNotes = notes.map((note) =>
      note.id === updatedNote.id ? { ...updatedNote, updatedAt: Date.now() } : note
    );
    setNotes(updatedNotes);
    await saveNotes(updatedNotes);
  };

  const deleteNote = async (id: string) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
    await saveNotes(updatedNotes);
  };

  const getNoteById = (id: string) => {
    return notes.find((note) => note.id === id);
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, updateNote, deleteNote, getNoteById }}>
      {children}
    </NoteContext.Provider>
  );
};

