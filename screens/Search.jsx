import React, { useState, useEffect } from 'react'
import { StyleSheet, Text,Image,FlatList, SafeAreaView,TouchableOpacity,View} from 'react-native';

const Search = () => {
  return (
    <SafeAreaView style={styles.container}>
       <Text>Tela Search</Text>
    </SafeAreaView>
  )
}

export default Search

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      
    }
   
    
  });