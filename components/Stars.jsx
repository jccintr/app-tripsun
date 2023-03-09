import React from 'react'
import { StyleSheet,View,Text } from 'react-native';
import { cores } from '../style/globalStyle';
import { FontAwesome } from '@expo/vector-icons';

const Stars = ({stars}) => {
    let s = [0, 0, 0, 0, 0];
    let floor = Math.floor(stars);
    let left = stars - floor;

    for(var i=0;i<floor;i++) {
        s[i] = 2;
    }
    if(left > 0) {
        s[i] = 1;
    }

  return (
    <View style={styles.starArea}>
         <Text style={styles.starText}>{stars.length === 1 ? stars+'.0':stars}</Text>
        {s.map((i, k)=>(
            <View key={k}>
                {i === 0 && <FontAwesome name="star-o" size={16} color={cores.dourado} />}
                {i === 1 && <FontAwesome name="star-half-o" size={16} color={cores.dourado} />}
                {i === 2 && <FontAwesome name="star" size={16} color={cores.dourado} />}
            </View>
        ))}
        
   </View>
  )
}

export default Stars


const styles = StyleSheet.create({
    
    
    starArea:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      },
    starText:{
        fontSize: 14,
        marginRight: 5,
    },

   
   
    
  });