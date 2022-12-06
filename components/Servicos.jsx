import React, { useState, useEffect } from 'react'
import { StyleSheet, Text,Image,TouchableOpacity,View} from 'react-native';
import Api from '../Api';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { cores } from '../style/globalStyle';
import { useNavigation } from '@react-navigation/native';

const Servicos = ({servicos}) => {
  const navigation = useNavigation();


  const handleServicePress  = (servico) =>{
  
    navigation.navigate('Servico',{
      
      cidade: "Teste",
      servico: servico

    })
 } 



  return (
    <View style={styles.container}>
       {servicos.sort((a,b)=>{return a.distancia - b.distancia}).slice(0,15).map((servico) => (
        <TouchableOpacity style={styles.serviceCard} key={servico.id} onPress={()=>handleServicePress(servico)}>
              <Image style={styles.serviceImage} source={{uri:`${Api.base_storage}/${servico.imagem}`,}}/>
              <View style={styles.serviceDetailsArea}>
                 <Text style={styles.serviceName}>{servico.nome}</Text>
                 <View style={styles.secondLine}>
                      <FontAwesome name="star" size={16} color={cores.amarelo} />
                      <Text style={styles.serviceStarText}>{servico.stars.length === 1 ? servico.stars+'.0': servico.stars}</Text>
                      <Entypo name="dot-single" size={14} color="black" />
                      <Text style={styles.serviceCategory}>{servico.categoria}</Text>
                      <Entypo name="dot-single" size={14} color="black" />
                      <Text style={styles.serviceDistance}>{servico.distancia} km</Text>
                  </View>
                  <Text style={styles.servicePrice}>A partir de R$ {servico.valor}</Text>
              </View>
                
         </TouchableOpacity>
              ))}
    </View>
  )
} 

export default Servicos




const styles = StyleSheet.create({
    
  container: {
    backgroundColor: cores.cinzaClaro,
    width: 350,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderRadius:15,
    marginTop:10,
    marginBottom:10,
    paddingTop:5,
  
      },
  serviceCard:{
   marginHorizontal:10,
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'flex-start',
    width: 320,
    height: 65,
   
   
  },
  serviceImage:{
     width: 60,
     height: 60,
  },
  serviceDetailsArea:{
    flexDirection: 'column',
    paddingLeft:10,
    height: 65,
    justifyContent:'space-around',
   

  },
  serviceName:{
    fontSize: 14,
    fontWeight: 'bold',
  },
  secondLine:{
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  serviceStarText:{
    fontSize: 12,
    marginHorizontal:5,
   
  },
  serviceCategory:{
    fontSize: 12,
    marginRight:5,
   
  },
  categoryText:{
    fontSize: 12,
   
  },
  serviceDistance:{
    fontSize: 12,
     },
  servicePrice:{
    fontSize: 12,
   
  },
 
  
});