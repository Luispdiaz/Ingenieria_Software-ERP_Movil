import React, { useEffect } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Image, Dimensions } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import Constants from 'expo-constants';
import { useState, useRef } from "react";
import { useContact } from "../../Context/ContactContext";
import { useNavigation } from "@react-navigation/native";
import TypeMovement from "./TypeMovement";
import Movement from "./Movement";
import { useVenta } from "../../Context/VentaContext";



const windowHeight = Dimensions.get('window').height;
const Styles = StyleSheet.create({
    contenedorPrincipal: {
        flex: 1,
        justifyContent:"flex-start"
    },contenedorTitulo: {
        marginTop: Constants.statusBarHeight + 10,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection:'row',
        marginBottom: 20
    },
    tituloInventario: {
      fontSize: 24,
      fontWeight: 'bold',
      color: "#FFFFFF"
    },
    contenedorContactos:{
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "rgba(0, 0, 0, 0.07))",
    paddingHorizontal: 20, // Relleno horizontal
    paddingVertical: 30,   // Relleno vertical
    borderTopLeftRadius: 46,  // Radio de borde superior izquierdo
    borderTopRightRadius: 46,
    marginTop: 20
    },
    textinput: {
        padding: 10,
        borderWidth: 1,
        borderColor: 'white',
        color: 'white',
        textAlign: "left",
        paddingStart: 30, 
        borderRadius: 100,
        flex:1
      }, 
      contenedorMas:{ 
        width: windowHeight * 0.06,
        height: windowHeight * 0.06, 
        marginLeft:7
    },
    containerBuscador: {
        flexDirection: 'row',
        alignItems: 'center'
      },
      TextoModificar: {
        width: 24, 
        height: 20, 
        marginRight: 10, 
      },
      backButton: {
        position: 'absolute',
        left: Constants.statusBarHeight * 0.01,
        padding: 10,
        zIndex: 1,
        alignSelf:'flex-start',
        justifyContent:'flex-start'
      },
      mensajeNoCoincidencias: {
        fontSize: 16,
        color: "#FFFFFF", 
        textAlign: 'center',
        marginTop: 20,
      },
})


const MovementsView = () => {
    const { Contactos, getContacts, buscarContactos } = useContact()
    const { Encabezado, getEncabezado, buscarEncabezado, buscarMovimientoporTipo } = useVenta()
    const [BusquedaC, setBusquedaC] = useState('');
    const inputRef = useRef(null);
    const navigation = useNavigation();

    const handleLimpiarBusqueda = () => {
        setBusquedaC('');
        if (inputRef.current) {
          inputRef.current.clear();
        }
        buscarContactos('');
      }

    useEffect(()=>{
        getEncabezado()
      }, [])
    const [selectedType, setSelectedType] = useState("Todos");
  
    const handleTypePress = (type) => {
      setSelectedType(type);
      if (type === "Todos") {
        getEncabezado()
      } else {
        buscarMovimientoporTipo(type)
    }
}
  
    return (
      <LinearGradient
        colors={[
          "#7227a6",
          "#431b6a",
          "#000000"
        ]}
        style={Styles.contenedorPrincipal}
      >
        <View style={Styles.contenedorTitulo}>
          <View style={Styles.backButton}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
        >
          <Image
          source={require('../Assets/image (3).png')}
          style={Styles.TextoModificar}
        />
        </TouchableOpacity>
        </View>
          <Text style={Styles.tituloInventario}>Movimientos</Text>
        </View>

        <View style={{ flexDirection: 'row' }}>
            <TypeMovement
            nombre="Todos"
            icono={require("../Assets/image (20).png")}
            color="#7d09ff"
            onPress={handleTypePress}
            isSelected={selectedType === "Todos"}
          ></TypeMovement>
          <TypeMovement
            nombre="Pedido"
            icono={require("../Assets/ICONO 3 (0).png")}
            color="#7d09ff"
            onPress={handleTypePress}
            isSelected={selectedType === "Pedido"}
          ></TypeMovement>
          <TypeMovement
            nombre="Venta"
            icono={require("../Assets/ICONO 3 (1).png")}
            color="#7d09ff"
            onPress={handleTypePress}
            isSelected={selectedType === "Venta"}
          ></TypeMovement>
          <TypeMovement
            nombre="Factura"
            icono={require("../Assets/ICONO 3 (2).png")}
            color="#7d09ff"
            onPress={handleTypePress}
            isSelected={selectedType === "Factura"}
          ></TypeMovement>
          <TypeMovement
            nombre="N/E"
            icono={require("../Assets/ICONO 3 (3).png")}
            color="#7d09ff"
            onPress={handleTypePress}
            isSelected={selectedType === "N/E"}
          ></TypeMovement>
        </View>
        
        <View style={Styles.contenedorContactos}>

        {Encabezado.length === 0 && (
        <Text style={Styles.mensajeNoCoincidencias}>
            No hay coincidencias con la búsqueda
        </Text>
        )}
        
        <FlatList
            style={{ flex:1}}
                data={Encabezado}
                renderItem={({ item }) => (
                    <Movement {...item}
                    />
                )}
                numColumns={1} 
    /> 
        </View>
        

      </LinearGradient>
    );
  };


export default MovementsView;