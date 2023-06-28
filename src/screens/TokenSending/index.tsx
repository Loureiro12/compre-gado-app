import React, { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  StatusBar,
  TouchableWithoutFeedback,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { showMessage } from "react-native-flash-message";
import { SafeAreaView } from "react-native-safe-area-context";
import { InputEmail } from "../../components/InputEmail";

import * as Yup from "yup";

import { api } from "../../services/api";
import theme from "../../theme/index";

import {
  Container,
  ContainerInput,
  Title,
  BackButton,
  ConfirmButton,
  BackButtonText,
  Caption,
} from "./styles";

export function TokenSending() {
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");

  async function handleRegister() {
    setLoading(true);
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .email("Email inválido")
          .required("Campo e-mail é obrigatório"),
      });

      await schema.validate({ email });
      await api.post("/forgot-password", { email });
      showMessage({
        message: "Token enviado com sucesso!",
        description: "Utilize o token para alterar sua senha",
        type: "success",
        icon: "success",
      });
      navigation.navigate("resetPassword");
      setLoading(false);
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        showMessage({
          message: "Opa",
          description: error.message,
          type: "danger",
        });
        setLoading(false);
      } else {
        showMessage({
          message: "Erro no envio do token",
          description:
            "Ocorreu um erro inesperado. Tente novamente mais tarde!",
          type: "danger",
          icon: "danger",
        });
        setLoading(false);
      }
    }
    setLoading(false);
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior="height"
        enabled
        style={{
          flex: 1,
          backgroundColor: theme.COLORS.GRAY_50,
          justifyContent: "center",
        }}
      >
        <StatusBar
          backgroundColor={theme.COLORS.GRAY_50}
          barStyle="dark-content"
        />
        <SafeAreaView style={{ backgroundColor: "#FCF9ED", flex: 1 }}>
          <Container>
            <BackButton onPress={() => navigation.goBack()}>
              <AntDesign name="left" size={24} color="black" />
              <BackButtonText>Voltar</BackButtonText>
            </BackButton>
            <Title>Problemas para fazer login?</Title>
            <Caption>
              Digite seu e-mail e enviaremos um token para você voltar com sua
              conta.
            </Caption>
            <ContainerInput>
              <InputEmail
                placeholder="E-mail"
                keyboardType="email-address"
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={setEmail}
                returnKeyType="next"
                value={email}
              />
            </ContainerInput>

            <ConfirmButton
              title="Enviar Token"
              onPress={handleRegister}
              enabled={!loading}
              loading={loading}
            />
          </Container>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
