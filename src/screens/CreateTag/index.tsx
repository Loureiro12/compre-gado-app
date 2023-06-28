import React, { useState } from "react";
import * as Yup from "yup";

import { ScrollView, StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
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
} from "./styles";
import { RootStackParamList } from "@routes/app.routes";
import { StackScreenProps } from "@react-navigation/stack";

export interface CreateTagProps
  extends StackScreenProps<RootStackParamList, "CreateTag"> {}
export interface CreateTagPropsRoute {
  flow: "ManageTag" | "CreateCalculation";
}

export function CreateTag({ route }: CreateTagProps) {
  const navigation = useNavigation();

  const [tagSelect, setTagSelect] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTag = (color: string) => {
    setTagSelect(color);
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
      await api.post("/tag-calculations", { title: title, color: tagSelect });
      showMessage({
        message: "Sucesso!",
        description: "Tag criada com sucesso!",
        type: "success",
        icon: "success",
      });
      if (route.params.flow === "CreateCalculation") {
        navigation.navigate("RegisterCalculation");
      } else {
        navigation.navigate("ManageTag", { refreshing: true });
      }
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
              title="Criar"
              onPress={handleSubmit}
              enabled={!loading}
              loading={loading}
            />
          </ButtonSave>
        </Container>
      </ScrollView>
    </>
  );
}
