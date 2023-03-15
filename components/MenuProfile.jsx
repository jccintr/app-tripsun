import React from 'react'
import { StyleSheet, View,Text,TouchableOpacity} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';


const Icone = ({iconName,iconProvider}) => {

  
    switch (iconProvider) {
        case 'AntDesign':
            return <AntDesign name={iconName} size={22} color="#000" />;
            break;
        case 'FontAwesome':
            return <FontAwesome name={iconName} size={22} color="#000" />;
             break;
        case 'MaterialIcons':
            return <MaterialIcons name={iconName} size={22} color="#000" />;
             break;
        case 'Entypo':
            return <Entypo name={iconName} size={22} color="#000" />;
            break;
       case 'Octicons':
             return <Octicons name={iconName} size={22} color="#000" />;
             break;

        default:
          console.log(`icone não encontrado`);
      }




}



const MenuProfile = ({iconProvider,iconName,label,onPress}) => {
  return (
    <TouchableOpacity style={styles.menuArea} onPress={onPress}>
      <Icone iconName={iconName} iconProvider={iconProvider}/>
      <Text style={styles.labelText}>{label}</Text>
      <Entypo name="chevron-small-right" size={24} color="#000" />
    </TouchableOpacity>
  )
}

export default MenuProfile


const styles = StyleSheet.create({

    menuArea:{
       width: '90%',
       height: 50,
       flexDirection: 'row',
       alignItems: 'center',
       justifyContent: 'space-between',
    },
   labelText:{
      fontSize: 16,

   }



  });
