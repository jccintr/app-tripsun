import React, { useState, useEffect } from 'react'
import { StyleSheet, ImageBackground, SafeAreaView,ActivityIndicator,StatusBar,Platform } from 'react-native';
import * as Location from 'expo-location';
import splash from '../assets/tripsun-splash2.png';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Api from '../Api';
import { useContext } from "react";
import DataContext from '../context/DataContext';
import { cores } from '../style/globalStyle';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});


// pede permisao para enviar notificacoes
async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}



const Preload = () => {
  const navigation = useNavigation();
  const {loggedUser,setLoggedUser,setFavoritos,expoPushToken,setExpoPushToken} = useContext(DataContext);
  const [location,setLocation] = useState(null);
  const [latitude,setLatitude] = useState(0);
  const [longitude,setLongitude] = useState(0);
  const [cidadeAtual,setCidadeAtual] = useState(null);

  const [cityFound,setCityfound] = useState(null);
  const [cidades,setCidades] = useState([]);
  //const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    // notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
    //   setNotification(notification);
    // });


    // responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
   //    console.log(response);
   //  });

    // return () => {
    //   Notifications.removeNotificationSubscription(notificationListener.current);
    //  Notifications.removeNotificationSubscription(responseListener.current);
    // };
  }, []);




useEffect(()=>{
  if (cityFound){
   
    if(loggedUser!=null){
      navigation.reset({routes:[{name:'MainTab'}]});
    }else {
      navigation.reset({routes:[{name:'SignIn2'}]});
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
      
        let address = 'Guarujá';
       // let address = 'Brasópolis';
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
          console.log(e);
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
         let ret = await Api.savePushToken(jsonUser.id,expoPushToken);
         setLoggedUser(jsonUser);
         setFavoritos(jsonUser.favoritos);
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
    <StatusBar
            animated={true}
            backgroundColor={cores.laranja}
            barStyle="dark-content"
      />
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
