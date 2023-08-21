import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  padding: 0 24px;
  background-color: ${({ theme }) => theme.COLORS.GRAY_50};
  margin-top: 30px;
`;

export const ContainerRestoringPurchases = styled.View`
  margin-top: 40px;
  display: flex;
  align-items: center;
`;

export const ButtonRestoringPurchases = styled.TouchableOpacity`
  padding: 20px;
`;

export const TextRestoringPurchases = styled.Text``;

export const IsActiveSubscriptions = styled.Text``

export const Term = styled.TouchableOpacity`
  margin-bottom: 20px;
`;

export const TextTerm = styled.Text`
  font-size: ${({ theme }) => theme.FONT_SIZE.LG}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  color: ${({ theme }) => theme.COLORS.PRIMARY};
`;