import React, {useEffect, useState} from 'react'
import Header3 from '../components/Header3';
import { StyleSheet,Text,Image,SafeAreaView,TouchableOpacity,Dimensions,View,ScrollView} from 'react-native';
import { cores } from '../style/globalStyle';
import Api from '../Api';
import { Ionicons } from '@expo/vector-icons';
import Stars from '../components/Stars';
import Swiper from 'react-native-swiper';
import ModalAgendamento from '../components/ModalAgendamento';
import ModalReviews from '../components/ModalReviews';



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

const ReviewArea = ({servico,setModalReviewsVisible}) => {
     return (
        <TouchableOpacity onPress={()=>setModalReviewsVisible(true)}style={styles.reviewContainer}>
            <View style={styles.starContainer}>
              <Stars stars={servico.stars}/>
            </View>
            <View style={styles.avaliacoesContainer}>
                <Text>25 avaliações</Text>
                <Ionicons name="chevron-forward" size={20} color="black" />
            </View>
        </TouchableOpacity>
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



const PriceArea = ({servico,setModalVisible}) => {


    const onAgendarPress = async (idServico) =>{
     // let jsonHorarios = await Api.getHorariosDisponiveis(idServico);
     
    //  setHorarios(jsonHorarios);
      setModalVisible(true);
    
    }



    return (
        <View style={styles.priceContainer}>
           <Text style={styles.titleText}>Preço</Text>
           <View style={styles.priceDetailArea}>
           <Text style={styles.descriptionText}>A partir de R$ {servico.valor}</Text>
               <TouchableOpacity onPress={()=>setModalVisible(true)} style={styles.botaoContratar}>
                   <Text style={styles.buttonText}>AGENDAR</Text>
               </TouchableOpacity>
           </View>
        </View>
     )
}



const Servico = ({route}) => {
    const {cidade,servico} = route.params;
    const [modalVisible,setModalVisible] = useState(false);
    const [modalReviewsVisible,setModalReviewsVisible] = useState(false);
    const [reviews,setReviews] = useState([]);
   // const [horarios,setHorarios] = useState([]);


useEffect(()=>{
    const getReviews = async (idServico) => {
     
       let jsonReviews = await Api.getReviewsByServico(idServico);
     
       setReviews(jsonReviews);
      
    }
    getReviews(servico.id);
},[]);


    return (
        <SafeAreaView style={styles.container}>

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
                <View style={styles.body}>
                    <NomeAtividade servico={servico}/>
                    <ReviewArea servico={servico} setModalReviewsVisible={setModalReviewsVisible}/>
                    <DescricaoArea servico={servico}/>
                    <PrestadorArea prestador={servico.prestador}/>
                    <PriceArea servico={servico} setModalVisible={setModalVisible} />
                </View>
           </ScrollView>
         <ModalAgendamento servico={servico} modalVisible={modalVisible} setModalVisible={setModalVisible} />
         {reviews.length>0&&<ModalReviews reviews={reviews} modalVisible={modalReviewsVisible} setModalVisible={setModalReviewsVisible} />}
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
    nomeAtividadeContainer:{
         alignItems:'center',
        justifyContent:'flex-start',
        width:'100%'
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
        justifyContent:'flex-end',
     },
    serviceName:{
        fontSize:20,
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
      fontSize: 18,
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
