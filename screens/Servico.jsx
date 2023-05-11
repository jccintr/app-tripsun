import React, {useEffect, useState,useContext} from 'react';
import DataContext from '../context/DataContext';
import Header3 from '../components/Header3';
import { StyleSheet,Text,Image,SafeAreaView,TouchableOpacity,Dimensions,View,ScrollView,StatusBar} from 'react-native';
import { cores } from '../style/globalStyle';
import Api from '../Api';
import { Ionicons,FontAwesome } from '@expo/vector-icons';
import Stars from '../components/Stars';
import Swiper from 'react-native-swiper';
import ModalAgendamento from '../components/ModalAgendamento';
import ModalReviews from '../components/ModalReviews';
import ModalSucesso from '../components/ModalSucesso';
import ModalSucessoPix from '../components/ModalSucessoPix';
import ModalFalhaAgendamento from '../components/ModalFalhaAgendamento';
import ModalCadastro from '../components/ModalCadastro';
import { useNavigation } from '@react-navigation/native';
import Novo from '../components/Novo';
import Toast from 'react-native-toast-message';


const SwipeDot = () =>{
    return (
       <View style={styles.swipeDot}></View>
    )
}

const SwipeDotActive = () =>{
    return (
        <View style={styles.swipeDotActive}></View>
    )
}

const NomeAtividade = ({servico}) => {
    return (
        <View style={styles.nomeAtividadeContainer}>
            <Text style={styles.serviceName}>{servico.nome}</Text>
        </View>
    )
}

const ReviewArea = ({servico,reviews,setModalReviewsVisible}) => {
     return (
        <TouchableOpacity onPress={()=>setModalReviewsVisible(true)}style={styles.reviewContainer}>
            <View style={styles.starContainer}>
              <Stars stars={servico.stars}/>
            </View>
            <View style={styles.avaliacoesContainer}>
                <Text>{reviews.length} {reviews.length>1?'avaliações':'avaliação'}</Text>
                <Ionicons name="chevron-forward" size={20} color="black" />
            </View>
        </TouchableOpacity>
     )
}

const Spacer = () => {
    return (
        <View style={{height:20}}></View>
    )
}

const DescricaoArea = ({servico}) => {

    return (
        <View style={styles.DescricaoContainer}>
           <Text style={styles.titleText}>Descrição da Atividade</Text>
           <View style={{backgroundColor: cores.cinzaClaro,width:'100%',borderRadius:15,padding:10}}>
                <Text style={styles.descriptionText}>{servico.descricao_curta}</Text>
           </View>

           <Text style={styles.titleText}>Atrativos</Text>
           <View style={{backgroundColor: cores.cinzaClaro,width:'100%',borderRadius:15,padding:10}}>
                <Text style={styles.descriptionText}>{servico.atrativos}</Text>
           </View>

           <Text style={styles.titleText}>Duração da Atividade</Text>
           <View style={{backgroundColor: cores.cinzaClaro,width:'100%',borderRadius:15,padding:10}}>
                <Text style={styles.descriptionText}>{servico.duracao}</Text>
           </View>

           <Text style={styles.titleText}>Itens Obrigatórios</Text>
           <View style={{backgroundColor: cores.cinzaClaro,width:'100%',borderRadius:15,padding:10}}>
                <Text style={styles.descriptionText}>{servico.itens_obrigatorios}</Text>
           </View>

           <Text style={styles.titleText}>Ponto de Encontro da Atividade</Text>
           <View style={{backgroundColor: cores.cinzaClaro,width:'100%',borderRadius:15,padding:10}}>
                <Text style={styles.descriptionText}>{servico.ponto_encontro}</Text>
           </View>

        </View>
     )

}



const PrestadorArea = ({prestador}) => {
    return (
        <View style={styles.prestadorContainer}>
           <Text style={styles.titleText}>Fornecido por</Text>
           <View style={styles.prestadorDetailArea}>
             <Image style={styles.prestadorLogo} source={{uri:`${Api.base_storage}/${prestador.logotipo}`,}}/>
             <Text style={styles.prestadorNameText}>{prestador.nome}</Text>
           </View>
        </View>
     )

}



const PriceArea = ({servico,setModalVisible,loggedUser,setModalCadastroVisible}) => {
    const navigation = useNavigation();

    const CadastroCompleto = (json) => {
   
        if(json.documento !== null && json.logradouro !== null && json.numero !== null & json.bairro !== null && json.cep !== null && json.cidade !== null & json.estado !== null ){
           return true;
        } else {
           return false;
        }
     
     }


    const onContratar =  () => {
         // console.log(CadastroCompleto(loggedUser));
         if (loggedUser===null){
            navigation.reset({routes:[{name:'SignIn2'}]});
         } else {

            if(!CadastroCompleto(loggedUser)){
                Toast.show({type: 'info', text1: 'Antes de contratar, complete o seu cadastro.'});
                setModalCadastroVisible(true);
            } else {
                setModalVisible(true);
            }
            
            
         }
    }

    return (
        <View style={styles.priceContainer}>
            <Text style={styles.titleText}>Preço</Text>
            <View style={styles.priceDetailArea}>
            <Text style={styles.descriptionText}>A partir de R$ {servico.valor}</Text>
                <TouchableOpacity onPress={onContratar} style={styles.botaoContratar}>
                    <Text style={styles.buttonText}>{loggedUser===null?'ENTRE PARA CONTRATAR':'CONTRATAR'}</Text>
                </TouchableOpacity>
            </View>
        </View>
        )
}



const Servico = ({route}) => {
    const {servico} = route.params;
    const [urlCobranca,setUrlCobranca] = useState(null);
    const [payloadPix,setPayloadPix] = useState('');
    const [modalVisible,setModalVisible] = useState(false);
    const [modalReviewsVisible,setModalReviewsVisible] = useState(false);
    const [modalSucessoVisible,setModalSucessoVisible] = useState(false);
    const [modalSucessoPixVisible,setModalSucessoPixVisible] = useState(false);
    const [modalFalhaAgendamentoVisible,setModalFalhaAgendamentoVisible] = useState(false);
    const [reviews,setReviews] = useState([]);
    const {loggedUser,favoritos,setFavoritos} = useContext(DataContext);
    const [erroAgendamento,setErroAgendamento] = useState('');
    const [isFavorited,setIsFavorited] = useState(false);
    const [modalCadastroVisible,setModalCadastroVisible] = useState(false);
    
  


useEffect(()=>{
    const getReviews = async (idServico) => {
        let jsonReviews = await Api.getReviewsByServico(idServico);
        setReviews(jsonReviews);
    }
    getReviews(servico.id);
},[]);

useEffect(()=>{
   setIsFavorited(checkFavorited());
},[]);



const checkFavorited = () => {
    let found = false;
    for (i=0;i<favoritos.length;i++){
       if(servico.id===favoritos[i].id){
         found = true
       }
    }
    return found;
}

const toggleFavorito = async () =>{
    let response = await Api.toggleFavorito(loggedUser.id,servico.id);
    let jsonFavoritos = await Api.getFavoritos(loggedUser.id);
    setFavoritos(jsonFavoritos);
    setIsFavorited(!isFavorited);
}

const CadastroCompleto = (json) => {
   
    if(json.documento !== null && json.logradouro !== null && json.numero !== null & json.bairro !== null && json.cep !== null && json.cidade !== null & json.estado !== null ){
       return true;
    } else {
       return false;
    }
 
 }
 


    return (
        <SafeAreaView style={styles.container}>
           <StatusBar
                animated={true}
                backgroundColor={cores.vermelho}
                barStyle="dark-content"
             />
            <Header3  title="Atividade"/>
            
            <ScrollView showsVerticalScrollIndicator={false}>
                {servico.imagens.length > 0 ?
                <Swiper
                    style={{height: 200}}
                    dot={<SwipeDot />}
                    activeDot={<SwipeDotActive />}
                    paginationStyle={{top: 15, right: 15, bottom: null, left: null}}
                    autoplay={true}
                >
                {servico.imagens.map((imagem) => (<Image key={imagem.id} source={{uri:`${Api.base_storage}/${imagem.imagem}`,}} style={styles.imagem}/>  ))}

                </Swiper> : '' }
                {loggedUser!=null&&<TouchableOpacity onPress={toggleFavorito} style={styles.heartContainer}>
               {isFavorited?<FontAwesome name="heart" size={20} color={cores.vermelho}/>:<FontAwesome name="heart-o" size={20} color={cores.vermelho} />}
                 </TouchableOpacity>}
                <View style={styles.body}>
                    <NomeAtividade servico={servico}/>
                    {reviews.length>0?<ReviewArea reviews={reviews} servico={servico} setModalReviewsVisible={setModalReviewsVisible}/>:<Spacer/>}
                    <DescricaoArea servico={servico}/>
                    <PrestadorArea prestador={servico.prestador}/>
                    <PriceArea loggedUser={loggedUser} servico={servico} setModalVisible={setModalVisible} setModalCadastroVisible={setModalCadastroVisible} />
                </View>
           </ScrollView>
         <ModalAgendamento 
            setUrlCobranca={setUrlCobranca} 
            servico={servico}
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            setModalSucessoVisible={setModalSucessoVisible}
            setModalSucessoPixVisible={setModalSucessoPixVisible}
            setModalFalhaAgendamentoVisible={setModalFalhaAgendamentoVisible}
            setPayloadPix={setPayloadPix}
            setErroAgendamento={setErroAgendamento}
            />
         {reviews.length>0&&<ModalReviews reviews={reviews} modalVisible={modalReviewsVisible} setModalVisible={setModalReviewsVisible} />}
         <ModalSucesso urlCobranca={urlCobranca} modalVisible={modalSucessoVisible} setModalVisible={setModalSucessoVisible}/>
         <ModalSucessoPix  modalVisible={modalSucessoPixVisible} setModalVisible={setModalSucessoPixVisible} payload={payloadPix}/>
         <ModalFalhaAgendamento modalVisible={modalFalhaAgendamentoVisible} setModalVisible={setModalFalhaAgendamentoVisible} erroAgendamento={erroAgendamento} />
         {loggedUser&&<ModalCadastro modalVisible={modalCadastroVisible} setModalVisible={setModalCadastroVisible}/>}
        </SafeAreaView>
  )
}

export default Servico

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'flex-start',
     },
    body:{
      flex:1,
      alignItems:'center',
      justifyContent: 'flex-start',
      marginBottom: 20,
    },
    imagem:{
        width: Dimensions.get('window').width,
        height: 200,
    },
    heartContainer:{
        position: 'absolute',
        top: 5,
        left: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: 30,
        height: 30,
        borderRadius: 15,
        zIndex: 10,
        borderColor: cores.vermelho,
        borderWidth:1,
    },
    nomeAtividadeContainer:{
         alignItems:'center',
        justifyContent:'flex-start',
        width:'100%',
    },
    reviewContainer:{
        marginTop:10,
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'space-between',
        width: Dimensions.get('window').width,
        paddingRight: 10,
        paddingLeft: 10,
       
    },
    starContainer:{
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'flex-start',
     },
    serviceStarText:{
      fontSize: 14,
      marginRight: 5,
    },
    avaliacoesContainer:{
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'center',
    },
    serviceName:{
        fontSize:18,
        fontWeight: 'bold',
        width: '100%',
        paddingLeft: 10,
    },
    DescricaoContainer:{
        marginTop:10,
        flexDirection: 'column',
        alignItems:'flex-start',
        justifyContent:'space-between',
        width: Dimensions.get('window').width,
        paddingRight: 10,
        paddingLeft: 10,
    },
    titleText:{
      fontWeight: 'bold',
      fontSize: 14,
    },
    descriptionText:{
        fontSize: 14,
    } ,
    prestadorContainer:{
        marginTop:10,
        flexDirection: 'column',
        alignItems:'flex-start',
        justifyContent:'space-between',
        width: Dimensions.get('window').width,
        paddingRight: 10,
        paddingLeft: 10,
   },
    prestadorDetailArea:{
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'flex-start',
        width:'100%',
        backgroundColor: cores.cinzaClaro,
        borderRadius:15,
        padding:10,
    },
    prestadorLogo:{
      width: 40,
      height: 40,
      borderWidth:1,
      borderColor: '#d1d1d1',
      borderRadius:10,
    },
    prestadorNameText:{
        marginLeft: 10,
       fontSize: 14,
       fontWeight: 'bold',

    },
    priceContainer:{
        marginTop:10,
        
        flexDirection: 'column',
        alignItems:'flex-start',
        justifyContent:'space-between',
        width: Dimensions.get('window').width,
        paddingRight: 10,
        paddingLeft: 10,
    },
    priceDetailArea:{
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'space-between',
        width:'100%',
        backgroundColor: cores.cinzaClaro,
        borderRadius:15,
        padding:10,
    },
    botaoContratar:{
       height: 40,
       width: 100,
       backgroundColor: cores.vermelho,
       alignItems:'center',
       justifyContent:'center',
       borderRadius:10,
    },
    buttonText:{
       color: cores.branco,
       fontSize: 12,
       fontWeight: 'bold',
       textAlign: 'center',
    },
    swipeDot:{
        width: 10,
        height: 10,
        backgroundColor: '#fff',
        borderRadius:5,
        margin:3,

    },
    swipeDotActive:{
        width: 10,
        height: 10,
        backgroundColor: cores.vermelho,
        borderRadius:5,
        margin:3,
    }



  });
