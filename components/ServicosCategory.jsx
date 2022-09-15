import React, { useState, useEffect } from 'react'
import { StyleSheet, Text,Image,TouchableOpacity,View} from 'react-native';
import Api from '../Api';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { cores } from '../style/globalStyle';




const SortSelect = () => {
  return (
    <View style={styles.SortSelectContainer}>
      <FontAwesome name="sort-amount-asc" size={18} color="black" />
       <TouchableOpacity style={styles.SortSelectItem}>
         <Text style={styles.SortSelectItemText}>Distância</Text>
       </TouchableOpacity>
       <TouchableOpacity style={styles.SortSelectItem}>
         <Text style={styles.SortSelectItemText}>Preço</Text>
       </TouchableOpacity>
    </View>
  );
  
}



const ServicosCategory = ({servicos,categoria,idSubcategoriaSelecionada}) => {
  
  const filtraServicos = (servico) =>{
      if (idSubcategoriaSelecionada)
          return servico.categoria_id===categoria.id&servico.subcategoria_id===idSubcategoriaSelecionada
      else
           return servico.categoria_id===categoria.id
  }

 


    return (
      <>
      <SortSelect/>
        <View style={styles.container}>
           
           {servicos.filter(servico=>filtraServicos(servico)).sort((a,b)=>{return a.distancia - b.distancia}).map((servico) => (
          
              <TouchableOpacity style={styles.serviceCard} key={servico.id}>
                      <Image style={styles.serviceImage} source={{uri:`${Api.base_storage}/${servico.imagem}`,}}/>
                      <View style={styles.serviceDetailsArea}>
                        <Text style={styles.serviceName}>{servico.nome}</Text>
                        <View style={styles.secondLine}>
                              <FontAwesome name="star" size={16} color={cores.amarelo} />
                              <Text style={styles.serviceStarText}>{servico.stars.length === 1 ? servico.stars+'.0': servico.stars}</Text>
                              <Entypo name="dot-single" size={14} color="black" />
                              <Text style={styles.serviceCategory}>{servico.subcategoria}</Text>
                              <Entypo name="dot-single" size={14} color="black" />
                              <Text style={styles.serviceDistance}>{servico.distancia} km</Text>
                          </View>
                          <Text style={styles.servicePrice}>A partir de R$ {servico.preco}</Text>
                      </View>
                        
                </TouchableOpacity>

              ))} 
          
        </View>
        </>
      )
}

export default ServicosCategory

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
    SortSelectContainer:{
      flexDirection: 'row',
      alignItems:'center',
      justifyContent:'center',
    },
    SortSelectItem:{
      height:20,
      alignItems:'center',
      justifyContent:'center',
    },
    SortSelectItemText:{
      margin: 2,
       fontSize:12,
    },
    SortSelectItemTextSelected:{
       fontSize: 12,
    },
   
    
  });