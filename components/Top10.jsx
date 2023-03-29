import React, { useState, useEffect } from 'react'
import { StyleSheet, Text,Image,TouchableOpacity,View,ScrollView} from 'react-native';
import Api from '../Api';
import { cores } from '../style/globalStyle';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Top10 = ({servicos}) => {

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
        
        {
          servicos.sort((a,b)=>{return b.stars - a.stars}).slice(0,10).map((servico)=>(
            <TouchableOpacity style={styles.serviceCard} key={servico.id} onPress={()=>handleServicePress(servico)}>
                <Image style={styles.serviceImage} source={{uri:`${Api.base_storage}/${servico.imagem}`,}}/>
                <Text style={styles.serviceText}>{servico.nome.length>20 ? servico.nome.substring(0,20)+'...':servico.nome}</Text>
                <View style={styles.starArea}>
                  <FontAwesome name="star" size={16} color={cores.dourado} />
                  <Text style={styles.starText}>{servico.stars.length === 1 ? servico.stars+'.0': servico.stars}</Text>
                </View>
            </TouchableOpacity>

          ))}

      </ScrollView>

  </View>
  )
}

export default Top10

const styles = StyleSheet.create({
  
  container: {
    height: 140,
     borderRadius:15,
     marginTop:10,
  },
   serviceCard:{
     height: 140,
     minWidth: 110,
     maxWidth: 110,
     flexDirection: 'column',
     alignItems:'center',
     justifyContent:'center',
     margin: 5,
   },
   serviceImage:{
      width: 100,
      height: 100,
      borderRadius: 10,
   },
   serviceText:{
     fontSize: 10,
     fontWeight: 'bold',
     textAlign: 'center',
   },
   starArea:{
     flexDirection: 'row',
     alignItems: 'center',
     justifyContent: 'center',
   },
   star:{
     color: cores.amarelo,
   },
   starText:{
    marginLeft: 2,
    fontSize: 12,
    fontWeight: 'bold',
   }

});