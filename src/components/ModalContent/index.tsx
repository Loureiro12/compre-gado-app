import React from "react";

import {
  Container,
  Title,
  Description,
  ButtonConfirm,
  ButtonConfirmText,
  ButtonCancel,
  ButtonCancelText,
  ContainerButton,
  Content,
} from "./styles";

interface headerProps {
  close: () => void;
  confirmButton: () => void
}

export function ModalContent({ close, confirmButton}: headerProps) {
  return (
    <Container>
      <Content>
        <Title>Atenção</Title>
        <Description>Deseja excluir permanentemente esse cálculo?</Description>

        <ContainerButton>
          <ButtonConfirm onPress={confirmButton}>
            <ButtonConfirmText>Confirmar</ButtonConfirmText>
          </ButtonConfirm>

          <ButtonCancel onPress={close}>
            <ButtonCancelText>Cancelar</ButtonCancelText>
          </ButtonCancel>
        </ContainerButton>
      </Content>
    </Container>
  );
}
