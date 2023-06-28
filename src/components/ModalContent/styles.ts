
import styled from "styled-components/native";

export const Container = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
`;

export const Content = styled.View`
  background-color: ${({ theme }) => theme.COLORS.SECONDARY};
  padding: 10px;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  font-size: 18px;
  color: ${({ theme }) => theme.COLORS.WHITE};
`;

export const Description = styled.Text`
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  font-size: 14px;
  text-align: center;
  color: ${({ theme }) => theme.COLORS.WHITE};
  margin-top: 14px;
`;

export const ContainerButton = styled.View`
  flex-direction: row;
  margin-top: 20px;
`;

export const ButtonConfirm = styled.TouchableOpacity`
  background-color: white;
  padding: 8px;
  border-radius: 8px;
`;

export const ButtonConfirmText = styled.Text`
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  font-size: 14px;
  color: ${({ theme }) => theme.COLORS.GRAY_700};
`;

export const ButtonCancel = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.COLORS.SECONDARY};
  padding: 8px;
  border-radius: 8px;
  margin-left: 15px;
  border: 1px #fff solid;
`;

export const ButtonCancelText = styled.Text`
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  font-size: 14px;
  color: ${({ theme }) => theme.COLORS.WHITE};
`;
