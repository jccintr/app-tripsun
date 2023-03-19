import React, {useEffect, useState,useContext} from 'react';
import DataContext from '../context/DataContext';
import Header3 from '../components/Header3';
import { StyleSheet,Text,SafeAreaView,Dimensions,View,ScrollView,ActivityIndicator,StatusBar} from 'react-native';
import { cores } from '../style/globalStyle';
import Api from '../Api';
import { useNavigation } from '@react-navigation/native';
import AgendamentoCard from '../components/AgendamentoCard';

const Agendamentos = () => {
  const screenWidth = Dimensions.get('window').width;
  const {loggedUser} = useContext(DataContext);
  const [agendamentos,setAgendamentos] = useState([]);
  const [isLoading,setIsLoading] = useState(false);
  const navigation = useNavigation();


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


const onAgendamentoPress = (agendamento) => {
  // alert('press');
  navigation.navigate('DetAgendamento',{agendamento:agendamento});

}


  return (
    <SafeAreaView style={styles.container}>
       <StatusBar
                animated={true}
                backgroundColor={cores.vermelho}
                barStyle="dark-content"
      />
      <Header3  title="Meus Agendamentos"/>
      {isLoading &&
        <View style={styles.bodyLoading}>
           <Text style={styles.loadingMessage}>Aguarde por favor</Text>
           <Text style={styles.loadingMessage}>Estamos recuperando os seus agendamentos</Text>
           <ActivityIndicator  size="large" color={cores.vermelho}/>
        </View>
      }
     

      {!isLoading&&<View style={styles.body}>
         <Text style={styles.textMessage}>Você tem {agendamentos.length} {agendamentos.length>1?'atividades agendadas.':'atividade agendada.'}</Text>
         <ScrollView style={{width: screenWidth}} contentContainerStyle={{alignItems:'center'}} showsVerticalScrollIndicator={false}>
           {agendamentos.map((agendamento)=><AgendamentoCard key={agendamento.id} agendamento={agendamento} onPress={onAgendamentoPress}/>)}
         </ScrollView>
      </View>}
      
    </SafeAreaView>
  )
}

export default Agendamentos

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