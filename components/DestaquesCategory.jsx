import React, { useState, useEffect } from 'react'
import { StyleSheet, Text,Image,TouchableOpacity,View,ScrollView} from 'react-native';
import Api from '../Api';
import { useNavigation } from '@react-navigation/native';


const DestaquesCategory = ({servicos,categoria}) => {

  const navigation = useNavigation();


  const handleServicePress  = (servico) =>{
  
    navigation.navigate('Servico',{
      
      cidade: "Teste",
      servico: servico

    })
 } 



  return (
    <View style={styles.container}>

    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
     
       {servicos.filter(servico=>servico.destaque===1&servico.categoria_id===categoria.id).map((servico) => (
      
              <TouchableOpacity style={styles.serviceCard} key={servico.id} onPress={()=>handleServicePress(servico)}>
                      <Image style={styles.serviceImage} source={{uri:`${Api.base_storage}/${servico.imagem}`,}}/>
                      <Text style={styles.serviceText}>{servico.nome.length>20 ? servico.nome.substring(0,20).trim()+'...':servico.nome}</Text>
              </TouchableOpacity>


              ))}

    </ScrollView>

    </View>
  )
}

export default DestaquesCategory



const styles = StyleSheet.create({
  
    container: {
      height: 210,
       borderRadius:15,
       marginTop:10,
     },
     serviceCard:{
       height: 210,
       minWidth: 170,
       maxWidth: 170,
       flexDirection: 'column',
       alignItems:'center',
       justifyContent:'center',
       margin: 5,
     },
     serviceImage:{
        width: 170,
        height: 170,
        borderRadius: 15,
     },
     serviceText:{
       fontSize: 14,
       fontWeight: 'bold',
     },
 
 });