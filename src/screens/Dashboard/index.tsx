import React, { useEffect, useState } from "react";
import moment from "moment";
import { showMessage } from "react-native-flash-message";
import { FlatList, View, Text } from "react-native";

import { useNetInfo } from "@react-native-community/netinfo";
import { Ionicons } from "@expo/vector-icons";
import { StackScreenProps } from "@react-navigation/stack";

import { CardCalculation } from "../../components/CardCalculation";
import { WelcomeHeader } from "../../components/WelcomeHeader";
import { useAuth } from "../../hooks/auth";
import { api } from "../../services/api";
import { RootStackParamList } from "../../routes/app.routes";
import { WeatherForecast } from "../../components/WeatherForecast";

import {
  Container,
  ButtonAddNewCalculation,
  TitleButtonAddNewCalculation,
  ContainerCard,
  TitleContainerCard,
  NotCalculations,
  ModalExit,
  ModalDeleteCalculation,
  ModalAboutLocation,
  ModalNeedSignature,
} from "./styles";
import { useGlassfy } from "../../providers/GlassfyProvider";

interface DashboardProps
  extends StackScreenProps<RootStackParamList, "Dashboard"> {}

export interface RegisterCalculationEditProps {
  refreshing?: boolean;
}

export function Dashboard({ navigation, route }: DashboardProps) {
  const { user, signOut } = useAuth();
  const netInfo = useNetInfo();
  const { user: usePurchase } = useGlassfy();

  const [calculations, setCalculations] = useState<any[]>([]);
  const [currentCalculation, setCurrentCalculation] = useState("");
  const [loadingSignOut, setLoadingSignOut] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalDeleteCalculation, setModalDeleteCalculation] = useState(false);
  const [loadingDeleteCalculation, setLoadingDeleteCalculation] =
    useState(false);
  const [modalAboutLocation, setModalAboutLocation] = useState(false);
  const [modalNeedSignature, setModalNeedSignature] = useState(false);
  const [loadingCalculations, setLoadingCalculations] = useState(false);
  const [listTag, setListTag] = useState<any[]>([]);

  const selectCalculation = (id: string) => {
    setCurrentCalculation(id);
  };

  const tagSearch = async () => {
    api
      .get("/tag-calculations")
      .then((response) => {
        setListTag(response.data);
      })
      .catch((err) => {
        showMessage({
          message: "Error!",
          description: "Ocorreu para carregar as tag personalizadas",
          type: "danger",
          icon: "danger",
        });
      });
  };

  const deleteCalculation = async () => {
    setLoadingDeleteCalculation(true);
    const value = currentCalculation.valueOf();
    api
      .delete(`/calculations/${value}`)
      .then((response) => {
        if (response.status) {
          showMessage({
            message: "Cálculo excluído com sucesso!",
            type: "success",
            icon: "success",
          });
          setLoadingDeleteCalculation(false);
          setModalDeleteCalculation(false);
          lookingSavedCalculations();
        }
      })
      .catch((err) => {
        showMessage({
          message: "Error!",
          description:
            "Ocorreu para excluir o Cálculo. Tente novamente mais tarde!",
          type: "danger",
          icon: "danger",
        });
        setLoadingDeleteCalculation(false);
        setModalDeleteCalculation(false);
      });
  };

  const lookingSavedCalculations = async () => {
    setLoadingCalculations(true);
    api
      .get("/calculations")
      .then((response) => {
        setCalculations(response.data);
      })
      .catch((err) => {
        showMessage({
          message: "Error!",
          description: "Ocorreu para carregar cálculos",
          type: "danger",
          icon: "danger",
        });
      });
    setLoadingCalculations(false);
  };

  const EmptyListComponent = () => {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <NotCalculations>Não existe cálculos salvos</NotCalculations>
      </View>
    );
  };

  const handleSignOut = async () => {
    setLoadingSignOut(true);
    await signOut();
    setLoadingSignOut(false);
  };

  const handleCalculationCard = async (id: string) => {
    const data = calculations.filter((item) => item.id === id);
    navigation.navigate("RegisterCalculationEdit", {
      data,
    });
  };

  const checkIfSignatureIsRequired = () => {
    const dataInicial = moment(user?.created_at);
    const dataAtual = moment();

    const dataFinal = dataInicial.clone().add(7, "days");

    if (usePurchase.pro) {
      navigation.navigate("RegisterCalculation");
    } else {
      if (dataAtual.isAfter(dataFinal)) {
        setModalNeedSignature(true);
      } else {
        navigation.navigate("RegisterCalculation");
      }
    }
  };

  useEffect(() => {
    lookingSavedCalculations();
    tagSearch();
  }, [route]);

  return (
    <>
      <WelcomeHeader
        name={user?.name.replace(/^\w/, (c) => c.toUpperCase())}
        signOut={() => setModal(true)}
      />
      <Container>
        <View>
          <WeatherForecast
            onPressModalAboutLocation={() => setModalAboutLocation(true)}
            key=""
          />
        </View>
        <ButtonAddNewCalculation onPress={() => checkIfSignatureIsRequired()}>
          <Ionicons name="add-circle-sharp" size={24} color="black" />
          <TitleButtonAddNewCalculation>
            Realizar novo cálculo
          </TitleButtonAddNewCalculation>
        </ButtonAddNewCalculation>

        <ContainerCard>
          <TitleContainerCard>Cálculos salvos</TitleContainerCard>

          <FlatList
            showsVerticalScrollIndicator={false}
            data={calculations}
            renderItem={({ item }) => (
              <CardCalculation
                clickCalculationCard={() => handleCalculationCard(item.id)}
                deleteCalculation={() => {
                  selectCalculation(item.id), setModalDeleteCalculation(true);
                }}
                key={item.id}
                title={item.title}
                result={item.result}
                tagId={item.tag}
                updatedAt={item.updatedAt}
                tagColor={listTag.find((color) => color.id === item.tag)?.color}
                tagTitle={listTag.find((color) => color.id === item.tag)?.title}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
            initialNumToRender={10}
            ListEmptyComponent={EmptyListComponent}
            onRefresh={lookingSavedCalculations}
            refreshing={loadingCalculations}
            extraData={loadingCalculations}
          />
        </ContainerCard>
      </Container>

      <ModalExit
        show={modal}
        close={() => setModal(false)}
        cancelButtonText="Cancelar"
        confirmButtonText="Sair"
        onPressConfirmButton={handleSignOut}
        message={
          netInfo.isConnected
            ? "Tem certeza que deseja sair do aplicativo? Todos os dados não salvos serão perdidos."
            : "Desculpe, você parece estar sem conexão com a internet no momento. Se você sair do aplicativo agora, poderá perder quaisquer dados não salvos. Verifique sua conexão com a internet antes de continuar."
        }
        enabledConfirmButton={!loadingSignOut}
        loadingConfirmButton={loadingSignOut}
        enabledCancelButton={!loadingSignOut}
      />

      <ModalDeleteCalculation
        show={modalDeleteCalculation}
        close={() => setModalDeleteCalculation(false)}
        cancelButtonText="Cancelar"
        confirmButtonText="Excluir"
        onPressConfirmButton={deleteCalculation}
        message="Tem certeza que deseja excluir este cálculo? Esta ação não pode ser desfeita e todos os dados relacionados serão perdidos."
        enabledConfirmButton={!loadingDeleteCalculation}
        loadingConfirmButton={loadingDeleteCalculation}
        enabledCancelButton={!loadingDeleteCalculation}
      />

      <ModalAboutLocation
        show={modalAboutLocation}
        close={() => setModalAboutLocation(false)}
        message="Temos uma ótima previsão do tempo para você, mas para isso precisamos que você nos conceda acesso à sua localização. Por favor, permita o acesso à sua localização para que possamos exibir a previsão do tempo mais precisa para a sua região. Obrigado!"
        alertModal
        onPressConfirmButton={() => setModalAboutLocation(false)}
      />

      <ModalNeedSignature
        show={modalNeedSignature}
        close={() => setModalNeedSignature(false)}
        message="Você já experimentou o aplicativo gratuitamente por 7 dias. Para continuar utilizando, é necessário assinar."
        onPressConfirmButton={() => navigation.navigate("OfferingGroup")}
        cancelButtonText="Continuar sem Assinatura"
        confirmButtonText="Assinar Agora"
      />
    </>
  );
}
