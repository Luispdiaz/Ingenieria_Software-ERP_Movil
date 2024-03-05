import React from "react";
import { View, Text, StyleSheet, Dimensions, Image, ScrollView, TouchableOpacity, TextInput, FlatList } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from "@react-navigation/native";
import Constants from 'expo-constants';
import theme from "../../Inventory/Themes/Theme";
import { useState } from "react";
import { useContact } from "../../Context/ContactContext";
import { useVenta } from "../../Context/VentaContext";
import { useProducts } from "../../Context/ProductContext";

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
    ContenedorSinTitulo:{
      flex: 1,
      justifyContent: 'center',
      marginBottom:50
    },
    titulo: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        marginTop: 15,
        marginLeft:15
      },
      subtitulo:{
        fontSize: 15,
        color: "#FFFFFF",
        fontWeight: 'bold',
        marginLeft:15,
        marginTop:10
      },
      text:{
        fontSize: 15,
        color: "#FFFFFF",
        marginLeft:15,
        marginTop:10
      },
      botonSalir: {
        backgroundColor: '#FF5733',
        padding: 10,
        borderRadius: 5,
        margin: 10,
        alignItems: 'center',
      },
      textoBotonSalir: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
      }
      
  });



  const DeliveryNote = () => {
    const navigation = useNavigation();
    const [CodCliente, setCodCliente] = useState('');
    const { buscarContactosporCedula } = useContact();
    const { Cliente, ProductosVenta, ReiniciarVariables } = useVenta();
    console.log(Cliente);
    const {modificarCantidadExistencia} = useProducts()
  
    const handleSearch = async (CodCliente) => {
      const Contacto = await buscarContactosporCedula(CodCliente);
      if (Contacto) {
        navigation.navigate('VistaConfirmarInfoPV', { Contacto });
      } else {
        navigation.navigate('VistaRegistroPV');
      }
    };
  
    const calcularSubtotal = () => {
      return ProductosVenta.reduce((total, producto) => {
        const precioConDescuento = producto.valor_descuento_promocion > 0
          ? producto.precio_efectivo * (1 - (producto.valor_descuento_promocion / 100))
          : producto.precio_efectivo;
        return total + (precioConDescuento * producto.cantidad);
      }, 0).toFixed(2);
    };
  
    const calcularImpuestos = () => {
      const impuestoIVA = 0.16;
      return ProductosVenta.reduce((totalImpuestos, producto) => {
        return producto.tipo_impuesto === 'IVA'
          ? totalImpuestos + (producto.precio_efectivo * impuestoIVA * producto.cantidad)
          : totalImpuestos;
      }, 0).toFixed(2);
    };
  
    const calcularTotal = () => {
      const subtotal = parseFloat(calcularSubtotal());
      const impuestos = parseFloat(calcularImpuestos());
      return (subtotal + impuestos).toFixed(2);
    };

    const calcularPrecioConDescuentoUnitario = (item) => {
        const precioConDescuento = item.valor_descuento_promocion > 0
          ? item.precio_efectivo * (1 - item.valor_descuento_promocion / 100)
          : item.precio_efectivo;
        return precioConDescuento;
      };
      
      const calcularPrecioTotalConDescuento = (item) => {
        const precioConDescuentoUnitario = calcularPrecioConDescuentoUnitario(item);
        return item.cantidad * precioConDescuentoUnitario;
      };

    

  const handleExit = () => {
    navigation.navigate("MenuPrincipal"); 
    ReiniciarVariables()
    for (const producto of ProductosVenta) {
        const nuevaCantidad = producto.cantidad_existencia - producto.cantidad;
        modificarCantidadExistencia(producto.id_producto, nuevaCantidad);
      }

  };
  
    return (
      <LinearGradient
        colors={[
          "#7227a6",
          "#431b6a",
          "#000000"
        ]}
        style={styles.contenedorPrincipal}
      >
        <ScrollView style={styles.scrollViewContainer}>
          <View style={styles.contenedorTitulo}>
            <View style={styles.backButton}>
              <TouchableOpacity
                onPress={() => handleExit()}
              >
                <Image
                  source={require('../Assets/image (3).png')}
                  style={styles.TextoModificar}
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.tituloInventario}>Punto de Venta</Text>
          </View>
  
          <View style={styles.ContenedorSinTitulo}>
            <Text style={styles.titulo}>Nota de Entrega</Text>
            {/* Datos del Cliente */}
            <Text style={styles.subtitulo}>Datos del Cliente:</Text>
            <Text style={styles.text}>{`Nombre: ${Cliente.Contacto.nombre}`}</Text>
            <Text style={styles.text}>{`Cédula: ${Cliente.Contacto.cont_id_fiscal}`}</Text>
            <Text style={styles.text}>{`Teléfono: ${Cliente.Contacto.telefono}`}</Text>
            <Text style={styles.text}>{`Correo Electrónico: ${Cliente.Contacto.correo}`}</Text>
            <Text style={styles.text}>{`Dirección: ${Cliente.Contacto.direccion}`}</Text>
            <Text style={styles.text}>{`Condición de Venta: ${Cliente.Contacto.condicion_venta}`}</Text>
  
            {/* Productos Entregados */}
            <Text style={styles.subtitulo}>Productos Entregados:</Text>
            {ProductosVenta.map((item) => (
              <View key={item.id_producto} style={styles.productoContainer}>
                <Text style={styles.text}>{item.nombre}</Text>
                <Text style={styles.text}>{`${item.cantidad} x Bs. ${calcularPrecioConDescuentoUnitario(item).toFixed(2)}     BS. ${calcularPrecioTotalConDescuento(item).toFixed(2)}`}</Text>
                {/* Agrega más campos según sea necesario */}
              </View>
            ))}

  
            {/* Resumen de la Entrega */}
            <Text style={styles.subtitulo}>Resumen de la Entrega:</Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.text}>Subtotal:</Text>
              <Text style={styles.text}>{calcularSubtotal()} Bs</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.text}>IVA (16,00%):</Text>
              <Text style={styles.text}>{calcularImpuestos()} Bs</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.text}>Total:</Text>
              <Text style={styles.text}>{calcularTotal()} Bs</Text>
            </View>
          </View>
        </ScrollView>
        <TouchableOpacity style={styles.botonSalir} onPress={handleExit}>
        <Text style={styles.textoBotonSalir}>Salir</Text>
        </TouchableOpacity>
      </LinearGradient>
    );
  };
  
  export default DeliveryNote;