import React, { useEffect } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Image, Dimensions } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import Constants from 'expo-constants';
import TypeContact from "./TypeContact";
import { useState, useRef } from "react";
import Contact from "./Contact";;
import { useContact } from "../../Context/ContactContext";
import { useNavigation } from "@react-navigation/native";



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
      }
})


const ContactsView = () => {
    const { Contactos, getContacts, buscarContactos, buscarContactosporTipo } = useContact()
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
        getContacts()
      }, [])
    const [selectedType, setSelectedType] = useState("Todos");
  
    const handleTypePress = (type) => {
      setSelectedType(type);
      if (type === "Todos") {
        getContacts()
      } else {
         buscarContactosporTipo(type)
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
          <Text style={Styles.tituloInventario}>Contactos</Text>
        </View>
  
        <View style={{ flexDirection: 'row' }}>
          <TypeContact
            nombre="Todos"
            icono={require("../Assets/assetC_1.png")}
            color="#b168ea"
            onPress={handleTypePress}
            isSelected={selectedType === "Todos"}
          ></TypeContact>
          <TypeContact
            nombre="empleado"
            icono={require("../Assets/assetC_2.png")}
            color="#b168ea"
            onPress={handleTypePress}
            isSelected={selectedType === "empleado"}
          ></TypeContact>
          <TypeContact
            nombre="proveedor"
            icono={require("../Assets/assetC_3.png")}
            color="#b168ea"
            onPress={handleTypePress}
            isSelected={selectedType === "proveedor"}
          ></TypeContact>
          <TypeContact
            nombre="cliente"
            icono={require("../Assets/assetC_4.png")}
            color="#b168ea"
            onPress={handleTypePress}
            isSelected={selectedType === "cliente"}
          ></TypeContact>
        </View>
        <View style={Styles.contenedorContactos}>
        <View style={Styles.containerBuscador}>
        {((BusquedaC !== '' || selectedType !== 'Todos') && (
            <TouchableOpacity onPress={() => {
                handleLimpiarBusqueda();
                setSelectedType('Todos');
            }}>
                <Image
                source={require('../Assets/image (3).png')}
                style={Styles.TextoModificar}
                />
            </TouchableOpacity>
            ))}
        <TextInput
            ref={inputRef}
            style={Styles.textinput}
            placeholder="¿A quién deseas buscar?"
            placeholderTextColor='#FFFFFF'
            onChangeText={(texto1) => setBusquedaC(texto1)}
            onSubmitEditing={() => buscarContactos(BusquedaC)}
            />
        <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate("CrearContacto")}>
        <Image
        source={require('../Assets/assetsC_8 (1).png')} 
       style={Styles.contenedorMas} 
      />
        </TouchableOpacity>
        </View>
        <FlatList
            style={{marginTop:20, marginHorizontal:10, flex:1}}
                data={Contactos}
                renderItem={({ item }) => (
                    <Contact {...item}
                    />
                )}
                numColumns={1} 
    /> 
        </View>

      </LinearGradient>
    );
  };


export default ContactsView;