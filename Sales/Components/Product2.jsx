import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, TextInput, Alert } from "react-native";
import theme from "../../Inventory/Themes/Theme";
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { useState } from "react";
import { useVenta } from "../../Context/VentaContext";

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  tarjetaContainer: {
    backgroundColor: "rgba(128, 41, 181, 0.15)",
    borderRadius: 15,
    padding: 15,
    marginVertical: 4,
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84
},
imagenProducto: {
    width: 80,
    height: 80,
    borderRadius: 10,
},
nombreProducto: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white'
},
informacionAdicional: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)'
},
informacionAdicionalCantidad: {
  fontSize: 17,
  color: 'rgba(255, 255, 255, 0.7)',
  marginHorizontal: 20
},
tarjetaPresionada: {
  borderColor: 'white', // Cambia el color del borde al presionar
  borderWidth: 1, // Puedes ajustar el grosor del borde al presionar
},
modalContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo oscuro semi-transparente
},
modalContent: {
  backgroundColor: 'white',
  padding: 20,
  borderRadius: 10,
  alignItems: 'center',
},
modalText: {
  fontSize: 18,
  color: 'black',
  marginBottom: 15,
},
closeButton: {
  fontSize: 16,
  color: 'blue',
  margin: 10
},
input: {
  height: 40,
  width: '100%',
  marginBottom: 10,
  paddingHorizontal: 10,
  fontSize: 16,
},
buttonContainer: {
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'center',
  marginTop: 10,
},
button: {
  width: 40,
  height: 40,
  borderRadius: 20,
  backgroundColor: '#4D09FF',
  justifyContent: 'center',
  alignItems: 'center',
},
buttonText: {
  color: 'white',
  fontSize: 16,
  fontWeight: 'bold',
},
eliminarButton: {
  width: 30,
  height: 30,
  borderRadius: 3.84,
  backgroundColor: 'red',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
  right: 0, 
  top: 0,
  
}
});

const Product2 = (props) => {
  const [cantidadProducto, setCantidadProducto] = useState('');
  const [cantidad, setCantidad] = useState(props.cantidad || 0);
  const { EliminarProductoVenta, ModificarCantidadProducto } = useVenta();

  const precioEfectivoConDescuento = props.valor_descuento_promocion > 0
    ? props.precio_efectivo * (1 - props.valor_descuento_promocion / 100)
    : props.precio_efectivo;

  const precioUSDConDescuento = props.valor_descuento_promocion > 0
    ? props.precio_usd * (1 - props.valor_descuento_promocion / 100)
    : props.precio_usd;

  return (
    <TouchableOpacity style={styles.tarjetaContainer} activeOpacity={1}>
      <TouchableOpacity onPress={() => EliminarProductoVenta(props)} style={styles.eliminarButton}>
        <Text style={styles.buttonText}>X</Text>
      </TouchableOpacity>
      {props.valor_descuento_promocion > 0 ? (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ marginRight: 10 }}>
            <Image style={styles.imagenProducto} source={{ uri: props.imagen }} />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
            <View style={{ flex: 1 }}>
              <Text style={styles.nombreProducto}>{props.nombre}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={[styles.informacionAdicional, { textDecorationLine: 'line-through', color: 'red' }]}>Bs. {props.precio_efectivo} </Text>
                    <Text style={[styles.informacionAdicional, { textDecorationLine: 'line-through', color: 'red' }]}>   {props.precio_usd} $</Text>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.informacionAdicional}>Bs. {precioEfectivoConDescuento} </Text>
                    <Text style={styles.informacionAdicional}>   {precioUSDConDescuento} $</Text>
                  </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, justifyContent: 'flex-end' }}>
                  <TouchableOpacity
                    onPress={() => {
                      if (cantidad > 1) {
                        const nuevaCantidadResta = parseInt(cantidad, 10) - 1;
                        const nuevoIdProducto = props.id_producto;
                        ModificarCantidadProducto(nuevoIdProducto, nuevaCantidadResta);
                        setCantidad(nuevaCantidadResta);
                      }
                    }}
                    style={styles.button}
                  >
                    <Text style={styles.buttonText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.informacionAdicionalCantidad}>{cantidad}</Text>
                  <TouchableOpacity
                    onPress={() => {
                      const nuevaCantidadSuma = parseInt(cantidad, 10) + 1;
                      const nuevoIdProducto = props.id_producto;

                      // Verificar si la nueva cantidad no excede la cantidad disponible
                      if (nuevaCantidadSuma <= props.cantidad_existencia) {
                        ModificarCantidadProducto(nuevoIdProducto, nuevaCantidadSuma);
                        setCantidad(nuevaCantidadSuma);
                      }
                    }}
                    style={[styles.button, cantidad >= props.cantidad_existencia && { backgroundColor: 'gray' }]}
                    disabled={cantidad >= props.cantidad_existencia}
                  >
                    <Text style={styles.buttonText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      ) : (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ marginRight: 10 }}>
            <Image style={styles.imagenProducto} source={{ uri: props.imagen }} />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
            <View style={{ flex: 1 }}>
              <Text style={styles.nombreProducto}>{props.nombre}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.informacionAdicional}>Bs. {props.precio_efectivo} </Text>
                    <Text style={styles.informacionAdicional}>   {props.precio_usd} $</Text>
                  </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, justifyContent: 'flex-end' }}>
                  <TouchableOpacity
                    onPress={() => {
                      if (cantidad > 1) {
                        const nuevaCantidadResta = parseInt(cantidad, 10) - 1;
                        const nuevoIdProducto = props.id_producto;
                        ModificarCantidadProducto(nuevoIdProducto, nuevaCantidadResta);
                        setCantidad(nuevaCantidadResta);
                      }
                    }}
                    style={styles.button}
                  >
                    <Text style={styles.buttonText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.informacionAdicionalCantidad}>{cantidad}</Text>
                  <TouchableOpacity
                    onPress={() => {
                      if (cantidad < props.cantidad_existencia) {
                      const nuevaCantidadSuma = parseInt(cantidad, 10) + 1;
                      const nuevoIdProducto = props.id_producto;
                      ModificarCantidadProducto(nuevoIdProducto, nuevaCantidadSuma);
                      setCantidad(nuevaCantidadSuma);
                      }
                    }}
                    style={styles.button}
                  >
                    <Text style={styles.buttonText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      )}
    </TouchableOpacity>
  )
}

export default Product2;