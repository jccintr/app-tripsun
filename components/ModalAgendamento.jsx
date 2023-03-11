import { StyleSheet, Text, View,Modal,TouchableOpacity,ScrollView } from 'react-native'
import React, {useState,useEffect} from 'react'
import { Entypo } from '@expo/vector-icons';

const months = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
const days = ['Dom','Seg','Ter','Qua','Qui','Sex','Sab'];



const ModalAgendamento = ({modalVisible,setModalVisible,horarios}) => {
    const [selectedYear, setSelectedYear] = useState(0);
    const [selectedMonth, setSelectedMonth] = useState(0);
    const [selectedDay, setSelectedDay] = useState(0);
    const [selectedHour, setSelectedHour] = useState(null);
    const [listDays, setListDays] = useState([]);
    const [listHours, setListHours] = useState([]);


  

    useEffect(()=>{
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
        
    }, [selectedMonth, selectedYear]);

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

  return (
    <Modal visible={modalVisible} animationType="slide" transparent={true} onRequestClose={()=>setModalVisible(false)}>
           
    <View style={styles.modalArea}>
        <View style={styles.modalBody}>
            <TouchableOpacity onPress={()=>setModalVisible(false)}>
               <View style={styles.closeButton}/>
            </TouchableOpacity>

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
                   {listDays.filter(listDay=>listDay.status).map((listDay,index)=>(
                      <TouchableOpacity onPress={()=>{}} style={styles.dateItem}>
                        <Text style={styles.dateItemWeekDay}>{listDay.weekday}</Text>
                        <Text style={styles.dateItemNumber}>{listDay.number}</Text>                    
                      </TouchableOpacity>
                    ))}
                </ScrollView>
            
            
        </View>
           
           
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
    height: 500,
    backgroundColor: '#fff',
    borderTopLeftRadius:30,
    borderTopRightRadius: 30,
    paddingTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: 'center',    
    
},
closeButton:{
    width: 100,
    height: 3,
    backgroundColor: '#c1c1c1',
    borderRadius: 10,
    marginBottom: 10,
},
modalItem:{
   width: '100%', 
   backgroundColor: '#0fd',
   borderRadius: 10,
  padding: 10,

},
monthArea:{
  flexDirection: 'row',
 
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
    width: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingTop: 5,
    paddingBottom:5,

},
dateItemWeekDay:{
    fontSize: 16,
    fontWeight: 'bold',
},
dateItemNumber:{
    fontSize: 16,
    fontWeight: 'bold',
},



})