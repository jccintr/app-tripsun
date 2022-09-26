import React, { useState, useEffect } from 'react'
import { StyleSheet, Text,Image,FlatList, SafeAreaView,TouchableOpacity,View} from 'react-native';

const Profile = () => {
  return (
    <SafeAreaView style={styles.container}>
    <Text>Tela Perfil</Text>
 </SafeAreaView>
  )
}

export default Profile

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      
    }
   
    
  });