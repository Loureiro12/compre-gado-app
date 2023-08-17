import { Platform } from "react-native";

const selectApiKey = () => {
  if (Platform.OS === "ios") {
    return "appl_aJuDfFQQPmYVoVPmllMKEsVxKHP";
  } else if (Platform.OS === "android") {
    return "goog_RrFQbMTeExyLAKWmDVHuNZzRnaO";
  }
};

export const API_KEY = selectApiKey();

export const ENTITLEMENT_ID = "pro";
