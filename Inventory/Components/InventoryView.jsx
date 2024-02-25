import React, { useEffect } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Image } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import theme from "../Themes/Theme";
import Constants from 'expo-constants';
import Product from "./Product";
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
        justifyContent: 'space-between',
        flexDirection:'row',
        marginBottom: 20
    },
    contenedorProductos: {
        flex: 1,
        justifyContent: 'flex-start',
        
        
        
    },
    tarjetaProducto:{
      backgroundColor: theme.colors.secundario,
      borderRadius: 10,
      margin: 10,
      padding: 10,
      width: windowHeight * 0.4,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.5,
      shadowRadius: 2,
      elevation: 5, // Esto es para Android
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
      },
      textinput: {
        flex: 1, 
        padding: 10,
        borderWidth: 1,
        borderColor: "#4D09FF",
        color: "#FFFFFF",
        textAlign: "left",
        paddingStart: 30, 
        borderRadius: 25,
      },
    TextoModificar: {
      width: 24, 
      height: 20, 
      marginRight: 10, 
    },
    containerBuscador: {
      flexDirection: 'row', 
      alignItems: 'center', 
      paddingHorizontal: 16,
    },
    mensajeNoCoincidencias: {
      fontSize: 16,
      color: theme.colors.textPrimary, 
      textAlign: 'center',
      marginTop: 20,
    }
  });
  

const InventoryView = () =>{

  const {Productos, getProducts,buscarProductos} = useProducts() 
  const [Busqueda, setBusqueda] = useState('');


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
  
  {Busqueda !== '' && Productos.length === 0 && (
  <Text style={Styles.mensajeNoCoincidencias}>
    No hay coincidencias con la búsqueda
  </Text>
)}
  <View style={Styles.contenedorProductos}>
    <FlatList
    style={{marginTop:20, marginHorizontal:10}}
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