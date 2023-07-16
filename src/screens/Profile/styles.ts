import styled from "styled-components/native";

import { Button } from "../../components/Button";
import { BorderlessButton } from "react-native-gesture-handler";
import Modal from "../../components/Modal";

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 0 24px;
  margin-top: 30px;
  background-color: ${({ theme }) => theme.COLORS.GRAY_50};
`;

export const ContainerInput = styled.View``;

export const Separator = styled.View`
  margin-bottom: 20px;
`;

export const Title = styled.Text`
  font-size: 16px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  margin-bottom: 16px;
`;

export const ButtonHandleSubmit = styled(Button)`
  margin-top: 30px;
  margin-bottom: 30px;
`;

export const ContainerConfirmPassword = styled.View`
  margin-top: 20px;
`;

export const TitleConfirmPassword = styled.Text`
  font-size: 16px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  margin-bottom: 16px;
`;

export const DeleteAccountButton = styled(BorderlessButton)`
  align-items: center;
`;

export const DeleteAccountButtonText = styled.Text`
  font-size: ${({ theme }) => theme.FONT_SIZE.LG}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  color: ${({ theme }) => theme.COLORS.RED};
`;

export const ModalDeleteAccount = styled(Modal)``;

export const Term = styled.TouchableOpacity`
  margin-bottom: 20px;
`;

export const TextTerm = styled.Text`
  font-size: ${({ theme }) => theme.FONT_SIZE.LG}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  color: ${({ theme }) => theme.COLORS.PRIMARY};
`;
