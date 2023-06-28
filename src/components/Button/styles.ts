import styled from "styled-components/native";

import { TouchableOpacityProps } from "react-native";
import { RectButton } from "react-native-gesture-handler";

interface ButtonProps extends TouchableOpacityProps {
  color: string;
}

interface ButtonTextProps {
  light: boolean;
}

export const Container = styled(RectButton)<ButtonProps>`
  width: 100%;
  padding: 19px;
  align-items: center;
  justify-content: center;
  background-color: ${({ color }) => color};
  border-radius: 8px;
  opacity: ${({ enabled }) => !enabled ? '0.3' : '1'};
  
`;

export const Title = styled.Text<ButtonTextProps>`
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  color: ${({ theme, light }) =>
    light ? theme.COLORS.GRAY_700 : theme.COLORS.WHITE};
`;
