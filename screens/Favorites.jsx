import React from 'react'
import { StyleSheet, Text, SafeAreaView,StatusBar} from 'react-native';
import { cores } from '../style/globalStyle';


const Favorites = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
                animated={true}
                backgroundColor={cores.vermelho}
                barStyle="dark-content"
      />
       <Text>Tela Favoritos</Text>
       <Text>Ainda não disponível</Text>
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