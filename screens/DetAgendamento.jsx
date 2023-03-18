import React, {useEffect, useState,useContext} from 'react';
import DataContext from '../context/DataContext';
import Header3 from '../components/Header3';
import { StyleSheet,Text,SafeAreaView,Dimensions,View,ScrollView,ActivityIndicator} from 'react-native';
import { cores } from '../style/globalStyle';
import Api from '../Api';
import { useNavigation } from '@react-navigation/native';

const DetAgendamento = ({agendamento}) => {
  return (
    <SafeAreaView style={styles.container}>
       <Header3  title="Detalhes do Agendamento"/>
       {/*
       
       Prezado cliente, o seu agendamento está confirmado e você deve se dirigir ao ponto de encontro da aitividade na data e hora marcadas portando os
       itens obrigatórios, caso eles sejam necessários. Pedimos que chegue com antecedencia de alguns minutos para evitar quaisquer contratempos.
       
        */}
       <Text>Data e hora da sua atividade</Text>
       <Text>O que vocÊ deve levar</Text>
       <Text>O que vocÊ deve levar</Text>
       <Text>gerar ticket</Text>
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
       
      },

})

export default DetAgendamento;