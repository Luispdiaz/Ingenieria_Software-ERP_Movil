import { StyleSheet, View, TextInput, Image, TouchableOpacity, Text, ImageBackground, ScrollView, Alert, Switch} from 'react-native';
import Header from './HeaderCreateProduct';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import theme from "../../Inventory/Themes/Theme";
import { useProducts } from '../../Context/ProductContext';
import { LinearGradient } from 'expo-linear-gradient';
import Constants from 'expo-constants';
import * as ImagePicker from "expo-image-picker"
import { storage } from './firebaseconfig';
import {ref,uploadBytesResumable,getDownloadURL} from "firebase/storage"
import {addDoc,collection,onSnapshot, snapshotEqual} from "firebase/firestore"



const image = require("./Imagenes/Fondo.png");

const NewProduct = () =>{
  const [CodProveedor, setCodProveedor] = useState('');
  const [Nombre, setNombre] = useState('');
  const [Descripcion, setDescripcion] = useState('');
  const [Marca, setMarca] = useState('');
  const [Categoria, setCategoria] = useState('');
  const [CantidadInicial, setCantidadInicial] = useState('');
  const [CantidadMaxima, setCantidadMaxima] = useState('');
  const [CantidadMinima, setCantidadMinima] = useState('');
  const [CantidadRestock, setCantidadRestock] = useState('');
  const [PrecioD, setPrecioD] = useState('');
  const [PrecioE, setPrecioE] = useState('');
  const [CostoD, setCostoD] = useState('');
  const [CostoE, setCostoE] = useState('');
  const [Porcentaje, setPorcentaje] = useState(0);
  const [TipoImpuesto, setTipoImpuesto] = useState('');
  const [Imagen, setImagen] = useState('');
  const navigation = useNavigation()
  const { createProduct } = useProducts()

  const [isEnabled, setIsEnabled] = useState(false);
    const handleToggle = () => {
        setIsEnabled(!isEnabled);
    };
  const [isEnabledText, setIsEnabledText] = useState(false);
    const handleToggleText = () => {
        setIsEnabledText(!isEnabledText);
    };

  const handleSubmit = async () => {
      if (!isValidNumber(CantidadInicial) || !isValidNumber(PrecioD) || !isValidNumber(PrecioE) || !isValidNumber(CostoD) || !isValidNumber(CostoE)) {
          Alert.alert('Error', 'Por favor, ingresa valores válidos');
          navigation.navigate("VistaInventario");
        }
        else {
      createProduct(Nombre,Imagen,CodProveedor,Categoria,Descripcion,Marca,CantidadInicial,CantidadMaxima,CantidadMinima,CantidadRestock,CostoD,CostoE,PrecioD,PrecioE,Porcentaje,TipoImpuesto)
      Alert.alert('El producto se agrego de manera exitosa');
      navigation.navigate('VistaInventario')
    };
  }

  const isValidNumber = (value) => {
      const numberValue = parseFloat(value);
      return !isNaN(numberValue) && numberValue >= 0;
    }

  const [imgUrl, setimgUrl] = useState("https://cdn-icons-png.freepik.com/512/5733/5733887.png")
  
  const openCameraLib = async() =>{
      let result = await ImagePicker.launchCameraAsync({cameraType: ImagePicker.CameraType.front});
      setimgUrl(result?.assets[0]?.uri)
  }

 
  async function pickImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });
    if (!result.canceled) {
      setimgUrl(result.assets[0].uri);
      await uploadImage(result.assets[0].uri, "image");
    }

    
    async function uploadImage(uri, fileType){
      const response = await fetch(uri)
      const blob =  await response.blob()
  
      const storageRef = ref(storage,"Imagenes/"+new Date().getTime())
      const uploadTask = uploadBytesResumable(storageRef,blob)
  
      uploadTask.on("state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log("Upload is" + progress + "% done")
        },
        (error) =>{
  
        },
        () =>{
          getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) =>{
            console.log("File available at", downloadURL)
            setImagen(downloadURL)
          })
        }
        )
    }
  }

    const [showView, setShowView] = useState(false);
    const handlePress = () => {
      setShowView(!showView);
    };

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
  placeholder='Cantidad maxima en el Inventario'
  placeholderTextColor='#FFFFFF'
  onChangeText={(texto6) => {
    
    const numeroEntero = parseInt(texto6, 10)
    
    setCantidadMaxima(numeroEntero);}}
/>
<TextInput
  style={styles.textinput}
  placeholder='Cantidad minima en el Inventario'
  placeholderTextColor='#FFFFFF'
  onChangeText={(texto7) => {
    
    const numeroEntero = parseInt(texto7, 10)
    
    setCantidadMinima(numeroEntero);}}
/>
<TextInput
  style={styles.textinput}
  placeholder='Cantidad restock para el Inventario'
  placeholderTextColor='#FFFFFF'
  onChangeText={(texto8) => {
    
    const numeroEntero = parseInt(texto8, 10)
    
    setCantidadRestock(numeroEntero);}}
/>

<TextInput
  style={styles.textinput}
  placeholder='Costo por unidad ($)'
  placeholderTextColor='#FFFFFF'
  onChangeText={(texto9) => {
    
    const numeroEntero = parseInt(texto9, 10)
    
    setCostoD(numeroEntero);}}
/>

<TextInput
  style={styles.textinput}
  placeholder='Costo por unidad (Efectivo)'
  placeholderTextColor='#FFFFFF'
  onChangeText={(texto10) => {
    
    const numeroEntero = parseInt(texto10, 10)
    
    setCostoE(numeroEntero);}}
/>

<TextInput
  style={styles.textinput}
  placeholder='Precio por unidad ($)'
  placeholderTextColor='#FFFFFF'
  onChangeText={(texto11) => {
    
    const numeroEntero = parseInt(texto11, 10)
    
    setPrecioD(numeroEntero);}}
/>

<TextInput
  style={styles.textinput}
  placeholder='Precio por unidad (Efectivo)'
  placeholderTextColor='#FFFFFF'
  onChangeText={(texto12) => {
    
    const numeroEntero = parseInt(texto12, 10)
    
    setPrecioE(numeroEntero);}}
/>

<TextInput
  style={styles.textinput}
  placeholder='Tipo de Impuesto'
  placeholderTextColor='#FFFFFF'
  onChangeText={(texto13) => setTipoImpuesto(texto13)}
/>

<View style = {{flexDirection: "row"}}>
<Text style = {styles.text}>Descuento</Text>
<Switch trackColor= "yellow"
        thumbColor= "white"
        marginLeft = {10}
        marginTop = {5}
            onValueChange={handleToggleText}
            value={isEnabledText}
        />
        {isEnabledText && <TextInput
        style={styles.textinputDescuento}
        placeholder='Porcentaje'
        placeholderTextColor='#FFFFFF'
        onChangeText={(texto14) => setPorcentaje(texto14)}
        />}
        </View>
<View >
<Text style = {styles.text}>Imagen</Text>
<Switch trackColor= "yellow"
        thumbColor= "white"
            onValueChange={handleToggle}
            value={isEnabled}
        />
        {!isEnabled && <TextInput
        style={styles.textinput}
        placeholder='URL de la Imagen'
        placeholderTextColor='#FFFFFF'
        onChangeText={(texto15) => setImagen(texto15)}
        />}
        {isEnabled && (
            <TouchableOpacity style={styles.buttonImage} onPress={handlePress} >
            <Image resizeMode = "contain" style = {styles.img} source = {{uri: imgUrl}}/>
            </TouchableOpacity>
        )}
            {showView && (
              <View style={styles.view}>
              <TouchableOpacity onPress = {openCameraLib}>
              <Image style = {{width: 100, height:100}} source={require('./Imagenes/Camara.png')} />
              </TouchableOpacity>
              <TouchableOpacity  onPress = {pickImage}>
              <Image style = {{width: 100, height:100}} source={require('./Imagenes/Image.png')}  />
              </TouchableOpacity>
              </View>
            )}
        </View>
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
        paddingStart: 30, 
        width: '80%',
        height: 50,
        marginTop: 20,
        marginLeft: 25,
        borderRadius: 25,
    },
    img: {
      width: 300,
      height: 300,
      alignSelf: "center",
      borderRadius: 6
    },
    textinputDescuento:{
        padding: 10,
        borderWidth: 1,
        borderColor: "#4D09FF",
        color: "#FFFFFF",
        textAlign: "left",
        paddingStart: 30, 
        width: '45%',
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
    buttonImage: {
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
      },
      view: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        borderColor: "black",
        flexDirection: "row",
        justifyContent: "center"
      },
      
  });
export default NewProduct