import React, { useState, useEffect } from 'react'
import { StyleSheet, Text,Image,FlatList, SafeAreaView,TouchableOpacity,View} from 'react-native';
import * as Location from 'expo-location';
import { cores } from '../style/globalStyle';
import logo from '../assets/logo-tripsun.png'
import { Feather } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';

const Local = () => {
    const navigation = useNavigation();
    const [location,setLocation] = useState(null);
    const [latitude,setLatitude] = useState(0);
    const [longitude,setLonngitude] = useState(0);
    const [cidadeAtual,setCidadeAtual] = useState(null);
    const [cidadeSelecionada,setCidadeSelecionada] = useState('');
    const [cityFound,setCityfound] = useState(false);
    const [cidades,SetCidades] = useState([
        {id: 1, nome: 'Guarujá'},
        {id: 2, nome: 'Ubatuba'},
        {id: 3, nome: 'Taubaté'},
        {id: 4, nome: 'São Sebastião'},
        {id: 5, nome: 'Caraguatatuba'},
        {id: 6, nome: 'Brazópolis'},
     ]);



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
            for (let item of response) {
              // let address = `${item.street},${item.name}, ${item.postalCode}, ${item.district}`;
              let address = `${item.district}`;
              setCidadeAtual(address);
              for(var i=0; i<cidades.length; i++){
                if (cidades[i].nome === address){
                    setCityfound(true);
                }
              }
              
            }
          }
       
        })();
      
      }, []);


  



  return (
    <SafeAreaView style={styles.container}>

       <Image source={logo} style={styles.logo}/>
       <View style={styles.inputArea}> 
       {!cidadeAtual ? <Text style={{color: cores.amarelo, fontSize:14}}>Estamos determinando a sua localização.</Text> : 
       <View style={{alignItems:'center'}}>
         <Text style={{color: '#fff', fontSize:14}}>Neste momento você está em</Text>
         <Text style={{color: '#fff'}}>{cidadeAtual}</Text>
         
         {cityFound ? (<TouchableOpacity style={styles.button}>
         <Text style={styles.buttonText} onPress={()=> alert(`Ir para ${cidadeAtual}`)}>Visite {cidadeAtual} no Tripsun</Text>
       </TouchableOpacity>) : <Text style={{margin:10,fontSize:14,color:'#fff'}}>Mas {cidadeAtual} ainda não está no Tripsun</Text>}
        
        </View>}
       
       <Text style={{color: cores.amarelo, fontSize:14, margin:10}}>{cityFound?'Ou selecione outra cidade na lista abaixo:':'Por favor, selecione outra cidade:'}</Text>
       
       {cidades.map((cidade) => (
        <TouchableOpacity key={cidade.id} onPress={()=>setCidadeSelecionada(cidade.nome)}>
          <Text style={cidade.nome===cidadeSelecionada ? styles.itemTextSelected:styles.itemText} >{cidade.nome}</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity style={styles.button}>
         <Text style={styles.buttonText} onPress={()=>navigation.navigate('Cidade')}>Continuar</Text>
       </TouchableOpacity>
      </View>
    </SafeAreaView>
  )



{
    /*
    <FlatList 
         style={{height: 100}}
         data={cidades}
         renderItem={({item})=> <Text style={styles.itemText}>{item.key}</Text>}
       />
    */
}

}

export default Local

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: cores.vermelho,
      alignItems: 'center',
      justifyContent: 'center',
      
    },
    logo: {
      width: 210,
      height: 53,
      marginBottom: 20,
    },
    itemText:{
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',

    },
    itemTextSelected:{
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        borderWidth: 1,
        borderColor: '#fff',
        padding: 10,
        borderRadius: 10,
  
      },
   
    inputArea: {
      width: '100%',
      paddingLeft: 40,
      paddingRight:40,
    },
   
    
    button: {
      marginTop: 20,
      height: 50,
      backgroundColor: cores.amarelo,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      width: '100%',
      
    },
    buttonText: { 
     fontSize: 16,
     color: cores.vermelho,
     fontWeight: 'bold',
   }
  });

