import React, { useState, useEffect } from 'react'

import { Entypo } from '@expo/vector-icons';
import { StyleSheet, Text,Image,FlatList, SafeAreaView,TouchableOpacity,View,ScrollView} from 'react-native';
import { cores } from '../style/globalStyle';
import Header from '../components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Api from '../Api';
import CategoryList from '../components/CategoryList';

import CategoryList2 from '../components/CategoryList2';
import Destaques from '../components/Destaques';
import Banner from '../components/Banner';
import Top10 from '../components/Top10';
import Servicos from '../components/Servicos';



const Home = () => {
  const [nomeCidade,setNomeCidade] = useState('');
  const [city,setCity] = useState('');
  const [categorias,setCategorias] = useState([]);
  
  const [servicos,setServicos] = useState([]);

  useEffect(()=>{
    const getCityId = async () => {
        const id = await AsyncStorage.getItem('@cityId');
       
        if(id) {
          let json = await Api.getCidade(id);
           setNomeCidade(json.nome + ","+json.estado);
           setCity(json);
           setCategorias(json.categorias);
           setServicos(json.servicos);
           
        }
    }
    getCityId();
  }, []);




  return (
    <SafeAreaView style={styles.container}>
      <Header nomeCidade={nomeCidade}/>
      <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.body}>
         <CategoryList categorias={categorias} />
         <Text style={styles.sectionTitle}>Destaques da Cidade</Text>
         <Destaques servicos={servicos}/>
         <Banner/>
         <Text style={styles.sectionTitle}>Top 10</Text>
         <Top10 servicos={servicos}/>
         <Servicos/>
       
      </View>
      </ScrollView>
      
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
    body:{
      flex:1,
      alignItems:'center',
      justifyContent: 'flex-start',
   
    },
    sectionTitle:{
      fontWeight:'bold',
      fontSize: 26,
    }
   
   
    
  });