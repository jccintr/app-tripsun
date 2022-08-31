import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Preload from "../screens/Preload";
import SignIn2 from "../screens/SignIn2";
import SignUp2 from "../screens/SignUp2";
import Local2 from "../screens/Local2";
import SelectCity from "../screens/SelectCity";
import MainTab from '../stacks/MainTab';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false}} initialRouteName="SignIn2">
        <Stack.Screen  name="Preload" component={Preload}/>
        <Stack.Screen name="SignIn2" component={SignIn2}/>
        <Stack.Screen name="SignUp2" component={SignUp2}/>
        <Stack.Screen name="Local2" component={Local2}/>
        <Stack.Screen name="SelectCity" component={SelectCity}/>
        <Stack.Screen name="MainTab" component={MainTab} />
    </Stack.Navigator>
  )
}

export default MainStack
