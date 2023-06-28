import styled from "styled-components/native";

import { Button } from "../../components/Button";

export const Container = styled.View`
  padding: 0 24px;
  background-color: ${({ theme }) => theme.COLORS.GRAY_50};
  flex: 1;
  justify-content: center;
`;

export const Header = styled.View`
  width: 100%;
`

export const Title = styled.Text`
  font-size: ${({ theme }) => theme.FONT_SIZE.XXL}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  color: ${({ theme }) => theme.COLORS.GRAY_600};
`

export const SubTitle = styled.Text`
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  color: ${({ theme }) => theme.COLORS.GRAY_500};
  line-height: 25px;
  margin-top: 16px;
  margin-bottom: 32px;
`

export const ButtonLogin = styled(Button)`
  margin-top: 20px;
`

export const ButtonForgotPassword = styled.Text`
  margin-top: 16px;
  text-align: right;
  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  color: ${({ theme }) => theme.COLORS.GRAY_600};
`

export const Footer = styled.View`
  align-items: center;
  margin-top: 20px;
`

export const ButtonCreateAccount = styled.Text` 
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  color: ${({ theme }) => theme.COLORS.GRAY_600};
`