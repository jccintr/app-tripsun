import { StyleSheet, Text, View,Modal,TouchableOpacity } from 'react-native'
import React from 'react'

const ModalAgendamento = ({modalVisible,setModalVisible}) => {
  return (
    <Modal visible={modalVisible} animationType="slide" transparent={true} onRequestClose={()=>setModalVisible(false)}>
           
    <View style={styles.modalArea}>
        <View style={styles.modalBody}>
            <TouchableOpacity onPress={()=>setModalVisible(false)}>
               <View style={styles.closeButton}></View>
            </TouchableOpacity>
           
           
           
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

},

})