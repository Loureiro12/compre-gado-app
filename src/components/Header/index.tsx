import React, { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Warning } from "phosphor-react-native";
import { useNetInfo } from "@react-native-community/netinfo";

import {
  Container,
  Title,
  ButtonExit,
  SafeArea,
  ContainerDisconnectionAlert,
  TextDisconnectionAlert,
} from "./styles";

interface headerProps {
  title: string;
  disabledGoBack?: boolean;
}

export function Header({ title, disabledGoBack }: headerProps) {
  const navigation = useNavigation();
  const netInfo = useNetInfo();

  const [disconnectionAlert, setDisconnectionAlert] = useState(false);

  useEffect(() => {
    if (netInfo.isConnected) {
      setDisconnectionAlert(true);
    } else {
      setDisconnectionAlert(false);
    }
  }, [netInfo.isConnected]);
  return (
    <>
      <Container>
        <SafeArea>
          <ButtonExit activeOpacity={0.8} onPress={() => navigation.goBack()} disabled={disabledGoBack}>
            <MaterialIcons name="arrow-back-ios" size={24} color="#FFFFFF" />
          </ButtonExit>
          <Title>{title}</Title>
          <View />
        </SafeArea>
      </Container>
      {!disconnectionAlert && (
        <ContainerDisconnectionAlert>
          <Warning size={20} color="#fff" />
          <TextDisconnectionAlert>
            Você está sem conexão com a internet.
          </TextDisconnectionAlert>
        </ContainerDisconnectionAlert>
      )}
    </>
  );
}
