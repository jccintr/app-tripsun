import React, { useState, useEffect } from 'react'
import { StyleSheet, Text,Image, SafeAreaView,Dimensions,View} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import MapView, {Marker} from 'react-native-maps';
import Header from '../components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Api from '../Api';


const Search = () => {
  const navigation = useNavigation();
  const [nomeCidade,setNomeCidade] = useState('');
  const [servicos,setServicos] = useState([]);
  const [latitude,setLatitude] = useState(0);
  const [longitude,setLongitude] = useState(0);
  

  useEffect(()=>{
    const getCityId = async () => {
        const id = await AsyncStorage.getItem('@cityId');
        const lat = await AsyncStorage.getItem('@userLat');
        const lng  = await AsyncStorage.getItem('@userLng');
        setLatitude(parseFloat(lat));
        setLongitude(parseFloat(lng));
        console.log(parseFloat(lng));
        if(id) {
          let json = await Api.getCidade(id,lat,lng);
           setNomeCidade(json.nome + ","+json.estado);
        
           setServicos(json.servicos);
           
        }
    }
    getCityId();
  }, []);

  



  return (
    <SafeAreaView style={styles.container}>
       <Header nomeCidade={nomeCidade}/>
        <View style={styles.body}>
           <MapView
             style={styles.map}
             showsUserLocation={true}
             showsMyLocationButton={false}
           
             region={{
              latitude: latitude,
              longitude: longitude,
              latitudeDelta: 0.009,
              longitudeDelta: 0.009*Dimensions.get('window').width/Dimensions.get('window').height,
             }}

           >

           </MapView>
        </View>
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
   
 
    
  },
  body:{
    flex:1,
    alignItems:'center',
    justifyContent: 'flex-start',
 
  },
 map:{
   width: Dimensions.get('window').width,
   height: Dimensions.get('window').height,
 },
 
 
  
}); 