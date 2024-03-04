import React from "react";
import { View, Text, StyleSheet, Dimensions, Image, ScrollView, TouchableOpacity, TextInput } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from "@react-navigation/native";
import Constants from 'expo-constants';
import theme from "../../Inventory/Themes/Theme";
import { useState } from "react";
import { useContact } from "../../Context/ContactContext";

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
    }
      
  });

const IdentificationView = () => {
    const navigation = useNavigation()
    const [CodCliente, setCodCliente] = useState('');
    const { buscarContactosporCedula } = useContact()

    const handleSearch = async (CodCliente) => {
      const Contacto = await buscarContactosporCedula(CodCliente);
        if (Contacto) {
          navigation.navigate('VistaConfirmarInfoPV', { Contacto });;
      } else {
        navigation.navigate('VistaRegistroPV');
      }
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

    <View style={styles.ContenedorSinTitulo}>
    <Text style={styles.textoSolicitud}>
        Proporcione el documento de identificación del cliente
    </Text>
    <View style={{flexDirection:'row'}}>
      <TextInput
        style={styles.textinput}
        placeholder="Ejemplo: 29666635"
        placeholderTextColor='rgba(255, 255, 255, 0.5)'
        onChangeText={(texto1) => setCodCliente(texto1)}
        onSubmitEditing={() => handleSearch(CodCliente)}
        />
    </View>
    </View>
    </LinearGradient>
  );
};



export default IdentificationView;