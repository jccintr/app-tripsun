import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { cores } from '../style/globalStyle';
import { Ionicons } from '@expo/vector-icons';


const formataData = (d) =>{
    let data = d.substring(0,10);
    let arr = data.split('-');
    return arr[2]+'/'+arr[1]+'/'+arr[0];
  }
  const formataHorario = (d) =>{
       return d.substring(11,16);
   }



const AgendamentoCard = ({agendamento}) => {
    return (
        <View style={styles.container}>
           <View>
             <Text style={styles.dataText}>{formataData(agendamento.data_agendamento)} - {formataHorario(agendamento.data_agendamento)}</Text>
             <Text style={styles.nomeServicoText}>{agendamento.servico.nome}</Text>
             <Text style={styles.vagasText}>Válido para {agendamento.quantidade} {agendamento.quantidade>1?'pessoas':'pessoa'}</Text>
           </View> 
           <View>
              <Ionicons name="chevron-forward" size={26} color="black" />
           </View>
           
          
        </View>
      )
}

export default AgendamentoCard

const styles = StyleSheet.create({

 container :{
  
flexDirection: 'row',
   width: '95%',
   justifyContent: 'space-between',
   alignItems: 'center',
   padding: 10,
   borderRadius: 10,
   borderBottomWidth: 1,
   borderBottomColor: '#c1c1c1',
  
},
dataText:{
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
},
nomeServicoText:{
    fontSize: 16,
    fontWeight: 'bold',
},
vagasText:{
    fontSize: 14,
},
botaoDetalhes:{
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
},
botaoDetalhesText:{
    width: '100%',
    color: cores.vermelho,
   
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
}
})