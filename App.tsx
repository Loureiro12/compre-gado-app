import "react-native-gesture-handler";
import { ThemeProvider } from "styled-components/native";
import FlashMessage from "react-native-flash-message";
// import { AppProvider } from "./src/hooks";

import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";

import theme from "./src/theme";

import { Loading } from "./src/components/Loading";
import { Routes } from "./src/routes/index";
import { AppProvider } from "./src/hooks";

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  return (
    <ThemeProvider theme={theme}>
      <AppProvider>{fontsLoaded ? <Routes /> : <Loading />}</AppProvider>
      <FlashMessage position="top" />
    </ThemeProvider>
  );
}
