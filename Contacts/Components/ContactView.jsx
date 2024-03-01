import React from "react";
import { View, Text, StyleSheet, Dimensions, Image, ScrollView, TouchableOpacity } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native'
import theme from "../Themes/Theme";
import  Constants from "expo-constants";

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').height;


const styles = StyleSheet.create({
    contenedorPrincipal: {
        flex: 1,
        justifyContent:"flex-start"
    },
    EstiloImagen: {
        width: '100%',
        height: windowHeight * 0.4, // Puedes ajustar este valor según tus necesidades
        borderBottomLeftRadius: 85,
        borderBottomRightRadius: 85,
        marginTop: Constants.statusBarHeight
      },
      backButtonText: {
        fontSize: 50,
        fontWeight: theme.title.fontWeight,
        color: theme.colors.textPrimary,
      },
      TextoModificar: {
        width:  30, 
        height: 27
       
      },
      BotonModificar: {
        position: 'absolute',
        top: Constants.statusBarHeight,
        right: Constants.statusBarHeight * 0.1,
        padding: 10,
        alignSelf: 'flex-end'
         },
         TextoModificar2: {
            width:  30, 
            height: 30
           
          },
          titulo: {
            fontSize: theme.title.fontSize,
            fontWeight: theme.title.fontWeight,
            color: theme.colors.textPrimary,
            alignSelf:'center',
            marginTop:10
          },
          backButton: {
            position: 'absolute',
            top: Constants.statusBarHeight,
            left: Constants.statusBarHeight * 0.01,
            padding: 10,
            zIndex: 1,
            alignSelf:'flex-start',
            justifyContent:'flex-start'
          }
      
  });

const ContactView = ({ route }) => {
    const {
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
    imagen,
    Contacto_pkey
      } = route.params.props;

      const ObjetoProps = route.params.props;

      const navigation = useNavigation();

  return (
    <LinearGradient
        colors={[
          "#7227a6",
          "#431b6a",
          "#000000"
        ]}
        style={styles.contenedorPrincipal}
      >
      <Image style={styles.EstiloImagen} source={{ uri: imagen }} />
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

      <View style={styles.BotonModificar}>
      <TouchableOpacity
        onPress={() => navigation.navigate("ModificarContacto",{props: ObjetoProps})}
      >
        <Image
        source={require('../Assets/image (2).png')}
        style={styles.TextoModificar2}
      />
      </TouchableOpacity>
      </View>


      <ScrollView>
      
      <Text style={styles.titulo}>{nombre}</Text>
      
      </ScrollView>
    </LinearGradient>
  );
};



export default ContactView;