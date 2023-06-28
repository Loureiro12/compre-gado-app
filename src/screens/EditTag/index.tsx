import React, { useEffect, useState } from "react";
import * as Yup from "yup";

import { Alert, ScrollView, StatusBar } from "react-native";
import { showMessage } from "react-native-flash-message";

import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { api } from "../../services/api";

import {
  Container,
  ContainerTag,
  Title,
  CardTag,
  TagSelect,
  ButtonSave,
  ButtonDeleteTag,
  TextButtonDeleteTag,
} from "./styles";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../routes/app.routes";
import { LoadingScreen } from "../../components/LoadingScreen";

export interface EditTagProps
  extends StackScreenProps<RootStackParamList, "EditTag"> {}

export interface EditTagPropsRoute {
  id: string;
}

export function EditTag({ route, navigation }: EditTagProps) {
  const [tagSelect, setTagSelect] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingTag, setLoadingTag] = useState(false);

  const handleTag = (color: string) => {
    setTagSelect(color);
  };

  const tagSearch = async () => {
    setLoadingTag(true);
    api
      .get(`/tag-calculations/${route.params.id}`)
      .then((response) => {
        setTagSelect(response.data.color);
        setTitle(response.data.title);
        setLoadingTag(false);
      })
      .catch((err) => {
        showMessage({
          message: "Error!",
          description: "Ocorreu para carregar as tag personalizadas",
          type: "danger",
          icon: "danger",
        });
        setLoadingTag(false);
      });
  };

  async function handleSubmit() {
    setLoading(true);
    if (tagSelect.length === 0) {
      showMessage({
        message: "Erro ao criar tag",
        description: "É obrigatorio selecionar uma cor",
        type: "danger",
        icon: "danger",
      });
      setLoading(false);
      return;
    }
    try {
      const schema = Yup.object().shape({
        title: Yup.string().required("Campo titulo é obrigatório"),
      });

      await schema.validate({
        title,
      });
      await api.patch(`/tag-calculations/${route.params.id}`, {
        title: title,
        color: tagSelect,
      });
      showMessage({
        message: "Sucesso!",
        description: "Tag criada com sucesso!",
        type: "success",
        icon: "success",
      });
      navigation.navigate("ManageTag", { refreshing: true });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        showMessage({
          message: "Ops!",
          description: error.message,
          type: "danger",
        });
        setLoading(false);
      } else {
        showMessage({
          message: "Erro ao criar tag",
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
  function handleDeleteTag() {
    Alert.alert(
      "Deseja apagar esta etiqueta?",
      "A etiqueta será removida de todas as mensagens. Tem certeza de que deseja apagar esta etiqueta",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Apagar", onPress: () => handleConfirmeDeleteTag() },
      ]
    );
  }

  async function handleConfirmeDeleteTag() {
    try {
      await api.delete(`/tag-calculations/${route.params.id}`);
      showMessage({
        message: "Sucesso!",
        description: "Tag deletada com sucesso!",
        type: "success",
        icon: "success",
      });
      navigation.navigate("ManageTag", { refreshing: true });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        showMessage({
          message: "Ops!",
          description: error.message,
          type: "danger",
        });
        setLoading(false);
      } else {
        showMessage({
          message: "Erro ao deletar tag",
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

  useEffect(() => {
    tagSearch();
  }, []);

  if (loadingTag) return <LoadingScreen />;

  return (
    <>
      <Header title="Criar etiqueta personalizada" />
      <StatusBar backgroundColor="#FF5531" />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        style={{ backgroundColor: "#FCF9F2" }}
      >
        <Container>
          <Input
            title="Título etiqueta"
            placeholder="Título da etiqueta"
            autoCorrect={false}
            autoCapitalize="none"
            keyboardAppearance="dark"
            onChangeText={setTitle}
            value={title}
          />

          <ContainerTag>
            <Title>Selecionar uma cor</Title>
            <TagSelect>
              <CardTag
                color="#F14C4C"
                select={tagSelect === "#F14C4C" && true}
                onPress={() => handleTag("#F14C4C")}
              />
              <CardTag
                color="#46A619"
                select={tagSelect === "#46A619" && true}
                onPress={() => handleTag("#46A619")}
              />
              <CardTag
                color="#219EC6"
                select={tagSelect === "#219EC6" && true}
                onPress={() => handleTag("#219EC6")}
              />
              <CardTag
                color="#D81371"
                select={tagSelect === "#D81371" && true}
                onPress={() => handleTag("#D81371")}
              />
              <CardTag
                color="#A608CE"
                select={tagSelect === "#A608CE" && true}
                onPress={() => handleTag("#A608CE")}
              />
            </TagSelect>

            <TagSelect>
              <CardTag
                color="#F5AB3A"
                select={tagSelect === "#F5AB3A" && true}
                onPress={() => handleTag("#F5AB3A")}
              />
              <CardTag
                color="#C5A1A1"
                select={tagSelect === "#C5A1A1" && true}
                onPress={() => handleTag("#C5A1A1")}
              />
              <CardTag
                color="#16D84C"
                select={tagSelect === "#16D84C" && true}
                onPress={() => handleTag("#16D84C")}
              />
              <CardTag
                color="#ffd5a1"
                select={tagSelect === "#ffd5a1" && true}
                onPress={() => handleTag("#ffd5a1")}
              />
              <CardTag
                color="#48093E"
                select={tagSelect === "#48093E" && true}
                onPress={() => handleTag("#48093E")}
              />
            </TagSelect>
          </ContainerTag>

          <ButtonSave>
            <Button
              title="Salvar"
              onPress={handleSubmit}
              enabled={!loading}
              loading={loading}
            />
          </ButtonSave>

          <ButtonDeleteTag onPress={handleDeleteTag}>
            <TextButtonDeleteTag>Apagar etiqueta</TextButtonDeleteTag>
          </ButtonDeleteTag>
        </Container>
      </ScrollView>
    </>
  );
}
