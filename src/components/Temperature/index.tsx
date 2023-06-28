import React from "react";
import { Ionicons } from "@expo/vector-icons";

import { Container, DataText, CurrentTemperature } from "./styles";

interface TemperatureProps {
  date: string;
  icon: string;
  temp: string;
}

export function Temperature({ date, icon, temp }: TemperatureProps) {
  const returnIcon = (icon: string) => {
    if (icon === "Clear") {
      return <Ionicons name="sunny-outline" size={24} color="black" />;
    } else if (icon === "Rain") {
      return <Ionicons name="rainy-outline" size={24} color="black" />;
    }
    return <Ionicons name="partly-sunny-outline" size={24} color="black" />;
  };
  return (
    <Container>
      <DataText>{date}</DataText>
      {returnIcon(icon)}
      <CurrentTemperature>{temp}°C</CurrentTemperature>
    </Container>
  );
}
