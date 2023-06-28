import { Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";

export const Container = styled.View`
  width: 100%;
  border-bottom-right-radius: 8px;
  border-bottom-left-radius: 8px;
  align-items: center;
  background-color: ${({ theme }) => theme.COLORS.SECONDARY};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: ${Platform.OS === "ios" ? 0 : 20}px;
  padding-top: 10px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  font-size: 18px;
  color: ${({ theme }) => theme.COLORS.WHITE};
`;

export const ButtonExit = styled.TouchableOpacity``;

export const SafeArea = styled(SafeAreaView)`
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`

export const ContainerDisconnectionAlert = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 15px;
  background-color: #FF0000;
`

export const TextDisconnectionAlert = styled.Text`
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
  color: ${({ theme }) => theme.COLORS.WHITE};
  margin-left: 10px;
`