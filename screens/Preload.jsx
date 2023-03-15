import React, { useState, useEffect } from 'react'
import { StyleSheet, ImageBackground, SafeAreaView,ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import splash from '../assets/tripsun-splash2.png';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Api from '../Api';
import { useContext } from "react";
import DataContext from '../context/DataContext';


const Preload = () => {
  const navigation = useNavigation();
  const {loggedUser,setLoggedUser} = useContext(DataContext);
  const [location,setLocation] = useState(null);
  const [latitude,setLatitude] = useState(0);
  const [longitude,setLongitude] = useState(0);
  const [cidadeAtual,setCidadeAtual] = useState(null);

  const [cityFound,setCityfound] = useState(null);
  const [cidades,setCidades] = useState([]);



useEffect(()=>{
  if (cityFound){
   
    if(loggedUser!=null){
      
      navigation.navigate('MainTab');
    }else {
      navigation.navigate('SignIn2');
    }
    
  }else {
    //if(cidades.length)
     //  navigation.navigate('SelectCity');
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
      
        //let address = 'Guarujá';
        let address = 'Brasópolis';
        setCidadeAtual(address);

        try {
        let cityList = await Api.getCidades();
        if (cityList) {
            setCidades(cityList);
            for(var i=0; i<cityList.length; i++){
              if (cityList[i].nome === address){
                 AsyncStorage.setItem('@cityId', cityList[i].id.toString());
                 AsyncStorage.setItem('@userLat', latitude.toString());
                 AsyncStorage.setItem('@userLng', longitude.toString());
                 await getUser();
                 setCityfound(true);
              }
            }
         }
        } catch (e){
          //console.log(e)
          alert("Falha ao obter dados. Encerre o aplicativo e tente novamente mais tarde.");
        }

      }
      })();

  }, []);

  const getUser = async () =>{
    const token = await AsyncStorage.getItem('token');
    
    if(token!=null){
      let response = await Api.getUser(token);
      
      if(response.status===200){
         let jsonUser = await response.json();
         setLoggedUser(jsonUser);
         return true;
      } else {
        setLoggedUser(null);
        return false;
      }
    } else {
      return false;
    }
  }


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
