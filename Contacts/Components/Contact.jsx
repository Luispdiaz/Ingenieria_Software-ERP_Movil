import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity} from "react-native";
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native'

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    contenedor: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      marginVertical: 5,
      borderRadius: 10,
      shadowColor: 'rgba(0, 0, 0, 0.1)',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 1,
      shadowRadius: 2
    },
    EstiloImagen: {
      width: 50,
      height: 50,
      borderRadius: 30,
      marginRight: 10,
      justifyContent:"center",
      borderWidth: 1
    },
    NombreProducto: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#FFFF',
    },
    InformacionAdicional: {
      fontSize: 14,
      color: '#FFFF',
    },
  });

const Contact = (props) => {
    const navigation = useNavigation();
return(
    
      <TouchableOpacity style={styles.contenedor} activeOpacity={1} onPress={() => navigation.navigate("VistaContacto", {props})}>
        <View  >
          <Image style={styles.EstiloImagen} source={{uri: props.imagen}} />
        </View>
      
      <View style={{marginLeft:5}}>
        <Text style={styles.NombreProducto}>{props.nombre}</Text>
        <Text style={styles.InformacionAdicional}>
          {props.cliente ? 'Cliente' : null}
          {props.empleado ? 'Empleado' : null}
          {props.proveedor ? 'Proveedor' : null}
        </Text>
      </View>
      </TouchableOpacity>

)
}

export default Contact
//style={{width: 35,height:35,alignSelf:"center",  borderBottomLeftRadius: 30,borderBottomRightRadius: 30}} 