import { StyleSheet, Text, View,Modal,TouchableOpacity, ScrollView,ActivityIndicator,Dimensions} from 'react-native'
import React, {useState,useContext} from 'react'
import InputField2 from './InputField2';
import { cores } from '../style/globalStyle';
import { Entypo } from '@expo/vector-icons';
import DataContext from '../context/DataContext';




const ModalCadastro = ({modalVisible,setModalVisible}) => {
  const {loggedUser} = useContext(DataContext);
  const [isLoading,setIsLoading] = useState(false);
  const [nome,setNome] = useState(loggedUser.name);
  const [telefone,setTelefone] = useState(loggedUser.telefone);
  const [documento,setDocumento] = useState(loggedUser.documento);
  const [logradouro,setLogradouro] = useState(loggedUser.logradouro);
  const [numero,setNumero] = useState(loggedUser.numero);
  const [cep,setCet] = useState(loggedUser.cep);
  const [cidade,setCidade] = useState(loggedUser.cidade);
  const [estado,setEstado] = useState(loggedUser.estado);
  const screenWidth = Dimensions.get('window').width;

 const onSalvar = () => {
  alert('salvar');
 }

  return (
    <Modal visible={modalVisible} animationType="slide" transparent={true} onRequestClose={()=>setModalVisible(false)}>
      <View style={styles.modalArea}>
        <View style={styles.modalBody}>
               <TouchableOpacity style={styles.headerArea} onPress={()=>setModalVisible(false)}>
                  <Entypo name="chevron-down" size={34} color="black" />
                  <Text style={styles.modalTitleText}>Meu Cadastro</Text>
                </TouchableOpacity>
                <ScrollView style={{width: screenWidth}} contentContainerStyle={{alignItems:'center',padding:5,}} showsVerticalScrollIndicator={false}>
                <InputField2 
                    label="Nome:"
                    placeholder="Digite o seu nome"
                    password={false}
                    keyboard="default"
                    value={nome}
                    onChangeText={t=>setDocumento(t)}
                />  
                <InputField2 
                    label="Telefone:"
                    placeholder="Digite o seu telefone"
                    password={false}
                    keyboard="numeric"
                    value={telefone}
                    onChangeText={t=>setDocumento(t)}
                />  
                <InputField2 
                    label="Número do CPF:"
                    placeholder="Digite o seu CPF"
                    password={false}
                    keyboard="numeric"
                    value={documento}
                    onChangeText={t=>setDocumento(t)}
                />  
                <InputField2 
                    label="Logradouro:"
                    placeholder="Digite o seu logradouro"
                    password={false}
                    keyboard="default"
                    value={logradouro}
                    onChangeText={t=>setDocumento(t)}
                />  
                <InputField2 
                    label="Número:"
                    placeholder="Digite o número do seu logradouro"
                    password={false}
                    keyboard="numeric"
                    value={numero}
                    onChangeText={t=>setDocumento(t)}
                />  
                <InputField2 
                    label="CEP:"
                    placeholder="Digite o seu CEP do seu endereço"
                    password={false}
                    keyboard="numeric"
                    value={cep}
                    onChangeText={t=>setDocumento(t)}
                />  
                <InputField2 
                    label="Cidade:"
                    placeholder="Digite a sua cidade"
                    password={false}
                    keyboard="default"
                    value={cidade}
                    onChangeText={t=>setDocumento(t)}
                />  
                <InputField2 
                    label="Estado:"
                    placeholder="Digite o estado"
                    password={false}
                    keyboard="default"
                    value={estado}
                    onChangeText={t=>setDocumento(t)}
                />  
             
            <TouchableOpacity onPress={onSalvar} style={styles.botaoSalvar}>
               {!isLoading?<Text style={styles.botaoSalvarText}>Salvar</Text>:<ActivityIndicator  size="large" color={cores.branco}/>}
            </TouchableOpacity> 
            </ScrollView>  
        </View>
      </View>
    </Modal>
  )
}

export default ModalCadastro

const styles = StyleSheet.create({

modalArea:{
    flex:1,
    justifyContent:'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    },
modalBody:{
    width: '100%',
    height: '80%',
    backgroundColor: '#fff',
    borderTopLeftRadius:15,
    borderTopRightRadius: 15,
    paddingTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: 'center',    
    
},
headerArea:{
  width: '100%',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-start',
  marginBottom: 10,
},
modalTitleText:{
    fontWeight: 'bold',
    fontSize: 18,
},
botaoSalvar:{
  backgroundColor: cores.vermelho,
  justifyContent:'center',
  alignItems: 'center',
  borderRadius: 10,
  height:50,
  width: '100%',
  marginTop: 20,
  marginBottom: 10,
},
botaoSalvarText:{
  color: '#fff',
  fontSize: 17,
  fontWeight:'bold',
},

})