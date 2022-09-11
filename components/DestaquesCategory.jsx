import React, { useState, useEffect } from 'react'
import { StyleSheet, Text,Image,TouchableOpacity,View,ScrollView} from 'react-native';
import Api from '../Api';
import { cores } from '../style/globalStyle';

const DestaquesCategory = ({servicos,categoria}) => {
  return (
    <View style={styles.container}>

    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
     
       {servicos.filter(servico=>servico.destaque===true&servico.categoria_id===categoria.id).map((servico) => (
      
              <TouchableOpacity style={styles.serviceCard} key={servico.id}>
                      <Image style={styles.serviceImage} source={{uri:`${Api.base_storage}/${servico.imagem}`,}}/>
                      <Text style={styles.serviceText}>{servico.nome}</Text>
              </TouchableOpacity>


              ))}

    </ScrollView>

    </View>
  )
}

export default DestaquesCategory



const styles = StyleSheet.create({
  
    container: {
       width: 350,
       borderRadius:15,
       marginTop:10,
     },
     serviceCard:{
       height: 190,
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
     },
     serviceText:{
       fontSize: 14,
       fontWeight: 'bold',
     },
 
 });