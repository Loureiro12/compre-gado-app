import { BorderlessButton } from "react-native-gesture-handler";
import styled from "styled-components/native";

import { Button } from "../../components/Button";

export const Container = styled.View`
  padding: 0 24px;
  background-color: ${({ theme }) => theme.COLORS.GRAY_50};
`;

export const ContainerInput = styled.View``;

export const Separator = styled.View`
  margin-bottom: 20px;
`;

export const Title = styled.Text`
  font-size: ${({ theme }) => theme.FONT_SIZE.XXL}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  color: ${({ theme }) => theme.COLORS.GRAY_600};
  margin-bottom: 16px;
`;

export const Caption = styled.Text`
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  color: ${({ theme }) => theme.COLORS.GRAY_500};
  line-height: 25px;
  margin-bottom: 32px;
  margin-bottom: 16px;
`

export const BackButton = styled(BorderlessButton)`
  height: 41px;
  margin-bottom: 40px;
  flex-direction: row;
  align-items: center;
`;

export const BackButtonText = styled.Text`
  margin-left: 10px;
  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  color: ${({ theme }) => theme.COLORS.GRAY_600};
`

export const ConfirmButton = styled(Button)`
  margin-top: 20px;
  margin-bottom: 40px;
`