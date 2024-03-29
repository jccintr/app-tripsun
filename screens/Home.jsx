import React, { useState, useEffect } from 'react'
import { StyleSheet, SafeAreaView,View,ScrollView,StatusBar,Dimensions,Text} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Api from '../Api';
import CategoryList from '../components/CategoryList';
import Destaques from '../components/Destaques';
import Banner from '../components/Banner';
import Top10 from '../components/Top10';
import Servicos from '../components/Servicos';
import Titulo from '../components/Titulo';
import { useContext } from "react";
import DataContext from '../context/DataContext';
import { cores } from '../style/globalStyle';



const Home = () => {
  const navigation = useNavigation();
  const {loggedUser,setLoggedUser,nomeCidade,setNomeCidade} = useContext(DataContext);
  const [city,setCity] = useState('');
  const [categorias,setCategorias] = useState([]);
  const [servicos,setServicos] = useState([]);
  const [subCategorias,setSubCategorias] = useState([]);

  useEffect(()=>{
    const getCityId = async () => {
      const token = await AsyncStorage.getItem('token');
      
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
      <StatusBar
                animated={true}
                backgroundColor={cores.vermelho}
                barStyle="dark-content"
      />
      <Header nomeCidade={nomeCidade}/>
      <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.body}>
         <CategoryList categorias={categorias} onPress={handleCategoryPress}/>
         <Titulo titleText="Destaques da Cidade"/>
         <Destaques servicos={servicos}/>
         <Banner/>
         <Titulo titleText="Top 10"/>
         <Top10 servicos={servicos}/>
         <Titulo titleText="Serviços Próximos a Você!"/>
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
      width:  Dimensions.get('window').width,
      alignItems:'center',
      justifyContent: 'flex-start',
    
    },
    sectionTitle:{
      fontWeight:'bold',
      fontSize: 26,
    }
  
  }); 