import React, { useState, useEffect } from 'react'
import { StyleSheet, Text,Image,TouchableOpacity,View} from 'react-native';
import Api from '../Api';
import { FontAwesome } from '@expo/vector-icons';
import { cores } from '../style/globalStyle';

const Servicos = ({servicos}) => {
  return (
    <View style={styles.container}>
       {servicos.map((servico) => (
        <TouchableOpacity style={styles.categoryCard} key={categoria.id}>
              <Image style={styles.serviceImage} source={{uri:`${Api.base_storage}/${servico.imagem}`,}}/>
              <View style={styles.serviceDetailsArea}>
                 <Text style={styles.serviceName}>{servico.nome}</Text>
                 <View>
                      <FontAwesome name="star" size={16} color={cores.amarelo} />
                      <Text style={styles.starText}>{servico.stars}</Text>
                      <Text style={styles.serviceName}>{servico.categoria}</Text>
                      <Text style={styles.serviceName}>{servico.distancia}</Text>
                  </View>
                  <Text style={styles.serviceName}>{servico.preco}</Text>
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
    flexDirection: "row",
   
    borderRadius:15,
    marginTop:10,
    marginBottom:10,
   
      },
  serviceCard:{
    height: 100,
    minWidth: 75,
    maxWidth: 75,
    flexDirection: 'column',
    alignItems:'center',
    justifyContent:'center',
    margin: 6,
   
  },
  serviceImage:{
     width: 75,
     height: 75,
  },
  serviceDetailsArea:{

  },
  serviceName:{

  },
  serviceStars:{

  },
  serviceCategory:{

  },
  serviceDistance:{

  },
  servicePrice:{

  },
  categoryText:{
    fontSize: 12,
    fontWeight: 'bold',
  },
 
  
});