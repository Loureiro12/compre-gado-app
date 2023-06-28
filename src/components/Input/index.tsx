import React from "react";
import { TextInputProps } from "react-native";

import {
  Container,
  TitleInput,
  InputField,
  ContainerError,
  TextError,
} from "./styles";

export interface PropsInput extends TextInputProps {
  title: string;
  error?: string;
  touched?: boolean;
  marginTop?: number;
  marginBottom?: number;
}

export function Input({
  title,
  error,
  touched,
  marginTop,
  marginBottom,
  ...rest
}: PropsInput) {
  const validationColor = !touched ? "#FFFFFF" : error ? "#FF5A5F" : "#FFFFFF";

  return (
    <>
      <TitleInput marginTop={marginTop}>{title}</TitleInput>

      <Container
        style={{ borderColor: validationColor }}
        marginBottom={marginBottom}
      >
        <InputField {...rest} />
      </Container>
      {error ? (
        <ContainerError>
          <TextError>{error}</TextError>
        </ContainerError>
      ) : null}
    </>
  );
}
