import styled from "styled-components/native";

import { Animated } from "react-native";
import { Button } from "../Button";
import { RectButton } from "react-native-gesture-handler";

export const Container = styled(Animated.View)`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
`;

export const Modal = styled(Animated.View)`
  bottom: 0;
  position: absolute;
  background-color: #fff;
  width: 100%;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding-left: 25px;
  padding-right: 25px;
  padding-bottom: 40px;
`;

export const Indicator = styled.View`
  width: 50px;
  height: 5px;
  background-color: #ccc;
  border-radius: 50px;
  align-self: center;
  margin-top: 5px;
`;

export const Text = styled.Text`
  margin-top: 50px;
  text-align: justify;
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  font-size: ${({ theme }) => theme.FONT_SIZE.LG}px;
  color: ${({ theme }) => theme.COLORS.GRAY_700};
`;

export const Btn = styled(Button)`
  margin-top: 30px;
`;

export const CancelBtnText = styled(Button)`
  background-color: #fff;
  border: 1px solid ${({ theme }) => theme.COLORS.PRIMARY};
  width: 100%;
  padding: 19px;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  margin-top: 10px;
  color: ${({ theme }) => theme.COLORS.GRAY_700};
`;
