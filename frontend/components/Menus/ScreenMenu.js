import { View, Text } from "react-native";
import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../../screens/Home";
import Register from "../../screens/auth/Register";
import Login from "../../screens/auth/Login";
import { AuthContext } from "../../context/authContext";
import HeaderMenu from "./HeaderMenu";
import UserInput1 from "../../screens/UserInput1";
import UserInput2 from "../../screens/UserInput2";
import Calender from "../../screens/Calender";
import Mood from "../../screens/Mood";
import MoodDress from "../../screens/MoodDress";
import DressesScreen from "../../screens/Dress";
import Settings from "../../screens/Settings";
import OtherScreen from "../../screens/OtherScreen";
import ColourScreen from "../../screens/ColourScreen";
import AccessoriesScreen from "../../screens/Accessories";
import WardrobeScreen from "../../screens/Wardrobe";

const ScreenMenu = () => {
  const [state] = useContext(AuthContext);
  const authUser = state?.user && state?.token;
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName="Login">
      {authUser ? (
        <>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              title: "Mood & Moment",
              headerRight: () => <HeaderMenu />,
            }}
          />
          <Stack.Screen
            name="userInput1"
            component={UserInput1}
            options={{
              title: "Mood & Moment",
              headerRight: () => <HeaderMenu />,
            }}
          />
          <Stack.Screen
            name="userInput2"
            component={UserInput2}
            options={{
              title: "Mood & Moment",
              headerRight: () => <HeaderMenu />,
            }}
          />
          <Stack.Screen
            name="settings"
            component={Settings}
            options={{
              title: "Mood & Moment",
              headerRight: () => <HeaderMenu />,
            }}
          />
          <Stack.Screen
            name="calender"
            component={Calender}
            options={{
              title: "Mood & Moment",
              headerRight: () => <HeaderMenu />,
            }}
          />

          <Stack.Screen
            name="mood"
            component={Mood}
            options={{
              title: "Mood & Moment",
              headerRight: () => <HeaderMenu />,
            }}
          />
          <Stack.Screen
            name="dress"
            component={MoodDress}
            options={{
              title: "Mood & Moment",
              headerRight: () => <HeaderMenu />,
            }}
          />

          <Stack.Screen
            name="eventDress"
            component={DressesScreen}
            options={{
              title: "Mood & Moment",
              headerRight: () => <HeaderMenu />,
            }}
          />
          <Stack.Screen
            name="eventAccessories"
            component={AccessoriesScreen}
            options={{
              title: "Mood & Moment",
              headerRight: () => <HeaderMenu />,
            }}
          />
          <Stack.Screen
            name="WardrobeScreen"
            component={WardrobeScreen}
            options={{
              title: "Mood & Moment",
              headerRight: () => <HeaderMenu />,
            }}
          />
          <Stack.Screen
            name="OtherScreen"
            component={OtherScreen}
            options={{
              title: "Mood & Moment",
              headerRight: () => <HeaderMenu />,
            }}
          />
          <Stack.Screen
            name="ColourScreen"
            component={ColourScreen}
            options={{
              title: "Mood & Moment",
              headerRight: () => <HeaderMenu />,
            }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default ScreenMenu;
