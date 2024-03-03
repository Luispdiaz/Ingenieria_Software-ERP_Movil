import React from "react";
import { View, Text, StyleSheet, Dimensions, Image, ScrollView, TouchableOpacity, TextInput, Alert} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from "@react-navigation/native";
import Constants from 'expo-constants';
import theme from "../../Inventory/Themes/Theme";
import { useState } from "react";
import { useContact } from "../../Context/ContactContext";
import DateTimePicker from '@react-native-community/datetimepicker'

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
      textoSolicitud: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFFFF',
        textAlign: 'center',
        marginBottom: 20, 
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
    TextoModificar: {
      width: 24, 
      height: 20, 
      marginRight: 10, 
    },
    tituloInventario: {
      fontSize: theme.title.fontSize,
      fontWeight: theme.title.fontWeight,
      color: theme.colors.textPrimary
    },
    titulo: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        marginTop: 15,
        marginLeft:15
      },
    ContenedorSinTitulo:{
      flex: 1,
      justifyContent: 'center',
      marginBottom:50
    },
    textinput: {
        padding: 10,
        borderWidth: 1,
        borderColor: "blue",
        color: "#FFFFFF",
        textAlign: "left",
        paddingStart: 30,
        height: 50,
        marginTop: 20,
        marginHorizontal: 25,
        borderRadius: 25,
      },
      button: {
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        padding: 10,
        marginTop: 20,
        borderRadius: 5,
      },
      countContainer: {
        flexDirection: 'row',
        justifyContent: "space-around",
        marginBottom: 50
      },
      buttonText: {
        color: "#000000",
        fontSize: 30,
        fontWeight: "bold"
      },
      container: {
        flex: 1
      },
      image: {
        marginTop: Constants.statusBarHeight,
        flex: 1,
      },
      contenedorPrincipal: {
        flex: 1,
        justifyContent: "flex-start"
      },
      subtitulo:{
        fontSize: 15,
        color: "#FFFFFF",
        fontWeight: 'bold',
        marginLeft:15,
        marginTop:10
      },
      botonConfirmar: {
        backgroundColor: '#FFF',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop:25
      },
      textoBotonConfirmar: {
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold',
      },
      
      
      
  });

const NewClient = () => {
    const navigation = useNavigation()
    const { createContact } = useContact()
    const [cont_tipo_documento, setContTipoDocumento] = useState('');
    const [cont_id_fiscal, setContIdFiscal] = useState('');
    const [nombre, setNombre] = useState('');
    const [fecha_nacimiento, setFechaNacimiento] = useState(new Date());
    const [cod_telefono, setCodTelefono] = useState('');
    const [telefono, setTelefono] = useState('');
    const [correo, setCorreo] = useState('');
    const [direccion, setDireccion] = useState('');

    const handleSubmit = () => {
    
      const contribuyente = true;
      const condicion_venta = 'Contado';
      const credito_total = null;
      const credito_vence = null;
      const vendedor = false;
      const fecha_ingreso = new Date();
      const cliente = true;
      const empleado = false;
      const proveedor = false;
      const imagen = null

      if (!isValidString(cont_tipo_documento) || !isValidNumber(cont_id_fiscal) || !isValidString(nombre) || !isValidDate(fecha_nacimiento) || !isValidNumber(cod_telefono) || !isValidNumber(telefono) || !isValidString(direccion)) {
        Alert.alert('Error', 'Por favor, ingresa valores válidos');
        return;
      }
      else{

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
      );
      
      const Contacto = {
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
      }
      
      
      Alert.alert('El contacto se agregó de manera exitosa');
      navigation.navigate('VistaCarritoCompras', { Contacto });
  ;
}}
      
      const [mostrarDatePicker, setMostrarDatePicker] = useState(false);
      const [fechaSeleccionada, setFechaSeleccionada] = useState('');
    
      const mostrarDatePickerHandler = () => {
        setMostrarDatePicker(true);
      };
    
      const ocultarDatePickerHandler = () => {
        setMostrarDatePicker(false);
      };
    
      const seleccionarFechaHandler = (event, selectedDate) => {
        if (event.type === 'set') {
          setFechaNacimiento(selectedDate || fecha_nacimiento);
          setFechaSeleccionada(formatFecha(selectedDate || fecha_nacimiento));
          ocultarDatePickerHandler();
        } else {
          ocultarDatePickerHandler();
        }
      };
    
      const formatFecha = (date) => {
        // Puedes personalizar el formato de fecha según tus necesidades
        const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        return date.toLocaleDateString(undefined, options);
      }

      const isValidString = (value) => {
        return typeof value === 'string' && value.trim() !== '';
      };
      
      const isValidNumber = (value) => {
        const numberValue = parseFloat(value);
        return !isNaN(numberValue);
      }

      const isValidDate = (value) => {
        return value instanceof Date && !isNaN(value);
      }

  return (
    <LinearGradient
        colors={[
          "#431b6a",
          "#000000"
        ]}
        style={styles.contenedorPrincipal}
      >
    <View style={styles.contenedorTitulo}>
    <View style={styles.backButton}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
        >
          <Image
          source={require('../Assets/image (3).png')}
          style={styles.TextoModificar}
        />
        </TouchableOpacity>
        </View>
        <Text style={styles.tituloInventario}>Punto de Venta</Text>
    </View>
    <ScrollView>
    <Text style={styles.titulo}>Registro Nuevo Cliente</Text>
    <Text style = {styles.subtitulo}>Rellena los siguientes campos</Text>
    <TextInput
              style={styles.textinput}
              placeholder='Tipo de Documento de Identidad (CI, DNI...)'
              placeholderTextColor='#FFFFFF'
              onChangeText={(texto) => setContTipoDocumento(texto)}
            />

            <TextInput
              style={styles.textinput}
              placeholder='Número de Documento de Identidad'
              placeholderTextColor='#FFFFFF'
              onChangeText={(texto) => setContIdFiscal(texto)}
            />

            <TextInput
              style={styles.textinput}
              placeholder='Nombre'
              placeholderTextColor='#FFFFFF'
              onChangeText={(texto) => setNombre(texto)}
            />

            <TextInput
              style={styles.textinput}
              placeholder='Fecha de Nacimiento'
              placeholderTextColor='#FFFFFF'
              onFocus={mostrarDatePickerHandler}
              value={fechaSeleccionada}
            />

            {mostrarDatePicker && (
            <DateTimePicker
            value={fecha_nacimiento}
            mode='date'
            display='default'
            onChange={seleccionarFechaHandler}
            />)}

            <TextInput
              style={styles.textinput}
              placeholder='Prefijo telefónico (+58)'
              placeholderTextColor='#FFFFFF'
              onChangeText={(texto) => setCodTelefono(texto)}
            />

            <TextInput
              style={styles.textinput}
              placeholder='Teléfono'
              placeholderTextColor='#FFFFFF'
              onChangeText={(texto) => setTelefono(texto)}
            />

            <TextInput
              style={styles.textinput}
              placeholder='Correo (Opcional)'
              placeholderTextColor='#FFFFFF'
              onChangeText={(texto) => setCorreo(texto)}
            />

            <TextInput
              style={styles.textinput}
              placeholder='Dirección'
              placeholderTextColor='#FFFFFF'
              onChangeText={(texto) => setDireccion(texto)}
            />
        <View style={{alignSelf:"center"}}>
        <TouchableOpacity
        style={styles.botonConfirmar}
        onPress={handleSubmit}
        >
        <Text style={styles.textoBotonConfirmar}>Confirmar</Text>
      </TouchableOpacity>
      </View>
      </ScrollView>
    </LinearGradient>
  );
};



export default NewClient;