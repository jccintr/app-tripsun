import React, { useState, useEffect } from 'react'
import { StyleSheet, Text,Image,ScrollView, SafeAreaView,TouchableOpacity,View} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import logo from '../assets/logo_tripsun-transparente.png'
import { cores } from '../style/globalStyle';
import InputField from '../components/InputField';


const imagem = (id) => {
  
  switch (id) {
    case 1:
      var icon = require('../assets/cidades/camposdojordao.jpeg');
      break;
    case 2:
      var icon = require('../assets/cidades/ubatuba.jpeg');
      break;
    case 3:
      var icon = require('../assets/cidades/saobento.jpeg');
      break;
    case 4:
      var icon = require('../assets/cidades/brasopolis.jpeg');
      break;
    case 5:
      var icon = require('../assets/cidades/gramado.jpeg');
      break;
    case 6:
      var icon = require('../assets/cidades/riodejaneiro.jpeg');
      break;
    case 7:
      var icon = require('../assets/cidades/saopaulo.jpeg');
      break;
    case 8:
      var icon = require('../assets/cidades/brasilia.jpeg');
      break;
    case 9:
      var icon = require('../assets/cidades/jericoacoara.jpeg');
      break;
    case 10:
      var icon = require('../assets/cidades/tiradentes.jpeg');
      break;

   
    default:
      console.log(`icone não encontrado`);
  }


 
  return icon
}


const CardCity = ({id,cityName}) => {
  return (
     <View style={styles.cityCard}>
      <Image style={styles.cityImage}source={imagem(id)}/>
      <Text style={styles.cityNameText}>{cityName}</Text>
     </View>

  );
}

const SelectCity = () => {
    const navigation = useNavigation();
    const [search,setSearch] = useState('');
    
    const [cidades,SetCidades] = useState([
      {id: 1, nome: 'Campos do Jordão',estado:'SP'},
      {id: 2, nome: 'Ubatuba',estado:'SP'},
      {id: 3, nome: 'São Bento do Sapucaí',estado:'SP'},
      {id: 4, nome: 'Brazópolis',estado:'MG'},
      {id: 5, nome: 'Gramado',estado:'RS'},
      {id: 6, nome: 'Rio de Janeiro',estado:'RJ'},
      {id: 7, nome: 'São Paulo',estado:'SP'},
      {id: 8, nome: 'Brasília',estado:'DF'},
      {id: 9, nome: 'Jericoacoara',estado:'CE'},
      {id: 10, nome: 'Tiradentes',estado:'MG'},
  ]);
  const [cidadesFiltrado,SetCidadesFiltrado] = useState(cidades)

  const onSearch = (searchText) => {
   setSearch(searchText);
   let novoArray = cidades.filter(
    (cidade) => cidade.nome.toUpperCase().includes(searchText.toUpperCase()));
     SetCidadesFiltrado(novoArray);
  }

  return (
    <SafeAreaView style={styles.container}>
     
       <Image style={styles.logo} source={logo}/>
       <Text style={{color: cores.vermelho,marginBottom: 10,fontWeight:'bold'}}>Selecione uma cidade para prosseguir</Text>
       <View style={{width:300,}}>
          <InputField 
                iconProvider="AntDesign"
                iconName="search1"
                placeholder="pesquisar"
                value={search}
                onChangeText={onSearch}
                password={false}
            />
        </View>

       {cidadesFiltrado.length ? (
          <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.cityList}>
              {cidadesFiltrado.map((cidade) => (
                <TouchableOpacity key={cidade.id} onPress={()=>{}}>
                  <CardCity id={cidade.id} cityName={cidade.nome+" - " + cidade.estado} />
                </TouchableOpacity>
              ))}
          </View>
          </ScrollView> ) : <Text style={{color:'#b1b1b1'}}>Nenhuma cidade encontrada.</Text>
      }
 </SafeAreaView>
  )
}

export default SelectCity

const styles = StyleSheet.create({
  container: {

    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 35,
    paddingTop:20,
    
   
    
  },
  logo:{
    width: 200,
    height:133,
    marginBottom:20,
  },
  cityList:{
   
    width: 300,
    flexDirection: "column",
    alignItems: 'center',
   
  
  },
  cityCard:{
    
    width: 250,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  cityImage:{
    width: 250,
    height: 120,
    
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  cityNameText:{
    width:250,
    height:30,
    textAlignVertical:'center',
    fontWeight: 'bold',
    color:'#fff',
    backgroundColor: cores.vermelho,
    textAlign:'center',
    borderBottomLeftRadius:15,
    borderBottomRightRadius:15
  },
   
    
  });