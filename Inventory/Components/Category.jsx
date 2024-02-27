import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity} from "react-native";
import theme from "../Themes/Theme";
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native'


const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    contenedor: {
        margin: 5,
      },
      circulo: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#4244f4',
        borderColor: 'blue',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
      },
      NombreProducto: {
        color: '#FFFFFF',
        fontWeight: 'bold',
      },
      circuloSeleccionado: {
        borderColor: 'white', 
        borderWidth: 2,
      }
  });

const Category = ({nombre, isSelected, onPress }) => {
return(
    
    <TouchableOpacity style={styles.contenedor} onPress={onPress}>
      <View style={[styles.circulo, isSelected && styles.circuloSeleccionado]}>
        <Text style={styles.NombreProducto}>{nombre}</Text>
      </View>
    </TouchableOpacity>

    
)
}

export default Category