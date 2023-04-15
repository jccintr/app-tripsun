import { StyleSheet, Text, View,Modal,TouchableOpacity } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { cores } from '../style/globalStyle';
import { useNavigation } from '@react-navigation/native';


const ModalFalhaAgendamento = ({modalVisible,setModalVisible,erroAgendamento}) => {
    const navigation = useNavigation();
    return (
        <Modal visible={modalVisible} animationType="slide" transparent={true} onRequestClose={()=>setModalVisible(false)}>
          <View style={styles.modalArea}>
            <View style={styles.modalBody}>
               <MaterialCommunityIcons name="emoticon-sad-outline" size={80} color={cores.vermelho} />
               <Text style={styles.agendamentoText}>Tivemos um problema !</Text>
               <Text style={styles.text}>{erroAgendamento}</Text>
               
               <TouchableOpacity onPress={()=>setModalVisible(false)}style={styles.button}>
                  <Text style={styles.buttonText}>Tentar Novamente</Text>
                </TouchableOpacity>
            </View>
          </View>
        </Modal>
   
  )
}

export default ModalFalhaAgendamento

const styles = StyleSheet.create({

    modalArea:{
        flex:1,
        justifyContent:'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        },
    modalBody:{
        width: '100%',
        height: '40%',
        backgroundColor: '#fff',
        borderTopLeftRadius:30,
        borderTopRightRadius: 30,
        paddingTop: 5,
        paddingLeft: 10,
        paddingRight: 10,
        alignItems: 'center',    
        justifyContent: 'space-between',
        
    },
    agendamentoText:{
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 20,
        fontSize: 18,
    },
    text:{
        width: '100%',
        color: '#000',
        marginBottom: 20,
        fontSize: 16,
        textAlign: 'center',
    },
    button:{
        

        backgroundColor: cores.vermelho,
        justifyContent:'center',
        alignItems: 'center',
        borderRadius: 10,
        height:50,
        width: '100%',
        marginBottom: 10,
      


      },
      buttonText:{
        color: '#fff',
        fontWeight: 'bold',
      }

})