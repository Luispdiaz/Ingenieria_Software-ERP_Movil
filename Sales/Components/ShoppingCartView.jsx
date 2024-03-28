import React, { useRef } from "react";
import { View, Text, StyleSheet, Dimensions, Image, ScrollView, TouchableOpacity, TextInput, FlatList } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from "@react-navigation/native";
import Constants from 'expo-constants';
import theme from "../../Inventory/Themes/Theme";
import { useState } from "react";
import { useContact } from "../../Context/ContactContext";
import Product from "../../Inventory/Components/Product";
import { useProducts } from "../../Context/ProductContext";
import { useEffect } from "react";
import Product1 from "./Product1";
import { useVenta } from "../../Context/VentaContext";
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Camera } from 'expo-camera';



const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    contenedorPrincipal: {
        flex: 1,
        justifyContent:"flex-start"
    },
    textinput: {
        flex:1,
        padding: 10,
        borderWidth: 1,
        borderColor: 'white',
        color: "#FFFFFF",
        textAlign: "left",
        paddingStart: 30, 
        borderRadius: 25,
        marginHorizontal:20
      },
    textinputcode: {
        padding: 10,
        borderWidth: 2,
        borderColor: 'white',
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        paddingStart: 10, 
        borderRadius: 25,
        marginHorizontal:20
      },
      contenedorTitulo: {
        marginTop: Constants.statusBarHeight + 10,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection:'row'
    },
    backButton: {
      position: 'absolute',
      left: Constants.statusBarHeight * 0.01,
      padding: 10,
      zIndex: 1,
      alignSelf:'flex-start',
      justifyContent:'flex-start'
    },
    CarritoButton: {
      position: 'absolute',
      right: Constants.statusBarHeight * 0.01,
      padding: 10,
      zIndex: 1,
      alignSelf:'flex-start',
      justifyContent:'flex-start',
      marginRight:3
    },
    Carrito: {
      width: 29, 
      height: 25,
    },
    TextoModificar: {
      width: 24, 
      height: 20, 
      marginRight: 10, 
    },
    RetrocederBuscador: {
      width: 24, 
      height: 20,  
      marginLeft: 20
      
    },
    tituloInventario: {
      fontSize: theme.title.fontSize,
      fontWeight: theme.title.fontWeight,
      color: theme.colors.textPrimary
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
    contenedorFlecha: {
      width: windowHeight * 0.07,  
      height: windowHeight * 0.07,  
      marginLeft: windowHeight * 0.015,
      alignItems:'center',
      justifyContent:'center'

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
  containerBuscador: {
    flexDirection: 'row', 
    alignItems: 'center',
    
  },
  mensajeNoCoincidencias: {
    fontSize: 16,
    color: theme.colors.textPrimary, 
    textAlign: 'center',
    marginTop: 20,
  },
    contenedorMas:{ 
    width: windowHeight * 0.06,
      height: windowHeight * 0.06, 
      marginLeft:7},

      titulo: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        marginTop: 15,
        marginLeft:20,
        marginBottom: 20
      },
      subtitulo:{
        fontSize: 15,
        color: "#FFFFFF",
        fontWeight: 'bold',
        marginLeft:15,
        marginTop:10
      }

    
  
      
  });

const ShoppingCartView = ({route}) => {
    const {Productos, getProducts,buscarProductos,obtenerCategoriasUnicas, Categorias, buscarProductosPorCategoria} = useProducts() 
    const [Busqueda, setBusqueda] = useState('');
    const navigation = useNavigation()
    const inputRef = useRef(null);
    const { ReiniciarVariables } = useVenta()
    const tipoRegistro = route.params.tipoRegistro
    

    useEffect(()=>{
      getProducts()
    }, [])

    const handleLimpiarBusqueda = () => {
      setBusqueda('');
      if (inputRef.current) {
        inputRef.current.clear();
      }
      buscarProductos('');
    }

  const onPress = () => {
    navigation.navigate("BarCodeScanner")
  }
  return (
    <LinearGradient
        colors={[
          "#7227a6",
          "#431b6a",
          "#000000"
        ]}
        style={styles.contenedorPrincipal}
      >
    <View style={styles.contenedorTitulo}>
        <View style={styles.backButton}>
        <TouchableOpacity
          onPress={() => {navigation.goBack()
          ReiniciarVariables()
          }}
        >
          <Image
          source={require('../Assets/image (3).png')}
          style={styles.TextoModificar}
        />
        </TouchableOpacity>
        </View>
        <Text style={styles.tituloInventario}>Punto de Venta</Text>
        <View style={styles.CarritoButton}>
        <TouchableOpacity
          onPress={() => navigation.navigate("VistaProductosVenta", {tipoRegistro})}
        >
          <Image
          source={require('../Assets/assetV_1.png')}
          style={styles.Carrito}
        />
        </TouchableOpacity>
        </View>
    </View>
    <Text style={styles.titulo}>Selecciona los productos</Text>
    <View style={styles.containerBuscador}>
    {((Busqueda !== '') && (
  <TouchableOpacity onPress={handleLimpiarBusqueda}
  >
    <Image
      source={require('../Assets/image (3).png')}
      style={styles.RetrocederBuscador}
    />
  </TouchableOpacity>
))}

  
  <TextInput
  ref={inputRef}
  style={styles.textinput}
  placeholder="Buscar en el inventario..."
  placeholderTextColor='#FFFFFF'
  onChangeText={(texto1) => setBusqueda(texto1)}
  onSubmitEditing={() =>buscarProductos(Busqueda)}
  />
  
  <TouchableOpacity style={styles.textinputcode}
  onPress = {onPress}
  >
  <Image
      source={require('../Assets/SearchBarCode.png')}
      style = {{width: 30, height: 30}}
    />
  </TouchableOpacity>
  </View>

  
  {Busqueda !== '' && Productos.length === 0 && (
  <Text style={styles.mensajeNoCoincidencias}>
    No hay coincidencias con la búsqueda
  </Text>
)}



  <View style={styles.contenedorProductos}>
    <FlatList
    style={{marginTop:20, marginHorizontal:10}}
        data={Productos}
        renderItem={({ item }) => (
            <Product1 {...item}
            />
          )}
          numColumns={1} 
    /> 
   </View>
    
    </LinearGradient>
  );
};



export default ShoppingCartView;