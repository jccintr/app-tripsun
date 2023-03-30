import React from 'react'
import { StyleSheet,Text,View} from 'react-native';
import { cores } from '../style/globalStyle';

const Titulo = ({titleText}) => {
  return (
    <View style={styles.container}>
       <Text style={styles.sectionTitle}>{titleText}</Text>
       <View style={styles.linha}></View>
    </View>
  )
}

export default Titulo


const styles = StyleSheet.create({
    container: {
       
       flexDirection: 'column',
        alignItems: 'center',
               
      },
    sectionTitle:{
      fontWeight:'bold',
      fontSize: 20,
    },
    linha:{
      marginTop: 5,
      width: 80,
      height: 2,
      backgroundColor: cores.vermelho,
    }
   
   
    
  });