import { StyleSheet, View, TextInput, Image, TouchableOpacity, Text, ImageBackground, ScrollView, Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import theme from "../../Inventory/Themes/Theme";
import { LinearGradient } from 'expo-linear-gradient';
import Constants from 'expo-constants';
import { useContact } from '../../Context/ContactContext';



const image = require("../Assets/Fondo.png");

const NewContact = () => {
  const [cont_tipo_documento, setContTipoDocumento] = useState('');
  const [cont_id_fiscal, setContIdFiscal] = useState('');
  const [nombre, setNombre] = useState('');
  const [fecha_nacimiento, setFechaNacimiento] = useState('');
  const [cod_telefono, setCodTelefono] = useState('');
  const [telefono, setTelefono] = useState('');
  const [correo, setCorreo] = useState('');
  const [direccion, setDireccion] = useState('');
  const [contribuyente, setContribuyente] = useState('');
  const [condicion_venta, setCondicionVenta] = useState('');
  const [credito_total, setCreditoTotal] = useState('');
  const [credito_vence, setCreditoVence] = useState('');
  const [vendedor, setVendedor] = useState('');
  const [fecha_ingreso, setFechaIngreso] = useState('');
  const [cliente, setCliente] = useState('');
  const [empleado, setEmpleado] = useState('');
  const [proveedor, setProveedor] = useState('');
  const [imagen, setImagen] = useState('');
  const [Contacto_pkey, setContactoPkey] = useState('');
  const navigation = useNavigation()
  const { createContact } = useContact()

  
    const handleSubmit = async () => {

      if (cont_tipo_documento === null || cont_id_fiscal === null || nombre === null || fecha_nacimiento === null || cod_telefono === null || telefono === null || direccion === null) {
        Alert.alert('Error', 'Por favor, completa todos los campos obligatorios');
        return;
      }

      else if (!isValidString(cont_tipo_documento) || !isValidNumber(cont_id_fiscal) || !isValidString(nombre) || !isValidDate(fecha_nacimiento) || !isValidNumber(cod_telefono) || !isValidNumber(telefono) || !isValidString(direccion)) {
        Alert.alert('Error', 'Por favor, ingresa valores válidos');
        return;
      }

      else {
      createContact(
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
        imagen
      )
        Alert.alert('El contacto se agregó de manera exitosa');
        navigation.navigate('VistaContactos')
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
        <View >
            <View style={styles.BotonModificar}>
            <TouchableOpacity
                onPress={() => navigation.goBack()}
                >
                <Image
                source={require('../Assets/image (3).png')}
                style={styles.TextoModificar}
                />
            </TouchableOpacity>
            </View>
            <Text style = {styles.titulo}>Crear un nuevo contacto
            </Text>
            <Text style = {styles.subtitulo}>Rellena los siguientes campos</Text>
            </View>
        <TextInput
            style={styles.textinput}
            placeholder='Tipo de Documento'
            placeholderTextColor='#FFFFFF'
            onChangeText={(texto) => setContTipoDocumento(texto)}
            />

        <TextInput
        style={styles.textinput}
        placeholder='Codigo del Documento'
        placeholderTextColor='#FFFFFF'
        onChangeText={(texto1) => setContIdFiscal(texto1)}
        />

        <TextInput
        style={styles.textinput}
        placeholder='Codigo del Proveedor'
        placeholderTextColor='#FFFFFF'
        onChangeText={(texto2) => setNombre(texto2)}
        />

        <TextInput
        style={styles.textinput}
        placeholder='Categoría del Producto'
        placeholderTextColor='#FFFFFF'
        onChangeText={(texto3) => setFechaNacimiento(texto3)}
        />

        <TextInput
        style={styles.textinput}
        placeholder='Descripción del Producto'
        placeholderTextColor='#FFFFFF'
        onChangeText={(texto4) => setCodTelefono(texto4)}
        />

        <TextInput
        style={styles.textinput}
        placeholder='Marca del Producto'
        placeholderTextColor='#FFFFFF'
        onChangeText={(texto5) => setCorreo(texto5)}
        />

        <TextInput
        style={styles.textinput}
        placeholder='Marca del Producto'
        placeholderTextColor='#FFFFFF'
        onChangeText={(texto5) => setDireccion(texto5)}
        />

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
      BotonModificar: {
        position: 'absolute',
        left: Constants.statusBarHeight * 0.1,
        padding: 10,
        alignSelf: 'flex-end'
      }
  });

export default NewContact