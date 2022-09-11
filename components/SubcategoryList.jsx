import { StyleSheet, Text,Image,TouchableOpacity,View,ScrollView} from 'react-native';
import Api from '../Api';
import { cores } from '../style/globalStyle';
import { useNavigation } from '@react-navigation/native';

const SubcategoryList = ({subCategorias,categoria}) => {
    return (
  
        <View style={styles.container}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
           {subCategorias.filter(subCategoria=>subCategoria.categoria_id===categoria.id).map((subCategoria) => (
            <TouchableOpacity style={styles.SubCategoryCard} key={subCategoria.id}>
                    <Image style={styles.SubCategoryImage} source={{uri:`${Api.base_storage}/${subCategoria.imagem}`,}}/>
                    <Text style={styles.SubCategoryText}>{subCategoria.nome}</Text>
             </TouchableOpacity>
                  ))}
          </ScrollView>
        </View>
        
      )
}

export default SubcategoryList

const styles = StyleSheet.create({
    
    container: {
      backgroundColor: cores.cinzaClaro,
      width: 350,
      borderRadius:15,
      marginTop:10,
     
        },
    SubCategoryCard:{
      height: 100,
      minWidth: 75,
      maxWidth: 75,
      flexDirection: 'column',
      alignItems:'center',
      justifyContent:'center',
      margin: 6,
      },
    SubCategoryImage:{
       width: 75,
       height: 75,
    },
    SubCategoryText:{
      fontSize: 12,
      fontWeight: 'bold',
    },
   
    
  });