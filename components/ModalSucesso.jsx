import { StyleSheet, Text, View,Modal,TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { cores } from '../style/globalStyle';
import { useNavigation } from '@react-navigation/native';

const ModalSucesso = ({modalVisible,setModalVisible}) => {
    const navigation = useNavigation();
    return (
        <Modal visible={modalVisible} animationType="slide" transparent={true} onRequestClose={()=>setModalVisible(false)}>
          <View style={styles.modalArea}>
            <View style={styles.modalBody}>
               <Ionicons name="md-cloud-done-sharp" size={80} color="#11823b" />
               <Text style={styles.agendamentoText}>Agendamento efetuado com sucesso !</Text>
               <Text style={styles.text}>Os detalhes do agendamento podem ser acessados pela opção Meus Agendamentos na tela Perfil.</Text>
               <Text style={styles.text}>Desejamos a você uma ótima experiência !</Text>
               <TouchableOpacity onPress={()=>navigation.navigate('MainTab')}style={styles.button}>
                  <Text style={styles.buttonText}>Retornar a Tela Principal</Text>
                </TouchableOpacity>
            </View>
          </View>
        </Modal>
   
  )
}

export default ModalSucesso

const styles = StyleSheet.create({

    modalArea:{
        flex:1,
        justifyContent:'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        },
    modalBody:{
        width: '100%',
        height: '50%',
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