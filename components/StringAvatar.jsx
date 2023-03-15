import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { cores } from '../style/globalStyle'

const StringAvatar = ({text}) => {

const acronimo = (texto) => {
       var matches = texto.match(/\b(\w)/g);

      // return matches.join('');

     // return matches[0]+matches[1];
     return matches.slice(0,2);
}


  return (
    <View style={styles.container}>
      <Text style={styles.Avatarstring}>{acronimo(text)}</Text>
    </View>
  )
}

export default StringAvatar

const styles = StyleSheet.create({

 container:{
   width: 80,
   height: 80,
   borderRadius: 40,
   backgroundColor: '#f00',
   justifyContent: 'center',
   alignItems: 'center',
   marginBottom: 10,
   borderWidth:2,
   borderColor: '#000',
 },
 Avatarstring:{
    color: cores.amarelo,
    fontSize: 30,
    fontWeight: 'bold',
 } 
})