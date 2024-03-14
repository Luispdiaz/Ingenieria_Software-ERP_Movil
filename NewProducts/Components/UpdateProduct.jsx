import { StyleSheet, View, TextInput, TouchableOpacity, Alert,Text,Image, Switch,ScrollView,ImageBackground} from 'react-native';
import { useProducts } from '../../Context/ProductContext';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import theme from "../../Inventory/Themes/Theme";
import * as ImagePicker from "expo-image-picker"
import Constants from 'expo-constants';
import UpdateHeader from './HeaderUpdateProduct';
import { storage } from './firebaseconfig';
import {ref,uploadBytesResumable,getDownloadURL} from "firebase/storage"
import {addDoc,collection,onSnapshot, snapshotEqual} from "firebase/firestore"
import { isEmpty } from '@firebase/util';

const image = require("../Imagenes/Fondo.png");


const UpdateProduct = ({Lista}) =>{

   
    
  const { UpdateProduct } = useProducts() 
    

  const [Nombre, setNombre] = useState(null);
  const [Imagen, setImagen] = useState(null);
  const [CodProveedor, setCodProveedor] = useState(null);
  const [Categoria, setCategoria] = useState(null);
  const [SubCategorias, setSubCategorias] = useState(null);
  const [Descripcion, setDescripcion] = useState(null);
  const [Color, setColor] = useState(null);
  const [Marca, setMarca] = useState(null);
  const [Modelo, setModelo] = useState(null);
  const [CantidadExistencia, setCantidadExistencia] = useState(null);
  const [MinimaCantidad, setMinimaCantidad] = useState(null);
  const [MaximaCantidad, setMaximaCantidad] = useState(null);
  const [ReordenarCantidad, setReordenarCantidad] = useState(null);
  const [CostoUSD, setCostoUSD] = useState(null);
  const [CostoEfectivo, setCostoEfectivo] = useState(null);
  const [CostoPromedioUSD, setCostoPromedioUSD] = useState(null);
  const [CostoPromedioEfectivo, setCostoPromedioEfectivo] = useState(null);
  const [PrecioUSD, setPrecioUSD] = useState(null);
  const [PrecioEfectivo, setPrecioEfectivo] = useState(null);
  const [TipoImpuesto, setTipoImpuesto] = useState(null);
  const [DescuentoPromocion, setDescuentoPromocion] = useState(null);
  const [ValorDescuentoPromocion, setValorDescuentoPromocion] = useState(null);
  const [ConversionUSDEfectivo, setConversionUSDEfectivo] = useState(null);

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
      const todosCamposNulos = Object.values({
        Nombre,
        Imagen,
        CodProveedor,
        Categoria,
        SubCategorias,
        Descripcion,
        Color,
        Marca,
        Modelo,
        CantidadExistencia,
        MinimaCantidad,
        MaximaCantidad,
        ReordenarCantidad,
        CostoUSD,
        CostoEfectivo,
        CostoPromedioUSD,
        CostoPromedioEfectivo,
        PrecioUSD,
        PrecioEfectivo,
        TipoImpuesto,
        DescuentoPromocion,
        ValorDescuentoPromocion,
        ConversionUSDEfectivo
    }).every(value => value === null);

    if (todosCamposNulos) {
        Alert.alert("AVISO!!","Debe llenar algún campo para modificar")
        console
      }
      else{
        if (
          (CantidadExistencia !== null && !isValidNumber(CantidadExistencia)) ||
          (MinimaCantidad !== null && !isValidNumber(MinimaCantidad)) ||
          (MaximaCantidad !== null && !isValidNumber(MaximaCantidad)) ||
          (ReordenarCantidad !== null && !isValidNumber(ReordenarCantidad)) ||
          (CostoUSD !== null && !isValidNumber(CostoUSD)) ||
          (CostoEfectivo !== null && !isValidNumber(CostoEfectivo)) ||
          (CostoPromedioUSD !== null && !isValidNumber(CostoPromedioUSD)) ||
          (CostoPromedioEfectivo !== null && !isValidNumber(CostoPromedioEfectivo)) ||
          (PrecioUSD !== null && !isValidNumber(PrecioUSD)) ||
          (PrecioEfectivo !== null && !isValidNumber(PrecioEfectivo)) ||
          (ValorDescuentoPromocion !== null && !isValidNumber(ValorDescuentoPromocion))
      ) {
            Alert.alert('Error', 'Por favor, ingresa valores válidos');
            navigation.navigate("VistaInventario");
          }
          else {

        CamposNuevos = {nombre: Nombre,
          nombre: Nombre,
          imagen: Imagen,
          cod_proveedor: CodProveedor,
          categoria: Categoria,
          sub_categorias: SubCategorias,
          descripcion: Descripcion,
          color: Color,
          marca: Marca,
          modelo: Modelo,
          cantidad_existencia: CantidadExistencia,
          minima_cantidad: MinimaCantidad,
          maxima_cantidad: MaximaCantidad,
          reordenar_cantidad: ReordenarCantidad,
          costo_usd: CostoUSD,
          costo_efectivo: CostoEfectivo,
          costo_promedio_usd: CostoPromedioUSD,
          costo_promedio_efectivo: CostoPromedioEfectivo,
          precio_usd: PrecioUSD,
          precio_efectivo: PrecioEfectivo,
          tipo_impuesto: TipoImpuesto,
          descuento_promocion: DescuentoPromocion,
          valor_descuento_promocion: ValorDescuentoPromocion,
          conversion_usd_efectivo: ConversionUSDEfectivo}

          const CamposActualizados = Object.fromEntries(
          Object.entries(CamposNuevos).filter(([key, value]) => value !== null))

        UpdateProduct(Lista.id_producto, 
          CamposActualizados)
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
    placeholder={`Código Proveedor: ${Lista.cod_proveedor || 'No asignado'}`}
    placeholderTextColor="#FFFFFF"
    onChangeText={(texto) => setCodProveedor(texto)}
    onEndEditing={() => {
        if (isEmpty(CodProveedor)) {
            setEmpty(true);
            Alert.alert("Aviso", "El campo no debe estar vacío");
            setEmpty(false);
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
    style={styles.textinput}
    placeholder={`Subcategoría del producto: ${Lista.sub_categorias || 'No asignada'}`}
    placeholderTextColor="#FFFFFF"
    onChangeText={(texto3) => setSubCategorias(texto3)}
    onEndEditing={() => {
        if (isEmpty(Categoria)) {
            setEmpty(true);
            Alert.alert("Aviso", "El campo no debe estar vacío");
            setEmpty(false);
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
    placeholder={`Color: ${Lista.color || 'No asignado'}`}
    placeholderTextColor="#FFFFFF"
    onChangeText={(texto) => setColor(texto)}
    onEndEditing={() => {
        if (isEmpty(Color)) {
            setEmpty(true);
            Alert.alert("Aviso", "El campo no debe estar vacío");
            setEmpty(false);
        }
    }}
/>

    <TextInput
      style={styles.textinput}
      placeholder={`Marca del Producto: ${Lista.marca || 'No asignado'}`}
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
      placeholder={`Modelo del Producto: ${Lista.modelo || 'No asignado'}`}
      placeholderTextColor="#FFFFFF"
      onChangeText={(texto5) => setModelo(texto5)}
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
      placeholder={`Cantidad en el inventario: ${Lista.cantidad_existencia}`}
      placeholderTextColor="#FFFFFF"
      onChangeText={(texto6) => {
        const numeroEntero = parseInt(texto6, 10)
        setCantidadExistencia(numeroEntero);}}
        onEndEditing = {() =>{
          if(isEmpty(toString(CantidadExistencia))){
            setEmpty(true)
            Alert.alert("Aviso", "El campo no debe estar vacio")
            setEmpty(false)

          }
        }}
    />
    <TextInput
      style={styles.textinput}
      placeholder={`Cantidad máxima en el inventario: ${Lista.maxima_cantidad || 'No asignado'}`}
      placeholderTextColor='#FFFFFF'
      onChangeText={(texto6) => {
        const numeroEntero = parseInt(texto6, 10)
        setMaximaCantidad(numeroEntero);}}
        onEndEditing = {() =>{
          if(isEmpty(toString(MaximaCantidad))){
            setEmpty(true)
            Alert.alert("Aviso", "El campo no debe estar vacio")
            setEmpty(false)

          }
        }}
    />
    <TextInput
      style={styles.textinput}
      placeholder={`Cantidad mínima en el inventario: ${Lista.minima_cantidad || 'No asignado'}`}
      placeholderTextColor='#FFFFFF'
      onChangeText={(texto6) => {
        const numeroEntero = parseInt(texto6, 10)
        setMinimaCantidad(numeroEntero);}}
        onEndEditing = {() =>{
          if(isEmpty(toString(MinimaCantidad))){
            setEmpty(true)
            Alert.alert("Aviso", "El campo no debe estar vacio")
            setEmpty(false)

          }
        }}
    />
    <TextInput
    style={styles.textinput}
    placeholder={`Cantidad restock en el inventario: ${Lista.reordenar_cantidad || 'No asignado'}`}
    placeholderTextColor='#FFFFFF'
    onChangeText={(texto6) => {
    const numeroEntero = parseInt(texto6, 10)
    setReordenarCantidad(numeroEntero);}}
    onEndEditing = {() =>{
      if(isEmpty(toString(CantidadExistencia))){
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
      
      setCostoUSD(numeroEntero);}}
      onEndEditing = {() =>{
        if(isEmpty(toString(CostoUSD))){
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
      
      setCostoEfectivo(numeroEntero);}}
  />
    <TextInput
      style={styles.textinput}
      placeholder={`Precio por unidad ($): ${Lista.precio_usd}`}
      placeholderTextColor="#FFFFFF"
      onChangeText={(texto) => setPrecioUSD(texto)}
      onEndEditing = {() =>{
        if(isEmpty(toString(PrecioUSD))){
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
      onChangeText={(texto) => setPrecioEfectivo(texto)}
      onEndEditing = {() =>{
        if(isEmpty(toString(PrecioEfectivo))){
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
            onChangeText={(texto) => setValorDescuentoPromocion(texto)}
            />}
    </View>
    <View >
<Text style = {styles.text}>Imagen</Text>
<Switch trackColor= "yellow"
        thumbColor= "white"
            onValueChange={handleToggle}
            value={isEnabled}
        />
        {isEnabled && (
            <TouchableOpacity style={styles.buttonImage} onPress={handlePress}>
            <Image resizeMode = "contain" style = {styles.img} source = {{uri: imgUrl}} />
            </TouchableOpacity>
        )}
            {showView && (
              <View style={styles.view}>
              <TouchableOpacity style = {styles.btnCam} onPress = {openCameraLib}>
              <Image style = {{width: 100, height:100}} source={require('../Imagenes/Camara.png')} />
              </TouchableOpacity>
              <TouchableOpacity style = {styles.btnCam} onPress = {pickImage}>
              <Image style = {{width: 100, height:100}} source={require('../Imagenes/Image.png')}  />
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