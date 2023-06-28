import { useState } from "react";

import { Eye, EyeSlash, Lock } from "phosphor-react-native";
import { TextInputProps } from "react-native";
import { useTheme } from "styled-components";

import * as S from "./styles";
import { BorderlessButton } from "react-native-gesture-handler";

interface Props extends TextInputProps {
  value?: string;
}

export function PasswordInput({ value, ...rest }: Props) {
  const theme = useTheme();

  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  function handlePasswordVisibility() {
    setIsPasswordVisible((prevState) => !prevState);
  }

  function handleInputFocus() {
    setIsFocused(true);
  }

  function handleInputBlur() {
    setIsFocused(false);
    setIsFilled(!!value);
  }
  return (
    <S.Container>
      <S.IconContainer>
        <Lock
          size={24}
          color={
            isFocused || isFilled ? theme.COLORS.PRIMARY : theme.COLORS.GRAY_200
          }
        />
      </S.IconContainer>
      <S.InputText
        {...rest}
        secureTextEntry={isPasswordVisible}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}

      />
      <BorderlessButton onPress={handlePasswordVisibility}>
        <S.IconContainer>
          {isPasswordVisible ? (
            <Eye size={24} color={theme.COLORS.GRAY_200} />
          ) : (
            <EyeSlash size={24} color={theme.COLORS.GRAY_200} />
          )}
        </S.IconContainer>
      </BorderlessButton>
    </S.Container>
  );
}
