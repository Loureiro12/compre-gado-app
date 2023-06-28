import { TextInput } from "react-native";
// import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  width: 100%;
`;

export const ContainerInput = styled.View`
  width: 100%;
  height: 51px;
  background: ${({ theme }) => theme.COLORS.WHITE};
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  border: 1px;
  border-color: #ebebec;
  flex-direction: row;
  align-items: center;
`;

export const TitleInput = styled.Text`
  font-size: 16px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  margin-right: 5px;
`;

export const InputField = styled(TextInput)`
  width: 100%;
  height: 100%;
  font-size: 16px;
  padding-left: 16px;
`;

export const TextError = styled.Text`
  color: red;
  font-size: 14px;
`;

export const ContainerError = styled.View`
  margin-bottom: 10px;
`;

export const ContainerTitle = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 2px;
  width: 100%;
  min-height: 37px;
`;
