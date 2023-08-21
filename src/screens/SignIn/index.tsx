import React, { useState } from "react";

import * as Yup from "yup";

import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableWithoutFeedback,
} from "react-native";

import { useTheme } from "styled-components";
import { BorderlessButton } from "react-native-gesture-handler";
import { showMessage } from "react-native-flash-message";
import { useNavigation } from "@react-navigation/native";

import { PasswordInput } from "../../components/PasswordInput";
import { InputEmail } from "../../components/InputEmail";
import { useAuth } from "../../hooks/auth";

import * as S from "./styles";

export default function SignIn() {
  const theme = useTheme();
  const { signIn } = useAuth();
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignIn() {
    setLoading(true);
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .required("E-mail obrigatório")
          .email("Digite um e-mail válido"),
        password: Yup.string().required("A senha é obrigatório"),
      });
      await schema.validate({ email, password });
      const teste = await signIn({ email, password });
      showMessage({
        message: "Sucesso!",
        description: "Login realizado com sucesso!",
        type: "success",
      });
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
          message: "Error na autenticação",
          description:
            "Ocorreu um erro ao fazer login, verifique as credenciais",
          type: "danger",
        });
        setLoading(false);
      }
    }
    setLoading(false);
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.COLORS.GRAY_50 }}>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : undefined}
        enabled
        style={{
          flex: 1,
          backgroundColor: theme.COLORS.GRAY_50,
        }}
      >
        <StatusBar
          backgroundColor={theme.COLORS.GRAY_50}
          barStyle="dark-content"
        />
        <S.Container>
          <S.Header>
            <S.Title>Estamos{"\n"}quase lá.</S.Title>
            <S.SubTitle>
              Sua ferramenta inteligente para tomada de decisões na compra de
              gado.
            </S.SubTitle>
          </S.Header>
          <InputEmail
            placeholder="E-mail"
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={setEmail}
            value={email}
          />
          <PasswordInput
            placeholder="Senha"
            onChangeText={setPassword}
            value={password}
          />

          <BorderlessButton onPress={() => navigation.navigate("tokenSending")}>
            <S.ButtonForgotPassword>Esqueci minha senha</S.ButtonForgotPassword>
          </BorderlessButton>

          <S.ButtonLogin
            title="Entrar"
            onPress={handleSignIn}
            enabled={!loading}
            loading={loading}
          />

          <S.Footer>
            <BorderlessButton onPress={() => navigation.navigate("signUp")}>
              <S.ButtonCreateAccount>
                Não tem uma conta? Faça seu cadastro
              </S.ButtonCreateAccount>
            </BorderlessButton>
          </S.Footer>
        </S.Container>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  </SafeAreaView>
  );
}
