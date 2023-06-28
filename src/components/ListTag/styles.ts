import styled from "styled-components/native";
import { BaseButton } from "react-native-gesture-handler";

export const Container = styled(BaseButton)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  background-color: white;
  border-radius: 8px;
  margin-bottom: 10px;
`;

export const ContainerInfo = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Color = styled.View`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  margin-right: 10px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.COLORS.GRAY_700};
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  font-size: 16px;
`;
