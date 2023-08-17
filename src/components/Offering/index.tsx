import { Text, View } from "react-native";
import React, { useState } from "react";

import { OfferingContainer, SkuButton, SkuContainer, SkuText } from "./styles";
import { Button } from "../Button";
import Purchases from "react-native-purchases";
import { useNavigation } from "@react-navigation/native";
import { ENTITLEMENT_ID } from "../../constants";
import { showMessage } from "react-native-flash-message";

interface OfferingGroupProps {
  purchasePackage: {
    product: { title; description; priceString: string };
  };
  setIsPurchasing: React.Dispatch<React.SetStateAction<boolean>>;
}

const OfferingGroup = ({
  purchasePackage,
  setIsPurchasing,
}: OfferingGroupProps) => {
  const navigation = useNavigation();

  const [loadingPurchase, setLoadingPurchase] = useState(false);

  const onSelection = async () => {
    setIsPurchasing(true);
    setLoadingPurchase(true);

    try {
      const { customerInfo } = await Purchases.purchasePackage(purchasePackage);

      if (
        typeof customerInfo.entitlements.active[ENTITLEMENT_ID] !== "undefined"
      ) {
        navigation.goBack();
      }
    } catch (e) {
      if (!e.userCancelled) {
        showMessage({
          message: "Ops...",
          description: "Ocorreu um erro ao tentar realizar a compra!",
          type: "danger",
        });
      }
    } finally {
      setLoadingPurchase(false);
      setIsPurchasing(false);
    }
  };

  return (
    <OfferingContainer>
      <SkuContainer>
        <View>
          <SkuButton>
            <SkuText>
              <Text>
                Tenha acesso a melhor calculadora para tomar as melhores
                decisões na hora de comprar bovinos.
              </Text>
            </SkuText>
          </SkuButton>
          <Button
            title={purchasePackage.product.priceString}
            onPress={onSelection}
            enabled={!loadingPurchase}
            loading={loadingPurchase}
          />
        </View>
      </SkuContainer>
    </OfferingContainer>
  );
};

export default OfferingGroup;
