import React, { useEffect } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import theme from "../Themes/Theme";
import Constants from 'expo-constants';
import Product from "./Product";
import DataTemporal from "../Data/DataTemporal";
import { Dimensions } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { useProducts } from "../../Context/ProductContext";

const windowHeight = Dimensions.get('window').height;

const Styles = StyleSheet.create({
    contenedorPrincipal: {
        flex: 1,
        justifyContent:"flex-start"
    },
    contenedorTitulo: {
        marginTop: Constants.statusBarHeight + 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection:'row',
        marginBottom: 20
    },
    contenedorProductos: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: 'rgba(192, 101, 230, 0.2)',
        borderRadius: 20,
        borderColor: 'black',
        margin: 20,
        elevation:300,
        borderWidth: 0.4
    },
    contenedorRedondo: {
        width: windowHeight * 0.07,  
        height: windowHeight * 0.07,  
        borderRadius: 50, 
        justifyContent:'center',
        alignItems:'center',
        borderColor: theme.colors.cuartario,
        borderWidth: 2,
        marginRight: windowHeight * 0.015
      },
      contenedorFlecha: {
        width: windowHeight * 0.07,  
        height: windowHeight * 0.07,  
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
      },
      background:{
        flex:1
      }
  });

const InventoryView = () =>{

  const {Productos, getProducts} = useProducts() 

  useEffect(()=>{
    getProducts()
  }, [])

  const navigation = useNavigation();
  return(

    <LinearGradient colors={['#B56FEE', '#781BB8', '#000000', '#070914']}
    start={{ x: 1, y: 0 }} // Modificado
    end={{ x: 0, y: 1 }} // Modificado
    style={Styles.background}
    >
    <View style={Styles.contenedorTitulo}>
        <View style={Styles.contenedorFlecha}>{/*Hay que hacer la flecha de retroceso*/}</View> 
        <Text style={Styles.tituloInventario}>Inventario</Text>
        
        <View style={Styles.contenedorRedondo}>
        <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate("CrearProducto")}>
        <Text style={Styles.Simbolo}>+</Text>
        </TouchableOpacity>
        </View>

    </View>
    <View style={Styles.contenedorProductos}> 
    
    <FlatList
        data={Productos}
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