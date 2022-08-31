import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import MainStack from './stacks/MainStack'


import { cores } from './style/globalStyle';


export default function App() {
  return (
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
   
    backgroundColor: cores.fundo,
    
  },
});



// react-native-gesture-handler
// npm install @react-native-community/async-storage

//contextApi