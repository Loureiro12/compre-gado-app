import styled from "styled-components/native";
import Modal from "../../components/Modal";

export const Container = styled.View`
  flex: 1;
  padding: 24px;
  background-color: ${({ theme }) => theme.COLORS.GRAY_50};
  padding-bottom: 100px;
`;

export const ButtonAddNewCalculation = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 30px;
`;

export const TitleButtonAddNewCalculation = styled.Text`
  font-size: 16px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  margin-left: 5px;
`;

export const ContainerCard = styled.View`
  padding-bottom: 100px;
`;

export const TitleContainerCard = styled.Text`
  color: ${({ theme }) => theme.COLORS.GRAY_700};
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  margin-bottom: 20px;
`;

export const NotCalculations = styled.Text`
  font-size: 12px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  color: ${({ theme }) => theme.COLORS.GRAY_700};
  text-align: center;
  margin-top: 40%;
  opacity: 0.5;
`;

export const ModalExit = styled(Modal)``;

export const ModalDeleteCalculation = styled(Modal)``;

export const ModalAboutLocation = styled(Modal)``;
