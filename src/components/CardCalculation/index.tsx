import React, { useEffect, useState } from "react";
import moment from "moment";
import { TouchableOpacityProps, View } from "react-native";
import { Calendar } from "phosphor-react-native";

import { FontAwesome } from "@expo/vector-icons";
import { showMessage } from "react-native-flash-message";

import {
  Container,
  Title,
  ContainerDescription,
  Description,
  ButtonDelete,
  TitleTag,
  Tag,
  CreationData,
  CreationDataText,
  TextBold,
  ContainerTag,
} from "./styles";

export interface ButtonProps extends TouchableOpacityProps {
  tagId?: string;
  title: string;
  result: string;
  updatedAt: string;
  clickCalculationCard: () => void;
  deleteCalculation: () => void;
  tagColor: string;
  tagTitle: string;
}

export function CardCalculation({
  tagId,
  title,
  result,
  clickCalculationCard,
  deleteCalculation,
  updatedAt,
  tagColor,
  tagTitle,
}: ButtonProps) {
  return (
    <Container>
      <ContainerDescription activeOpacity={0.8} onPress={clickCalculationCard}>
        {tagColor && tagTitle && (
          <ContainerTag>
            <Tag activeOpacity={0.8} style={{ backgroundColor: tagColor }}>
              <TitleTag>{tagTitle}</TitleTag>
            </Tag>
          </ContainerTag>
        )}

        <Title>{title}</Title>

        <Description>
          <TextBold>Total: </TextBold>
          {isNaN(parseInt(result))
            ? 0
            : parseInt(result).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
        </Description>

        <CreationData>
          <Calendar size={20} />
          <CreationDataText>
            {moment(updatedAt).format("DD/MM/YYYY")}
          </CreationDataText>
        </CreationData>
      </ContainerDescription>

      <View style={{ backgroundColor: "#FCF9ED", width: 3 }} />
      <ButtonDelete activeOpacity={0.8} onPress={deleteCalculation}>
        <FontAwesome name="trash" size={24} color="#F91E1E" />
      </ButtonDelete>
    </Container>
  );
}
