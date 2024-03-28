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
    InformacionAdicional2: {
      fontSize: 14,
      color: '#CCCC',
      marginLeft: 10,
      marginBottom:5
    },
  });

const Movement = (props) => {
    const navigation = useNavigation();

    function obtenerDiaEscrito(fechaString) {
      const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
      const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
      const fecha = new Date(fechaString); // Convertir la cadena de fecha en un objeto Date
      const diaSemana = diasSemana[fecha.getDay()]; // Obtener el nombre del día de la semana
      const diaMes = fecha.getDate(); // Obtener el día del mes
      const mes = meses[fecha.getMonth()]; // Obtener el nombre del mes
      const anio = fecha.getFullYear(); // Obtener el año
      return `${capitalizeFirstLetter(diaSemana)}, ${diaMes} de ${mes} del ${anio}`;
    }
    
    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

return(
  <View style={styles.contenedor} activeOpacity={1} onPress={() => navigation.navigate("VistaContacto", {props})}>
    
  <View style={{flex: 1}}>
    <View style={{flexDirection:'row'}}>
  <Image source={require('../Assets/Rectangle 169.png')} />
  <Text style={styles.InformacionAdicional2}>{obtenerDiaEscrito(props.fecha_factura)}</Text>
  </View>
    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      <Text style={styles.NombreProducto}>{props.Contacto}</Text>
      <Text style={{...styles.NombreProducto, color: props.enc_tipo_encabezado === 'Venta' ? 'green' : 'red'}}>Bs.{props.total_efectivo}</Text>
    </View>
    <View style={{marginTop:5}}>
    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
    <Text style={styles.InformacionAdicional}>Monto en Dolares</Text>
    <Text style={styles.InformacionAdicional}>{props.total_usd.toFixed(2)} $</Text>
    </View>
    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
    <Text style={styles.InformacionAdicional}>Tipo de Documento</Text>
    <Text style={styles.InformacionAdicional}>{props.enc_tipo_documento}</Text>
    </View>
    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
    <Text style={styles.InformacionAdicional}>Tipo de Movimiento</Text>
    <Text style={styles.InformacionAdicional}>{props.enc_tipo_encabezado === 'Compra' ? 'Pedido' : props.enc_tipo_encabezado}</Text>
    </View>
    </View>
  </View>
</View>

)
}

export default Movement
//style={{width: 35,height:35,alignSelf:"center",  borderBottomLeftRadius: 30,borderBottomRightRadius: 30}} 