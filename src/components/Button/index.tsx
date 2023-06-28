import React from "react";
import { ActivityIndicator } from "react-native";
import { useTheme } from "styled-components/native";
import { RectButtonProps } from "react-native-gesture-handler";

import * as S from "./styles";

interface Props extends RectButtonProps {
  title: string;
  color?: string;
  loading?: boolean;
  light?: boolean;
  onPress: () => void;
}

export function Button({
  title,
  color,
  onPress,
  enabled = true,
  loading = false,
  light = false,
  ...rest
}: Props) {
  const theme = useTheme();

  return (
    <S.Container
      onPress={onPress}
      color={color ? color : theme.COLORS.PRIMARY}
      enabled={enabled}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator color={theme.COLORS.SECONDARY} />
      ) : (
        <S.Title light={light}>{title}</S.Title>
      )}
    </S.Container>
  );
}
