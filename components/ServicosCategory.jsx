import React, { useState } from 'react'
import { StyleSheet, Text,Image,TouchableOpacity,View} from 'react-native';
import Api from '../Api';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { cores } from '../style/globalStyle';
import { useNavigation } from '@react-navigation/native';

const SortSelect = ({sortField,setSortField}) => {
  //console.log('sortfield==='+sortField);
  return (
    <View style={styles.SortSelectContainer}>
      <FontAwesome style={{marginRight:5}} name="sort-amount-asc" size={14} color="black" />
       <TouchableOpacity style={styles.SortSelectItem} onPress={()=>setSortField(0)}>
         <Text style={sortField===0?styles.SortSelectItemTextSelected:styles.SortSelectItemText}>Distância</Text>
       </TouchableOpacity>
       <TouchableOpacity style={styles.SortSelectItem} onPress={()=>setSortField(1)}>
         <Text style={sortField===1?styles.SortSelectItemTextSelected:styles.SortSelectItemText}>Preço</Text>
       </TouchableOpacity>
    </View>
  );
  
}



const ServicosCategory = ({servicos,categoria,idSubcategoriaSelecionada}) => {
  const navigation = useNavigation();
  const [sortField,setSortField] = useState(0);
  
  const filtraServicos = (servico) =>{
      if (idSubcategoriaSelecionada)
          return servico.categoria_id===categoria.id&servico.subcategoria_id===idSubcategoriaSelecionada
      else
           return servico.categoria_id===categoria.id
  }

  const sortService = (a,b,sortField) =>{

    if (sortField===0)
       return a.distancia - b.distancia;
    else
       return parseFloat(a.preco) - parseFloat(b.preco);   
  }

  const handleServicePress  = (servico) =>{
  
    navigation.navigate('Servico',{
      
      cidade: "Teste",
      servico: servico

    })
 } 

     return (
      <>
      <SortSelect sortField={sortField} setSortField={setSortField}/>
        <View style={styles.container}>
           
           {servicos.filter(servico=>filtraServicos(servico)).sort((a,b)=>sortService(a,b,sortField)).map((servico) => (
          
              <TouchableOpacity style={styles.serviceCard} key={servico.id} onPress={()=>handleServicePress(servico)}>
                      <Image style={styles.serviceImage} source={{uri:`${Api.base_storage}/${servico.imagem}`,}}/>
                      <View style={styles.serviceDetailsArea}>
                        <Text style={styles.serviceName}>{servico.nome}</Text>
                        <View style={styles.secondLine}>
                              <FontAwesome name="star" size={16} color={cores.dourado} />
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
     width:'90%',
      marginTop:10,
      flexDirection: 'row',
      alignItems:'center',
      justifyContent:'flex-end',
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
       margin: 2,
       color: cores.vermelho,
       fontWeight: 'bold',
    },
  
  });