import React from 'react'
import { StyleSheet,View,Image,Text } from 'react-native';
import { cores } from '../style/globalStyle';
import logo from '../assets/logo-tripsun.png';
import { Ionicons } from '@expo/vector-icons';

const Header = () => {
  return (
    <View style={styles.container}>
     <Image source={logo} style={styles.logo}></Image>
     <View style={{flexDirection:'row', justifyContent:'flex-start',alignItems:'center'}}>
          
            <Text style={styles.headerCityName}>Campos do Jordão, SP</Text>
            <Ionicons name="location" size={18} color={cores.amarelo} />
           
         </View>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    container: {
      paddingTop: 25,
      backgroundColor: cores.vermelho,
      alignItems: 'center',
      justifyContent: 'space-between',
      height: 80,
      width: '100%',
      flexDirection:'row',
      paddingLeft:10,
      
    },
    logo: {
       
        width: 140,
        height: 35,
    },
    headerCityName:{
      paddingHorizontal: 5,
      fontSize:12,
      color: '#fff',
    }
  });
  