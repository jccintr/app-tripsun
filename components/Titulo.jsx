import React from 'react'
import { StyleSheet, Text,Image,FlatList, SafeAreaView,TouchableOpacity,View,ScrollView} from 'react-native';
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
      fontSize: 24,
    },
    linha:{
        marginTop: 5,
      width: 100,
      height: 3,
      backgroundColor: cores.vermelho,
    }
   
   
    
  });