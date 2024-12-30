import { Stack } from "expo-router";
import HomeScreen from "./screens/HomeScreen";
import { ThemedText } from "@/components/ThemedText";

export default function AppScreen() {
  return (
    <>
      {/* <Stack.Screen options={{ title: 'App!' }} /> */}
      <ThemedText type="title">This screen doesn't exist.</ThemedText>
    </>
  );
}