import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { CreateTag, CreateTagPropsRoute } from "../screens/CreateTag";
import { Dashboard } from "../screens/Dashboard";
import { RegisterCalculation } from "../screens/RegisterCalculation";
import { Profile } from "../screens/Profile";
import {
  RegisterCalculationEdit,
  RegisterCalculationEditProps,
} from "../screens/RegisterCalculationEdit";
import { ManageTag, ManageTagPropsRoute } from "../screens/ManageTag";
import { EditTag, EditTagPropsRoute } from "../screens/EditTag";

export type RootStackParamList = {
  CreateTag: CreateTagPropsRoute;
  Dashboard: RegisterCalculationEditProps;
  RegisterCalculation: undefined;
  RegisterCalculationEdit: RegisterCalculationEditProps;
  Profile: undefined;
  ManageTag: ManageTagPropsRoute;
  EditTag: EditTagPropsRoute;
};

const { Navigator, Screen } = createStackNavigator<RootStackParamList>();

export function AppRoutes() {
  return (
    <Navigator initialRouteName="Dashboard">
      <Screen
        name="CreateTag"
        component={CreateTag}
        options={{ headerShown: false }}
      />
      <Screen
        name="Dashboard"
        component={Dashboard}
        options={{ headerShown: false }}
      />
      <Screen
        name="RegisterCalculation"
        component={RegisterCalculation}
        options={{ headerShown: false }}
      />
      <Screen
        name="RegisterCalculationEdit"
        component={RegisterCalculationEdit}
        options={{ headerShown: false }}
      />
      <Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
      <Screen
        name="ManageTag"
        component={ManageTag}
        options={{ headerShown: false }}
      />
      <Screen
        name="EditTag"
        component={EditTag}
        options={{ headerShown: false }}
      />
    </Navigator>
  );
}
