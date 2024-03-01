import { StyleSheet, View, TextInput, Image, TouchableOpacity, Alert,Text,ScrollView, ImageBackground, } from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useContact } from '../../Context/ContactContext';
import  Constants  from 'expo-constants';
import { LinearGradient } from 'expo-linear-gradient';
import theme from '../Themes/Theme';

const image = require("../Assets/Fondo.png");

const UpdateContact = ({Lista}) =>{
    const { UpdateContact } = useContact() 
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

    const handleSubmit = () => {
        if (!isValidNumber(CantidadInicial) || !isValidNumber(PrecioD) || !isValidNumber(PrecioE) || !isValidNumber(CostoD) || !isValidNumber(CostoE)) {
            Alert.alert('Error', 'Por favor, ingresa valores válidos');
            navigation.navigate("VistaContactos");
          }
          else {
        UpdateContact(Lista.cont_tipo_documento, 
            {cont_tipo_documento:cont_tipo_documento,
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
                Contacto_pkey:Contacto_pkey})
                Alert.alert('El contacto se modificó de manera exitosa');
                navigation.navigate("VistaContactos")
    }
    
    }
    const isValidNumber = (value) => {
        const numberValue = parseFloat(value);
        return !isNaN(numberValue) && numberValue >= 0;
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
        <View>
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
            <Text style = {styles.titulo}>Editar contacto
            </Text>
            <Text style = {styles.subtitulo}>Rellena los siguientes campos</Text>
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
        paddingStart: 30, 
        width: '80%',
        height: 50,
        marginTop: 20,
        marginLeft: 25,
        borderRadius: 25,
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
    EstiloImagen:{
        height: 20,
        borderRadius:5,
        flex: 1
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
      },
      contenedorPrincipal: {
        flex: 1,
        justifyContent:"flex-start"
      },
      image: {
        marginTop: Constants.statusBarHeight,
        flex: 1,
      }
  });

export default UpdateContact