import React, { useState, useEffect } from 'react'

import { Entypo } from '@expo/vector-icons';
import { StyleSheet, Text,Image,FlatList, SafeAreaView,TouchableOpacity,View,ScrollView} from 'react-native';
import { cores } from '../style/globalStyle';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Api from '../Api';
import CategoryList from '../components/CategoryList';
import Destaques from '../components/Destaques';
import Banner from '../components/Banner';
import Top10 from '../components/Top10';
import Servicos from '../components/Servicos';



const Home = () => {
  const navigation = useNavigation();
  const [nomeCidade,setNomeCidade] = useState('');
  const [city,setCity] = useState('');
  const [categorias,setCategorias] = useState([]);
  const [servicos,setServicos] = useState([]);
  const [subCategorias,setSubCategorias] = useState([]);

  useEffect(()=>{
    const getCityId = async () => {
        const id = await AsyncStorage.getItem('@cityId');
        const lat = await AsyncStorage.getItem('@userLat');
        const lng  = await AsyncStorage.getItem('@userLng');
       
        if(id) {
          let json = await Api.getCidade(id,lat,lng);
           setNomeCidade(json.nome + ","+json.estado);
           setCity(json);
           setCategorias(json.categorias);
           setSubCategorias(json.subcategorias);
           setServicos(json.servicos);
           
        }
    }
    getCityId();
  }, []);


  const handleCategoryPress  = (categoria) =>{
  
     navigation.navigate('Categoria',{cidade: nomeCidade,servicos: servicos, subCategorias: subCategorias,categoria: categoria})
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header nomeCidade={nomeCidade}/>
      <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.body}>
         <CategoryList categorias={categorias} onPress={handleCategoryPress}/>
         <Text style={styles.sectionTitle}>Destaques da Cidade</Text>
         <Destaques servicos={servicos}/>
         <Banner/>
         <Text style={styles.sectionTitle}>Top 10</Text>
         <Top10 servicos={servicos}/>
         <Text style={styles.sectionTitle}>Serviços Próximos a Você!</Text>
         <Servicos servicos={servicos}/>
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