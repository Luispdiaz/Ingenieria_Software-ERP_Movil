import React from "react";
import { View, Text, StyleSheet, Dimensions, Image, ScrollView, TouchableOpacity, TextInput, FlatList } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from "@react-navigation/native";
import Constants from 'expo-constants';
import theme from "../../Inventory/Themes/Theme";
import { useState } from "react";
import { useContact } from "../../Context/ContactContext";
import { useVenta } from "../../Context/VentaContext";
import Product2 from "./Product2";

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
    resumenContainer: {
      backgroundColor: '#1b1f4c',
      padding: 20,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
    },
    resumenTitulo: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#ECF0F1',
      marginBottom: 10,
    },
    totalContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10,
    },
    totalTexto: {
      fontSize: 16,
      color: '#ECF0F1',
    },
    totalNumero: {
      fontSize: 16,
      color: '#b87adf',
    },
    pagarBoton: {
      backgroundColor: '#4D09FF', 
      padding: 10,
      borderRadius: 10,
      alignItems: 'center',
    },
    pagarTexto: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#ECF0F1',
    },
  });

const SelectedProductsView = () => {
    const navigation = useNavigation()
    const [CodCliente, setCodCliente] = useState('');
    const { buscarContactosporCedula } = useContact()
    const { ProductosVenta  } = useVenta()

    const calcularTotalUsd = () => {
      return ProductosVenta.reduce((total, producto) => {
        const precioConDescuento = producto.valor_descuento_promocion > 0
          ? producto.precio_usd * (1 - producto.valor_descuento_promocion / 100)
          : producto.precio_usd;
        return total + (precioConDescuento * producto.cantidad);
      }, 0).toFixed(2); 
    };
    
    const calcularTotalBs = () => {
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
    
    const calcularTotalFinal = () => {
      const totalBs = parseFloat(calcularTotalBs());
      const impuestos = parseFloat(calcularImpuestos());
      return (totalBs + impuestos).toFixed(2);
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

    <View style={styles.ContenedorSinTitulo}>
      <FlatList
      style={{marginTop:20, marginHorizontal:10}}
          data={ProductosVenta}
          renderItem={({ item }) => (
              <Product2 {...item}
              />
            )}
            numColumns={1} 
      /> 
    </View>
      <View style={styles.resumenContainer}>
      <Text style={styles.resumenTitulo}>Resumen de la Compra</Text>
      <View style={styles.totalContainer}>
        <Text style={styles.totalTexto}>Monto en Dolares:</Text>
        <Text style={styles.totalNumero}>{calcularTotalUsd()} $</Text>
      </View>
      <View style={styles.totalContainer}>
        <Text style={styles.totalTexto}>Monto en Bs:</Text>
        <Text style={styles.totalNumero}>{calcularTotalBs()} Bs</Text>
      </View>
      <View style={styles.totalContainer}>
        <Text style={styles.totalTexto}>IVA (16,00%):</Text>
        <Text style={styles.totalNumero}>{calcularImpuestos()} Bs</Text>
      </View>
      <View style={styles.totalContainer}>
        <Text style={styles.totalTexto}>Total en Bolivares:</Text>
        <Text style={styles.totalNumero}>{calcularTotalFinal()} Bs</Text>
      </View>
      <TouchableOpacity style={styles.pagarBoton} onPress={null}>
        <Text style={styles.pagarTexto}>Pagar</Text>
      </TouchableOpacity>
    </View>
            
    </LinearGradient>
  );
};



export default SelectedProductsView;