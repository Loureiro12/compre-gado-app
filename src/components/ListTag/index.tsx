import React from "react";
import { CaretRight } from "phosphor-react-native";
import { BaseButtonProps } from "react-native-gesture-handler";

import { Color, Container, ContainerInfo, Title } from "./styles";

interface ListTagProps extends BaseButtonProps {
  title: string;
  color: string;
}

export function ListTag({ title, color, ...rest }: ListTagProps) {
  return (
    <Container {...rest}>
      <ContainerInfo>
        <Color style={{ backgroundColor: color }} />
        <Title>{title}</Title>
      </ContainerInfo>
      <CaretRight size={18} weight="bold" />
    </Container>
  );
}
