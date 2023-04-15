import { StyleSheet, TextInput, View } from 'react-native'
import React, {useState} from 'react'
import { FontAwesome,Entypo } from '@expo/vector-icons'; 



const CreditCard = ({numeroCartao,titularCartao,validadeCartao,cvvCartao,setNumeroCartao,setTitularCartao,setValidadeCartao,setCvvCartao}) => {
   // const [number,setNumber] = useState('');
  //  const [holder,setHolder] = useState('');
  //  const [expireAt,setExpireAt] = useState('');
  //  const [cvv,setCvv] = useState('');
  return (
    <View style={styles.container}>

      <View style={styles.inputArea}>
         <TextInput style={styles.input}
            placeholder="Número do cartão"
            value={numeroCartao}
            onChangeText={t=>setNumeroCartao(t)}
            placeholderTextColor="#c1c1c1" 
            keyboardType='number-pad'
        />
        <FontAwesome name="credit-card" size={24} color="black" />
    </View>

    <View style={styles.inputArea}>
         <TextInput style={styles.input}
            placeholder="Titular do Cartão"
            value={titularCartao}
            onChangeText={t=>setTitularCartao(t)}
            placeholderTextColor="#c1c1c1" 
        />
        <FontAwesome name="user" size={24} color="black" />
    </View>

   <View style={styles.InputColumn}>
        <View style={styles.inputArea2}>
                <TextInput style={styles.input}
                    placeholder="Validade"
                    value={validadeCartao}
                    onChangeText={t=>setValidadeCartao(t)}
                    placeholderTextColor="#c1c1c1" 
                />
                <FontAwesome name="calendar" size={24} color="black" />
            </View>
            <View style={styles.inputArea2}>
                <TextInput style={styles.input}
                    placeholder="CVV"
                    value={cvvCartao}
                    onChangeText={t=>setCvvCartao(t)}
                    placeholderTextColor="#c1c1c1" 
                    keyboardType='number-pad'
                />
                <Entypo name="credit-card" size={24} color="black" />
            </View>

   </View>
  

    </View>
  )
}

export default CreditCard

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    inputArea: {
        width: '100%',
        height: 50,
        flexDirection: 'row',
        borderColor: '#000',
        borderWidth: 1,
        paddingLeft: 5,
        paddingRight: 10,
        alignItems: 'center',
        marginBottom: 15,
        borderRadius: 10,
  },
  inputArea2: {
    width: '49%',
    height: 50,
    flexDirection: 'row',
    borderColor: '#000',
    borderWidth: 1,
    paddingLeft: 5,
    paddingRight: 10,
    alignItems: 'center',
    marginBottom: 15,
    borderRadius: 10,
},
  InputColumn:{
     flexDirection: 'row',
     justifyContent: 'space-between',

  },
  input: {
      flex: 1,
      fontSize: 16,
      paddingHorizontal: 4,
      color: '#000',
      marginLeft: 10,
  },
})