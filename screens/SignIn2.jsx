import React, { useState,useContext } from 'react'
import { StyleSheet,Text,Image, SafeAreaView,View,TouchableOpacity,ActivityIndicator,StatusBar} from 'react-native';
import { cores } from '../style/globalStyle';
import logo from '../assets/logo-tripsun.png';
import Api from '../Api';
import { useNavigation } from '@react-navigation/native';
import InputField from '../components/InputField';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DataContext from '../context/DataContext';


const SignIn2 = () => {
  const {setLoggedUser,setFavoritos} = useContext(DataContext);
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [isLoading,setIsLoading] = useState(false);
  const navigation = useNavigation();

 

const onSignIn = async () => {
  setIsLoading(true);
  if(email != '' && password != ''){
      
      let response = await Api.signIn(email, password);
      
      if(response.status===200){
        const json = await response.json();
        
        await AsyncStorage.setItem('token', json.token);
        setLoggedUser(json);
        setFavoritos(json.favoritos);
        navigation.reset({routes:[{name:'MainTab'}]});
      } else {
        setEmail('');
        setPassword('');  
        alert("Email e ou senha inválidos.");
      }

    } else {
      alert("Por favor, informe o seu email e a sua senha.");
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
            <Text style={styles.signUpMessageTextBold} >Entre como convidado</Text>
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
    
   
  });

  