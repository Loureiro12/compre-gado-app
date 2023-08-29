import React from "react";
import Slider from "@react-native-community/slider";

import { TextInputProps } from "react-native";

import {
  Container,
  ContainerInput,
  TitleInput,
  InputField,
  ContainerTitle,
  ContainerError,
  TextError,
} from "./styles";

interface InputSliderDecimalNumberProps extends TextInputProps {
  title: string;
  tooltip?: string;
  error?: React.ReactNode;
  sliderValue: ((value: number) => void) | undefined;
  inputValue: number;
  maximumValue: number
}

export function InputSliderDecimalNumber({
  title,
  tooltip,
  sliderValue,
  error,
  inputValue,
  maximumValue,
  ...rest
}: InputSliderDecimalNumberProps) {

  return (
    <>
      <Container>
      <ContainerTitle>
          <TitleInput>{title}</TitleInput>
        </ContainerTitle>
        <ContainerInput>
          <InputField
            {...rest}
          />
        </ContainerInput>
        {error ? (
          <ContainerError>
            <TextError>{error}</TextError>
          </ContainerError>
        ) : null}
        <Slider
            {...rest}
            step={0.1}
            value={inputValue}
            onValueChange={sliderValue}
            style={{ width: "100%", height: 10, marginTop: 10 }}
            minimumTrackTintColor="#FF5531"
            maximumTrackTintColor="#C8C8C8"
            thumbTintColor="#FF5531"
            maximumValue={maximumValue}
            minimumValue={1}
          />
      </Container>
    </>
  );
}
