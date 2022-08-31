import React, { useState } from 'react'
import { StyleSheet, Text,Image,TextInput, SafeAreaView,View,TouchableOpacity} from 'react-native';
import { cores } from '../style/globalStyle';
import logo from '../assets/logo-tripsun.png'
import { Feather } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';


const SignUp = () => {
  const [nome,setNome] = useState('');
  const [telefone,setTelefone] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [passwordConfirm,setPasswordConfirm] = useState('');
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
    <Image source={logo} style={styles.logo}/>
    <Text style={styles.loginText}>Novo Cadastro</Text>
   
    <View style={styles.inputArea}>

    <View style={styles.inputView}>
         <Feather name="user" size={22} color={cores.amarelo} style={{ paddingHorizontal: 4 }}/>
         <TextInput
           style={styles.input}
           placeholder='Nome'
           placeholderTextColor='#f1f2f6'
           returnKeyType='next'
           value={nome}
           onChangeText={setNome}
         />
     </View>

     <View style={styles.inputView}>
         <FontAwesome name="whatsapp" size={22} color={cores.amarelo} style={{ paddingHorizontal: 4 }}/>
         <TextInput
           style={styles.input}
           placeholder='Telefone'
           placeholderTextColor='#f1f2f6'
           returnKeyType='next'
           value={telefone}
           onChangeText={setTelefone}
         />
     </View>

       <View style={styles.inputView}>
         <Entypo name="email" size={22} color={cores.amarelo} style={{ paddingHorizontal: 4 }}/>
         <TextInput
           style={styles.input}
           placeholder='Email'
           placeholderTextColor='#f1f2f6'
           keyboardType='email-address'
           textContentType='emailAddress'
           autoCapitalize={false}
           autoCompleteType='email'
           returnKeyType='next'
           value={email}
           onChangeText={setEmail}
         />
       </View>

       <View style={styles.inputView}>
         <Feather name="lock" size={22} color={cores.amarelo} style={{ paddingHorizontal: 4 }}/>
         <TextInput
           style={styles.input}
           placeholder='Senha'
           placeholderTextColor='#f1f2f6'
           secureTextEntry={true}
           autoCapitalize={false}
           returnKeyType='next'
           value={password}
           onChangeText={setPassword}
         />
       </View>

       <View style={styles.inputView}>
         <Feather name="lock" size={22} color={cores.amarelo} style={{ paddingHorizontal: 4 }}/>
         <TextInput
           style={styles.input}
           placeholder='Confirme a senha'
           placeholderTextColor='#f1f2f6'
           secureTextEntry={true}
           autoCapitalize={false}
           returnKeyType='next'
           value={passwordConfirm}
           onChangeText={setPasswordConfirm}
         />
       </View>

       <TouchableOpacity style={styles.button}>
         <Text style={styles.buttonText}>Cadastrar</Text>
       </TouchableOpacity>

       <TouchableOpacity style={styles.messageButton}>
         <Text style={styles.messageButtonText} onPress={()=> navigation.navigate('SignIn')}>Já tenho cadastro</Text>
       </TouchableOpacity>

      
    </View>
  </SafeAreaView>
  )
}

export default SignUp

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
  loginText:{
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',

  },
  inputArea: {
    width: '100%',
    paddingLeft: 40,
    paddingRight:40,
  },
  inputView: {
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    marginTop: 10,
  
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    paddingHorizontal: 4,
    color: '#fff',
  },
  
  button: {
    marginTop: 20,
    height: 50,
    backgroundColor: cores.amarelo,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
   
    
  },
  buttonText: { 
   fontSize: 16,
   color: cores.vermelho,
   fontWeight: 'bold',
 },
 messageButton:{
  flexDirection: 'row',
  justifyContent: 'center',
  marginTop: 30,
  
 },
 messageButtonText:{
  fontSize: 16,
  color: '#fff',
  fontWeight: 'bold',
 }
});