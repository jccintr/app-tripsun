import React, { useState, useEffect } from 'react'
import { StyleSheet, Text,Image,TouchableOpacity,View} from 'react-native';
import Api from '../Api';

const CategoryList = ({categorias}) => {
  
  return (
  
    <View style={styles.container}>
       {categorias.map((categoria) => (
        <TouchableOpacity style={styles.categoryCard} key={categoria.id}>
          
                <Image style={styles.categoryImage} source={{uri:`${Api.base_storage}/${categoria.imagem}`,}}/>
                <Text style={styles.categoryText}>{categoria.nome}</Text>
         </TouchableOpacity>
              ))}
    </View>
    
  )
}

export default CategoryList


const styles = StyleSheet.create({
    wrapper:{
     
    },
    container: {

     
      width: 360,
      flexDirection: "row",
      flexWrap: "wrap",
      
    

    },
    categoryCard:{
     
     
      height: 100,
      width:80,
      flexDirection: 'column',
      alignItems:'center',
      justifyContent:'center',
      margin: 5,
      

    },
    categoryImage:{
       width: 80,
       height: 80,
    },
    categoryText:{
      fontSize: 12,
      fontWeight: 'bold',
    },
   
    
  });