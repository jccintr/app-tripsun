import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Stars from './Stars'


const formataData = (d) =>{
  let arr = d.split('-');
  return arr[2]+'/'+arr[1]+'/'+arr[0];
}

const ReviewCard = ({review}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.userNameText}>{review.user.name}</Text>
      <View style={styles.starsLines}><Stars stars={review.rate}/><Text style={styles.dataText}>{formataData(review.data)}</Text></View>
      <Text style={styles.messageText}>{review.message}</Text>
    </View>
  )
}

export default ReviewCard

const styles = StyleSheet.create({
    container:{
       marginBottom: 5,
      
    },
    userNameText:{
       fontWeight: 'bold',
       color: '#000',
       marginBottom: 5,
    },
    starsLines:{
       
        flexDirection: 'row',
      },
    dataText:{
         marginLeft: 10,
    },
    messageText:{
      marginBottom: 5,
    }

})