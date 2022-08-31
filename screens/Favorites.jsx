import React, { useState, useEffect } from 'react'
import { StyleSheet, Text,Image,FlatList, SafeAreaView,TouchableOpacity,View} from 'react-native';

const Favorites = () => {
  return (
    <SafeAreaView style={styles.container}>
       <Text>Tela Favorites</Text>
    </SafeAreaView>
  )
}

export default Favorites

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      
    }
   
    
  });