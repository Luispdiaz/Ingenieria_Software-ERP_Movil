import { StyleSheet, View, TextInput, Image, TouchableOpacity, Text, ImageBackground, ScrollView, Alert, Button, Switch} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import theme from "../../Inventory/Themes/Theme";
import { LinearGradient } from 'expo-linear-gradient';
import Constants from 'expo-constants';
import { useContact } from '../../Context/ContactContext';
import DateTimePicker from "@react-native-community/datetimepicker"
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import * as ImagePicker from "expo-image-picker"
import { storage } from '../../NewProducts/Components/firebaseconfig';
import {ref,uploadBytesResumable,getDownloadURL} from "firebase/storage"
import Contact from "./Contact";;


const image = require("../Assets/Fondo.png");

const UpdateContact = ({route}) =>{
  
  const Lista = route.params.props
    const { UpdateContact, getContacts,Contactos} = useContact() 
    const [cont_tipo_documento, setContTipoDocumento] = useState('');
    const [cont_id_fiscal, setContIdFiscal] = useState('');
    const [nombre, setNombre] = useState('');
    const [fecha_nacimiento, setFechaNacimiento] = useState(new Date());
    const [cod_telefono, setCodTelefono] = useState('');
    const [telefono, setTelefono] = useState('');
    const [correo, setCorreo] = useState('');
    const [direccion, setDireccion] = useState('');
    const [contribuyente, setContribuyente] = useState(false);
    const [condicion_venta, setCondicionVenta] = useState('');
    const [credito_total, setCreditoTotal] = useState(0);
    const [credito_vence, setCreditoVence] = useState(new Date());
    const [vendedor, setVendedor] = useState(false);
    const [fecha_ingreso, setFechaIngreso] = useState(new Date());
    const [cliente, setCliente] = useState(false);
    const [empleado, setEmpleado] = useState(false);
    const [proveedor, setProveedor] = useState(false);
    const [imagen, setImagen] = useState(null);
    const [Contacto_pkey, setContactoPkey] = useState('');
    const navigation = useNavigation()

    useEffect(()=>{
      getContacts()
    }, [])
    const handleSubmit = () => {
      const todosCamposNulos = Object.values({
        cont_tipo_documento,
        cont_id_fiscal,
        nombre,
        fecha_nacimiento,
        cod_telefono,
        telefono,
        correo,
        direccion,
        contribuyente,
        condicion_venta,
        credito_total,
        credito_vence,
        vendedor,
        fecha_ingreso,
        cliente,
        empleado,
        proveedor,
        imagen,
    }).every(value => value === null);
    if (todosCamposNulos) {
      Alert.alert("AVISO!!","Debe llenar algún campo para modificar")
    }
    else{
      console.log("Hasta aqui")
      if (
        (cont_id_fiscal !== null && !isValidNumber(cont_id_fiscal)) ||
        (telefono !== null && !isValidNumber(telefono)) ||
        (credito_total !== null && !isValidNumber(credito_total))
        //Se esta quedando aqui 
        
    ) {
          Alert.alert('Error', 'Por favor, ingresa valores válidos');
          navigation.navigate("VistaContacto");
        }
          else {
            CamposNuevos = {
              cont_tipo_documento:cont_tipo_documento,
                cont_id_fiscal:cont_id_fiscal,
                nombre:nombre,
                fecha_nacimiento:fecha_nacimiento,
                cod_telefono:cod_telefono,
                telefono:telefono,
                correo:correo,
                direccion:direccion,
                contribuyente:contribuyente,
                condicion_venta:condicion_venta,
                credito_total:credito_total,
                credito_vence:credito_vence,
                vendedor:vendedor,
                fecha_ingreso:fecha_ingreso,
                cliente:cliente,
                empleado:empleado,
                proveedor:proveedor,
                imagen:imagen,
                Contacto_pkey:Contacto_pkey
                //Hay que buscar la manera de inicializar todo en null, de manera que se pueda filtrar, ahorita ninguno vale null por como se estan inicializando. Hay que ver como inicializar la fecha de manera que se filtre. porque ahorita ninguno vale null y se estan quedando en la condicion de arriba.
            }
            const CamposActualizados = Object.fromEntries(
            Object.entries(CamposNuevos).filter(([key, value]) => value !== null))
            console.log(CamposActualizados)
        UpdateContact(Lista.cont_id_fiscal, CamposActualizados)
          Alert.alert('El contacto se modificó de manera exitosa');
          navigation.navigate("VistaContactos")
    }

  }
    }

    const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  
  

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setFechaNacimiento(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const [mode1, setMode1] = useState('date');
  const [show1, setShow1] = useState(false);

  const onChange1 = (event, selectedDate1) => {
    const currentDate1 = selectedDate1;
    setShow1(false);
    setFechaIngreso(currentDate1);
  };

  const showMode1 = (currentMode1) => {
    setShow1(true);
    setMode1(currentMode1);
  };

  const showDatepicker1 = () => {
    showMode1('date');
  };
  const [mode2, setMode2] = useState('date');
  const [show2, setShow2] = useState(false);

  const onChange2 = (event, selectedDate2) => {
    const currentDate2 = selectedDate2;
    setShow2(false);
    setCreditoVence(currentDate2);
  };

  const showMode2 = (currentMode2) => {
    setShow2(true);
    setMode2(currentMode2);
  };

  const showDatepicker2 = () => {
    showMode2('date');
  };

  const opciones_ID =[
    { label: 'V', value: "V" },
    { label: 'E', value: "E"},
    { label: 'J', value: "J"}
  ]

  const opciones = [
    { label: 'C', value: "C" },
    { label: 'Co', value:"Co" },
  ]

  const opciones_telefono = [
    { label: "+58", value: "+58"},
    { label: "+1", value: "+1"},
    { label: "+52", value: "+52"},
    { label: "+55", value: "+55"},
    { label: "+54", value: "+54"},
    { label: "+57", value: "+57"},
    { label: "+34", value: "+34"},
    { label: "+44", value: "+44"},
    { label: "+48", value: "+48"},
    { label: "+86", value: "+86"},
  ]

  const opciones_cargo = [
    { label: 'Empleado' },
    { label: 'Cliente' },
    { label: 'Proveedor' },
    { label: 'Contribuyente' },
    { label: 'Vendedor' },
  ]

  const [value, setValue] = useState(null);
  const [value_phone, setValue_phone] = useState(null);
  const [value_venta, setValue_venta] = useState(null);
  
  const [isEnabled_empleado, setIsEnabled_empleado] = useState(false);
  const toggleSwitch_empleado = (new_value) => {
    setIsEnabled_empleado(new_value)
    setEmpleado(new_value)
  }
   
  const [isEnabled_cliente, setIsEnabled_cliente] = useState(false);
  const toggleSwitch_cliente = (new_value) => {
    setIsEnabled_cliente(new_value)
    setCliente(new_value)
  }
    
  const [isEnabled_proveedor, setIsEnabled_proveedor] = useState(false);
  const toggleSwitch_proveedor = (new_value) => {
    setIsEnabled_proveedor(new_value)
    setProveedor(new_value)
  }

  const [isEnabled_contribuyente, setIsEnabled_contribuyente] = useState(false);
  const toggleSwitch_contribuyente = (new_value) => {
    setIsEnabled_contribuyente(new_value)
    setContribuyente(new_value)
  }
    
  const [isEnabled_vendedor, setIsEnabled_vendedor] = useState(false);
  const toggleSwitch_vendedor = (new_value) => {
    setIsEnabled_vendedor(new_value)
    setVendedor(new_value)
  }

  const [imgUrl, setimgUrl] = useState("https://ktwhvzmmaqaumjvobuqn.supabase.co/storage/v1/object/public/imagenes/Component%2012.png?t=2024-03-05T23%3A36%3A47.376Z")
  const [showView, setShowView] = useState(false);
    const handlePress = () => {
      setShowView(!showView);
    };

    

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
  
      const storageRef = ref(storage,"Perfiles/"+new Date().getTime())
      const uploadTask = uploadBytesResumable(storageRef,blob)
  
      uploadTask.on("state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log("Upload is" + progress + "% done")
          if(progress === 100){
            Alert.alert("Imagen cargada")
          }
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


    
    function isValidString(str) {
      // Verificar si el string no está vacío ni es null ni undefined
      if (str && typeof str === 'string') {
        // Puedes agregar más criterios de validación según tus necesidades
        return true;
      }
      return false;
    }

    const formatFecha = (date) =>{
      const options = {year: "numeric", month: "numeric", day: "numeric"}
      return date.toLocaleDateString(undefined,options)
    }
  
    const img = 'https://ktwhvzmmaqaumjvobuqn.supabase.co/storage/v1/object/public/imagenes/perfil_01%20(1).png?t=2024-03-01T15%3A47%3A27.894Z'

    const isValidNumber = (value) => {
        const numberValue = parseFloat(value);
        return !isNaN(numberValue) && numberValue >= 0;
      };

    

    return(
      <LinearGradient
      colors={[
        "#7227a6",
        "#431b6a",
        "#000000"
      ]}
      style={styles.contenedorPrincipal}
    >
      
      <ScrollView>
      <View style={styles.backButton}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
      >
        <Image
        source={require('../Assets/image (3).png')}
      />
      </TouchableOpacity>
      </View>
      <View style = {{marginTop: Constants.statusBarHeight}}>
        <TouchableOpacity style={styles.buttonImage} onPress={handlePress} >
        <Image style = {styles.img} source = {{uri: imgUrl}}/>
        </TouchableOpacity>
          {showView && (
            <View style={{flexDirection: "row", justifyContent: "center"}}>
            <TouchableOpacity onPress = {openCameraLib}>
            <Image style = {{width: 100, height:100}} source={require('./ImagenesContacts/Camara.png')} />
            </TouchableOpacity>
            <TouchableOpacity  onPress = {pickImage}>
            <Image style = {{width: 100, height:100}} source={require('./ImagenesContacts/Image.png')}  />
            </TouchableOpacity>
            </View>
          )}
          <View style = {styles.view_informacion}>
          <Text  style = {styles.titulos}>Información Personal</Text>
          <View style = {{flexDirection: "row"}}>
          <Image style = {{width: 60, height:60, marginTop: 20, marginLeft: 15}} source={require('../Assets/contactIcon.png')} />
          <TextInput
          style={styles.textinput}
          placeholder= "Nombre y Apellido"
          placeholderTextColor='black'
          onChangeText={(texto0) => setNombre(texto0)}
          />
          </View>
          <View style = {{flexDirection: "row"}}>
          <Image style = {{width: 60, height:60, marginTop: 20, marginLeft: 15}} source={require('../Assets/birthdayIcon.png')} />
          <TextInput
          style={styles.textinputFecha}
          value = {fecha_nacimiento.toLocaleDateString()}
          title='Fecha de Nacimiento'
          />
          {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={fecha_nacimiento}
            mode={mode}
            is24Hour={true}
            onChange={onChange}
          />
        )}
          <TouchableOpacity style={styles.botonfecha} onPress={showDatepicker}>
          <Image style = {{width: 30, height:30}} source={require('../Components/ImagenesContacts/Calendario.png')}  />
          </TouchableOpacity>
          </View>
          <View style = {{flexDirection: "row"}}>
          <Image style = {{width: 60, height:60, marginTop: 30, marginLeft: 15}} source={require('../Assets/idIcon.png')} />
          <Dropdown
          style={styles.dropdownID}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={opciones_ID}
          search
          labelField="label"
          valueField="value"
          placeholder='Select'
          searchPlaceholder="Search..."
          value={value}
          onChange={item => {
            setValue(item.value);
            setContTipoDocumento(item.value)
          }}
          renderLeftIcon={() => (
            <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
          )}
          />
          <TextInput
          style={styles.textinputID}
          placeholder='123456789'
          placeholderTextColor='black'

          onChangeText={(texto2) => {
            const numeroEntero = parseInt(texto2, 10)
            setContIdFiscal(numeroEntero)}}
          />
          </View>
          <View style = {{flexDirection: "row"}}>
          <Image style = {{width: 60, height:60, marginTop: 30, marginLeft: 15}} source={require('../Assets/locationIcon.png')} />
          <TextInput
          style={styles.textinput}
          placeholder='Dirección'
          placeholderTextColor='black'
          onChangeText={(texto3) => setDireccion(texto3)}
          />
          </View>
          <View style = {{flexDirection: "row"}}>
          <Image style = {{width: 60, height:60, marginTop: 30, marginLeft: 15}} source={require('../Assets/phoneIcon.png')} />
          <Dropdown
          style={styles.dropdownID}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={opciones_telefono}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder='Select'
          searchPlaceholder="Search..."
          value={value_phone}
          onChange={item => {
            setValue_phone(item.value);
            setCodTelefono(item.value)
          }}
          renderLeftIcon={() => (
            <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
          )}
          />
          <TextInput
          style={styles.textinputtelefono}
          placeholder='Número de Teléfono'
          placeholderTextColor='black'
          onChangeText={(texto4) =>{
            const numeroEntero = parseInt(texto4, 10)
            setTelefono(numeroEntero)
          }} 
          />
          </View>
      </View>
      </View>
      <View style = {styles.view_correo}>
      <Text  style = {styles.titulos}>Correo</Text>
      <View style = {{flexDirection: "row"}}>
      <Image style = {{width: 60, height:60, marginTop: 20, marginLeft: 15}} source={require('../Assets/mailIcon.png')} />
          <TextInput
          style={styles.textinput}
          placeholder='Correo Electrónico'
          placeholderTextColor='black'
          onChangeText={(texto5) => setCorreo(texto5)}
          />
      </View>
      </View>
      <View style = {styles.view_fecha}>
        <Text  style = {styles.titulos}>Fecha de Ingreso</Text>
      <View style = {{flexDirection: "row"}}>
          <TextInput
          style={styles.textinputFecha}
          value = {fecha_ingreso.toLocaleDateString()}
          onChangeText={(value) => setFechaIngreso(fecha_ingreso)}
          />
          {show1 && (
          <DateTimePicker
            testID="dateTimePicker"
            value={fecha_ingreso}
            mode={mode1}
            is24Hour={true}
            onChange={onChange1}
          />
        )}
          <TouchableOpacity style={styles.botonfecha} onPress={showDatepicker1}>
          <Image style = {{width: 30, height:30}} source={require('../Components/ImagenesContacts/Calendario.png')}  />
          </TouchableOpacity>
          </View>
          </View>
      <View style = {styles.view_correo}>
      <Text style = {styles.titulos}>Condicion de Venta</Text>
      <Dropdown
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      data={opciones}
      search
      labelField="label"
      valueField="value"
      placeholder="Select item"
      searchPlaceholder="Search..."
      value={value_venta}
      onChange={item => {
        setValue_venta(item.value);
        setCondicionVenta(item.value)
      }}
      renderLeftIcon={() => (
        <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
      )}
    />
    </View>
    <View style = {styles.view_cargo}>
    <View style = {{flexDirection: "row"}}>
      <Text style = {styles.titulos}>Empleado</Text>
      <Switch
      style = {{flex: 1, justifyContent: "flex-end"}}
      trackColor = {"green"}
      thumbColor={"green"}
      onValueChange={toggleSwitch_empleado}
      value={isEnabled_empleado}
    />
    </View>
    <View style = {{flexDirection: "row"}}>
      <Text style = {styles.titulos}>Cliente</Text>
      <Switch
      style = {{flex: 1, justifyContent: "flex-end"}}
      trackColor = {"green"}
      thumbColor={"green"}
      onValueChange={toggleSwitch_cliente}
      value={isEnabled_cliente}
    />
    
    </View>
    <View style = {{flexDirection: "row"}}>
      <Text style = {styles.titulos}>Proveedor</Text>
      <Switch
      style = {{flex: 1, justifyContent: "flex-end"}}
      trackColor = {"green"}
      thumbColor={"green"}
      onValueChange={toggleSwitch_proveedor}
      value={isEnabled_proveedor}
    />
    </View>
    <View style = {{flexDirection: "row"}}>
      <Text style = {styles.titulos}>Contribuyente</Text>
      <Switch
      style = {{flex: 1, justifyContent: "flex-end"}}
      trackColor = {"green"}
      thumbColor={"green"}
      onValueChange={toggleSwitch_contribuyente}
      value={isEnabled_contribuyente}
    />
    </View>
    <View style = {{flexDirection: "row"}}>
      <Text style = {styles.titulos}>Vendedor</Text>
      <Switch
      trackColor = {"green"}
      thumbColor={"green"}
      style = {styles.switch_style}
      onValueChange={toggleSwitch_vendedor}
      value={isEnabled_vendedor}
    />
    </View>
    </View>
    <View style = {styles.view_credito}>
    <View style={{flexDirection: 'row' }}>
      <Text style = {styles.titulos}>Crédito Total</Text>
      <TextInput
          style={styles.textinputFecha}
          placeholder = "$"
          onChangeText={(texto7) => setCreditoTotal(texto7)}
          />
    </View>
    <Text style = {styles.titulos}>Crédito Vence</Text>
    <View style={{flexDirection: 'row' }}>
          <TextInput
          style={styles.textinputFecha}
          value = {credito_vence.toLocaleDateString()}
          title='Credito Vence'
          onChangeText={(value) => setCreditoVence(credito_vence)}
          />
          {show2 && (
          <DateTimePicker
            testID="dateTimePicker"
            value={credito_vence}
            mode={mode2}
            is24Hour={true}
            onChange={onChange2}
          />
        )}
          <TouchableOpacity style={styles.botonfecha} onPress={showDatepicker2}>
          <Image style = {{width: 30, height:30}} source={require('../Components/ImagenesContacts/Calendario.png')}  />
          </TouchableOpacity>
          </View>
          
          
    
    </View>
    
    <View style={styles.countContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSubmit} >
        <Text style={styles.buttonText}>Modificar</Text>
        </TouchableOpacity>
         
      </View>
      </ScrollView>
      </LinearGradient>
      
  )
}

const styles = StyleSheet.create({
countContainer: {
  flexDirection: 'row',
  justifyContent: "space-around",
  marginBottom: 50
},
view_informacion:{
  backgroundColor: "rgba(0,0,0,0.4)", 
  borderRadius: 18, 
  marginTop: 20
},
view_correo:{
  backgroundColor: "rgba(0,0,0,0.4)", 
  borderRadius: 18, 
  marginTop: 20,
  height: 150
},
backButton: {
  position: 'absolute',
  top: Constants.statusBarHeight * 0.5,
  left: Constants.statusBarHeight * 0.01,
  padding: 10,
  zIndex: 1,
  alignSelf:'flex-start',
  justifyContent:'flex-start'
},
view_fecha:{
  backgroundColor: "rgba(0,0,0,0.4)", 
  borderRadius: 18, 
  marginTop: 20,
  height: 150
},
view_correo:{
  backgroundColor: "rgba(0,0,0,0.4)", 
  borderRadius: 18, 
  marginTop: 20,
  height: 150
},
view_cargo:{
  backgroundColor: "rgba(0,0,0,0.4)", 
  borderRadius: 18, 
  marginTop: 20,
  height: 250
},
switch_style:{
  flex: 1,
  justifyContent: "flex-end",
},
view_credito:{
  backgroundColor: "rgba(0,0,0,0.4)", 
  borderRadius: 18, 
  marginTop: 20,
  height: 200
},
  fondo:{
    backgroundColor: "#86CDF9",
    flex: 1
  },
  titulos:{
    color:"white", 
    fontWeight: "bold",
    fontSize: 20,
    marginLeft: 10
  },
  buttonText:{
    color:"green",
    fontSize: 30,
    fontWeight: "bold"
},
button: {
  alignItems: 'center',
  backgroundColor: '#FFFFFF',
  padding: 10,
  marginTop: 20,
  borderRadius: 6,
  },
  textinput:{
      padding: 10,
      borderWidth: 2,
      backgroundColor: "rgba(82,209,38,18)",
      textAlign: "center",
      paddingStart: 30, /*Aqui cambio la posicion del texto dentro del input*/
      width: "70%",
      height: 60,
      marginTop: 20,
      marginLeft: 25,
      borderRadius: 25,
  },
  textinputID:{
      padding: 10,
      borderWidth: 2,
      borderColor: "black",
      backgroundColor: "rgba(82,209,38,18)",
      textAlign: "center",
      paddingStart: 30, /*Aqui cambio la posicion del texto dentro del input*/
      flex: 1,
      height: 60,
      marginTop: 20,
      marginLeft: 25,
      borderRadius: 25,
  },
  textinputtelefono:{
      padding: 10,
      borderWidth: 2,
      borderColor: "black",
      backgroundColor: "rgba(82,209,38,18)",
      textAlign: "center",
      paddingStart: 30, /*Aqui cambio la posicion del texto dentro del input*/
      flex: 1,
      height: 60,
      marginTop: 20,
      marginLeft: 25,
      borderRadius: 25,
  },
  textinputFecha:{
      padding: 10,
      borderWidth: 2,
      borderColor: "black",
      backgroundColor: "rgba(82,209,38,18)",
      textAlign: "center",
      paddingStart: 30, /*Aqui cambio la posicion del texto dentro del input*/
      width: 215,
      height: 60,
      marginTop: 20,
      marginLeft: 25,
      borderRadius: 25,
  },
  botonfecha:{
      padding: 10,
      borderWidth: 2,
      borderColor: "black",
      backgroundColor: "rgba(82,209,38,18)",
      alignItems: "center",
      width: 60,
      height: 60,
      marginTop: 20,
      marginLeft: 25,
      borderRadius: 25,
  },
  text:{
      color: "black",
      marginTop: 20,
      marginLeft:50
  },
  countContainer: {
      flexDirection: 'row',
      justifyContent: "space-around",
      marginBottom: 50
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
    titulo: {
      fontSize: 32,
      color: "#FFFFFF",
      fontWeight: 'bold',
      marginLeft:15,
      marginTop:70
    },
    subtitulo:{
      fontSize: 13,
      color: "#FFFFFF",
      fontWeight: 'bold',
      marginLeft:15,
    },
    TextoModificar: {
      width:  30, 
      height: 27
    },
    img: {
      width: 300,
      height: 300,
      alignSelf: "center",
      borderRadius: 600
    },
    BotonModificar: {
      position: 'absolute',
      left: Constants.statusBarHeight * 0.1,
      padding: 10,
      alignSelf: 'flex-end'
    },
    dropdownID: {
      marginTop: 30,
      marginLeft: 15,
      height: 50,
      flex: 1,
      borderBottomColor: 'black',
      borderBottomWidth: 2,
      backgroundColor: "rgba(82,209,38,18)"
    },
    dropdown: {
      margin: 16,
      height: 50,
      borderBottomColor: 'black',
      borderBottomWidth: 2,
      backgroundColor: "rgba(82,209,38,18)"
    },
    icon: {
      marginRight: 5,
    },
    placeholderStyle: {
      fontSize: 16,
      color: "black"
    },
    selectedTextStyle: {
      fontSize: 16,
      color: "black"

    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
});


export default UpdateContact