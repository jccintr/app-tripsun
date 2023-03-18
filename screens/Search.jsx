import React, { useState, useEffect } from 'react'
import { StyleSheet,Image, SafeAreaView,Dimensions,View,StatusBar} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MapView, {Marker} from 'react-native-maps';
import Header from '../components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Api from '../Api';
import InputField from '../components/InputField';
import { cores } from '../style/globalStyle';
import ModalServicos from '../components/ModalServicos';
import { useContext } from "react";
import DataContext from '../context/DataContext';

const Search = () => {
  const navigation = useNavigation();
  const {nomeCidade,setNomeCidade} = useContext(DataContext);
  //const [nomeCidade,setNomeCidade] = useState('');
  const [servicos,setServicos] = useState([]);
  const [latitude,setLatitude] = useState(0);
  const [longitude,setLongitude] = useState(0);
  const [searchText,setSearchText] = useState('');
  const [modalVisible,setModalVisible] = useState(false);
  const [servicoSelecionado,setServicoSelecionado] = useState(null);
  

  useEffect(()=>{
    const getCityId = async () => {
        const id = await AsyncStorage.getItem('@cityId');
        const lat = await AsyncStorage.getItem('@userLat');
        const lng  = await AsyncStorage.getItem('@userLng');
        console.log("id="+id+" lat="+lat+" lng="+lng);
        setLatitude(parseFloat(lat));
        setLongitude(parseFloat(lng));
       
        if(id) {
          let json = await Api.getCidade(id,lat,lng);
          // setNomeCidade(json.nome + ","+json.estado);
           setServicos(json.servicos);
          
           
        }
    }
    getCityId();
  }, []);

  const OnPressMarker = (e,servico) => {
    
    setServicoSelecionado(servico);
    setLatitude(parseFloat(servico.latitude)),
    setLongitude(parseFloat(servico.longitude)),
    setModalVisible(true);
    
  }

  const onSearchHandle = (t) => {
     setSearchText(t);
  }


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
                animated={true}
                backgroundColor={cores.vermelho}
                barStyle="dark-content"
      />
       <Header nomeCidade={nomeCidade}/>
        <View style={styles.body}>
          <View style={styles.searchInputArea}>
            <InputField 
              iconProvider="FontAwesome"
              iconName="search"
              placeholder="Buscar atividades"
              value={searchText}
              onChangeText={t=>onSearchHandle(t)}
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
           {servicos.filter((servico)=>servico.nome.toUpperCase().includes(searchText.toUpperCase())).slice(0,20).map((servico) => ( 
              <Marker  onPress={e=>OnPressMarker(e,servico)} title={servico.nome} key={servico.id} coordinate={{latitude: parseFloat(servico.latitude), longitude: parseFloat(servico.longitude)}}>
                <View key={servico.id} style={styles.markerView}>
                   <Image key={servico.id} style={styles.markerImage} source={{uri:`${Api.base_storage}/${servico.marcador}`,}} />
                </View>
              </Marker>
            ))} 
             </MapView>
        </View>
        {servicoSelecionado?<ModalServicos modalVisible={modalVisible} servico={servicoSelecionado} setModalVisible={setModalVisible}/>:''}
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