import React, { useState, useEffect } from 'react'

import { Entypo } from '@expo/vector-icons';
import { StyleSheet, Text,Image,FlatList, SafeAreaView,TouchableOpacity,View} from 'react-native';
import { cores } from '../style/globalStyle';
import Header from '../components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Api from '../Api';




const Home = () => {
  const [nomeCidade,setNomeCidade] = useState('');

  useEffect(()=>{
    const getCityId = async () => {
        const id = await AsyncStorage.getItem('@cityId');
        console.log(id);
        if(id) {
          let json = await Api.getCidade(id);
           setNomeCidade(json.nome + ","+json.estado);
          
        }
    }
    getCityId();
  }, []);




  return (
    <SafeAreaView style={styles.container}>
      <Header nomeCidade={nomeCidade}/>
       
       <View style={styles.helloArea}>
          <Text style={styles.helloAreaText}>Olá Visitante</Text> 
          <Text style={styles.helloAreaSloganText}>Quais aventuras você procura hoje ?</Text>
       </View>
       <View style={styles.categoryArea}>

       </View>
       <View style={styles.bannerArea}>

       </View>
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'flex-start',
    
      
    },
   
   
    helloArea:{
      width: '100%',
      paddingLeft: 10,

    },
    helloAreaText:{
      color: cores.vermelho,
      fontWeight: 'bold',
      fontSize: 20,

    },
    helloAreaSloganText:{
      marginTop:5,
      fontSize: 16,
    },
    categoryArea:{

    },
    bannerArea:{

    },
   
    
  });