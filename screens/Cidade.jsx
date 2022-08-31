import React from 'react'
import { StyleSheet, Text,Image,FlatList, SafeAreaView,TouchableOpacity,View} from 'react-native';
import { cores } from '../style/globalStyle';
import { Feather } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';

const Cidade = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header/>
    </SafeAreaView>  
  )
}

export default Cidade

const styles = StyleSheet.create({
    container: {
     
      backgroundColor: cores.fundo,
      
    },
  });