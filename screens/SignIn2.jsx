import React, { useEffect,useState,useContext } from 'react'
import { StyleSheet,Text,Image, SafeAreaView,View,TouchableOpacity,ActivityIndicator,StatusBar,Platform} from 'react-native';
import { cores } from '../style/globalStyle';
import logo from '../assets/logo-tripsun.png';
import Api from '../Api';
import { useNavigation } from '@react-navigation/native';
import InputField from '../components/InputField';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DataContext from '../context/DataContext';
import Toast from 'react-native-toast-message';
//import * as Device from 'expo-device';
//import * as Notifications from 'expo-notifications';

/*
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
*/


const SignIn2 = () => {
  const {setLoggedUser,loggedUser,setFavoritos,expoPushToken} = useContext(DataContext);
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [isLoading,setIsLoading] = useState(false);
  const navigation = useNavigation();
 // const [expoPushToken, setExpoPushToken] = useState('');

 /*
  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    // notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
    //   setNotification(notification);
    // });


    // responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
    //   console.log(response);
    // });

    // return () => {
    //   Notifications.removeNotificationSubscription(notificationListener.current);
    //  Notifications.removeNotificationSubscription(responseListener.current);
    // };
  }, []);
*/

const CadastroCompleto = (json) => {
   
   if(json.documento !== null && json.logradouro !== null && json.numero !== null & json.bairro !== null && json.cep !== null && json.cidade !== null & json.estado !== null ){
      return true;
   } else {
      return false;
   }

}




const onSignIn = async () => {
  setIsLoading(true);
  if(email != '' && password != ''){
      
      let response = await Api.signIn(email, password);
      
      if(response.status===200){
        const json = await response.json();
        await AsyncStorage.setItem('token', json.token);
        let ret = await Api.savePushToken(json.id,expoPushToken);
        setLoggedUser(json);
        setFavoritos(json.favoritos);
        if (CadastroCompleto(json)){
           Toast.show({type: 'success', text1: 'Olá '+json.name+'! Seja bem-vindo ao TripSun.'});
        } else {
          Toast.show({type: 'success', text1: 'Olá '+json.name+'! Seja bem-vindo ao TripSun.',text2: 'Não esqueça de completar o seu cadastro na aba Perfil.'});
        }
        
        navigation.reset({routes:[{name:'MainTab'}]});
      } else {
        setEmail('');
        setPassword('');  
        Toast.show({type: 'error', text1: 'Email e ou usuário inválidos!'});
      }

    } else {
      Toast.show({type: 'error', text1: 'Informe o seu e-mail e a sua senha por favor!'});
    }
setIsLoading(false);

}



  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
                animated={true}
                backgroundColor={cores.vermelho}
                barStyle="dark-content"
      />
     <View style={styles.header}>   
        <Image source={logo} style={styles.logo}/>
        <Text style={styles.headerText}>Login</Text>
     </View>
     <View style={styles.inputArea}>
        <InputField 
            iconProvider="AntDesign"
            iconName="mail"
            placeholder="Digite o seu e-mail"
            value={email}
            onChangeText={t=>setEmail(t)}
            password={false}
        />
        <InputField 
            iconProvider="AntDesign"
            iconName="lock1"
            placeholder="Digite a sua senha"
            value={password}
            onChangeText={t=>setPassword(t)}
            password={true}
        />
        <TouchableOpacity onPress={onSignIn} style={styles.button}>
            {!isLoading?<Text style={styles.buttonText}>ENTRAR</Text>:<ActivityIndicator  size="large" color={cores.branco}/>}
        </TouchableOpacity>
       <TouchableOpacity onPress={() => navigation.navigate('SignUp2')} style={styles.signUpMessage}>
          <Text style={styles.signUpMessageText}>Não tem uma conta?</Text>
          <Text style={styles.signUpMessageTextBold}> Cadastre-se!</Text>
        </TouchableOpacity>
        <Text style={{textAlign: 'center',marginTop:20}}>ou</Text>
        <TouchableOpacity onPress={() => navigation.reset({routes:[{name:'MainTab'}]})} style={styles.signUpMessage}>
            <Text style={styles.guestMessage} >Entre como convidado</Text>
        </TouchableOpacity>
     </View> 
   </SafeAreaView>
  )
}

export default SignIn2

const styles = StyleSheet.create({
    container: {
      flex:1,
      backgroundColor: cores.vermelho,
      alignItems: 'center',
      justifyContent: 'center',
    },
    header:{
       flexGrow:1,
       alignItems: 'center',
       justifyContent: 'flex-end',
        
    },
   
    logo: {
      width: 210,
      height: 53,
      marginBottom: 20,
    },
    headerText:{
      color: '#fff',
      fontSize: 26,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 10,

    },
    inputArea:{
      
     paddingTop: 40,
     paddingLeft: 20,
     paddingRight: 20,
     borderTopLeftRadius: 20,
     borderTopRightRadius: 20,
      backgroundColor: '#fff',
      paddingBottom: 40,
    },
    button:{
     
      height: 50,
      backgroundColor: cores.vermelho,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius:15,
    
    },
    buttonText:{
      color: '#fff',
      fontSize: 16,
   
      fontWeight: 'bold',
    },
    signUpMessage:{
      flexDirection:'row',
      justifyContent: 'center',
      marginTop: 20,


    },
    signUpMessageText:{

    },
    signUpMessageTextBold:{
      color: cores.vermelho,
      fontWeight: 'bold',
    },
    guestMessage:{
      fontSize: 16,
      color: cores.vermelho,
      fontWeight: 'bold',
      
    },
    
   
  });

  