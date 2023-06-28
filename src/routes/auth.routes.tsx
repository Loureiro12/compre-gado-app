import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import SignIn from "../screens/SignIn";
import { SignUp } from "../screens/SignUp";
import { ResetPassword } from "../screens/ResetPassword";
import { TokenSending } from "../screens/TokenSending";

const { Navigator, Screen } = createStackNavigator();

export function AuthRoutes() {
  return (
    <Navigator initialRouteName="Login">
      <Screen
        name="login"
        component={SignIn}
        options={{ headerShown: false }}
      />
      <Screen
        name="signUp"
        component={SignUp}
        options={{ headerShown: false }}
      />
      <Screen
        name="resetPassword"
        component={ResetPassword}
        options={{ headerShown: false }}
      />
      <Screen
        name="tokenSending"
        component={TokenSending}
        options={{ headerShown: false }}
      />
    </Navigator>
  );
}
