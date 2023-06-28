import { useEffect, useState } from "react";

import axios from "axios";
import Geolocation from "@react-native-community/geolocation";
import { PermissionsAndroid, Platform } from "react-native";
import { showMessage } from "react-native-flash-message";
import { BorderlessButton } from "react-native-gesture-handler";

import { Temperature } from "../Temperature";
import { convertDate } from "../../utils/data";

interface WeatherForecastProps {
  onPressModalAboutLocation: () => void;
}

import {
  Container,
  ContainerLocationDenied,
  LoadingHourly,
  LocationDeniedBtn,
  LocationDeniedText,
  TextLoadingHourly,
} from "./styles";

export function WeatherForecast({
  onPressModalAboutLocation,
}: WeatherForecastProps) {
  const [currentLongitude, setCurrentLongitude] = useState("");
  const [currentLatitude, setCurrentLatitude] = useState("");
  const [locationStatus, setLocationStatus] = useState("");
  const [hourly, setHourly] = useState<any[]>([]);
  const [loadingHourly, setLoadingHourly] = useState(false);

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === "ios") {
        getOneTimeLocation();
        subscribeLocationLocation();
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: "Location Access Required",
              message: "This App needs to Access your location",
              buttonPositive: "",
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            getOneTimeLocation();
            subscribeLocationLocation();
          } else {
            setLocationStatus("Permission Denied");
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };
    requestLocationPermission();
    return () => {
      Geolocation.clearWatch(watchID);
    };
  }, []);

  const getOneTimeLocation = () => {
    setLocationStatus("Getting Location ...");
    watchID = Geolocation.getCurrentPosition(
      (position) => {
        setLocationStatus("You are Here");
        const currentLongitude = JSON.stringify(position.coords.longitude);
        const currentLatitude = JSON.stringify(position.coords.latitude);
        setCurrentLongitude(currentLongitude);
        setCurrentLatitude(currentLatitude);
      },
      (error) => {
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000,
      }
    );
  };

  const subscribeLocationLocation = () => {
    Geolocation.watchPosition(
      (position) => {
        setLocationStatus("You are Here");
        const currentLongitude = JSON.stringify(position.coords.longitude);
        const currentLatitude = JSON.stringify(position.coords.latitude);
        setCurrentLongitude(currentLongitude);
        setCurrentLatitude(currentLatitude);
      },
      (error) => {
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        maximumAge: 1000,
      }
    );
  };

  const weatherApi = axios.create({
    baseURL: "https://api.openweathermap.org/data/3.0",
  });

  const weatherForecast = async () => {
    setLoadingHourly(true);
    weatherApi
      .get(
        `/onecall?lat=${currentLatitude}&lon=${currentLongitude}&&lang=pt_br&exclude=hourly&units=metric&appid=e60bbbd8743dbd96687926fd211c16f2`
      )
      .then((response) => {
        setHourly(response.data.daily);
        setLoadingHourly(false);
      })
      .catch((err) => {
        showMessage({
          message: "Error!",
          description:
            "Ocorreu um erro inesperado para carregar a previsão do tempo",
          type: "danger",
          icon: "danger",
        });
        setLoadingHourly(false);
      });
  };

  const loadWeatherForecast = () => {
    if (locationStatus === "User denied access to location services.") {
      return (
        <ContainerLocationDenied>
          <LocationDeniedText>
            A permissão para acessar a localização foi negada.
          </LocationDeniedText>
          <BorderlessButton onPress={onPressModalAboutLocation}>
            <LocationDeniedBtn>Saiba mais...</LocationDeniedBtn>
          </BorderlessButton>
        </ContainerLocationDenied>
      );
    } else if (loadingHourly) {
      return (
        <>
          <LoadingHourly size="small" color="#FEC321" />
          <TextLoadingHourly>Carregando Previsão do tempo</TextLoadingHourly>
        </>
      );
    } else if (hourly) {
      return hourly.map((e) => (
        <Temperature
          key={e.dt}
          date={convertDate(e.dt)}
          temp={e.temp.day}
          icon={e.weather.main}
        />
      ));
    } else {
      return "";
    }
  };

  useEffect(() => {
    if (currentLongitude.length > 0 && currentLatitude.length > 0) {
      weatherForecast();
    }
  }, [currentLongitude, currentLatitude, locationStatus]);

  return <Container>{loadWeatherForecast()}</Container>;
}
