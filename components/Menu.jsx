import React from 'react'
import { StyleSheet, Text,TouchableOpacity,View} from 'react-native';
import { Entypo } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons';
import { cores } from '../style/globalStyle';


const Menu = ({state,navigation}) => {

    const goTo = (screenName) => {
        navigation.navigate(screenName);
    }


    return (
        <View style={styles.TabArea}>
    
                <TouchableOpacity style={state.index===0 ? styles.TabItemSelected:styles.TabItem} onPress={()=>goTo('Home')}>
                  {state.index===0?
                    <View style={styles.IconArea}>
                        <Entypo style={{color:cores.amarelo}} name="home" size={34}/>
                    </View>:(<> 
                    <Entypo style={{color:cores.branco}} name="home" size={24}/>
                    <Text style={styles.TabItemText}>Inicio</Text></>)} 
                </TouchableOpacity>

                <TouchableOpacity style={state.index===1 ? styles.TabItemSelected:styles.TabItem} onPress={()=>goTo('Search')}>
                  {state.index===1?
                    <View style={styles.IconArea}>
                        <FontAwesome style={{color:cores.amarelo}} name="globe" size={34}/>
                    </View>:(<> 
                    <FontAwesome style={{color:cores.branco}} name="globe" size={24}/>
                    <Text style={styles.TabItemText}>Busca</Text></>)} 
                </TouchableOpacity>

                <TouchableOpacity style={state.index===2 ? styles.TabItemSelected:styles.TabItem} onPress={()=>goTo('Favorites')}>
                  {state.index===2?
                    <View style={styles.IconArea}>
                        <AntDesign style={{color:cores.amarelo}} name="hearto" size={34}/>
                    </View>:(<> 
                    <AntDesign style={{color:cores.branco}} name="hearto" size={24}/>
                    <Text style={styles.TabItemText}>Favoritos</Text></>)} 
                </TouchableOpacity>

                <TouchableOpacity style={state.index===3 ? styles.TabItemSelected:styles.TabItem} onPress={()=>goTo('Profile')}>
                  {state.index===3?
                    <View style={styles.IconArea}>
                        <FontAwesome style={{color:cores.amarelo}} name="user-circle-o" size={34}/>
                    </View>:(<> 
                    <FontAwesome style={{color:cores.branco}} name="user-circle-o" size={24}/>
                    <Text style={styles.TabItemText}>Perfil</Text></>)} 
                </TouchableOpacity>


        </View>
      )

}

export default Menu

const styles = StyleSheet.create({
    
    TabArea:{
        height: 60,
        backgroundColor: cores.vermelho,
        flexDirection: 'row',
        justifyContent: 'space-around',
       

    },
    TabItem:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    TabItemSelected:{
       flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: cores.vermelho,
        height:70,
        width:70,
        
    },
    TabItemText:{
      marginTop: 5,
      color: '#fff',
    },
    TabItemTextSelected:{
      marginTop: 5,
      color: cores.amarelo,
    },
   
    AvatarIcon:{
        width: 24,
        height: 24,
        borderRadius: 12,
    },
    IconArea:{
        marginTop:-40,
       height:70,
       width:70,
       borderRadius:35,
       backgroundColor: cores.vermelho,
       justifyContent: 'center',
       alignItems: 'center',
       borderWidth: 5,
       borderColor: cores.branco,
    }
   
    
  });