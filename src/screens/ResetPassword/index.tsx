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
import { PasswordInput } from "../../components/PasswordInput";

import * as Yup from "yup";

import { api } from "../../services/api";
import theme from "../../theme/index";

import {
  Container,
  ContainerInput,
  Separator,
  Title,
  BackButton,
  ConfirmButton,
  BackButtonText,
  Caption,
} from "./styles";

export function ResetPassword() {
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);

  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function handleRegister() {
    if (password !== confirmPassword) {
      showMessage({
        message: "Erro!",
        description: "As senhas não são iguais. Tente novamente.",
        type: "danger",
        icon: "danger",
      });
      return;
    }
    setLoading(true);
    try {
      const schema = Yup.object().shape({
        token: Yup.string().required("Campo token é obrigatório"),
        password: Yup.string().required("Campo senha é obrigatório"),
      });

      await schema.validate({ token, password });
      await api.post(`reset-password?${token}`, { token, password });
      showMessage({
        message: "Token enviado com sucesso!",
        description: "Utilize o token para alterar sua senha",
        type: "success",
        icon: "success",
      });
      navigation.navigate("login");
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
            <Title>Recuperação de conta</Title>
            <Caption>
              Informe o código de seis dígitos que o acabou de chegar no seu
              e-mail
            </Caption>
            <ContainerInput>
              <InputEmail
                placeholder="Digite o Token"
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={setToken}
                returnKeyType="next"
                value={token}
              />
              <Separator />
              <PasswordInput
                placeholder="Informe sua senha"
                onChangeText={setPassword}
                returnKeyType="next"
                value={password}
              />
              <Separator />
              <PasswordInput
                placeholder="Alterar senha"
                onChangeText={setConfirmPassword}
                value={confirmPassword}
              />
            </ContainerInput>

            <ConfirmButton
              title="Confirmar Senha"
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
