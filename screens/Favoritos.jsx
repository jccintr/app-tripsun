import React, {useEffect, useState,useContext} from 'react';
import DataContext from '../context/DataContext';
import Header3 from '../components/Header3';
import { StyleSheet,Text,SafeAreaView,Dimensions,View,ScrollView,ActivityIndicator,StatusBar} from 'react-native';
import { cores } from '../style/globalStyle';
import Api from '../Api';
import { useNavigation } from '@react-navigation/native';
import FavoritoCard from '../components/FavoritoCard';


const Favoritos = () => {
  const screenWidth = Dimensions.get('window').width;
  const {loggedUser,favoritos} = useContext(DataContext);
 
  const [isLoading,setIsLoading] = useState(false);
  const navigation = useNavigation();

/*
  useEffect(()=>{
     const getAgendamentos = async (idUsuario) => {
       setIsLoading(true);
       let response = await Api.getAgendamentosByUser(idUsuario);
       if (response.status === 200){
          let json = await response.json();
          setAgendamentos(json);
       } 
      setIsLoading(false);
    
    }
    getAgendamentos(loggedUser.id); 
},[]);
*/

const onFavoritoPress = (favorito) => {
  navigation.navigate('Servico',{servico:favorito});
}

  return (
    <SafeAreaView style={styles.container}>
       <StatusBar
                animated={true}
                backgroundColor={cores.vermelho}
                barStyle="dark-content"
      />
      <Header3  title="Meus Favoritos"/>
      
      {!isLoading&&favoritos.length>0&&<View style={styles.body}>
         
         <ScrollView style={{width: screenWidth}} contentContainerStyle={{alignItems:'center'}} showsVerticalScrollIndicator={false}>
           {favoritos.map((favorito)=><FavoritoCard key={favorito.id} favorito={favorito} onPress={onFavoritoPress}/>)}
         </ScrollView>
      </View>}



      {!isLoading && favoritos.length===0&&
        <View style={styles.bodyLoading}>
           <Text style={styles.loadingMessage}>Você não possui favoritos.</Text>
         
        </View>
      }
      
    </SafeAreaView>
  )
}

export default Favoritos

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
   },
  body:{
    flex:1,
    alignItems:'center',
    justifyContent: 'flex-start',
    paddingTop: 10,
   
  },
  bodyLoading:{
    flex:1,
    alignItems:'center',
    justifyContent: 'center',
   
  },
  loadingMessage:{
    color: cores.vermelho,
  },
  textMessage:{
   
    fontSize: 14,
  }

})