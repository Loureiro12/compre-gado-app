import "react-native-gesture-handler";
import codePush from "react-native-code-push";
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
import { Platform } from "react-native";
import { GlassfyProvider } from "./src/providers/GlassfyProvider";

const CODEPUSH_KEY =
  Platform.OS === "android"
    ? "Qy8Jsz6tup7an_r99n0PS_2vJQ4465SCOkqu3"
    : "ax4dfxDLfU_2vWCW-6ZTc2ZZy4ixvtSvbzBX-";

const codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_START,
  mandatoryInstallMode: codePush.InstallMode.IMMEDIATE,
  deploymentKey: CODEPUSH_KEY,
  updateDialog: {
    appendReleaseDescription: false,
    title: "Atualização disponível",
    mandatoryUpdateMessage:
      "Uma nova atualização está disponível para ser instalada.",
    mandatoryContinueButtonLabel: "Instalar",
    optionalUpdateMessage:
      "Uma nova atualização está disponível para ser instalada.",
    optionalInstallButtonLabel: "Instalar",
    optionalIgnoreButtonLabel: "Ignorar",
  },
  // installMode: codePush.InstallMode.IMMEDIATE,
};

const App = () => {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  return (
    <ThemeProvider theme={theme}>
      <GlassfyProvider>
        <AppProvider>{fontsLoaded ? <Routes /> : <Loading />}</AppProvider>
        <FlashMessage position="top" />
      </GlassfyProvider>
    </ThemeProvider>
  );
};

export default codePush(codePushOptions)(App);
