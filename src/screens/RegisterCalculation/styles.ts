import styled from "styled-components/native";
import { Button } from "../../components/Button";
import {RectButton} from 'react-native-gesture-handler'

export const Container = styled.View`
  flex: 1;
  padding: 0 24px;
  background-color: ${({ theme }) => theme.COLORS.GRAY_50};
`;

export const TitleTag = styled.Text`
  font-size: 18px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
`;

export const ContainerTag = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
})`
  width: 100%;
  flex-direction: row;
  margin-bottom: 10px;
`;

export const ButtonAddTag = styled.TouchableOpacity`
  margin-bottom: 30px;
`;

export const TitleButtonTag = styled.Text`
  font-size: 14px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  color: ${({ theme }) => theme.COLORS.PRIMARY};
  text-decoration: underline ${({ theme }) => theme.COLORS.PRIMARY};
`;

export const ButtonHandleSubmit = styled(Button)`
  margin-top: 30px;
  margin-bottom: 30px;
`;

export const ContainerTitleTag = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
  margin-bottom: 10px;
`

export const ButtonManageTag = styled(RectButton)``

export const TextManageTag = styled.Text`
  font-size: 16px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  color: ${({ theme }) => theme.COLORS.PRIMARY};
`