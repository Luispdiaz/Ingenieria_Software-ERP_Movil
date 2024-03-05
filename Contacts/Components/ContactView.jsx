import React, {useState} from "react";
import { View, Text, StyleSheet, Dimensions, Image, ScrollView, TouchableOpacity, Switch } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native'
import theme from "../Themes/Theme";
import  Constants from "expo-constants";

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').height;

const Pasador = ({estado}) => {
  const [isSwitchOn, setIsSwitchOn] = useState(estado === true);
  return(
    <Switch
      trackColor={{ false: "#52D126", true: "#52D126" }}
      thumbColor={isSwitchOn ? "#52D126" : "#52D126"}
      ios_backgroundColor="#52D126"
      borderColor= "#52D126"
      onValueChange={() => setIsSwitchOn(previousState => !previousState)}
      value={isSwitchOn}
      disabled={true} // Siempre deshabilitado
    />
  )
};


const styles = StyleSheet.create({
  contenedorPrincipal: {
    flex: 1,
    justifyContent:"flex-start"
  },
  EstiloImagen: {
    width: '100%',
    height: windowHeight * 0.4, // Puedes ajustar este valor según tus necesidades
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
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
  },
  contenedorInfo: {
    margin: 20,
    marginBottom: 5,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 30,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  contenedorVertical: {
    flexDirection: 'row',
    width: '90%',
    margin: 10,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  miniContenedor: {
    flexDirection: 'row',
    width: '45%',
    margin: 5,
    alignItems: 'center'
  },
  miniContenedor2: {
    flexDirection: 'row',
    width: '75%',
    margin: 5,
    alignItems: 'center'
  },
  subtitulos: {
    color: theme.colors.textPrimary,
    fontWeight: 'bold',
    fontSize: 13,
    margin: 10
  },
  textoPeq: {
    color: theme.colors.textPrimary,
    fontWeight: 'normal',
    fontSize: 13,
    margin: 10
  },
  vistaTitulo: {
    width: '100%'
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

    const [isEnabled, setIsEnabled] = useState(false);

    const toggleSwitch = () => {
      setIsEnabled(previousState => !previousState);
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
      <View style={styles.contenedorInfo}>
        <View style={styles.vistaTitulo}>
        <Text style={styles.subtitulos}>Información personal</Text>
        </View>
        <View style={styles.miniContenedor}>
          <Image source={require('../Assets/contactIcon.png')} style={styles.TextoModificar}/>
          <Text style={styles.textoPeq}>{nombre}</Text>
        </View>
        <View style={styles.miniContenedor}>
          <Image source={require('../Assets/birthdayIcon.png')} style={styles.TextoModificar}/>
          <Text style={styles.textoPeq}>{fecha_nacimiento}</Text>
        </View>
        <View style={styles.miniContenedor}>
          <Image source={require('../Assets/idIcon.png')} style={styles.TextoModificar}/>
          <Text style={styles.textoPeq}>{cont_id_fiscal}</Text>
        </View>
        <View style={styles.miniContenedor}>
          <Image source={require('../Assets/phoneIcon.png')} style={styles.TextoModificar}/>
          <Text style={styles.textoPeq}>+{cod_telefono} {telefono}</Text>
        </View>
        <View style={styles.miniContenedor2}>
          <Image source={require('../Assets/locationIcon.png')} style={styles.TextoModificar}/>
          <Text style={styles.textoPeq}>{direccion}</Text>
        </View>
      </View>
      <View style={styles.contenedorInfo}>
        <View style={styles.vistaTitulo}>
        <Text style={styles.subtitulos}>Correo electronico</Text>
        </View>
        <View style={styles.miniContenedor2}>
          <Image source={require('../Assets/mailIcon.png')} style={styles.TextoModificar}/>
          <Text style={styles.textoPeq}>{correo}</Text>
        </View>
      </View>
      <View style={styles.contenedorInfo}>
        <View style={styles.vistaTitulo}>
          <Text style={styles.subtitulos}>Fecha de ingreso</Text>
        </View>
        <View style={styles.miniContenedor}>
          <Text style={[styles.textoPeq, {color: "#52D126"}]}>{fecha_ingreso}</Text>
        </View>
      </View>
      <View style={styles.contenedorInfo}>
        <View >
        <Text style={styles.subtitulos}>Condición venta</Text>
        <Text style={[styles.textoPeq, {color: '#E909FF'}]}>{condicion_venta}</Text>
        </View>
      </View>
      <View style={styles.contenedorInfo}>
        <View style={styles.contenedorVertical}>
          <Text style={styles.textoPeq}>Empleado</Text>
          <Pasador estado={empleado}/>
        </View>
        <View style={styles.contenedorVertical}>
          <Text style={styles.textoPeq}>Cliente</Text>
          <Pasador estado={cliente}/>
        </View>
        <View style={styles.contenedorVertical}>
          <Text style={styles.textoPeq}>Proveedor</Text>
          <Pasador estado={proveedor}/>
        </View>
      </View>
      <View style={styles.contenedorInfo}>
        <View style={styles.contenedorVertical}>
          <Text style={styles.textoPeq}>Contribuyente</Text>
          <Pasador estado={contribuyente}/>
        </View>
      </View>
      <View style={styles.contenedorInfo}>
        <View style={styles.contenedorVertical}>
          <Text style={styles.textoPeq}>Vendedor</Text>
          <Pasador estado={vendedor}/>
        </View>
      </View>
      <View style={styles.contenedorInfo}>
        <View style={styles.contenedorVertical}>
          <Text style={styles.textoPeq}>Credito total</Text>
          <Text style={[styles.textoPeq, {borderColor: "#52D126", borderWidth: 1, borderRadius: 20, padding: 10}]}>{credito_total}</Text>
        </View>
        <View style={styles.contenedorVertical}>
          <Text style={styles.textoPeq}>Credito vence</Text>
          <Text style={[styles.textoPeq, {color: '#E909FF'}]}>{credito_vence}</Text>
        </View>
      </View>
      </ScrollView>
    </LinearGradient>
  );
};



export default ContactView;