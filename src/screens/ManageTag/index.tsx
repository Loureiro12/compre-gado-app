import React, { useEffect, useState } from "react";
import { FlatList, StatusBar, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { showMessage } from "react-native-flash-message";

import { api } from "../../services/api";
import { Header } from "../../components/Header";

import {
  ButtonCreateTag,
  Container,
  ContainerManageTag,
  NotTag,
  Title,
} from "./styles";
import { ListTag } from "../../components/ListTag";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../routes/app.routes";

export interface ManageTagProps
  extends StackScreenProps<RootStackParamList, "ManageTag"> {}

export interface ManageTagPropsRoute {
  refreshing?: boolean;
}

export function ManageTag({ route }: ManageTagProps) {
  const navigation = useNavigation();
  const [listTag, setListTag] = useState<any[]>([]);
  const [loadingTag, setLoadingTag] = useState(false);

  const tagSearch = async () => {
    setLoadingTag(true);
    api
      .get("/tag-calculations")
      .then((response) => {
        setListTag(response.data);
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

  const EmptyListComponent = () => {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <NotTag>Não existe Tag salvas</NotTag>
      </View>
    );
  };

  useEffect(() => {
    tagSearch();
  }, [route]);

  return (
    <>
      <Header title="Etiquetas" />
      <StatusBar backgroundColor="#FF5531" />
      <Container>
        <ButtonCreateTag
          title="Adicionar nova etiqueta"
          onPress={() => navigation.navigate("CreateTag", {flow: 'ManageTag'})}
        />

        <ContainerManageTag>
          <Title>Etiquetas Cadastradas</Title>

          <FlatList
            showsVerticalScrollIndicator={false}
            data={listTag}
            renderItem={({ item }) => (
              <ListTag
                onPress={() => navigation.navigate("EditTag", { id: item.id })}
                title={item.title}
                color={item.color}
                key={item.id}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
            initialNumToRender={10}
            ListEmptyComponent={EmptyListComponent}
            onRefresh={tagSearch}
            refreshing={loadingTag}
            extraData={loadingTag}
          />
        </ContainerManageTag>
      </Container>
    </>
  );
}
