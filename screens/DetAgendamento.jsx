import React, { useState} from 'react';
import Header3 from '../components/Header3';
import { StyleSheet,Text,SafeAreaView,Dimensions,View,ScrollView,TouchableOpacity,StatusBar} from 'react-native';
import { cores } from '../style/globalStyle';
import { useNavigation } from '@react-navigation/native';
import ModalComprovante from '../components/ModalComprovante';


const formataData = (d) =>{
  let data = d.substring(0,10);
  let arr = data.split('-');
  return arr[2]+'/'+arr[1]+'/'+arr[0];
}
const formataHorario = (d) =>{
     return d.substring(11,16);
 }




const DetAgendamento = ({route}) => {
  const screenWidth = Dimensions.get('window').width;
  const {agendamento} = route.params;
  const navigation = useNavigation();
  const [modalVisible,setModalVisible] = useState(false);


const onGerarTicketPress = () => {
 
 setModalVisible(true);
}




  return (
    <SafeAreaView style={styles.container}>
       <StatusBar
                animated={true}
                backgroundColor={cores.vermelho}
                barStyle="dark-content"
      />
       <Header3  title="Detalhes do Agendamento"/>
      
       
       <ScrollView style={{width: screenWidth,paddingHorizontal:5,paddingTop:10}} contentContainerStyle={{alignItems:'center'}} showsVerticalScrollIndicator={false}>
        
          <Text style={styles.titleText}>Data e Horário de sua Atividade</Text>
            <View style={styles.textContainer}>
                <Text style={styles.descriptionText}>A sua atividade está agendada para o dia {formataData(agendamento.data_agendamento)} as {formataHorario(agendamento.data_agendamento)}.</Text>
            </View>
            <Text style={styles.titleText}>Onde você deve comparecer</Text>
            <View style={styles.textContainer}>
                <Text style={styles.descriptionText}>Você deve comparecer no seguinte endereço para consumir a sua atividade : {agendamento.servico.ponto_encontro}</Text>
            </View>
          <Text style={styles.titleText}>O que você deve levar</Text>
          <View style={styles.textContainer}>
                <Text style={styles.descriptionText}>Para consumir a sua atividade você deve levar, obrigatóriamente, os seguintes itens: {agendamento.servico.itens_obrigatorios}.</Text>
          </View>
          <Text style={styles.titleText}>O que você deve apresentar</Text>
          <View style={styles.textContainer}>
                <Text style={styles.descriptionText}>Para consumir a sua atividade você deve apresentar ao fornecedor do serviço o comprovante de agendamento disponibilizado pelo aplicativo e um documento de identidade.</Text>
          </View> 
          <Text style={styles.titleText}>O que fazer em caso de dúvidas</Text>
          <View style={styles.textContainer}>
                <Text style={styles.descriptionText}>Caso você tenha alguma dúvida, pode entrar em contato com o fornecedor do serviço pelo telefone {agendamento.prestador.telefone}.</Text>
          </View> 
          <TouchableOpacity onPress={onGerarTicketPress} style={styles.botaoGeraTicket}>
                <Text style={styles.botaoGeraTicketText}>Visualizar seu Comprovante</Text>
          </TouchableOpacity>
          <ModalComprovante agendamento={agendamento} modalVisible={modalVisible} setModalVisible={setModalVisible}/>
          </ScrollView>
      

    </SafeAreaView>
  )
}

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
        paddingHorizontal: 5,
        width: Dimensions.get('window').width,
      },
      titleText:{
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 10,
      },
      textContainer:{
        backgroundColor: cores.cinzaClaro,
        width:'100%',
        borderRadius:15,
        padding:10,
      },
      descriptionText:{
          fontSize: 14,
      },
      botaoGeraTicket:{
        backgroundColor: cores.vermelho,
        justifyContent:'center',
        alignItems: 'center',
        borderRadius: 10,
        height:50,
        width: '100%',
        marginTop: 20,
    },
    botaoGeraTicketText:{
        color: '#fff',
        fontSize: 17,
        fontWeight:'bold',
     }

})

export default DetAgendamento;