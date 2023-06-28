import React from "react";
import { TouchableOpacityProps } from "react-native";

import { Container, Title } from "./styles";

export interface ButtonProps extends TouchableOpacityProps {
  title?: string;
  color?: string;
  id?: string;
  selectId?: string;
}

export function Tag({ title, color, id, selectId, ...rest }: ButtonProps) {
  return (
    <Container
      activeOpacity={0.8}
      style={{ backgroundColor: color }}
      select={id === selectId && true}
      {...rest}
    >
      <Title>{title}</Title>
    </Container>
  );
}
