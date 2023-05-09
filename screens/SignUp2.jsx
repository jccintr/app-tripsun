import React, { useState,useContext } from 'react'
import { StyleSheet, Text,Image,TextInput, SafeAreaView,View,TouchableOpacity,ActivityIndicator,StatusBar} from 'react-native';
import { cores } from '../style/globalStyle';
import logo from '../assets/logo-tripsun.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DataContext from '../context/DataContext';
import Api from '../Api';
import Toast from 'react-native-toast-message';


import { useNavigation } from '@react-navigation/native';
import InputField from '../components/InputField';

const SignUp2 = () => {

    const [name,setName] = useState('');
    const [telefone,setTelefone] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [passwordConfirm,setPasswordConfirm] = useState('');
    const navigation = useNavigation();
    const [isLoading,setIsLoading] = useState(false);
    const {setLoggedUser} = useContext(DataContext);

    

    const onSignUp = async () => {

      setIsLoading(true);
      if(email != '' && password != '' && name != '' && telefone != '' && passwordConfirm != ''){
         if(password != passwordConfirm){
            Toast.show({type: 'error', text1: 'As senhas informadas são diferentes.'});
            return
         }
         let response = await Api.signUp(name, email,telefone,password);
         if (response.status===201){
            const jsonUser = await response.json();
            await AsyncStorage.setItem('token', jsonUser.token);
            setLoggedUser(jsonUser);
            Toast.show({type: 'success', text1: 'Olá '+jsonUser.name+'! Seja bem-vindo ao TripSun.',text2: 'Não esqueça de completar o seu cadastro na aba Perfil.'});
            navigation.reset({routes:[{name:'MainTab'}]});
         } else {
            Toast.show({type: 'error', text1: 'Falha ao cadastrar usuário.'});
         }
      } else {
        Toast.show({type: 'error', text1: 'Informe todos os campos por favor.'});
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
       <Text style={styles.headerText}>Cadastro</Text>
    </View>
    <View style={styles.inputArea}>
       <InputField 
           iconProvider="AntDesign"
           iconName="user"
           placeholder="Digite o seu nome"
           value={name}
           onChangeText={t=>setName(t)}
           password={false}
       />
       <InputField 
           iconProvider="FontAwesome"
           iconName="whatsapp"
           placeholder="Digite o seu telefone"
           value={telefone}
           onChangeText={t=>setTelefone(t)}
           password={false}
       />
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
       <InputField 
       iconProvider="AntDesign"
           iconName="lock1"
           placeholder="Confirme a senha"
           value={passwordConfirm}
           onChangeText={t=>setPasswordConfirm(t)}
           password={true}
       />
       <TouchableOpacity onPress={onSignUp} style={styles.button}>
          {!isLoading?<Text style={styles.buttonText}>CADASTRAR</Text>:<ActivityIndicator  size="large" color={cores.branco}/>}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('SignIn2')} style={styles.signUpMessage}>
         <Text style={styles.signUpMessageText}>Já tem uma conta?</Text>
         <Text style={styles.signUpMessageTextBold} > Entre!</Text>
       </TouchableOpacity>
       
        
    </View> 
  </SafeAreaView>

  )
}

export default SignUp2

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
    }
   
  });

  