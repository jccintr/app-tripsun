import { StyleSheet, Text, View,Modal} from 'react-native'
import React, {useState,useEffect} from 'react'
import { Entypo } from '@expo/vector-icons';
import { cores } from '../style/globalStyle';
import Api from '../Api';


const ModalReviews = ({servico,modalVisible,setModalVisible}) => {
  return (
    <View>
      <Text>ModalReviews</Text>
    </View>
  )
}

export default ModalReviews

const styles = StyleSheet.create({

modalArea:{
    flex:1,
    justifyContent:'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    },
modalBody:{
    width: '100%',
    height: 450,
    backgroundColor: '#fff',
    borderTopLeftRadius:30,
    borderTopRightRadius: 30,
    paddingTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: 'center',    
    
},
headerArea:{
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 10,
    },    


})