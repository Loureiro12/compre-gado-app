import React, { useState } from "react";
import * as Yup from "yup";

import { ScrollView, StatusBar } from "react-native";
import { showMessage } from "react-native-flash-message";
import { useNavigation } from "@react-navigation/native";
import { User, MapPin } from "phosphor-react-native";

import { Header } from "../../components/Header";
import { api } from "../../services/api";
import { useAuth } from "../../hooks/auth";
import { InputEmail } from "../../components/InputEmail";
import { PasswordInput } from "../../components/PasswordInput";

import {
  ButtonHandleSubmit,
  Container,
  ContainerConfirmPassword,
  ContainerInput,
  DeleteAccountButton,
  DeleteAccountButtonText,
  ModalDeleteAccount,
  Separator,
  Title,
  TitleConfirmPassword,
} from "./styles";

export function Profile() {
  const navigation = useNavigation();
  const { user, signOut } = useAuth();

  const [name, setName] = useState(user.name);
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState(user.location || "");

  const [loading, setLoading] = useState(false);
  const [modalAboutLocation, setModalAboutLocation] = useState(false);
  const [loadingDeleteAccount, setLoadingDeleteAccount] = useState(false);

  async function handleSubmit() {
    setLoading(true);
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required("Campo nome obrigatório"),
        location: Yup.string(),
        password: Yup.string().required("Informe sua senha para avançar"),
      });

      await schema.validate({ email: "", name, location, password });
      showMessage({
        message: "Alteração realizada com sucesso!",
        description: "As informações de cadastro foram atualizadas",
        type: "success",
        icon: "success",
      });
      navigation.navigate("Dashboard");
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
          message: "Erro na atualização de cadastro",
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

  const deleteDeleteAccount = async () => {
    setLoadingDeleteAccount(true);
    if (user.id) {
      api
        .delete(`/users/${user.id}`)
        .then(async (response) => {
          if (response.status) {
            showMessage({
              message: "Conta excluída com sucesso!",
              type: "success",
              icon: "success",
            });
            setLoadingDeleteAccount(false);
          }
          await signOut();
        })
        .catch((err) => {
          showMessage({
            message: "Error!",
            description:
              "Ocorreu para excluir a conta, tente novamente mais tarde!",
            type: "danger",
            icon: "danger",
          });
          setLoadingDeleteAccount(false);
        });
    } else {
      showMessage({
        message: "Error!",
        description:
          "Ocorreu para excluir a conta, tente novamente mais tarde!",
        type: "danger",
        icon: "danger",
      });
    }
  };

  return (
    <>
      <Header title="Perfil" />
      <StatusBar backgroundColor="#FF5531" />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        style={{ backgroundColor: "#FCF9F2" }}
      >
        <Container>
          <Title>Informação do Perfil</Title>
          <ContainerInput>
            <InputEmail
              placeholder={user.name}
              autoCorrect={false}
              onChangeText={setName}
              value={name}
              returnKeyType="next"
              icon={<User />}
            />
            <Separator />
            <InputEmail
              placeholder={user.location}
              autoCorrect={false}
              onChangeText={setLocation}
              value={location}
              returnKeyType="next"
              icon={<MapPin />}
            />
          </ContainerInput>

          <ContainerConfirmPassword>
            <TitleConfirmPassword>
              Informe sua senha para alterar as informações
            </TitleConfirmPassword>
            <PasswordInput
              placeholder="Informe sua senha"
              onChangeText={setPassword}
              returnKeyType="next"
              value={password}
            />
          </ContainerConfirmPassword>

          <ButtonHandleSubmit
            title="Salvar"
            onPress={handleSubmit}
            enabled={!loading}
            loading={loading}
          />
          <DeleteAccountButton onPress={() => setModalAboutLocation(true)}>
            <DeleteAccountButtonText>Deletar conta</DeleteAccountButtonText>
          </DeleteAccountButton>
        </Container>
      </ScrollView>
      <ModalDeleteAccount
        cancelButtonText="Cancelar"
        confirmButtonText="Excluir"
        message="Gostaríamos de lembrar que, caso você decida excluir sua conta, perderá permanentemente o acesso aos seus dados e ao nosso serviço. Portanto, certifique-se de que essa é realmente a ação que deseja tomar antes de prosseguir com a exclusão. Caso tenha alguma dúvida ou precise de ajuda, estamos à disposição para auxiliá-lo"
        show={modalAboutLocation}
        close={() => setModalAboutLocation(false)}
        onPressConfirmButton={deleteDeleteAccount}
        enabledConfirmButton={!loadingDeleteAccount}
        loadingConfirmButton={loadingDeleteAccount}
        enabledCancelButton={!loadingDeleteAccount}
      />
    </>
  );
}
