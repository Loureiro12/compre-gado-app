import styled from "styled-components/native";

export const Container = styled.View`
  justify-content: center;
  align-items: center;
  width: 60px;
  margin-right: 20px;
`;

export const DataText = styled.Text`
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  font-size: 14px;
  color: ${({ theme }) => theme.COLORS.GRAY_700};
  margin-bottom: 5px;
`;

export const CurrentTemperature = styled.Text`
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  font-size: 12px;
  color: ${({ theme }) => theme.COLORS.GRAY_700};
  margin-top: 5px;
`;
