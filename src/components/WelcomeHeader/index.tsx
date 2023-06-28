import React, { useEffect, useState } from "react";

import { StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Warning } from "phosphor-react-native";
import { useNetInfo } from "@react-native-community/netinfo";

import {
  Container,
  ContainerName,
  Name,
  Welcome,
  ButtonExit,
  TitleExit,
  ButtonName,
  SafeArea,
  ContainerDisconnectionAlert,
  TextDisconnectionAlert,
} from "./styles";

interface WelcomeHeaderProps {
  name: string;
  signOut: () => void;
}

export function WelcomeHeader({ name, signOut }: WelcomeHeaderProps) {
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
      <StatusBar backgroundColor="#FF5531" barStyle="light-content" />
      <Container>
        <SafeArea>
          <ContainerName>
            <Welcome>Bem-vindo,</Welcome>
            <ButtonName
              activeOpacity={0.8}
              onPress={() => navigation.navigate("Profile")}
            >
              <Name>{name}</Name>
            </ButtonName>
          </ContainerName>

          <ButtonExit onPress={signOut}>
            <TitleExit>Sair</TitleExit>
          </ButtonExit>
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
