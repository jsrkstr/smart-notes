import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import NoteEditorScreen from './screens/NoteEditorScreen';
import { NoteProvider } from './contexts/NoteContext';

export type RootStackParamList = {
  Home: undefined;
  NoteEditor: { noteId?: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NoteProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{ title: 'My Notess' }}
          />
          <Stack.Screen 
            name="NoteEditor" 
            component={NoteEditorScreen} 
            options={{ title: 'Edit Note' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </NoteProvider>
  );
}

