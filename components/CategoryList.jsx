
import { StyleSheet, Text,Image,TouchableOpacity,View} from 'react-native';
import Api from '../Api';
import { cores } from '../style/globalStyle';
import { useNavigation } from '@react-navigation/native';

const CategoryList = ({categorias,onPress}) => {
  
  return (
  
    <View style={styles.container}>
       {categorias.map((categoria) => (
        <TouchableOpacity style={styles.categoryCard} key={categoria.id} onPress={()=>onPress(categoria)}>
          
                <Image style={styles.categoryImage} source={{uri:`${Api.base_storage}/${categoria.imagem}`,}}/>
                <Text style={styles.categoryText}>{categoria.nome}</Text>
         </TouchableOpacity>
              ))}
    </View>
    
  )
}

export default CategoryList


const styles = StyleSheet.create({
    
    container: {
      backgroundColor: cores.cinzaClaro,
      width: 350,
      flexDirection: "row",
      flexWrap: "wrap",
      borderRadius:15,
      marginTop:10,
      marginBottom:10,
     
        },
    categoryCard:{
     
     
      height: 100,
      minWidth: 75,
      maxWidth: 75,
      
      flexDirection: 'column',
      alignItems:'center',
      justifyContent:'center',
      margin: 6,
      

    },
    categoryImage:{
       width: 75,
       height: 75,
    },
    categoryText:{
      fontSize: 12,
      fontWeight: 'bold',
    },
   
    
  });