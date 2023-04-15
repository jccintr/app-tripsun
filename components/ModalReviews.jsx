import { StyleSheet, Text, View,Modal,TouchableOpacity, ScrollView} from 'react-native'
import React from 'react'
import { Entypo } from '@expo/vector-icons';
import { cores } from '../style/globalStyle';
import Api from '../Api';
import ReviewCard from './ReviewCard';



const ModalReviews = ({reviews,modalVisible,setModalVisible}) => {
  return (
    <Modal visible={modalVisible} animationType="slide" transparent={true} onRequestClose={()=>setModalVisible(false)}>
      <View style={styles.modalArea}>
        <View style={styles.modalBody}>
               <TouchableOpacity style={styles.headerArea} onPress={()=>setModalVisible(false)}>
                  <Entypo name="chevron-down" size={34} color="black" />
                  <Text style={styles.modalTitleText}>Avaliações desta Atividade</Text>
                </TouchableOpacity>
                <ScrollView showsVerticalScrollIndicator={false}>
                  {reviews.map((review)=>(<ReviewCard key={review.id} review={review}/>))}
                </ScrollView>
                
        </View>
      </View>
    </Modal>
  )
}

export default ModalReviews

const styles = StyleSheet.create({

modalArea:{
    flex:1,
    justifyContent:'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    },
modalBody:{
    width: '100%',
    height: 450,
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

})