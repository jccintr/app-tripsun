import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { cores } from '../style/globalStyle'

const Novo = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>NOVO</Text>
    </View>
  )
}

export default Novo

const styles = StyleSheet.create({

 container:{
    borderColor: cores.dourado,
    borderWidth:1,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:5,
 },
 text:{
    fontSize: 12,
    color: cores.dourado,
 }, 
})