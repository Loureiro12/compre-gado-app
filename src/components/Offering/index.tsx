import { Text } from "react-native";
import React, { useState } from "react";
import {
  GlassfyProduct,
  GlassfySku,
  GlassfyOffering,
} from "react-native-glassfy-module";
import { useGlassfy } from "../../providers/GlassfyProvider";
import {
  Offering,
  OfferingContainer,
  SkuButton,
  SkuContainer,
  SkuText,
} from "./styles";
import { Button } from "../Button";

interface OfferingGroupProps {
  group: GlassfyOffering;
}

// Represents one offering group with n SKU items to purchase
const OfferingGroup = ({ group }: OfferingGroupProps) => {
  const { purchase, loadingPurchase, user } = useGlassfy();

  const shouldPurchase = (sku: GlassfySku) => {
    purchase!(sku);
  };

  // FOrmat the price of a product
  const numberFormat = (product: GlassfyProduct) =>
    new Intl.NumberFormat("en-EN", {
      style: "currency",
      currency: product.currencyCode,
    }).format(product.price);

  return (
    <OfferingContainer>
      <Offering>{group.offeringId}</Offering>

      <SkuContainer>
        {group.skus.map((sku) => (
          <>
            <SkuButton key={sku.skuId}>
              <SkuText>
                <Text>
                  Tenha acesso a melhor calculadora para tomar as melhores
                  decisões na hora de comprar bovinos.
                </Text>
              </SkuText>
            </SkuButton>
            <Button
              title={
                user.pro
                  ? "Você já possui uma assinatura!"
                  : numberFormat(sku.product)
              }
              onPress={user.pro ? () => {} : () => shouldPurchase(sku)}
              enabled={!loadingPurchase}
              loading={loadingPurchase}
            />
          </>
        ))}
      </SkuContainer>
    </OfferingContainer>
  );
};

export default OfferingGroup;
