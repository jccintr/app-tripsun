import React, { useState, useEffect } from 'react'
import { StyleSheet, Text,Image,TouchableOpacity,View} from 'react-native';
import Api from '../Api';
import banner from '../assets/banner.jpeg';

const Banner = () => {
  return (
    <View style={styles.container}> 
      <Image source={banner}  style={styles.banner}></Image>
    </View>
  )
}

export default Banner



const styles = StyleSheet.create({
   
    container: {
     
     alignItems: 'center',
     

    },
    banner:{
        width: '95%',
        height:100,
        borderRadius:10,
    }
   
    
  });