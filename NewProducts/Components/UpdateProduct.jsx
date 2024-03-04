import { StyleSheet, View, TextInput, TouchableOpacity, Alert,Text,Image, Switch,ScrollView,ImageBackground} from 'react-native';
import { useProducts } from '../../Context/ProductContext';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import theme from "../../Inventory/Themes/Theme";
import Product from '../../Inventory/Components/Product';
import * as ImagePicker from "expo-image-picker"
import {useEffect } from 'react';
import Constants from 'expo-constants';
import UpdateHeader from './HeaderUpdateProduct';
import { isEmpty } from '@firebase/util';


const image = require("./Imagenes/Fondo.png");


const UpdateProduct = ({Lista}) =>{
    const { UpdateProduct } = useProducts() 
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
    const[Empty, setEmpty] = useState(false)

    const navigation = useNavigation()

    const [isEnabled, setIsEnabled] = useState(false);
    const handleToggle = () => {
        setIsEnabled(!isEnabled);
    };
  const [isEnabledText, setIsEnabledText] = useState(false);

  const handleToggleText = () => {
      setIsEnabledText(!isEnabledText);
  };

    const handleSubmit = () => {
      if (Empty){
        Alert.alert("AVISO!!","Debe llenar todos los campos para agregar el producto")
      }
      else{
        if (!isValidNumber(CantidadInicial) || !isValidNumber(PrecioD) || !isValidNumber(PrecioE) || !isValidNumber(CostoD) || !isValidNumber(CostoE)) {
            Alert.alert('Error', 'Por favor, ingresa valores válidos');
            navigation.navigate("VistaInventario");
          }
          else {
        UpdateProduct(Lista.id_producto, 
            {nombre: Nombre,
                Imagen: Imagen,
                sub_categorias: null,
                cod_proveedor: CodProveedor,
                descripcion: Descripcion,
                color: null,
                categoria: Categoria,
                marca: Marca,
                modelo: null,
                cantidad_existencia: CantidadInicial,
                minima_cantidad:CantidadMinima,
                maxima_cantidad:CantidadMaxima,
                reordenar_cantidad:CantidadRestock,
                costo_promedio_usd:null,
                costo_promedio_efectivo:null,
                costo_usd: CostoD,
                costo_efectivo:CostoE,
                precio_usd:PrecioD,
                precio_efectivo:PrecioE,
                tipo_impuesto:TipoImpuesto,
                descuento_promocion:null,
                conversion_usd_efectivo:null,
                valor_descuento_promocion:Porcentaje})
                Alert.alert('El producto se modificó de manera exitosa');
                navigation.navigate("VistaInventario")
    }
    }
    }

  const isValidNumber = (value) => {
      const numberValue = parseFloat(value);
      return !isNaN(numberValue) && numberValue >= 0;
    };

  const [imgUrl, setimgUrl] = useState("https://cdn-icons-png.freepik.com/512/5733/5733887.png")

  const openCameraLib = async() =>{
    let result = await ImagePicker.launchCameraAsync({cameraType: ImagePicker.CameraType.front});
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
    <UpdateHeader/>
      <TextInput
      style={styles.textinput}
      placeholder={`Nombre del producto: ${Lista.nombre}`}
      placeholderTextColor="#FFFFFF"
      onChangeText={(texto1) => setNombre(texto1)}
      onEndEditing = {() =>{
        if(isEmpty(Nombre)){
          setEmpty(true)
          Alert.alert("Aviso", "El campo no debe estar vacio")
          setEmpty(false)

        }
      }}
      />

      <TextInput
      style={styles.textinput}
      placeholder={`Codigo Proveedor: ${Lista.cod_proveedor}`}
      placeholderTextColor="#FFFFFF"
      onChangeText={(texto2) => setCodProveedor(texto2)}
      onEndEditing = {() =>{
        if(isEmpty(CodProveedor)){
          setEmpty(true)
          Alert.alert("Aviso", "El campo no debe estar vacio")
          setEmpty(false)

        }
      }}
      />
      
    <TextInput
    style={styles.textinput}
    placeholder={`Categoria del producto: ${Lista.categoria}`}
    placeholderTextColor="#FFFFFF"
    onChangeText={(texto3) => setCategoria(texto3)}
    onEndEditing = {() =>{
      if(isEmpty(Categoria)){
        setEmpty(true)
        Alert.alert("Aviso", "El campo no debe estar vacio")
        setEmpty(false)

      }
    }}
    />
    <TextInput
      style={styles.textinputDescription}
      placeholder={`Descripción del producto: ${Lista.descripcion}`}
      multiline={true}
      scrollEnabled={true}
      placeholderTextColor="#FFFFFF"
      onChangeText={(texto4) => setDescripcion(texto4)}
      onEndEditing = {() =>{
        if(isEmpty(Descripcion)){
          setEmpty(true)
          Alert.alert("Aviso", "El campo no debe estar vacio")
          setEmpty(false)

        }
      }}
    />
    <TextInput
      style={styles.textinput}
      placeholder={`Marca del producto: ${Lista.marca}`}
      placeholderTextColor="#FFFFFF"
      onChangeText={(texto5) => setMarca(texto5)}
      onEndEditing = {() =>{
        if(isEmpty(Marca)){
          setEmpty(true)
          Alert.alert("Aviso", "El campo no debe estar vacio")
          setEmpty(false)

        }
      }}
    />
    
    <TextInput
      style={styles.textinput}
      placeholder={`Cantidad inicial en el inventario: ${Lista.cantidad_existencia}`}
      placeholderTextColor="#FFFFFF"
      onChangeText={(texto6) => {
        const numeroEntero = parseInt(texto6, 10)
        setCantidadInicial(numeroEntero);}}
        onEndEditing = {() =>{
          if(isEmpty(toString(CantidadInicial))){
            setEmpty(true)
            Alert.alert("Aviso", "El campo no debe estar vacio")
            setEmpty(false)

          }
        }}
    />
    <TextInput
      style={styles.textinput}
      placeholder={`Cantidad maxima en el Inventario: ${Lista.maxima_cantidad}`}
      placeholderTextColor='#FFFFFF'
      onChangeText={(texto6) => {
        const numeroEntero = parseInt(texto6, 10)
        setCantidadMaxima(numeroEntero);}}
        onEndEditing = {() =>{
          if(isEmpty(toString(CantidadMaxima))){
            setEmpty(true)
            Alert.alert("Aviso", "El campo no debe estar vacio")
            setEmpty(false)

          }
        }}
    />
    <TextInput
      style={styles.textinput}
      placeholder={`Cantidad minima en el Inventario: ${Lista.minima_cantidad}`}
      placeholderTextColor='#FFFFFF'
      onChangeText={(texto6) => {
        const numeroEntero = parseInt(texto6, 10)
        setCantidadMinima(numeroEntero);}}
        onEndEditing = {() =>{
          if(isEmpty(toString(CantidadMaxima))){
            setEmpty(true)
            Alert.alert("Aviso", "El campo no debe estar vacio")
            setEmpty(false)

          }
        }}
    />
    <TextInput
    style={styles.textinput}
    placeholder={`Cantidad restock en el Inventario: ${Lista.reordenar_cantidad}`}
    placeholderTextColor='#FFFFFF'
    onChangeText={(texto6) => {
    const numeroEntero = parseInt(texto6, 10)
    setCantidadRestock(numeroEntero);}}
    onEndEditing = {() =>{
      if(isEmpty(toString(CantidadRestock))){
        setEmpty(true)
        Alert.alert("Aviso", "El campo no debe estar vacio")
        setEmpty(false)

      }
    }}
    />
    <TextInput
    style={styles.textinput}
    placeholder={`Costo por unidad ($): ${Lista.costo_usd}`}
    placeholderTextColor='#FFFFFF'
    onChangeText={(texto7) => {
      
      const numeroEntero = parseInt(texto7, 10)
      
      setCostoD(numeroEntero);}}
      onEndEditing = {() =>{
        if(isEmpty(toString(CostoD))){
          setEmpty(true)
          Alert.alert("Aviso", "El campo no debe estar vacio")
          setEmpty(false)

        }
      }}
    />
    <TextInput
    style={styles.textinput}
    placeholder={`Costo por unidad (efectivo): ${Lista.costo_efectivo}`}
    placeholderTextColor='#FFFFFF'
    onChangeText={(texto8) => {
      
      const numeroEntero = parseInt(texto8, 10)
      
      setCostoE(numeroEntero);}}
  />
    <TextInput
      style={styles.textinput}
      placeholder={`Precio por unidad ($): ${Lista.precio_usd}`}
      placeholderTextColor="#FFFFFF"
      onChangeText={(texto) => setPrecioD(texto)}
      onEndEditing = {() =>{
        if(isEmpty(toString(PrecioD))){
          setEmpty(true)
          Alert.alert("Aviso", "El campo no debe estar vacio")
          setEmpty(false)

        }
      }}
    />
    <TextInput
      style={styles.textinput}
      placeholder={`Precio por unidad (Efectivo): ${Lista.precio_efectivo}`}
      placeholderTextColor="#FFFFFF"
      onChangeText={(texto) => setPrecioE(texto)}
      onEndEditing = {() =>{
        if(isEmpty(toString(PrecioE))){
          setEmpty(true)
          Alert.alert("Aviso", "El campo no debe estar vacio")
          setEmpty(false)

        }
      }}
    />
  
    <TextInput
      style={styles.textinput}
      placeholder={`Tipo de Impuesto: ${Lista.tipo_impuesto}`}
      placeholderTextColor="#FFFFFF"
      onChangeText={(texto) => setTipoImpuesto(texto)}
      onEndEditing = {() =>{
        if(isEmpty(TipoImpuesto)){
          setEmpty(true)
          Alert.alert("Aviso", "El campo no debe estar vacio")
          setEmpty(false)

        }
      }}
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
            onChangeText={(texto) => setImagen(texto)}
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
        onChangeText={(texto) => setImagen(texto)}
        onEndEditing = {() =>{
          if(isEmpty(Imagen)){
            setEmpty(true)
            Alert.alert("Aviso", "El campo no debe estar vacio")
            setEmpty(false)

          }
        }}
        />}
        {isEnabled && (
            <TouchableOpacity style={styles.buttonImage} onPress={handlePress}>
            <Image resizeMode = "contain" style = {styles.img} source = {{uri: imgUrl}} />
            </TouchableOpacity>
        )}
            {showView && (
              <View style={styles.view}>
              <TouchableOpacity style = {styles.btnCam} onPress = {openCameraLib}>
              <Image style = {{width: 100, height:100}} source={require('./Imagenes/Camara.png')} />
              </TouchableOpacity>
              <TouchableOpacity style = {styles.btnCam} onPress = {pickImage}>
              <Image style = {{width: 100, height:100}} source={require('./Imagenes/Image.png')}  />
              </TouchableOpacity>
              </View>
            )}
        </View>
        

        <View style={styles.countContainer}>
            <TouchableOpacity style={styles.button} onPress={handleSubmit} >
            <Text style={styles.buttonText}>Modificar</Text>
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
    img: {
      width: 300,
      height: 300,
      alignSelf: "center",
      borderRadius: 6
    },
    textinputDescription:{
        padding: 10,
        borderWidth: 1,
        borderColor: "#4D09FF",
        color: "#FFFFFF",
        textAlign: "left",
        paddingStart: 30, /*Aqui cambio la posicion del texto dentro del input*/
        width: '80%',
        marginTop: 20,
        marginLeft: 25,
        borderRadius: 25,
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
    textinputImage:{
        padding: 10,
        borderWidth: 1,
        borderColor: "#4D09FF",
        color: "#FFFFFF",
        textAlign: "left",
        alignSelf: "center",
        paddingStart: 30, /*Aqui cambio la posicion del texto dentro del input*/
        width: 225,
        height: 165,
        marginTop: 20,
        borderRadius: 25,
    },
    text:{
        color: "white",
        marginTop: 20,
        marginLeft:50
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
    EstiloImagen:{
        height: 20,
        borderRadius:5,
        flex: 1
    },
    view: {
      backgroundColor: 'white',
      padding: 10,
      borderRadius: 5,
      borderColor: "black",
      flexDirection: "row",
      justifyContent: "center"
    },
    contenedorPrincipal: {
      flex: 1,
      justifyContent:"flex-start"
    },
    image: {
      marginTop: Constants.statusBarHeight,
      flex: 1,
    },
  });

export default UpdateProduct