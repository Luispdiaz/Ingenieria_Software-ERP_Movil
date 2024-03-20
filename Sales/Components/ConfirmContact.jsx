import React from "react";
import { View, Text, StyleSheet, Dimensions, Image, ScrollView, TouchableOpacity, TextInput } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from "@react-navigation/native";
import Constants from 'expo-constants';
import theme from "../../Inventory/Themes/Theme";
import { useState } from "react";
import { useContact } from "../../Context/ContactContext";
import { useVenta } from "../../Context/VentaContext";

const styles = StyleSheet.create({
    contenedorPrincipal: {
        flex: 1,
        justifyContent:"flex-start",
        
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
    ContenedorSinTitulo:{
      flex: 1,
      justifyContent: 'center',
      marginBottom:50
    },
    tarjetaContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        alignSelf:'center',
        flex: 1,
      },
      imagenCliente: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 15,
      },
      nombreCliente: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'white', // Agrega esta línea para hacer el texto blanco
      },
      informacionDetalle: {
        fontSize: 16,
        marginBottom: 8,
        color: 'white', // Agrega esta línea para hacer el texto blanco
      },
      tipoCliente: {
        fontSize: 18,
        marginTop: 10,
        fontStyle: 'italic',
        color: 'white', // Agrega esta línea para hacer el texto blanco
      },
      botonConfirmar: {
        backgroundColor: '#FFF',
        padding: 15,
        borderRadius: 10,
        marginTop: 20,
        alignItems: 'center',
        marginTop: 50
      },
      textoBotonConfirmar: {
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold',
      }
  });

const ConfirmContact = ({ route }) => {
    const navigation = useNavigation()
    const { CrearCliente } = useVenta()
    const tipoRegistro = route.params.tipoRegistro

    const handleConfirmar = () => {
        CrearCliente(route.params.Contacto)
        navigation.navigate("VistaCarritoCompras",{tipoRegistro});
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

    <View style={styles.tarjetaContainer}>
    <Image style={styles.imagenCliente} source={{ uri: route.params.Contacto.imagen }} />
      <Text style={styles.nombreCliente}>{route.params.Contacto.nombre}</Text>
      <Text style={styles.informacionDetalle}>Correo: {route.params.Contacto.correo}</Text>
      <Text style={styles.informacionDetalle}>Teléfono: {route.params.Contacto.telefono}</Text>
      <Text style={styles.informacionDetalle}>Dirección: {route.params.Contacto.direccion}</Text>
      <Text style={styles.informacionDetalle}>Fecha de Nacimiento: {route.params.Contacto.fecha_nacimiento}</Text>
      <Text style={styles.informacionDetalle}>Tipo de Documento: {route.params.Contacto.cont_tipo_documento}</Text>
      <Text style={styles.informacionDetalle}>Fecha de Ingreso: {route.params.Contacto.fecha_ingreso}</Text>
      <Text style={styles.informacionDetalle}>
      {route.params.Contacto.contribuyente ? 'Contribuyente: Sí' : null}
      </Text>
      <Text style={styles.tipoCliente}>
        {route.params.Contacto.cliente ? 'Cliente' : ''}
        {route.params.Contacto.empleado ? 'Empleado' : ''}
        {route.params.Contacto.proveedor ? 'Proveedor' : ''}
      </Text>
      
      <TouchableOpacity
        style={styles.botonConfirmar}
        onPress={handleConfirmar}
      >
        <Text style={styles.textoBotonConfirmar}>Confirmar</Text>
      </TouchableOpacity>

    </View>
    </LinearGradient>
  );
};



export default ConfirmContact;