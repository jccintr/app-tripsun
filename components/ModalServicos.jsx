import { requestBackgroundPermissionsAsync } from 'expo-location';
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text,Image,TouchableOpacity, Modal,View} from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import imagem from '../assets/atividade.jpeg';


const ModalServicos = ({modalVisible,setModalVisible}) => {
  return (
  
        <Modal visible={modalVisible} animationType="slide" transparent={true} onRequestClose={()=>setModalVisible(false)}>
           
            <View style={styles.Box}>
                <View style={styles.BoxBody}>
                    <View style={styles.headerArea}>
                        <TouchableOpacity onPress={()=>setModalVisible(false)}>
                            <EvilIcons name="close" size={22} color="black" />
                        </TouchableOpacity>
                    </View>
                    <Image source={imagem} style={styles.imagem}/>
                    <Text>Modal !!</Text>
                   
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
        height: 300,
        backgroundColor: '#fff',
        borderTopLeftRadius:15,
        borderTopRightRadius: 15,
        padding: 15,
        alignItems: 'center',
        
    },
    headerArea:{
       alignItems:'flex-end',
    },
    imagem:{
      width: 300,
      height: 150,
      borderRadius:15,
    },
    
 
   
    
  }); 