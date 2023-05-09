import { StyleSheet, Text, View,Modal,TouchableOpacity,ScrollView,Dimensions,ActivityIndicator } from 'react-native'
import React, {useState,useEffect,useContext} from 'react';
import DataContext from '../context/DataContext';
import { Entypo } from '@expo/vector-icons';
import { cores } from '../style/globalStyle';
import Api from '../Api';
import CreditCard from './CreditCard';
import Toast from 'react-native-toast-message';


const months = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
const days = ['Dom','Seg','Ter','Qua','Qui','Sex','Sab'];

const Pix = () => {
    return (
        <View><Text>Pix</Text></View>
    )
}

const ModalAgendamento = ({servico,modalVisible,setModalVisible,setModalSucessoVisible,setModalFalhaAgendamentoVisible,setErroAgendamento,setUrlCobranca}) => {
    const {loggedUser} = useContext(DataContext);
    const [isLoading,setIsLoading] = useState(false);
    const [selectedYear, setSelectedYear] = useState(0);
    const [selectedMonth, setSelectedMonth] = useState(0);
    const [selectedDay, setSelectedDay] = useState(0);
    const [selectedHour, setSelectedHour] = useState(null);
    const [listDays, setListDays] = useState([]);
    const [listHours, setListHours] = useState([]);
    const [horarios,setHorarios] = useState([]);
    const [quantidade,setQuantidade] = useState(1);
    const [total,setTotal] = useState(servico.valor);
    const [pagamentoPix,setPagamentoPix] = useState(false);
    const [numeroCartao,setNumeroCartao] = useState('');
    const [titularCartao,setTitularCartao] = useState('');
    const [validadeCartao,setValidadeCartao] = useState('');
    const [cvvCartao,setCvvCartao] = useState('');
    const screenWidth = Dimensions.get('window').width;

     

    useEffect(()=>{
        getHorarios();
        let today = new Date();
        setSelectedYear( today.getFullYear() );
        setSelectedMonth( today.getMonth() );
        setSelectedDay( today.getDate() );
       
    }, []);

    
    useEffect(()=>{
        let daysInMonth = new Date(selectedYear, selectedMonth+1, 0).getDate();
        let newListDays = [];
       
        for(let i=1;i<=daysInMonth;i++) {
            
            let d = new Date(selectedYear, selectedMonth, i);
            let year = d.getFullYear();
            let month = d.getMonth() + 1;
            let day = d.getDate();
            month = month < 10 ? '0'+month : month;
            day = day < 10 ? '0'+day : day;
            let selDate = `${year}-${month}-${day}`;
            let availability = horarios.filter(horario=>horario.date === selDate);
           
            newListDays.push({
                status: availability.length > 0 ? true : false,
                weekday: days[ d.getDay() ],
                number: i
            });
        }
        setListDays(newListDays);
        setSelectedDay(0);
        setListHours([]);
        setSelectedHour(0);
    },[selectedMonth, selectedYear,horarios]);
 
    useEffect(()=>{
        if(selectedDay > 0) {
            let d = new Date(selectedYear, selectedMonth, selectedDay);
            let year = d.getFullYear();
            let month = d.getMonth() + 1;
            let day = d.getDate();
            month = month < 10 ? '0'+month : month;
            day = day < 10 ? '0'+day : day;
            let selDate = `${year}-${month}-${day}`;
            let availability = horarios.filter(horario=>horario.date === selDate);
            if(availability.length > 0) {
                setListHours( availability[0].hours );
            }
        }
        setSelectedHour(null);
    }, [selectedDay]);

    useEffect(() => {
        CalculaTotal();
      }, [quantidade]);

    const getHorarios = async () => {
       
        let json = await Api.getHorariosDisponiveis(servico.id);
        setHorarios(json);
    }
   
    const onPlusPress = () => {
      setQuantidade(quantidade+1);
     }
    
    const onMinusPress = () => {
      if (quantidade>1){
        setQuantidade(quantidade-1);
      }
    }

    const CalculaTotal = () => {
        let total = quantidade * servico.valor;
        setTotal(total.toFixed(2));
      };


    const onPreviousMonthButtonPress = () => {
        let mountDate = new Date(selectedYear, selectedMonth, 1);
        mountDate.setMonth( mountDate.getMonth() - 1 );
        setSelectedYear(mountDate.getFullYear());
        setSelectedMonth(mountDate.getMonth());
        setSelectedDay(0);
    }

    const onNextMonthButtonPress = () => {
        let mountDate = new Date(selectedYear, selectedMonth, 1);
        mountDate.setMonth( mountDate.getMonth() + 1 );
        setSelectedYear(mountDate.getFullYear());
        setSelectedMonth(mountDate.getMonth());
        setSelectedDay(0);
    }

    const onContratar = async () => {
        setIsLoading(true);
        if(loggedUser===null){
            alert('usuario não logado');
            setIsLoading(false);
            return
        }
        console.log ('dia='+selectedHour);
        if (selectedDay === 0 || selectedHour === null || numeroCartao.length === 0 || titularCartao.length === 0 || validadeCartao.length === 0 || cvvCartao.length === 0){
            Toast.show({type: 'error', text1: 'Preencha todos os campos por favor.'});
            setIsLoading(false);
            return
        }
        if (selectedHour!=null) {
            let month = selectedMonth + 1;
            month = month < 10 ? '0'+month: month;
            let day = selectedDay < 10 ? '0'+selectedDay : selectedDay;
            let dataAgendamento = selectedYear+'-'+month+'-'+day+' '+selectedHour+':00';
            let response = await Api.addAgendamento(loggedUser.id,servico.id,dataAgendamento,quantidade,total,numeroCartao,titularCartao,validadeCartao,cvvCartao);
            
            if (response.status===201){
               // alert("Agendamento efetuado com sucesso !");
                const json = await response.json();
                setUrlCobranca(json.cobranca_url);
                setModalVisible(false);
                setModalSucessoVisible(true);
            } else {
                let json = await response.json();
               // console.log(response.status);
               // console.log(json.erro);
                setModalVisible(false);
                setErroAgendamento(json.erro);
                setModalFalhaAgendamentoVisible(true);
              
            }
        } else {
           Toast.show({type: 'error', text1: 'Selecione o horário por favor.'});
        }
        setIsLoading(false);
    }

  return (
    <Modal visible={modalVisible} animationType="slide" transparent={true} onRequestClose={()=>setModalVisible(false)}>
        <View style={styles.modalArea}>
            <View style={styles.modalBody}>

                <TouchableOpacity style={styles.headerArea} onPress={()=>setModalVisible(false)}>
                  <Entypo name="chevron-down" size={34} color="black" />
                  <Text style={styles.modalTitleText}>Contratação de Atividade</Text>
                </TouchableOpacity>
                <ScrollView style={{width: screenWidth}} contentContainerStyle={{alignItems:'center',padding:5,}} showsVerticalScrollIndicator={false}>
                {/*<Text style={styles.serviceNameText}>{servico.nome}</Text> */}   
                <Text style={styles.horariosTitle}>Quantidade</Text>
                <View style={styles.quantArea}>
                    <View style={{flexDirection:'row'}}>
                        <TouchableOpacity onPress={onMinusPress}><Entypo name="minus" size={24} color="black" /></TouchableOpacity>
                        <Text style={{width:30,textAlign: 'center',fontWeight:'bold',fontSize:16}}>{quantidade}</Text>
                        <TouchableOpacity onPress={onPlusPress}><Entypo name="plus" size={24} color="black" /></TouchableOpacity>
                    </View>
                    <Text style={{fontWeight:'bold',fontSize:16}}>{total}</Text>
                </View>
                <Text style={styles.horariosTitle}>Datas Disponíveis</Text>
                <View style={styles.modalItem}>
                    <View style={styles.monthArea}>
                        <TouchableOpacity onPress={onPreviousMonthButtonPress} style={styles.previousMonthButton}>
                            <Entypo name="chevron-left" size={24} color="black" />
                        </TouchableOpacity>
                        <View style={styles.monthNameArea}>
                            <Text style={styles.monthNameText}>{months[selectedMonth]} {selectedYear}</Text>
                        </View>
                        <TouchableOpacity onPress={onNextMonthButtonPress} style={styles.nextMonthButton}>
                            <Entypo name="chevron-right" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    {listDays.map((listDay,index)=>(
                        <TouchableOpacity key={index} onPress={()=>listDay.status ? setSelectedDay(listDay.number) : null} style={listDay.number === selectedDay?styles.dateItemSelected:styles.dateItem}>
                            
                                <Text style={listDay.status?listDay.number === selectedDay?styles.dateTextSelected:styles.dateText:styles.dateTextDisabled}>{listDay.weekday}</Text>
                                <Text style={listDay.status?listDay.number === selectedDay?styles.dateTextSelected:styles.dateText:styles.dateTextDisabled}>{listDay.number}</Text>   
                                        
                        </TouchableOpacity>
                        ))}
                    </ScrollView>
            </View>
            {listHours.length>0 &&<Text style={styles.horariosTitle}>Horários Disponíveis</Text>}
            {listHours.length>0 && 
            <View style={styles.modalItem}>
                    <ScrollView  horizontal={true} showsHorizontalScrollIndicator={false}>
                            {listHours.map((item, index)=>(
                                    <TouchableOpacity onPress={()=>setSelectedHour(item)} key={index} style={item === selectedHour?styles.timeItemSelected:styles.timeItem} >                                 
                                        <Text style={item === selectedHour?styles.timeItemTextSelected:styles.timeItemText}>{item}</Text>
                                    </TouchableOpacity>
                            ))}
                    </ScrollView>
            </View>
}
         <Text style={styles.horariosTitle}>Forma de Pagamento</Text>
                <View style={styles.pagamentoArea}>
                    <TouchableOpacity onPress={()=>setPagamentoPix(false)} style={!pagamentoPix?styles.pagamentoTitleAreaSelected:''}>
                            <Text style={!pagamentoPix?styles.pagamentoTextSelected:styles.pagamentoText}>Cartão de Crédito</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>setPagamentoPix(true)} style={pagamentoPix?styles.pagamentoTitleAreaSelected:''}>
                            <Text style={pagamentoPix?styles.pagamentoTextSelected:styles.pagamentoText}>Pix</Text>
                        </TouchableOpacity>
                 </View>

            {pagamentoPix?<Pix/>:<CreditCard numeroCartao={numeroCartao} titularCartao={titularCartao} validadeCartao={validadeCartao} cvvCartao={cvvCartao} setNumeroCartao={setNumeroCartao} setValidadeCartao={setValidadeCartao} setTitularCartao={setTitularCartao} setCvvCartao={setCvvCartao}/>}
            <TouchableOpacity onPress={onContratar} style={styles.botaoFinalizar}>
               {!isLoading?<Text style={styles.botaoFinalizarText}>Contratar Atividade</Text>:<ActivityIndicator  size="large" color={cores.branco}/>}
            </TouchableOpacity>
            </ScrollView>
            </View>
            
        </View>
        
</Modal>

  )
}

export default ModalAgendamento

const styles = StyleSheet.create({

modalArea:{
    flex:1,
    justifyContent:'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
 },
modalBody:{
    width: '100%',
    height: '60%',
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

serviceNameText:{
  width: '100%',  
  textAlign: 'left',
  fontWeight: 'bold',
  fontSize: 16,
  marginBottom: 10,
},
closeButton:{
    width: 100,
    height: 3,
    backgroundColor: '#c1c1c1',
    borderRadius: 10,
    marginBottom: 10,
},
quantArea:{
    width: '100%', 
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
},
modalItem:{
   width: '100%', 
   borderWidth: 1,
   borderRadius: 10,
   padding: 10,
   marginBottom: 10,

},
monthArea:{
  flexDirection: 'row',
  marginBottom: 5,
 },
monthNameArea:{
 width: 140,
 justifyContent: 'center',
 alignItems: 'center',
},
monthNameText:{
  fontSize: 17,
  fontWeight: 'bold',
  color: '#000',
},
previousMonthButton:{
 flex:1,
 justifyContent: 'flex-end',
 alignItems: 'flex-end'
},
nextMonthButton:{
    flex:1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
},
daysArea:{

},
dateItem:{
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingTop: 2,
    paddingBottom:2,
},
dateItemSelected:{
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 2,
    paddingBottom:2,
    borderRadius: 10,
    backgroundColor: cores.vermelho,
},

dateText:{
    fontSize: 16,
    fontWeight: 'bold',
},
dateTextSelected:{
    fontSize: 16,
    fontWeight: 'bold',
    
    color:'#fff',
},
dateTextDisabled:{
    fontSize: 16,
    fontWeight: 'bold',
    color: '#d1d1d1',
},
dateItemWeekDay:{
    fontSize: 16,
    fontWeight: 'bold',
},
dateItemNumber:{
    fontSize: 16,
    fontWeight: 'bold',
},
horariosTitle:{
    fontSize: 14,
    fontWeight: 'bold',
},
timeList: {
    justifyContent: 'center',
    alignItems: 'center',
},
timeItem:{
    width: 60,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
   
},
timeItemSelected:{
    width: 60,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: cores.vermelho
},
timeItemText:{
  fontSize: 16,
  fontWeight: 'bold',
},
timeItemTextSelected:{
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
},
botaoFinalizar:{
    backgroundColor: cores.vermelho,
    justifyContent:'center',
    alignItems: 'center',
    borderRadius: 10,
    height:50,
    width: '100%',
    marginTop: 20,
    marginBottom: 10,
},
botaoFinalizarText:{
    color: '#fff',
    fontSize: 17,
    fontWeight:'bold',
 },
 selectPagamentoArea:{
    flexDirection:'row',
    justifyContent: 'space-around',
    alignItems:'center',
    marginBottom: 20,
 },

pagamentoArea:{
   width: '100%', 
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
},
pagamentoTitleAreaSelected:{
    borderRadius: 10,
    backgroundColor: cores.vermelho,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
},
pagamentoText:{
    color: '#000',
    fontWeight: 'bold',
    fontSize:16,
},
pagamentoTextSelected:{
    color: '#fff',
    fontWeight: 'bold',
    fontSize:16,
}



})