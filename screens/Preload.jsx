import React from 'react'
import { StyleSheet, ImageBackground, SafeAreaView } from 'react-native';
import splash from '../assets/tripsun-splash2.png';

const Preload = () => {
  return (
   <SafeAreaView style={styles.container}>
    <ImageBackground source={splash} style={styles.image}/>
   </SafeAreaView>
  )
}

export default Preload


const styles = StyleSheet.create({
    container: {
        flex:1,
      
    },
    image:{
        flex: 1,
        justifyContent: 'center',
    }
  });
  