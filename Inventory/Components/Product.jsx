import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity} from "react-native";
import theme from "../Themes/Theme";
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native'

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    contenedor: {
      flex: 1,
      margin: 20,
      borderColor: theme.colors.cuartario,
      borderWidth: 2,
      borderRadius: 25,
      height: windowHeight * 0.22,
    },
    NombreProducto: {
        color: theme.colors.textPrimary,
        fontSize: theme.text.fontSize,
        fontWeight: theme.text.fontWeight,
      },
      EstiloImagen:{
        height: windowHeight * 0.15,
        borderRadius:25,
        }
  });

const Product = (props) => {
    const navigation = useNavigation();
return(
    
    <View style={styles.contenedor}>
        <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate("VistaProducto")}>
        <View>
        <Image style={styles.EstiloImagen} source={{ uri: props.imagenURL }} />
        </View>
        </TouchableOpacity>
        <View style={{alignItems:'center',justifyContent:'center',flex:1}}>
        <Text style={styles.NombreProducto}>
            {props.nombre}
        </Text>
        </View>
        
    </View>
    
)
}

export default Product