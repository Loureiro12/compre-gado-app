import React, { useState, useEffect } from "react";
import { Animated, Dimensions } from "react-native";

const { height } = Dimensions.get("window");

interface ModalProps {
  close: () => void;
  show: boolean;
  cancelButtonText?: string;
  confirmButtonText?: string;
  onPressConfirmButton: () => void;
  message: string;
  loadingConfirmButton?: boolean;
  enabledConfirmButton?: boolean;
  enabledCancelButton?: boolean;
  alertModal?: boolean;
}

import * as S from "./styles";

const Modal = ({
  show,
  close,
  cancelButtonText,
  confirmButtonText,
  onPressConfirmButton,
  message,
  loadingConfirmButton,
  enabledConfirmButton,
  enabledCancelButton,
  alertModal,
}: ModalProps) => {
  const [state, setState] = useState({
    opacity: new Animated.Value(0),
    container: new Animated.Value(height),
    modal: new Animated.Value(height),
  });

  const openModal = () => {
    Animated.sequence([
      Animated.timing(state.container, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(state.opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.spring(state.modal, {
        toValue: 0,
        bounciness: 5,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closeModal = () => {
    Animated.sequence([
      Animated.timing(state.modal, {
        toValue: height,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(state.opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(state.container, {
        toValue: height,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  useEffect(() => {
    if (show) {
      openModal();
    } else {
      closeModal();
    }
  }, [show]);

  return (
    <S.Container
      style={[
        {
          opacity: state.opacity,
          transform: [{ translateY: state.container }],
        },
      ]}
    >
      <S.Modal
        style={[
          {
            transform: [{ translateY: state.modal }],
          },
        ]}
      >
        <S.Indicator />

        <S.Text>{message}</S.Text>

        {alertModal ? (
          <S.Btn title="Ok" onPress={onPressConfirmButton} />
        ) : (
          <>
            <S.Btn
              title={confirmButtonText || ""}
              onPress={onPressConfirmButton}
              loading={loadingConfirmButton}
              enabled={enabledConfirmButton}
            />
            <S.CancelBtnText
              onPress={close}
              enabled={enabledCancelButton}
              title={cancelButtonText || ""}
              light
            />
          </>
        )}
      </S.Modal>
    </S.Container>
  );
};

export default Modal;
