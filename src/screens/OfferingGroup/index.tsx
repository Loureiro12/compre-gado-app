import React, { useEffect, useState } from "react";

import { ScrollView, StatusBar, ActivityIndicator } from "react-native";

import { Header } from "../../components/Header";

import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../routes/app.routes";

import {
  ButtonRestoringPurchases,
  Container,
  ContainerRestoringPurchases,
  IsActiveSubscriptions,
  TextRestoringPurchases,
} from "./styles";
import Offering from "../../components/Offering";
import Purchases from "react-native-purchases";
import { showMessage } from "react-native-flash-message";
import { ENTITLEMENT_ID } from "../../constants";

export interface OfferingGroupProps
  extends StackScreenProps<RootStackParamList, "OfferingGroup"> {}

export function OfferingGroup({ route, navigation }: OfferingGroupProps) {
  const [packages, setPackages] = useState([]);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [subscriptionActive, setSubscriptionActive] = useState(false);
  const [loadingRestore, setLoadingRestore] = useState(false);

  const getUserDetails = async () => {
    const customerInfo = await Purchases.getCustomerInfo();
    if (
      typeof customerInfo.entitlements.active[ENTITLEMENT_ID] !== "undefined"
    ) {
      setSubscriptionActive(true);
    }
  };

  useEffect(() => {
    const getPackages = async () => {
      try {
        const offerings = await Purchases.getOfferings();
        if (
          offerings.current !== null &&
          offerings.current.availablePackages.length !== 0
        ) {
          setPackages(offerings.current.availablePackages);
        }
      } catch (e) {
        showMessage({
          message: "Opa",
          description: e.message,
          type: "danger",
        });
        navigation.goBack();
      }
    };

    getUserDetails();
    getPackages();
  }, []);

  const restorePurchase = async () => {
    setLoadingRestore(true);
    try {
      const restore = await Purchases.restorePurchases();
      if (restore) {
        setLoadingRestore(false);
      }
    } catch (e) {
      showMessage({
        message: "Opa",
        description:
          "Ocorreu algum erro para restaurar sua compra, tente novamente mais tarde!",
        type: "danger",
      });
      setLoadingRestore(false);
    }
  };

  return (
    <>
      <Header title="Selecione seu plano" disabledGoBack={isPurchasing} />
      <StatusBar backgroundColor="#FF5531" />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        style={{ backgroundColor: "#FCF9F2" }}
      >
        <Container>
          {/* {!subscriptionActive ? (
            <IsActiveSubscriptions>
              Você já possui uma assinatura ativa! Se o erro continuar tente
              restaurar sua compra no botão abaixo.
            </IsActiveSubscriptions>
          ) : ( */}
          {packages.map((group) => (
            <Offering
              purchasePackage={group}
              setIsPurchasing={setIsPurchasing}
            />
          ))}
          {/* )} */}
          <ContainerRestoringPurchases>
            <ButtonRestoringPurchases
              activeOpacity={0.8}
              onPress={restorePurchase}
            >
              {loadingRestore ? (
                <ActivityIndicator />
              ) : (
                <TextRestoringPurchases disabled={loadingRestore}>
                  Restaurar compra
                </TextRestoringPurchases>
              )}
            </ButtonRestoringPurchases>
          </ContainerRestoringPurchases>
        </Container>
      </ScrollView>
    </>
  );
}
