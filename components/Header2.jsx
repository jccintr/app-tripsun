import React from 'react'
import { StyleSheet,View,Text,TouchableOpacity } from 'react-native';
import { cores } from '../style/globalStyle';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


const Header2 = ({title,nomeCidade}) => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.titleArea} onPress={()=>navigation.goBack()}>
                
                    <Ionicons name="chevron-back" size={30} color="#fff" />
                    <Text style={styles.title}>{title}</Text>
               
            </TouchableOpacity>
            <View style={{flexDirection:'row', justifyContent:'flex-start',alignItems:'center'}}>
                <Text style={styles.headerCityName}>{nomeCidade}</Text>
                <Ionicons name="location" size={18} color={cores.amarelo} />
            </View>
        </View>
      )
}

export default Header2

const styles = StyleSheet.create({
    container: {
      
      backgroundColor: cores.vermelho,
      alignItems: 'center',
      justifyContent: 'space-between',
      height: 60,
      width: '100%',
      flexDirection:'row',
      paddingLeft:10,
      paddingRight:5,
      
    },
    titleArea:{
        flexDirection: 'row',
        alignItems:'center',
    },
    title:{
    
        fontSize:20,
        color:'#fff',
        fontWeight: 'bold',
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
  