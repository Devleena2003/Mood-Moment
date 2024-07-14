import { View, Text } from "react-native";
import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../../screens/Home";
import Register from "../../screens/auth/Register";
import Login from "../../screens/auth/Login";
import { AuthContext } from "../../context/authContext";
import HeaderMenu from "./HeaderMenu";
import userInput1 from "../../screens/userInput1";
import userInput2 from "../../screens/userInput2";
import calender from "../../screens/calender";
import settings from "../../screens/settings";
import OtherScreen from "../../screens/OtherScreen";
import ColourScreen from "../../screens/ColourScreen";


const ScreenMenu = () => {
  //const [state] = useContext(AuthContext);
  //const authUser = state?.user && state?.token;
  const Stack = createNativeStackNavigator();
  return (

    <Stack.Navigator initialRouteName="settings">
      
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
            component={userInput1}
            options={{
              title: "Mood & Moment",
              headerRight: () => <HeaderMenu />,
            }}
          />
          <Stack.Screen
            name="userInput2"
            component={userInput2}
            options={{
              title: "Mood & Moment",
              headerRight: () => <HeaderMenu />,
            }}
          />
          <Stack.Screen
          name="settings"
          component={settings}
          options={{
            title: "Mood & Moment",
              headerRight: () => <HeaderMenu />,
          }}
          />
          <Stack.Screen
            name="calender"
            component={calender}
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
    
    </Stack.Navigator>
  );
};

export default ScreenMenu;
