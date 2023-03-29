import React, {useContext} from 'react'
import { StyleSheet, Text,Image,TouchableOpacity,View} from 'react-native';
import Api from '../Api';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { cores } from '../style/globalStyle';
import { useNavigation } from '@react-navigation/native';
import DataContext from '../context/DataContext';

{/* 
{isFavorited?<FontAwesome name="heart" size={20} color={cores.vermelho}/>:<FontAwesome name="heart-o" size={20} color={cores.vermelho} />}  
  */}

const Servicos = ({servicos}) => {
  const navigation = useNavigation();
  const {loggedUser,favoritos} = useContext(DataContext);


  const handleServicePress  = (servico) =>{
  
    navigation.navigate('Servico',{
      
      cidade: "Teste",
      servico: servico

    })
 } 

 const checkFavorited = (servico) => {
  let found = false;
  for (i=0;i<favoritos.length;i++){
     if(servico.id===favoritos[i].id){
       found = true
     }
  }
  return found;
}



  return (
    <View style={styles.container}>
       {servicos.sort((a,b)=>{return a.distancia - b.distancia}).slice(0,15).map((servico) => (
        <TouchableOpacity style={styles.serviceCard} key={servico.id} onPress={()=>handleServicePress(servico)}>
              <View style={{flexDirection:'row'}}>
              <Image style={styles.serviceImage} source={{uri:`${Api.base_storage}/${servico.imagem}`,}}/>

              <View style={styles.serviceDetailsArea}>
                 <Text style={styles.serviceName}>{servico.nome}</Text>
                 <View style={styles.secondLine}>
                      <FontAwesome name="star" style={{marginRight:5}} size={16} color={cores.dourado} />
                      <Text style={styles.serviceStarText}>{String(servico.stars).length === 1 ? servico.stars+'.0': servico.stars}</Text>
                      <Entypo name="dot-single" size={14} color="black" />
                      <Text style={styles.serviceCategory}>{servico.categoria}</Text>
                      <Entypo name="dot-single" size={14} color="black" />
                      <Text style={styles.serviceDistance}>{servico.distancia} km</Text>
                  </View>
                  <Text style={styles.servicePrice}>A partir de R$ {servico.valor}</Text>
              </View>
              </View>
              {checkFavorited(servico)&&loggedUser!=null&&<FontAwesome name="heart" size={20} color={cores.vermelho}/>}  
         </TouchableOpacity>
              ))}
              
    </View>
  )
} 

export default Servicos




const styles = StyleSheet.create({
    
  container: {
    backgroundColor: cores.cinzaClaro,
   
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
    justifyContent:'space-between',
    width: 320,
    height: 65,
  },
  serviceImage:{
     width: 60,
     height: 60,
     borderRadius: 10,
  },
  serviceDetailsArea:{
    flexDirection: 'column',
    paddingLeft:10,
    height: 65,
    justifyContent:'space-around',
    alignItems: 'flex-start',
  },
  serviceName:{
    fontSize: 14,
    fontWeight: 'bold',
  },
  secondLine:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  serviceStarText:{
    fontSize: 12,
   
 },
  serviceCategory:{
    fontSize: 12,
    
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