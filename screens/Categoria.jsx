import React, { useState, useEffect } from 'react'

import Header2 from '../components/Header2';
import Banner from '../components/Banner';
import { StyleSheet, Text,Image,FlatList, SafeAreaView,TouchableOpacity,View,ScrollView} from 'react-native';
import { cores } from '../style/globalStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Api from '../Api';
import SubcategoryList from '../components/SubcategoryList';
import DestaquesCategory from '../components/DestaquesCategory';
import ServicosCategory from '../components/ServicosCategory';
import Titulo from '../components/Titulo';


const Categoria = ({route}) => {
  const {cidade,servicos,subCategorias,categoria} = route.params;  
  const [idSubcategoriaSelecionada,setIdSubcategoriaSelecionada] = useState(null);

  const handleSubcategoriaSelect = (id) => {
    setIdSubcategoriaSelecionada(id);
  }
  
  return (
    <SafeAreaView style={styles.container}>
        <Header2 nomeCidade={cidade} title={categoria.nome}/>
        <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.body}>
           <Titulo titleText={`Subcategorias em ${categoria.nome}`}/>
            <SubcategoryList 
               subCategorias={subCategorias} 
               categoria={categoria} 
               handleSubcategoriaSelect={handleSubcategoriaSelect} 
               idSubcategoriaSelecionada={idSubcategoriaSelecionada}
            />
            <Titulo titleText={`Destaques em ${categoria.nome}`}/>
            <DestaquesCategory servicos={servicos} categoria={categoria}/>
            <Banner/>
            <Titulo titleText="Serviços desta Categoria"/>
            <ServicosCategory servicos={servicos} categoria={categoria}/>
            </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default Categoria

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