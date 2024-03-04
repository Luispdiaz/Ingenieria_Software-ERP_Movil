import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, TextInput, Alert } from "react-native";
import theme from "../../Inventory/Themes/Theme";
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { useState } from "react";
import { useVenta } from "../../Context/VentaContext";
import { useEffect } from "react";

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
modalContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
}
  });

const Product1 = (props) => {
    const navigation = useNavigation();
    const [presionado, setPresionado] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [cantidadProducto, setCantidadProducto] = useState('');
    const { ProductosVenta, AgregarProductoVenta, VerificarProductoExistente} = useVenta()

    const onPressHandler = () => {
      setPresionado(!presionado);
      setModalVisible(true)
    }

    const closeModal = () => {
      setModalVisible(false);
      setPresionado(!presionado);
      Alert.alert(
        'Producto Agregado',
        'El producto se ha añadido a la compra correctamente.',
        [
          {
            text: 'OK'}]
      )
      const productoConCantidad = {
        ...props,
        cantidad: cantidadProducto,
      };
      if (VerificarProductoExistente(props.id_producto)) {
        Alert.alert('Producto Existente', 'El producto ya se ha agregado anteriormente.');
      } else {
        AgregarProductoVenta(productoConCantidad);
      }
      setCantidadProducto('')
    };
    
    

    useEffect(() => {
    }, [ProductosVenta])

    const cancelModal = () => {
      setCantidadProducto('')
      setModalVisible(false);
      setPresionado(!presionado);
    }

return(
  <TouchableOpacity activeOpacity={1} onPress={onPressHandler}>
  <View style={[styles.tarjetaContainer, presionado && styles.tarjetaPresionada]}>
  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <View style={{ marginRight: 10 }}>
          <Image style={styles.imagenProducto} source={{ uri: props.imagen  }} />
      </View>
      <View>
          <Text style={styles.nombreProducto}>{props.nombre}</Text>
          <Text style={styles.informacionAdicional}>Cantidad Disponible: {props.cantidad_existencia} </Text>
          <Text style={styles.informacionAdicional}>Precio en Dolares: {props.precio_usd} $</Text>
          <Text style={styles.informacionAdicional}>Precio en Bolívares: {props.precio_efectivo} Bs.</Text>
      </View>

      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Ingresa la cantidad:</Text>
            <TextInput
              style={styles.input}
              placeholder="Cantidad"
              keyboardType="numeric"
              value={cantidadProducto}
              onChangeText={(text) => setCantidadProducto(text)}
            />
            <View style={{flexDirection:'row'}}>
            <TouchableOpacity onPress={cancelModal}>
              <Text style={styles.closeButton}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={closeModal}>
              <Text style={styles.closeButton}>Confirmar</Text>
            </TouchableOpacity>
            
            </View>
          </View>
        </View>
      </Modal>


  </View>
</View>
</TouchableOpacity>
    
)
}

export default Product1