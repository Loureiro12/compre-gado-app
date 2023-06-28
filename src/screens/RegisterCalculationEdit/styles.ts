import styled from "styled-components/native";
import { Button } from "../../components/Button";

export const Container = styled.View`
  flex: 1;
  padding: 0 24px;
  margin-top: 30px;
  background-color: ${({ theme }) => theme.COLORS.GRAY_50};
  margin-bottom:60px;
`;

export const TitleTag = styled.Text`
  font-size: 18px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  margin-bottom: 10px;
`;

export const ContainerTag = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
})`
  width: 100%;
  flex-direction: row;
  margin-bottom: 10px;
`;

export const ButtonHandleSubmit = styled(Button)`
  margin-top: 30px;
  margin-bottom: 30px;
`;
