import React, {useState} from "react";
import { View, Text, StyleSheet, Dimensions, Image, ScrollView, TouchableOpacity, Switch, Linking, TouchableHighlight } from "react-native";
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
    flex:1
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
  },
  linkText: {
    color: '#007BFF', // Color azul típico de los enlaces
    textDecorationLine: 'underline',
    fontWeight: 'bold', // Puedes ajustar la fuente según tus preferencias
    margin: 10
  },
  circularButton: {
    width: 40,
    height: 40,
    borderRadius: 20, // Esto hará que el contenedor sea circular
    backgroundColor: '#eebefe', // Color de fondo del círculo
    justifyContent: 'center',
    alignItems: 'center',
  }
  
    
  });

  const LinkText = ({ url, children }) => {
    const handlePress = () => {
      Linking.openURL(url);
    };
  
    return (
      <TouchableHighlight onPress={handlePress} underlayColor="transparent">
        <Text style={styles.linkText}>{children}</Text>
      </TouchableHighlight>
    );
  };

const EnterpriseView = () => {


    const navigation = useNavigation();

    const [isEnabled, setIsEnabled] = useState(false);

    const toggleSwitch = () => {
      setIsEnabled(previousState => !previousState);
    };
    const farmacia = 'https://pbs.twimg.com/profile_images/1393558893750587395/M-FeS8kS_400x400.jpg'

  return (
    <LinearGradient
        colors={[
          "#7227a6",
          "#431b6a",
          "#000000"
        ]}
        style={styles.contenedorPrincipal}
      >
      <Image style={styles.EstiloImagen} source={ {uri: farmacia}} />
      <View style={styles.backButton}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.circularButton}
      >
        <Image
        source={require('../Assets/image (3).png')}
        style={styles.TextoModificar}
      />
      </TouchableOpacity>
      </View>

   


      <ScrollView>
      <View style={styles.contenedorInfo}>
        <View style={styles.vistaTitulo}>
        <Text style={styles.subtitulos}>Información de la Empresa</Text>
        </View>
        <View style={styles.miniContenedor}>
          <Image source={require('../Assets/contactIcon.png')} style={styles.TextoModificar}/>
          <Text style={styles.textoPeq}>ventasahinoa2010@gmail.com</Text>
        </View>
        <View style={styles.miniContenedor}>
          <Image source={require('../Assets/locationIcon.png')} style={styles.TextoModificar}/>
          <Text style={styles.textoPeq}>Carretera Petare Santa Lucía, Urb. Valle Fresco, Local N°7, frente a la Hdad. Gallega.</Text>
        </View>
        
        <View style={styles.miniContenedor}>
          <Image source={require('../Assets/phoneIcon.png')} style={styles.TextoModificar}/>
          <Text style={styles.textoPeq}>0412-4810277</Text>
        </View>

        <View style={styles.miniContenedor}>
          <Image source={require('../Assets/idIcon.png')} style={styles.TextoModificar}/>
          
          <LinkText url="https://twitter.com/FarmaciaAhinoa">
          Twitter
          </LinkText>
          <LinkText url="https://www.instagram.com/farmaciaahinoa/?hl=es">
          Instagram
          </LinkText>
          <LinkText url="https://m.facebook.com/profile.php?id=100058137617329&locale=is_IS">
          Facebook
          </LinkText>
        </View>
       
      </View>
      <View style={styles.contenedorInfo}>
      <View style={styles.vistaTitulo}>
        <Text style={styles.subtitulos}>Actividad Empresarial</Text>
        <Text style={[styles.textoPeq, {color:"purple"}]}>Comercial</Text>
        </View>
        
      </View>
      <View style={styles.contenedorInfo}>
        
      </View>
      <View style={styles.contenedorInfo}>
        
      </View>
      <View style={styles.contenedorInfo}>
        
      </View>
      <View style={styles.contenedorInfo}>
        
      </View>
      <View style={styles.contenedorInfo}>
        
      </View>
      <View style={styles.contenedorInfo}>
       
        <View style={styles.contenedorVertical}>
        </View>
      </View>
      </ScrollView>
    </LinearGradient>
  );
};



export default EnterpriseView;