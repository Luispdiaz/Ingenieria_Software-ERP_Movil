import { StyleSheet, View, TextInput, Image, TouchableOpacity, Text, ImageBackground, ScrollView, Alert} from 'react-native';
import Header from './HeaderCreateProduct';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import theme from "../../Inventory/Themes/Theme";
import { useProducts } from '../../Context/ProductContext';
import { LinearGradient } from 'expo-linear-gradient';
import Constants from 'expo-constants';



const image = require("./Imagenes/Fondo.png");

const NewProduct = () =>{
  const [CodProveedor, setCodProveedor] = useState('');
  const [Nombre, setNombre] = useState('');
  const [Descripcion, setDescripcion] = useState('');
  const [Marca, setMarca] = useState('');
  const [Categoria, setCategoria] = useState('');
  const [CantidadInicial, setCantidadInicial] = useState('');
  const [PrecioD, setPrecioD] = useState('');
  const [PrecioE, setPrecioE] = useState('');
  const [CostoD, setCostoD] = useState('');
  const [CostoE, setCostoE] = useState('');
  const [TipoImpuesto, setTipoImpuesto] = useState('');
  const [Imagen, setImagen] = useState('');
  const navigation = useNavigation()
  const { createProduct } = useProducts()

  
    const handleSubmit = async () => {

        if (!isValidNumber(CantidadInicial) || !isValidNumber(PrecioD) || !isValidNumber(PrecioE) || !isValidNumber(CostoD) || !isValidNumber(CostoE)) {
            Alert.alert('Error', 'Por favor, ingresa valores válidos');
            navigation.navigate("VistaInventario");
          }
          else {
        createProduct(Nombre,Imagen,CodProveedor,Categoria,Descripcion,Marca,CantidadInicial,CostoD,CostoE,PrecioD,PrecioE,TipoImpuesto)
        Alert.alert('El producto se modificó de manera exitosa');
        navigation.navigate('VistaInventario')
      };
    }

    const isValidNumber = (value) => {
        const numberValue = parseFloat(value);
        return !isNaN(numberValue) && numberValue >= 0;
      }

    return(
        
        <LinearGradient
        colors={[
        theme.colors.secundario,
        theme.colors.primario,
        ]}
        style={styles.contenedorPrincipal}
    >
        <View>
        <ScrollView>
        <ImageBackground source={image} resizeMode="cover"  style={styles.image}>
        <Header/>

        <TextInput
            style={styles.textinput}
            placeholder='URL de la Imagen'
            placeholderTextColor='#FFFFFF'
            onChangeText={(texto) => setImagen(texto)}
            />

<TextInput
  style={styles.textinput}
  placeholder='Nombre del Producto'
  placeholderTextColor='#FFFFFF'
  onChangeText={(texto1) => setNombre(texto1)}
/>

<TextInput
  style={styles.textinput}
  placeholder='Codigo del Proveedor'
  placeholderTextColor='#FFFFFF'
  onChangeText={(texto2) => setCodProveedor(texto2)}
/>

<TextInput
  style={styles.textinput}
  placeholder='Categoría del Producto'
  placeholderTextColor='#FFFFFF'
  onChangeText={(texto3) => setCategoria(texto3)}
/>

<TextInput
  style={styles.textinput}
  placeholder='Descripción del Producto'
  placeholderTextColor='#FFFFFF'
  onChangeText={(texto4) => setDescripcion(texto4)}
/>

<TextInput
  style={styles.textinput}
  placeholder='Marca del Producto'
  placeholderTextColor='#FFFFFF'
  onChangeText={(texto5) => setMarca(texto5)}
/>

<TextInput
  style={styles.textinput}
  placeholder='Cantidad Inicial en el Inventario'
  placeholderTextColor='#FFFFFF'
  onChangeText={(texto6) => {
    
    const numeroEntero = parseInt(texto6, 10)
    
    setCantidadInicial(numeroEntero);}}
/>

<TextInput
  style={styles.textinput}
  placeholder='Costo por unidad ($)'
  placeholderTextColor='#FFFFFF'
  onChangeText={(texto7) => {
    
    const numeroEntero = parseInt(texto7, 10)
    
    setCostoD(numeroEntero);}}
/>

<TextInput
  style={styles.textinput}
  placeholder='Costo por unidad (Efectivo)'
  placeholderTextColor='#FFFFFF'
  onChangeText={(texto8) => {
    
    const numeroEntero = parseInt(texto8, 10)
    
    setCostoE(numeroEntero);}}
/>

<TextInput
  style={styles.textinput}
  placeholder='Precio por unidad ($)'
  placeholderTextColor='#FFFFFF'
  onChangeText={(texto9) => {
    
    const numeroEntero = parseInt(texto9, 10)
    
    setPrecioD(numeroEntero);}}
/>

<TextInput
  style={styles.textinput}
  placeholder='Precio por unidad (Efectivo)'
  placeholderTextColor='#FFFFFF'
  onChangeText={(texto11) => {
    
    const numeroEntero = parseInt(texto11, 10)
    
    setPrecioE(numeroEntero);}}
/>

<TextInput
  style={styles.textinput}
  placeholder='Tipo de Impuesto'
  placeholderTextColor='#FFFFFF'
  onChangeText={(texto12) => setTipoImpuesto(texto12)}
/>

        <View style={styles.countContainer}>
            <TouchableOpacity style={styles.button} onPress={handleSubmit} >
            <Text style={styles.buttonText}>Agregar</Text>
            </TouchableOpacity>
        </View>
        </ImageBackground>
        </ScrollView>
        </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    textinput:{
        padding: 10,
        borderWidth: 1,
        borderColor: "#4D09FF",
        color: "#FFFFFF",
        textAlign: "left",
        paddingStart: 30, /*Aqui cambio la posicion del texto dentro del input*/
        width: '80%',
        height: 50,
        marginTop: 20,
        marginLeft: 25,
        borderRadius: 25,
    },
    text:{
        color: "white",
        marginTop: 20,
        marginLeft:50
    },
    button: {
        alignItems: 'center',
        padding: 10,
        marginTop: 20,
        borderRadius: 5,
    },
    countContainer: {
        flexDirection: 'row',
        justifyContent: "space-around",
        marginBottom: 50
      },
      button: {
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
      padding: 10,
      marginTop: 20,
      borderRadius: 5,
      
      },
      buttonText:{
          color:"#000000",
          fontSize: 30,
          fontWeight: "bold"
      },
      container:{
        flex: 1
      },
      image: {
        marginTop: Constants.statusBarHeight,
        flex: 1,
      },
      contenedorPrincipal: {
        flex: 1,
        justifyContent:"flex-start"
      }
  });

export default NewProduct