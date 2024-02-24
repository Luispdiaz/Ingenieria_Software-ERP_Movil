import React, { useEffect } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Image } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import theme from "../Themes/Theme";
import Constants from 'expo-constants';
import Product from "./Product";
import DataTemporal from "../Data/DataTemporal";
import { Dimensions } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { useProducts } from "../../Context/ProductContext";
import { useState, useRef } from "react";

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
      textinput: {
        flex: 1, // Hace que el TextInput ocupe todo el espacio restante horizontalmente
        padding: 10,
        borderWidth: 1,
        borderColor: "#4D09FF",
        color: "#FFFFFF",
        textAlign: "left",
        paddingStart: 30, 
        borderRadius: 25,
      },
    TextoModificar: {
      width: 24, // Ajusta el ancho de la imagen según tus necesidades
      height: 20, // Ajusta la altura de la imagen según tus necesidades
      marginRight: 10, // Agrega un margen derecho entre la imagen y el TextInput
    },
    containerBuscador: {
      flexDirection: 'row', // Alinear los elementos en una fila
      alignItems: 'center', // Centrar verticalmente los elementos
      paddingHorizontal: 16, // Agregar un relleno horizontal para espacio alrededor de los elementos
    }
  });
  

const InventoryView = () =>{

  const {Productos, getProducts,buscarProductos} = useProducts() 
  const [Busqueda, setBusqueda] = useState('');

  const ResetBusqueda = () => {
    setBusqueda("")
  }

  useEffect(()=>{
    getProducts()
  }, [])

  const handleLimpiarBusqueda = () => {
    setBusqueda('');
    if (inputRef.current) {
      inputRef.current.clear();
    }
    buscarProductos('');
  };

  const navigation = useNavigation();
  const inputRef = useRef(null);
  
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
        <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate("CrearProducto")}>
        <Text style={Styles.Simbolo}>+</Text>
        </TouchableOpacity>
        </View>

    </View>
    
    <View style={Styles.contenedorProductos}>
    <View style={Styles.containerBuscador}>
    {Busqueda !== '' && (
        <TouchableOpacity
          onPress={handleLimpiarBusqueda}
        >
          <Image
            source={require('../Assets/image (3).png')}
            style={Styles.TextoModificar}
          />
        </TouchableOpacity>
      )}
 

  <TextInput
  ref={inputRef}
  style={Styles.textinput}
  placeholder="Buscar en el inventario..."
  placeholderTextColor='#FFFFFF'
  onChangeText={(texto1) => setBusqueda(texto1)}
  onSubmitEditing={() =>buscarProductos(Busqueda)}
  />
  </View>
 

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