import React, { useEffect, useMemo, useState } from "react";

import * as Yup from "yup";
import { ptForm } from "yup-locale-pt";
Yup.setLocale(ptForm);

import { useNavigation } from "@react-navigation/native";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { showMessage } from "react-native-flash-message";

import { Header } from "../../components/Header";
import { InputSlider } from "../../components/InputSlider";
import { Input } from "../../components/Input";
import { Tag } from "../../components/Tag";
import { ShowResult } from "../../components/ShowResult";
import { InputSliderDecimalNumber } from "../../components/InputSliderDecimalNumber";

import { api } from "../../services/api";
import theme from "../../theme/index";

import {
  Container,
  ContainerTag,
  TitleTag,
  ButtonAddTag,
  TitleButtonTag,
  ButtonHandleSubmit,
  ContainerTitleTag,
  ButtonManageTag,
  TextManageTag,
} from "./styles";

export function RegisterCalculation() {
  const navigation = useNavigation();

  const [listTag, setListTag] = useState<any[]>([]);
  const [selectTag, setSelectTag] = useState("");
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [entryWeight, setEntryWeight] = useState(0);
  const [dailyCost, setDailyCost] = useState("0.00");
  const [priceAtPurchase, setPriceAtPurchase] = useState(0);
  const [gmd, setGmd] = useState(0);
  const [timeOfStay, setTimeOfStay] = useState(0);
  const [outputWeight, setOutputWeight] = useState(0);
  const [rcInitial, setRcInitial] = useState<string>("0.0");
  const [rcFinal, setRcFinal] = useState<string>("0.0");
  const [atSalePrice, setAtSalePrice] = useState(0);
  const [purchasePrice, setPurchasePrice] = useState(0);
  const [priceAtProduced, setPriceAtProduced] = useState(0);
  const [returnOnCapital, setReturnOnCapital] = useState(0);
  const [result, setResult] = useState(0);
  const [bash, setBash] = useState(0);
  const [description, setDescription] = useState(0);

  const handleTag = (id: string) => {
    setSelectTag(id);
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

  useEffect(() => {
    tagSearch();
  }, [listTag]);

  async function handleSubmit() {
    setLoading(true);
    try {
      const schema = Yup.object().shape({
        title: Yup.string().required("Campo título é obrigatório"),
        entryWeight: Yup.number()
          .min(1, "Campo peso de entrada deve ser maior que 0")
          .required("Campo peso de entrada é obrigatório"),
        dailyCost: Yup.number()
          .min(1, "Campo Custo diário deve ser maior que 0")
          .required("Campo custo diário é obrigatório"),
        priceAtPurchase: Yup.number()
          .min(1, "Campo Preço @ compra deve ser maior que 0")
          .required("Campo preço @ compra é obrigatório"),
        gmd: Yup.number()
          .min(1, "Campo GMD deve ser maior que 0")
          .required("Campo GMD é obrigatório"),
        timeOfStay: Yup.number()
          .min(1, "Campo Tempo Permanência deve ser maior que 0")
          .required("Campo tempo Permanência é obrigatório"),
        rcInitial: Yup.string()
          .min(1, "Campo peso de entrada deve ser maior que 0")
          .required("Campo RC final é obrigatório"),
        rcFinal: Yup.string()
          .min(1, "Campo RC final deve ser maior que 0")
          .required("Campo RC final é obrigatório"),
        atSalePrice: Yup.number()
          .min(1, "Campo preço @ de venda deve ser maior que 0")
          .required("Campo preço @ de venda é obrigatório"),
      });

      await schema.validate({
        title,
        entryWeight,
        dailyCost,
        priceAtPurchase,
        gmd,
        timeOfStay,
        rcInitial,
        rcFinal,
        atSalePrice,
      });
      const sendValue = {
        tag: selectTag,
        title: title,
        description: description.toString(),
        bash: bash.toString(),
        entranceWeight: entryWeight.toString(),
        dailyCost: `${dailyCost.toString()}-${priceAtPurchase}`,
        gmd: gmd.toString(),
        purchasePrice: purchasePrice.toString(),
        lengthOfStay: timeOfStay.toString(),
        outputWeight: outputWeight.toString(),
        rcInitial: rcInitial,
        rcEnd: rcFinal,
        salePrice: atSalePrice.toString(),
        producedPrice: priceAtProduced.toString(),
        returnOnCapital: returnOnCapital.toString(),
        result: result.toString(),
      };
      await api.post("/calculations", sendValue);
      showMessage({
        message: "Sucesso!",
        description: "Cálculo criado com sucesso!",
        type: "success",
        icon: "success",
      });

      navigation.navigate("Dashboard", {
        refreshing: true,
      });
      setLoading(false);
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
          message: "Error na autenticação",
          description:
            "Ocorreu um erro ao criar cálculo, tente novamente mais tarde!",
          type: "danger",
        });
        setLoading(false);
      }
    }
    setLoading(false);
  }

  useMemo(() => {
    const calc = (parseFloat(dailyCost) * timeOfStay) / bash;
    setPriceAtProduced(parseFloat(calc.toFixed(2)));
  }, [dailyCost, timeOfStay, bash]);

  useMemo(() => {
    const calc =
      ((entryWeight * (parseFloat(rcInitial) / 100)) / 15) * priceAtPurchase;
    setPurchasePrice(calc);
  }, [entryWeight, rcInitial, priceAtPurchase]);

  useMemo(() => {
    const calc =
      (outputWeight * (parseFloat(rcFinal) / 100) -
        entryWeight * (parseFloat(rcInitial) / 100)) /
      15;
    setBash(parseFloat(calc.toFixed(2)));
  }, [outputWeight, rcFinal, entryWeight, rcInitial]);

  useMemo(() => {
    const calc =
      ((outputWeight * (parseFloat(rcFinal) / 100)) / 15) * atSalePrice;
    setDescription(calc);
  }, [outputWeight, rcFinal, atSalePrice]);

  useMemo(() => {
    const calc =
      ((result / (purchasePrice + parseFloat(dailyCost) * timeOfStay)) * 100) /
      (timeOfStay / 30.41);
    setReturnOnCapital(parseFloat(calc.toFixed(2)));
  }, [result, purchasePrice, dailyCost, timeOfStay]);

  useMemo(() => {
    const calc =
      description - (parseFloat(dailyCost) * timeOfStay + purchasePrice);
    setResult(calc);
  }, [description, dailyCost, timeOfStay, purchasePrice]);

  useMemo(() => {
    const calc = (gmd * timeOfStay) / 1000 + entryWeight;
    setOutputWeight(calc);
  }, [gmd, timeOfStay, entryWeight]);

  return (
    <>
      <Header title="Novo cálculo" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : undefined}
        enabled
        style={{
          flex: 1,
          backgroundColor: theme.COLORS.GRAY_50,
        }}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          style={{ backgroundColor: "#FCF9F2", flex: 1 }}
        >
          <Container>
            <ContainerTitleTag>
              <TitleTag>Etiquetas</TitleTag>
              <ButtonManageTag onPress={() => navigation.navigate("ManageTag")}>
                <TextManageTag>Gerenciar Etiquetas</TextManageTag>
              </ButtonManageTag>
            </ContainerTitleTag>
            <ContainerTag>
              {listTag &&
                listTag.map((e) => (
                  <Tag
                    key={e.id}
                    title={e.title}
                    color={e.color}
                    onPress={() => handleTag(e.id)}
                    id={e.id}
                    selectId={selectTag}
                  />
                ))}
            </ContainerTag>
            <ButtonAddTag
              onPress={() =>
                navigation.navigate("CreateTag", { flow: "CreateCalculation" })
              }
            >
              <TitleButtonTag>Criar nova etiqueta</TitleButtonTag>
            </ButtonAddTag>
            <Input
              title="Título"
              placeholder="Título"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardAppearance="dark"
              onChangeText={setTitle}
              value={title}
            />
            <View style={{ marginTop: 10 }} />
            <InputSlider
              title="Peso de entrada(Kg)"
              placeholder="Peso de entrada"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardAppearance="dark"
              keyboardType="numeric"
              onChangeText={(e) => {
                if (e === "" || e === "0" || (e.length === 1 && e !== ".")) {
                  setEntryWeight(0);
                } else {
                  const num = parseFloat(e);
                  if (!isNaN(num) && num <= 1500) {
                    setEntryWeight(num);
                  }
                }
              }}
              value={entryWeight.toString()}
              sliderValue={(value) => setEntryWeight(value)}
              isSlide
              inputValue={entryWeight}
              maximumValueSlider={1000}
            />

            <InputSliderDecimalNumber
              keyboardType="numeric"
              title="Custo diário(R$)"
              placeholder="Custo diário"
              autoCorrect={false}
              keyboardAppearance="dark"
              onChangeText={(e) => {
                const regex = /^(\d+(\.\d{0,11})?)?$/;
                if (regex.test(e)) {
                  setDailyCost(e);
                } else {
                  setDailyCost(e);
                }
              }}
              value={dailyCost}
              inputValue={dailyCost ? parseFloat(dailyCost) : 0}
              sliderValue={(newValue: number) => {
                setDailyCost(newValue.toFixed(2));
              }}
              maximumValue={50}
            />

            <InputSlider
              title="Preço @ compra(R$)"
              placeholder="Preço @ compra"
              autoCorrect={false}
              keyboardAppearance="dark"
              keyboardType="numeric"
              onChangeText={(e) => {
                if (e === "" || e === "0" || (e.length === 1 && e !== ".")) {
                  setPriceAtPurchase(0);
                } else {
                  const num = parseFloat(e);
                  if (!isNaN(num) && num <= 1000) {
                    setPriceAtPurchase(num);
                  }
                }
              }}
              value={priceAtPurchase.toString()}
              sliderValue={(value) => setPriceAtPurchase(value)}
              isSlide
              inputValue={priceAtPurchase}
              maximumValueSlider={500}
            />
            <InputSlider
              title="GMD(g)"
              placeholder="GMD"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardAppearance="dark"
              keyboardType="numeric"
              onChangeText={(e) => {
                if (e === "" || e === "0" || (e.length === 1 && e !== ".")) {
                  setGmd(0);
                } else {
                  const num = parseFloat(e);
                  if (!isNaN(num) && num <= 3000) {
                    setGmd(num);
                  }
                }
              }}
              value={gmd.toString()}
              sliderValue={(value) => setGmd(value)}
              isSlide
              inputValue={gmd}
              maximumValueSlider={3000}
            />

            <InputSlider
              title="Tempo Permanência(dias)"
              placeholder="Tempo Permanência"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardAppearance="dark"
              keyboardType="numeric"
              onChangeText={(e) => {
                if (e === "" || e === "0" || (e.length === 1 && e !== ".")) {
                  setTimeOfStay(0);
                } else {
                  const num = parseFloat(e);
                  if (!isNaN(num) && num <= 1000) {
                    setTimeOfStay(num);
                  }
                }
              }}
              value={timeOfStay.toString()}
              sliderValue={(value) => setTimeOfStay(value)}
              isSlide
              inputValue={timeOfStay}
              maximumValueSlider={1000}
            />

            <ShowResult title="Peso de saída(Kg)" label={outputWeight} />

            <View style={{ marginTop: 10 }} />

            <InputSliderDecimalNumber
              keyboardType="numeric"
              title="RC inicial(%)"
              placeholder="RC inicial"
              autoCorrect={false}
              keyboardAppearance="dark"
              onChangeText={(e) => {
                const regex = /^(\d+(\.\d{0,1})?)?$/;
                if (regex.test(e)) {
                  setRcInitial(e);
                } else {
                  setRcInitial(e);
                }
              }}
              value={rcInitial}
              inputValue={rcInitial ? parseFloat(rcInitial) : 0}
              sliderValue={(newValue: number) => {
                setRcInitial(newValue.toFixed(1));
              }}
              maximumValue={100}
            />

            <InputSliderDecimalNumber
              keyboardType="numeric"
              title="RC final(%)"
              placeholder="RC final"
              autoCorrect={false}
              keyboardAppearance="dark"
              onChangeText={(e) => {
                const regex = /^(\d+(\.\d{0,1})?)?$/;
                if (regex.test(e)) {
                  setRcFinal(e);
                } else {
                  setRcFinal(e);
                }
              }}
              value={rcFinal}
              inputValue={rcFinal ? parseFloat(rcFinal) : 0}
              sliderValue={(newValue: number) => {
                setRcFinal(newValue.toFixed(1));
              }}
              maximumValue={100}
            />

            <InputSlider
              title="Preço @ de venda(R$)"
              placeholder="Preço @"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardAppearance="dark"
              keyboardType="numeric"
              onChangeText={(e) => {
                if (e === "" || e === "0" || (e.length === 1 && e !== ".")) {
                  setAtSalePrice(0);
                } else {
                  const num = parseFloat(e);
                  if (!isNaN(num) && num <= 1000) {
                    setAtSalePrice(num);
                  }
                }
              }}
              value={atSalePrice.toString()}
              sliderValue={(value) => setAtSalePrice(value)}
              isSlide
              inputValue={atSalePrice}
              maximumValueSlider={500}
            />

            <ShowResult
              title="Preço @ produzida(R$)"
              label={priceAtProduced}
              isMoney
            />
            <ShowResult
              title="Valor de compra(R$)"
              label={purchasePrice}
              isMoney
            />

            <ShowResult title="Quantidade de @ Produzidas" label={bash} />
            <ShowResult
              title="Preço de venda(R$)"
              label={description}
              isMoney
            />

            <ShowResult
              title="Rendimento do capital(%)/mensal"
              label={returnOnCapital}
            />

            <ShowResult title="Resultado" label={result} isMoney />

            <ButtonHandleSubmit
              title="Salvar"
              onPress={handleSubmit}
              enabled={!loading}
              loading={loading}
            />
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}
