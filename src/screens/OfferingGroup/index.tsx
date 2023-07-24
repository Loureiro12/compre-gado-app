import React from "react";

import { ScrollView, StatusBar } from "react-native";

import { Header } from "../../components/Header";

import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../routes/app.routes";

import { Container } from "./styles";
import { useGlassfy } from "../../providers/GlassfyProvider";
import Offering from "../../components/Offering";

export interface OfferingGroupProps
  extends StackScreenProps<RootStackParamList, "OfferingGroup"> {}

export function OfferingGroup({ route, navigation }: OfferingGroupProps) {
  const { restorePermissions, user: userGlassfy, offerings } = useGlassfy();

  const restore = async () => {
    try {
      const permissions = await restorePermissions!();
      console.log(permissions);
      // Handle those permissions!
    } catch (e) {
      alert(e);
    }
  };

  console.log('######', offerings)

  return (
    <>
      <Header title="Selecione seu plano" />
      <StatusBar backgroundColor="#FF5531" />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        style={{ backgroundColor: "#FCF9F2" }}
      >
        <Container>
          {offerings.map((group) => (
            <Offering group={group} key={group.offeringId} />
          ))}
        </Container>
      </ScrollView>
    </>
  );
}
