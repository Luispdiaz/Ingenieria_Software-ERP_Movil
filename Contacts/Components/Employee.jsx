import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity} from "react-native";
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native'

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    contenedor: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 5,
      marginVertical: 5,
      borderRadius: 10,
      shadowColor: 'rgba(0, 0, 0, 0.1)',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 1,
      shadowRadius: 2,
    },
    mainBox: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    generalBox: {
        marginLeft: 5,
        width: '60%',
        justifyContent: 'center'
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
      fontSize: 12,
      color: '#FFFF',
    },
    littleIcon: {
        width: 20,
        height:20
    },
    unionBox: {
        flexDirection: 'row'
    }
  });

const Employee = (props) => {
    const navigation = useNavigation();
return(
    
      <TouchableOpacity style={styles.contenedor} activeOpacity={1} onPress={() => navigation.navigate("VistaContacto", {props})}>
        <View style={styles.mainBox}>
        <View>
          <Image style={styles.EstiloImagen} source={{uri: props.imagen}} />
        </View>
      
      <View style={styles.generalBox}>
        <Text style={styles.NombreProducto}>{props.nombre}</Text>
        <View style={styles.unionBox}>
            <Image source={require('../Assets/whitePhoneIcon.png')} style={styles.littleIcon}/>
            <Text style={styles.InformacionAdicional}>+{props.cod_telefono} {props.telefono}</Text>
        </View>
        <View style={styles.unionBox}>
            <Image source={require('../Assets/whiteEmailIcon.png')} style={styles.littleIcon}/>
            <Text style={styles.InformacionAdicional}>{props.correo}</Text>
        </View>
        
      </View>
        <View style={{alignItems: 'flex-end'}}>
            <Image source={require('../Assets/whiteEditIcon.png')} style={styles.EstiloImagen}/>
            <Text style={[styles.InformacionAdicional, {width: 70}]}>Editar datos y permisos</Text>
        </View>
      </View>
      </TouchableOpacity>

)
}

export default Employee;
//style={{width: 35,height:35,alignSelf:"center",  borderBottomLeftRadius: 30,borderBottomRightRadius: 30}} 