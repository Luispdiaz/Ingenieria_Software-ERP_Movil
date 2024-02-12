import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import theme from "../Themes/Theme";
import Constants from 'expo-constants';
import Product from "./Product";
import DataTemporal from "../Data/DataTemporal";

const Styles = StyleSheet.create({
    contenedorPrincipal: {
        flex: 1,
        justifyContent:"flex-start"
    },
    contenedorTitulo: {
        marginTop: Constants.statusBarHeight + 10,
        alignItems: 'center',
    },
    contenedorProductos: {
        flex: 1,
        justifyContent: 'flex-start'
    },
    tituloInventario: {
      fontSize: theme.title.fontSize,
      fontWeight: theme.title.fontWeight,
      marginBottom: theme.title.marginBottom,
      color: theme.colors.textPrimary,
    },
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
        <Text style={Styles.tituloInventario}>Inventario</Text>
    </View>
    <View style={Styles.contenedorProductos}> 
    
    <FlatList
        data={DataTemporal}
        renderItem={({ item }) => (
            <Product {...item}/>
          )}
          numColumns={2} 
    /> 
   </View>
    </LinearGradient>
  )
}


export default InventoryView;