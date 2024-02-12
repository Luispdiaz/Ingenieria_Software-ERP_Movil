import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import theme from "../Themes/Theme";
import Constants from 'expo-constants';
import Product from "./Product";
import DataTemporal from "../Data/DataTemporal";
import { Dimensions } from 'react-native';

const windowHeight = Dimensions.get('window').height;

const Styles = StyleSheet.create({
    contenedorPrincipal: {
        flex: 1,
        justifyContent:"flex-start"
    },
    contenedorTitulo: {
        marginTop: Constants.statusBarHeight + 10,
        alignItems: 'center',
        justifyContent:'center',
        justifyContent: 'space-between',
        flexDirection:'row',
        marginBottom: 10
    },
    contenedorProductos: {
        flex: 1,
        justifyContent: 'flex-start'
    },
    contenedorRedondo: {
        width: windowHeight * 0.07,  // Ajusta el ancho según tus necesidades
        height: windowHeight * 0.07,  // Ajusta la altura según tus necesidades
        borderRadius: 50,  // La mitad del valor de la altura para hacerlo circular // Color de fondo
        justifyContent:'center',
        alignItems:'center',
        borderColor: theme.colors.cuartario,
        borderWidth: 2,
        marginRight: windowHeight * 0.015
      },
      contenedorFlecha: {
        width: windowHeight * 0.07,  // Ajusta el ancho según tus necesidades
        height: windowHeight * 0.07,  // Ajusta la altura según tus necesidades
         // La mitad del valor de la altura para hacerlo circular // Color de fondo
        marginLeft: windowHeight * 0.015,
        alignItems:'center',
        justifyContent:'center'

      },
    tituloInventario: {
      fontSize: theme.title.fontSize,
      fontWeight: theme.title.fontWeight,
      color: theme.colors.textPrimary
    },
    Simbolo: {
        fontSize:30,
        fontWeight: theme.title.fontWeight,
        color: theme.colors.textPrimary,
        justifyContent:'center',
        alignItems:'center'
      }
  });

const InventoryView = () =>{
  return(
    <LinearGradient
    colors={[
    theme.colors.primario,
    theme.colors.terciario,
    theme.colors.secundario,
    theme.colors.secundario,
    theme.colors.secundario,
    theme.colors.secundario, 
    theme.colors.secundario,
    theme.colors.terciario,
    theme.colors.primario,
    ]}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
    style={Styles.contenedorPrincipal}
    >
    <View style={Styles.contenedorTitulo}>
        <View style={Styles.contenedorFlecha}>{/*Hay que hacer la flecha de retroceso*/}</View> 
        <Text style={Styles.tituloInventario}>Inventario</Text>
        
        <View style={Styles.contenedorRedondo}>
        <Text style={Styles.Simbolo}>+</Text>
        </View>

    </View>
    
    <View style={Styles.contenedorProductos}> 
    
    <FlatList
        data={DataTemporal}
        renderItem={({ item }) => (
            <Product {...item}
            />
          )}
          numColumns={2} 
    /> 
   </View>
    </LinearGradient>
  )
}


export default InventoryView;