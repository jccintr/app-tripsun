import React, { useState, useEffect } from 'react'
import { StyleSheet, Text,Image,TouchableOpacity,View,FlatList} from 'react-native';
import Api from '../Api';


const Categoria = ({ item }) => {
  return (
    <View style={styles.categoryCard}>
       <Image style={styles.categoryImage} source={{uri:`${Api.base_storage}/${item.imagem}`,}}/>
       <Text style={styles.categoryText}>{item.nome}</Text>
   </View>
  );
};



const CategoryList2 = ({categorias}) => {
    return (
      <View style={styles.container}>  
      <FlatList 
        data={categorias}
        numColumns={4}
        renderItem={Categoria}
        keyExtractor={item => item.id}
      />
    </View>
        
      )
}

export default CategoryList2


const styles = StyleSheet.create({
  container: {
  
    margin:2,
    
    borderRadius:15,
  
  },
  item: {
  
    maxWidth: "25%", 
    alignItems: "center",
    
   
   
  },
    categoryImage:{
       width: 80,
       height: 80,
    },
    categoryText:{
      fontSize: 12,
      fontWeight: 'bold',
    },
    categoryCard:{
     
     
      height: 100,
      width:80,
      flexDirection: 'column',
      alignItems:'center',
      justifyContent:'center',
      margin:2,
     
      

    },
   
    
  });