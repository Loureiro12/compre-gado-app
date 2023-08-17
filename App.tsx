import "react-native-gesture-handler";
import { ThemeProvider } from "styled-components/native";
import FlashMessage from "react-native-flash-message";

import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";

import theme from "./src/theme";

import { Loading } from "./src/components/Loading";
import { Routes } from "./src/routes/index";
import { AppProvider } from "./src/hooks";
import { useEffect } from "react";
import Purchases from "react-native-purchases";
import { API_KEY } from "./src/constants";

const App = () => {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  useEffect(() => {
    Purchases.configure({ apiKey: API_KEY });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      {/* <GlassfyProvider> */}
      <AppProvider>{fontsLoaded ? <Routes /> : <Loading />}</AppProvider>
      <FlashMessage position="top" />
      {/* </GlassfyProvider> */}
    </ThemeProvider>
  );
};

export default App;
