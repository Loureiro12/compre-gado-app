// import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

import { ButtonProps } from "./index";

export const Container = styled.View`
  flex-direction: row;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  margin-bottom: 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  justify-content: space-between;
  background-color: white;
  border-radius: 8px;
`;

export const ContainerDescription = styled.TouchableOpacity`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  padding: 15px;
  border-bottom-left-radius: 8px;
  border-top-left-radius: 8px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.COLORS.GRAY_700};
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  font-size: ${({ theme }) => theme.FONT_SIZE.LG}px;
  margin-top: 1px;
`;

export const Description = styled.Text`
  color: ${({ theme }) => theme.COLORS.GRAY_700};
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  margin-top: 10px;
`;

export const ButtonDelete = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  padding: 3px 20px;
  margin-left: 3px;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
`;

export const Tag = styled.TouchableOpacity`
  border-radius: 8px;
  padding: 5px;
  align-items: center;
  flex: 1;
`;

export const TitleTag = styled.Text`
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  font-size: 12px;
  color: ${({ theme }) => theme.COLORS.WHITE};
  text-transform: capitalize;
`;

export const CreationData = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
`;

export const CreationDataText = styled.Text`
  margin-left: 5px;
  color: ${({ theme }) => theme.COLORS.GRAY_700};
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
`;

export const TextBold = styled.Text`
  color: ${({ theme }) => theme.COLORS.GRAY_700};
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
`;

export const ContainerTag = styled.View`
  flex-direction: row;
  flex: 1;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 10px;
`;
