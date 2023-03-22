import { StyleSheet, Text, View,TouchableOpacity,Image } from 'react-native';
import React from 'react';
import { cores } from '../style/globalStyle';
import { Ionicons } from '@expo/vector-icons';
import Api from '../Api';



const FavoritoCard = ({favorito,onPress}) => {
    return (
        <TouchableOpacity onPress={()=>onPress(favorito)} style={styles.container}>
           <View style={styles.leftArea}>
           <Image style={styles.serviceImage} source={{uri:`${Api.base_storage}/${favorito.imagem}`,}}/>
           <View>
             <Text style={styles.nomeServicoText}>{favorito.nome}</Text>
             <Text style={styles.cidadeText}>{favorito.cidade}/{favorito.estado}</Text>
           </View> 
           </View>
           <View>
              <Ionicons name="chevron-forward" size={26} color="black" />
           </View>
           
          
        </TouchableOpacity>
      )
}

export default FavoritoCard

const styles = StyleSheet.create({

 container :{
   flexDirection: 'row',
   width: '95%',
   justifyContent: 'space-between',
   alignItems: 'center',
   padding: 10,
   borderRadius: 10,
   borderBottomWidth: 1,
   borderBottomColor: '#c1c1c1',
 },
 leftArea:{
    flexDirection:'row',
    alignItems:'center',
 },
serviceImage:{
    width: 60,
    height: 60,
    marginRight:5,
 },
dataText:{
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
},
nomeServicoText:{
    fontSize: 16,
    fontWeight: 'bold',
},
cidadeText:{
    fontSize: 16,
    
},
})