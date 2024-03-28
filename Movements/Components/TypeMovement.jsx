import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity} from "react-native";
import { Dimensions } from 'react-native';
import { useState } from "react";

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    contenedor: {
      flex: 1,
      margin: 5,
      borderWidth:0,
      borderRadius: 25,
      height: windowHeight * 0.22,
      backgroundColor: "rgba(128, 41, 181, 0.15)",
    shadowColor: 'rgba(0, 0, 0, 0.7)', 
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 6

    },
    NombreProducto: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: 'normal',
      },
      EstiloImagen:{
        alignSelf:'center',
        height: windowHeight * 0.045
        },
        shadowContainer: {
          ...StyleSheet.absoluteFillObject,
          borderRadius: 15,
        }
  });

  const TypeMovement = ({ nombre, icono, color, isSelected, onPress }) => {
    const borderColor = isSelected ? 'white' : 'transparent';
    const backgroundColor = isSelected ? '#5909fe' : color;
  
    return (
      <TouchableOpacity activeOpacity={1} onPress={() => onPress(nombre)} style={{flex: 1,
        margin: 5,
        borderWidth: 2,
        borderColor: borderColor,
        borderRadius: 25,
        height: windowHeight * 0.13,
        shadowColor: 'rgba(0, 0, 0, 0.7)',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 6,
        backgroundColor: backgroundColor}}>
       
          <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
            <Image style={{ alignSelf: 'center', height: windowHeight * 0.045, width: windowHeight * 0.045 }} source={icono} />
          </View>
          <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
            <Text style={{ color: "#FFFFFF", fontSize: 16, fontWeight: 'normal' }}>
            {nombre.charAt(0).toUpperCase() + nombre.slice(1)}
            </Text>
          </View>
       
      </TouchableOpacity>
    );
  };
  
  export default TypeMovement;