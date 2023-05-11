import { StyleSheet, Text, View,Modal,TouchableOpacity,Image } from 'react-native'
import React from 'react'
import { Entypo,EvilIcons } from '@expo/vector-icons';
import { cores } from '../style/globalStyle';


/*
https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=jjjhhhnnn
*/

const formataData = (d) =>{
  let data = d.substring(0,10);
  let arr = data.split('-');
  return arr[2]+'/'+arr[1]+'/'+arr[0];
}
const formataHorario = (d) =>{
     return d.substring(11,16);
 }



const ModalComprovante = ({agendamento,modalVisible,setModalVisible}) => {
    return (
        <Modal visible={modalVisible} animationType="slide" transparent={true} onRequestClose={()=>setModalVisible(false)}>
          <View style={styles.modalArea}>
            <View style={styles.modalBody}>
               <TouchableOpacity style={styles.headerArea} onPress={()=>setModalVisible(false)}>
                   <EvilIcons name="close" size={24} color="black" />
                </TouchableOpacity>
               
                <Text style={{fontWeight:'bold',}}>COMPROVANTE DE AGENDAMENTO DE ATIVIDADE</Text>
                <Text style={{fontWeight:'bold',}}>TRIPSUN</Text>
                <View style={styles.linhaDivisoria}/>
                <Text style={{fontWeight:'bold',}}>{agendamento.servico.nome}</Text>
                <Text style={styles.text}>{agendamento.prestador.nome}</Text>
                <Text style={styles.text}>{formataData(agendamento.data_agendamento)} - {formataHorario(agendamento.data_agendamento)}</Text>
                <Text style={styles.text}>{agendamento.user.name}</Text>
                <Text style={styles.text}>Válido para {agendamento.quantidade} {agendamento.quantidade>1?'pessoas':'pessoa'}</Text>
                <Image style={styles.qrcode} source={{uri:`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${agendamento.codigo}`}}/>
                <Text style={styles.text}>{agendamento.codigo}</Text>
                
            </View>
          </View>
        </Modal>
   
  )
}

export default ModalComprovante

const styles = StyleSheet.create({

    modalArea:{
        flex:1,
        justifyContent:'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        },
    modalBody:{
        width: '100%',
        height: '60%',
        backgroundColor: '#fff',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        paddingTop: 5,
        paddingLeft: 10,
        paddingRight: 10,
        alignItems: 'center',    
        justifyContent: 'space-between',
        paddingBottom: 20,
    },
    headerArea:{
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
     
    },
    modalTitleText:{
      fontWeight: 'bold',
      fontSize: 18,
  },
  qrcode:{
    height: 150,
    width: 150,
    marginBottom: 10,
   },
   linhaDivisoria:{
     width: '100%',
     height: 1,
     borderBottomColor: '#000',
     borderBottomWidth:1,
     
   }
  





})