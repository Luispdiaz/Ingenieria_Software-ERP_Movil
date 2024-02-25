import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity} from "react-native";
import theme from "../Themes/Theme";
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native'

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    contenedor: {
      flex: 1,
      margin: 5,
      borderWidth:0,
      borderRadius: 25,
      height: windowHeight * 0.22,
      backgroundColor: "rgba(128, 41, 181, 0.15)",
    shadowColor: 'rgba(0, 0, 0, 0.7)', // Color de la sombra
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 6

    },
    NombreProducto: {
        color: theme.colors.textPrimary,
        fontSize: theme.text.fontSize,
        fontWeight: theme.text.fontWeight,
      },
      EstiloImagen:{
        height: windowHeight * 0.15,
        borderRadius:25,
        },
        shadowContainer: {
          ...StyleSheet.absoluteFillObject,
          borderRadius: 15,
        }
  });

const Product = (props) => {
    const navigation = useNavigation();
return(
    
    <View style={styles.contenedor}>
        <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate("VistaProducto", {props})}>
        <View>
        <Image style={styles.EstiloImagen} source={{ uri: props.Imagen }} />
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