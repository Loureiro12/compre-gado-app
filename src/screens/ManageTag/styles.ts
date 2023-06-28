import { Button } from "../../components/Button";
import styled from "styled-components/native";

interface TagProps {
  color: string;
  select: boolean;
}

export const Container = styled.View`
  flex: 1;
  padding: 0 24px;
  background-color: ${({ theme }) => theme.COLORS.GRAY_50};
  margin-top: 30px;
`;

export const ButtonCreateTag = styled(Button)``

export const ContainerManageTag = styled.View`
  margin-top: 20px;
`

export const Title = styled.Text`
  color: ${({ theme }) => theme.COLORS.GRAY_700};
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  margin-bottom: 20px;
`

export const NotTag = styled.Text``