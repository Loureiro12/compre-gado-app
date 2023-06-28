import { useState } from "react";

import { Envelope, IconContext } from "phosphor-react-native";
import { TextInputProps } from "react-native";
import { useTheme } from "styled-components";

import * as S from "./styles";

interface Props extends TextInputProps {
  value?: string;
  error?: string;
  icon?: React.ReactNode;
}

export function InputEmail({ value, error, icon, ...rest }: Props) {
  const theme = useTheme();

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  function handleInputFocus() {
    setIsFocused(true);
  }

  function handleInputBlur() {
    setIsFocused(false);
    setIsFilled(!!value);
  }
  return (
    <>
      <S.Container>
        <S.IconContainer>
          <IconContext.Provider
            value={{
              color:
                isFocused || isFilled
                  ? theme.COLORS.PRIMARY
                  : theme.COLORS.GRAY_200,
              size: 24,
            }}
          >
            {icon ? icon : <Envelope />}
          </IconContext.Provider>
        </S.IconContainer>
        <S.InputText
          {...rest}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
        />
      </S.Container>
      {error ? (
        <S.ContainerError>
          <S.TextError>{error}</S.TextError>
        </S.ContainerError>
      ) : null}
    </>
  );
}
