import { Stack } from "expo-router";
import HomeScreen from "./screens/HomeScreen";

export default function AppScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'App!' }} />
      <HomeScreen />
    </>
  );
}