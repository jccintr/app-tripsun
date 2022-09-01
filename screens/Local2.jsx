import React, { useState, useEffect } from 'react'
import { StyleSheet, Text,Image,FlatList, SafeAreaView,TouchableOpacity,View,ActivityIndicator} from 'react-native';
import * as Location from 'expo-location';
import { cores } from '../style/globalStyle';
import logo from '../assets/logo_tripsun-transparente.png'
import { Feather } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import Api from '../Api';


const Local2 = () => {
    const navigation = useNavigation();
    const [location,setLocation] = useState(null);
    const [latitude,setLatitude] = useState(0);
    const [longitude,setLongitude] = useState(0);
    const [cidadeAtual,setCidadeAtual] = useState(null);
    const [cidadeSelecionada,setCidadeSelecionada] = useState('');
    const [cityFound,setCityfound] = useState(false);
    const [cidades,SetCidades] = useState([]);


  const getCidades = async () => {
   
    let res = await Api.getCidades();
    if (res) {
        SetCidades(res);
        for(var i=0; i<cidades.length; i++){
         
          if (cidades[i].nome === cidadeAtual){
              setCityfound(true);
          }
        }
        if (cityFound){
          navigation.navigate('MainTab');
        }else {
          navigation.navigate('SelectCity'); 
        }
    }
}

useEffect(()=>{
  getCidades();
 
}, [cidadeAtual]);






     useEffect(() => {
        (async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('A permissão para acessar a localização foi negada.');
            return;
          }
          let location = await Location.getCurrentPositionAsync({});
          setLocation(location);
          // determina o endereço de acordo com as coordenadas
          if (location) {
            const { latitude, longitude } = location.coords;
            let response = await Location.reverseGeocodeAsync({latitude: latitude,longitude: longitude});
            //console.log(response);
           
              
              let address = response[0].district //`${item.district}`;
              console.log(address);
              getCidades();
              setCidadeAtual(address);
         
          }
       
        })();
      
      }, []);







  return (
    <SafeAreaView style={styles.container}>

      <Image style={styles.logo} source={logo}/>
      <Feather name="map" size={48} color={cores.vermelho} />

      {
      !cidadeAtual ? <Text style={{color: cores.vermelho, fontSize:16,fontWeight:'bold'}}>Estamos determinando a sua localização.</Text> : 
       <View style={{alignItems:'center'}}>
         <Text style={{color: '#fff', fontSize:14}}>Você está em</Text>
         <Text style={{color: '#fff'}}>{cidadeAtual}</Text>
       </View>
       }
       <ActivityIndicator />
       

    </SafeAreaView>
  )
}

export default Local2

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      
    },
    logo:{
      width: 200,
      height:133,
    }
   
    
  });