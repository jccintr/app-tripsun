import React from 'react'
import { StyleSheet,Text,SafeAreaView,TouchableOpacity,View} from 'react-native';
import Header from '../components/Header';
import { useContext } from "react";
import DataContext from '../context/DataContext';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { cores } from '../style/globalStyle';
import MenuProfile from '../components/MenuProfile';
import StringAvatar from '../components/StringAvatar';

const Profile = () => {
  const {loggedUser,setLoggedUser,nomeCidade} = useContext(DataContext);
  const navigation = useNavigation();


const onLogout = async () => {
  await AsyncStorage.removeItem('token');
  setLoggedUser(null);
  navigation.reset({routes:[{name:'SignIn2'}]});
}

  return (
    <SafeAreaView style={styles.container}>
      <Header nomeCidade={nomeCidade}/>
      <View style={styles.body}>
          
          {loggedUser===null &&<TouchableOpacity onPress={()=>navigation.navigate('SignIn2')}style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Entrar com meu cadastro</Text>
          </TouchableOpacity>}

          {loggedUser===null &&<TouchableOpacity onPress={()=>navigation.navigate('SignUp2')}style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Quero me cadastrar</Text>
          </TouchableOpacity>}

       
       
          {loggedUser!=null && <>
            <StringAvatar text={loggedUser.name}/>
            <Text style={styles.userNameText}>{loggedUser.name}</Text>
           <MenuProfile iconName="calendar" iconProvider="AntDesign" label="Meus Agendamentos" onPress={()=>{}}/>
           <MenuProfile iconName="user-circle-o" iconProvider="FontAwesome" label="Meus Cadastro" onPress={()=>{}}/>
           <MenuProfile iconName="lock1" iconProvider="AntDesign" label="Alterar minha senha" onPress={()=>{}}/>
           <MenuProfile iconName="mail" iconProvider="AntDesign" label="Fale Conosco" onPress={()=>{}}/>
           <MenuProfile iconName="checklist" iconProvider="Octicons" label="Termo de Uso" onPress={()=>{}}/>
           <MenuProfile iconName="policy" iconProvider="MaterialIcons" label="Política de Privacidade" onPress={()=>{}}/>
           <MenuProfile iconName="logout" iconProvider="MaterialIcons" label="Sair" onPress={onLogout}/> 
           </>
          }
        
      </View>
    
 </SafeAreaView>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
   },
  body:{
    flex:1,
    flexDirection: 'column',
    alignItems:'center',
    justifyContent: 'center',
   
    
  },
  sectionTitle:{
    fontWeight:'bold',
    fontSize: 26,
  },
  userNameText:{
    
    fontSize: 18,
    color: '#000',
    marginBottom: 40,
    },
    
  loginButton:{
    width: 300,
    height: 50,
    borderWidth:1,
    borderColor: cores.vermelho,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
    borderRadius: 10,
  },
  loginButtonText:{
    color: cores.vermelho,
    fontWeight: 'bold',
  }

}); 