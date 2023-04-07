import { requestBackgroundPermissionsAsync, stopLocationUpdatesAsync } from 'expo-location';
import React from 'react'
import { StyleSheet, Text,Image,TouchableOpacity, Modal,View} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { cores } from '../style/globalStyle';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Api from '../Api';
import Novo from './Novo';

const ModalServicos = ({modalVisible,setModalVisible,servico}) => {
  const navigation = useNavigation();

  const handleServicePress  = (servico) =>{
    setModalVisible(false);
    navigation.navigate('Servico',{
      cidade: "Teste",
      servico: servico

    })
 } 

  return (
  
        <Modal visible={modalVisible} animationType="slide" transparent={true} onRequestClose={()=>setModalVisible(false)}>
           
            <View style={styles.Box}>
                <View style={styles.BoxBody}>
                    <TouchableOpacity onPress={()=>setModalVisible(false)}>
                       <View style={styles.closeButton}></View>
                    </TouchableOpacity>
                    <Image source={{uri:`${Api.base_storage}/${servico.imagens[0].imagem}`,}} style={styles.imagem}/>
                    <View style={styles.detailArea}>
                      <View style={styles.nameLine}>  
                            <Text style={styles.serviceName}>{servico.nome}</Text>
                            <Entypo name="dot-single" size={14} color="black" />
                            {servico.stars>0&&<FontAwesome name="star" size={16} color={cores.dourado} />}
                            {servico.stars>0?<Text style={styles.serviceStarText}>{String(servico.stars).length === 1 ? servico.stars+'.0': servico.stars}</Text>:<Novo/>}
                      </View>
                      <View style={styles.bottomArea}>
                        <View>
                              
                            <Text style={styles.servicePriceText}>A partir de R$ {servico.preco}</Text>
                        </View>
                        <TouchableOpacity style={styles.button} onPress={()=>handleServicePress(servico)}>
                             <Text style={styles.buttonText}>Mais Detalhes</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                   
                </View>
            </View>
        </Modal>
 
  )
}

export default ModalServicos


const styles = StyleSheet.create({
   
    Box:{
        width: '100%',
        height: '100%',
        justifyContent:'flex-end',
        alignItems: 'center',
    },
    BoxBody:{
        width: '100%',
        height: 250,
        backgroundColor: '#fff',
        borderTopLeftRadius:30,
        borderTopRightRadius: 30,
        paddingTop: 5,
        paddingLeft: 10,
        paddingRight: 10,
        alignItems: 'center',    
    },
    closeButton:{
        width: 100,
        height: 3,
        backgroundColor: '#c1c1c1',
        borderRadius: 10,
        marginBottom: 10,
    },
   
    imagem:{
      width: '100%',
      height: 150,
      borderRadius:15,
    },
    detailArea:{
        width: '100%',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    nameLine:{
        width:'100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    serviceName:{
      fontSize:18,
      fontWeight: 'bold',
    },
    serviceStarText:{
      fontSize: 14,
    },
    bottomArea:{
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    servicePriceText:{
        fontSize: 14,
    },
    button:{
        backgroundColor: cores.vermelho,
        paddingRight: 15,
        paddingLeft: 15,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 10,
    },
    buttonText:{
       color: '#fff',
       fontWeight: 'bold',
       fontSize: 14,
    },

  
  }); 