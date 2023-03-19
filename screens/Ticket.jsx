import { StyleSheet, Text, SafeAreaView,Image,StatusBar } from 'react-native'
import React from 'react'

const Ticket = ({route}) => {
    const {agendamento} = route.params;
  return (
    <SafeAreaView style={styles.container}>
        <StatusBar
                animated={true}
                backgroundColor='#ffc'
                barStyle="dark-content"
      />
      <Text style={styles.text}>COMPROVANTE DE AGENDAMENTO DE ATIVIDADE</Text>
      <Text style={styles.text}>TRIPSUN</Text>
      
      <Text style={styles.text}>{agendamento.servico.nome}</Text>
      <Text style={styles.text}>SERVICE PROVIDER</Text>
      <Text style={styles.text}>{agendamento.servico.nome}</Text>
      <Image style={styles.qrcode} source={{uri:'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Example',}}/>
      <Text style={styles.text}>{agendamento.codigo}</Text>
    </SafeAreaView>
  )
}

export default Ticket

const styles = StyleSheet.create({
  
container: {
    flex: 1,
    backgroundColor: '#ffc',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 10,
    },
    body:{
    flex:1,
    alignItems:'center',
    justifyContent: 'flex-start',
    paddingTop: 10,
   },
  text:{
   marginBottom: 10,
  },
  qrcode:{
   height: 150,
   width: 150,
   marginBottom: 10,
  }

})