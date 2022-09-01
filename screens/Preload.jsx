import React, { useState, useEffect } from 'react'
import { StyleSheet, ImageBackground, SafeAreaView,ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import splash from '../assets/tripsun-splash2.png';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Api from '../Api';

const Preload = () => {
  const navigation = useNavigation();
  const [location,setLocation] = useState(null);
  const [latitude,setLatitude] = useState(0);
  const [longitude,setLongitude] = useState(0);
  const [cidadeAtual,setCidadeAtual] = useState(null);
 
  const [cityFound,setCityfound] = useState(null);
  const [cidades,SetCidades] = useState([]);

  

useEffect(()=>{
  if (cityFound){
    navigation.navigate('MainTab');
  }else {
    if(cidades.length)
       navigation.navigate('SelectCity');
  }
 
}, [cityFound,cidades]);


  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('A permissão para acessar a localização foi negada.');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      if (location) {
        const { latitude, longitude } = location.coords;
        let response = await Location.reverseGeocodeAsync({latitude: latitude,longitude: longitude});
        let address = response[0].district;
        setCidadeAtual(address);
        let cityList = await Api.getCidades();
        if (cityList) {
            SetCidades(cityList);
            for(var i=0; i<cityList.length; i++){
              if (cityList[i].nome === address){
                 setCityfound(true);
                 AsyncStorage.setItem('@cityId', cityList[i].id.toString())
              }
            }
         }
      }
      })();

  }, []);


  return (
   <SafeAreaView style={styles.container}>
    <ImageBackground source={splash} style={styles.image}/>
    <ActivityIndicator style={styles.loading} size="large" color="#fff"/>
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
    },
    loading:{
      position:'absolute',
      left:0,
      right:0,
      top:0,
      bottom:0,
      alignItems: 'center',
      justifyContent: 'flex-end',
    }
  });
  