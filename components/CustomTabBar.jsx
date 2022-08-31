import React from 'react'
import { StyleSheet, Text,TouchableOpacity,View} from 'react-native';
import { Entypo } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons';

import { cores } from '../style/globalStyle';

const CustomTabBar = ({state,navigation}) => {

  const goTo = (screenName) => {
    navigation.navigate(screenName);
}

  return (
    <View style={styles.TabArea}>

            <TouchableOpacity style={styles.TabItem} onPress={()=>goTo('Home')}>
              <Entypo style={{color:state.index===0? cores.vermelho:cores.menuItem}} name="home" size={24}  />
              <Text style={state.index===0 ? styles.TabItemTextSelected:styles.TabItemText}>Inicio</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.TabItem} onPress={()=>goTo('Search')}>
              <FontAwesome style={{color:state.index===1? cores.vermelho:cores.menuItem}} name="globe" size={24}  />
              <Text style={state.index===1 ? styles.TabItemTextSelected:styles.TabItemText}>Busca</Text>
            </TouchableOpacity>

            <TouchableOpacity  style={styles.TabItem} onPress={()=>goTo('Favorites')}>
              <AntDesign style={{color:state.index===2? cores.vermelho:cores.menuItem}} name="hearto" size={24}  />
              <Text style={state.index===2 ? styles.TabItemTextSelected:styles.TabItemText}>Favoritos</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.TabItem} onPress={()=>goTo('Profile')}>
              <FontAwesome style={{color:state.index===3? cores.vermelho:cores.menuItem}} name="user-circle-o" size={24}  />
              <Text style={state.index===3 ? styles.TabItemTextSelected:styles.TabItemText}>Perfil</Text>
            </TouchableOpacity>
    </View>
  )
}

export default CustomTabBar


const styles = StyleSheet.create({
    
    TabArea:{
        height: 60,
        backgroundColor: "#fff",
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderTopWidth: 1,
        borderTopColor: cores.menuItem,

    },
    TabItem:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    TabItemText:{
      marginTop: 5,
      color: cores.menuItem
    },
    TabItemTextSelected:{
      marginTop: 5,
      color: cores.vermelho
    },
   
    AvatarIcon:{
        width: 24,
        height: 24,
        borderRadius: 12,
    },
   
    
  });