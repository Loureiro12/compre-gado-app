import React, { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  TouchableWithoutFeedback,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { showMessage } from "react-native-flash-message";
import { SafeAreaView } from "react-native-safe-area-context";
import { InputEmail } from "../../components/InputEmail";
import { User } from "phosphor-react-native";
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
import { ScrollView } from "react-native-gesture-handler";

export function SignUp() {
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
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
        name: Yup.string().required("Campo nome obrigatório"),
        email: Yup.string()
          .email("Email inválido")
          .required("Campo e-mail é obrigatório"),
        password: Yup.string().required("Campo senha é obrigatório"),
      });

      await schema.validate({ email, password, name });
      await api.post("/users", { name, email, password });
      showMessage({
        message: "Cadastro realizado com sucesso!",
        description: "Você já pode realizar o login no aplicativo",
        type: "success",
        icon: "success",
      });
      navigation.goBack();
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
          message: "Erro no cadastro",
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
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.COLORS.GRAY_50 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: "#FCF9ED" }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : undefined}
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
                <Title>Crie sua{"\n"}conta</Title>
                <Caption>
                  Faça seu cadastro de{"\n"}forma rápida e fácil.
                </Caption>
                <ContainerInput>
                  <InputEmail
                    placeholder="Informe seu nome"
                    autoCorrect={false}
                    onChangeText={setName}
                    value={name}
                    icon={<User />}
                    returnKeyType="next"
                  />
                  <Separator />
                  <InputEmail
                    placeholder="E-mail"
                    keyboardType="email-address"
                    autoCorrect={false}
                    autoCapitalize="none"
                    onChangeText={setEmail}
                    returnKeyType="next"
                    value={email}
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
                    placeholder="Confirme sua senha"
                    onChangeText={setConfirmPassword}
                    value={confirmPassword}
                    returnKeyType="done"
                    onSubmitEditing={handleRegister}
                  />
                </ContainerInput>

                <ConfirmButton
                  title="Criar conta"
                  onPress={handleRegister}
                  enabled={!loading}
                  loading={loading}
                />
              </Container>
            </SafeAreaView>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </ScrollView>
    </SafeAreaView>
  );
}
