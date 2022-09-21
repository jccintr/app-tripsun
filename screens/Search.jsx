import React, { useState, useEffect } from 'react'
import { StyleSheet, TouchableOpacity,Image, SafeAreaView,Dimensions,View} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import MapView, {Marker} from 'react-native-maps';
import Header from '../components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Api from '../Api';
import InputField from '../components/InputField';
import { cores } from '../style/globalStyle';
import ModalServicos from '../components/ModalServicos';


const Search = () => {
  const navigation = useNavigation();
  const [nomeCidade,setNomeCidade] = useState('');
  const [servicos,setServicos] = useState([]);
  const [latitude,setLatitude] = useState(0);
  const [longitude,setLongitude] = useState(0);
  const [searchText,setSearchText] = useState('');
  const [modalVisible,setModalVisible] = useState(false);
  

  useEffect(()=>{
    const getCityId = async () => {
        const id = await AsyncStorage.getItem('@cityId');
        const lat = await AsyncStorage.getItem('@userLat');
        const lng  = await AsyncStorage.getItem('@userLng');
        setLatitude(parseFloat(lat));
        setLongitude(parseFloat(lng));
       
        if(id) {
          let json = await Api.getCidade(id,lat,lng);
           setNomeCidade(json.nome + ","+json.estado);
           setServicos(json.servicos);
          
           
        }
    }
    getCityId();
  }, []);

  const OnPressMarker = (e,index) => {
    console.log(`marker pressed ${index}`);
    setModalVisible(true);

  }


  return (
    <SafeAreaView style={styles.container}>
       <Header nomeCidade={nomeCidade}/>
        <View style={styles.body}>
          <View style={styles.searchInputArea}>
            <InputField 
              iconProvider="FontAwesome"
              iconName="search"
              placeholder="Buscar atividades"
              value={searchText}
              onChangeText={t=>setSearchText(t)}
              password={false}
            />
          </View>
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
           {servicos.slice(0,20).map((servico) => ( 
              <Marker  onPress={e=>OnPressMarker(e,servico.id)} title={servico.nome} key={servico.id} coordinate={{latitude: parseFloat(servico.latitude), longitude: parseFloat(servico.longitude)}}>
                <View key={servico.id} style={styles.markerView}>
                   <Image key={servico.id} style={styles.markerImage} source={{uri:`${Api.base_storage}/${servico.marcador}`,}} />
                </View>
              </Marker>
            ))} 
             </MapView>
        </View>
        <ModalServicos modalVisible={modalVisible} setModalVisible={setModalVisible}/>
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
 markerView:{
   width: 100,
   height:100,
   flexDirection:'column',
   alignItems: 'center',
 },
 markerImage:{
   width:60,
   height:60,
 },
 searchInputArea:{
    width: '90%',
    height: 50,
    backgroundColor: cores.cinzaClaro,
    position: 'absolute',
    top: 10,
    zIndex:1,
    borderRadius: 15,
    opacity: .8,


 },
 
 
  
}); 