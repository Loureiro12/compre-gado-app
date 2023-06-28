import React from "react";

import { Container, Content, Text, Title } from "./styles";

export interface PropsShowResult {
  title: string;
  label: number;
  isMoney?: boolean;
}

export function ShowResult({
  title,
  label,
  isMoney,
}: PropsShowResult) {
  return (
    <Container>
      <Title>{title}</Title>
      <Content> 
        {isMoney ? (
          <Text>
            {isNaN(label)
              ? 0
              : label.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
          </Text>
        ) : (
          <Text>{isNaN(label) ? 0 : label}</Text>
        )}
      </Content>
    </Container>
  );
}
