import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MainStack from './stacks/MainStack'
import { cores } from './style/globalStyle';




import { DataProvider } from "./context/DataContext";


export default function App() {
  return (
    <DataProvider>
      <NavigationContainer>
       <MainStack />
      </NavigationContainer>
    </DataProvider>
    
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