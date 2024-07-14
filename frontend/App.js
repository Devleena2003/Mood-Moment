import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigation from "./Navigation";
import { ZoomProvider } from "./context/ZoomContext";
import { ColorProvider } from "./context/ColorContext";
import { TextSizeProvider } from "./context/TextSizeContext";
import { VoiceNavigationProvider } from "./context/VoiceNavigationContext";

export default function App() {
  return (
  <VoiceNavigationProvider>
    <ZoomProvider>
      <ColorProvider>
        <TextSizeProvider>
          <NavigationContainer>
            <RootNavigation />
          </NavigationContainer>
        </TextSizeProvider>
      </ColorProvider>
    </ZoomProvider>
  </VoiceNavigationProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
