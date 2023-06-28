import styled from "styled-components/native";

export const Container = styled.View`
  width: 100%;
  margin-top: 20px;
`;

export const Content = styled.View`
  width: 100%;
  height: 51px;
  background: ${({ theme }) => theme.COLORS.WHITE};
  border-radius: 10px;
  border: 1px;
  border-color: #ebebec;
  flex-direction: row;
  align-items: center;
`;

export const Text = styled.Text`
  padding-left: 16px;
  font-size: 16px;
`;

export const Title = styled.Text`
  font-size: 16px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  margin-bottom: 10px;
`;
