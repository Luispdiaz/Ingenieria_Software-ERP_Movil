import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Constants from 'expo-constants';
import theme from "../Themes/Theme";
import { useNavigation } from '@react-navigation/native';


const Styles = StyleSheet.create({
    ContenedorGlobal: {
        flex: 1
    },
    contenedorInicio: {
        marginTop: 60,
        margin: Constants.statusBarHeight + 15,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection:'row'
    },
    contenedorSaludo: {
        margin: Constants.statusBarHeight,
        flexDirection: 'column'
    },
    profileImg: {
        width: 50,
        height: 50,
        borderRadius: 25,
        padding: 20,
        backgroundColor: 'white'
    },
    settingsImg: {
        width: 50,
        height: 50,
        borderRadius: 25,
        padding: 20,
    },
    tituloInicio: {
        fontSize: theme.title.fontSize,
        fontWeight: theme.subtitle.fontWeight,
        color: theme.colors.textPrimary,
    },
    Maintitle: {
        fontSize: theme.hypertitle.fontSize,
        fontWeight: theme.hypertitle.fontWeight,
        color: theme.colors.textPrimary,
    },
    normalText: {
        fontSize: theme.text.fontSize,
        fontWeight: theme.text.fontWeight,
        color: theme.colors.textPrimary,
    },
    circle: {
        borderRadius: 60,
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        position: 'absolute',
        zIndex: -1,
        top: '60%',
        right: '-10%'
    },
    cuadro1: {
        margin: 5,
        backgroundColor: '#6B05B5',
        width: '45%',
        height: 195,
        borderRadius: 30,
        flexDirection: 'row',
        justifyContent: 'center',
        overflow: 'hidden',
        alignItems: "center",
    }
});

const getGreeting = () => {
    const date = new Date();
    const hour = date.getHours();
  
    let greeting;
  
    if (hour >= 5 && hour < 12) {
      greeting = 'Buenos días';
    } else if (hour >= 12 && hour < 18) {
      greeting = 'Buenas tardes';
    } else {
      greeting = 'Buenas noches';
    }
  
    return greeting;
  };

  function generarDiametro() {
    return Math.floor(Math.random() * (125 - 75 + 1)) + 75;
  }

const MainMenu = () => {
    const greeting = getGreeting();
    const navigation = useNavigation();
    const diametro = generarDiametro();
    
    const dynamicStyles = StyleSheet.create({
        circle: {
          ...Styles.circle, // Mantén los estilos originales
          width: diametro,
          height: diametro,
        },
      });

    return (
        

        <LinearGradient colors={['#080A15','#080A15', '#6100AE' ,'#D0ADF9']}
        style={Styles.ContenedorGlobal}
        locations={[0,0.5, 0.8, 1]}
        start={[0, 0]}
        end={[1,   1]}>
            <View style={Styles.contenedorInicio}>
                <Image source={require('../Assets/Remove-bg.ai_1709067403836.png')} style={Styles.settingsImg}/>
                <Text style={Styles.tituloInicio}>Inicio</Text>
                <Image source={require('../Assets/computer-icons-user-profile-avatar-profile-145f8a4162de6d6749f402e758214dfd.png')} style={Styles.profileImg}/>
            </View>
            <View style={Styles.contenedorSaludo}>
                <Text style={Styles.Maintitle}>¡Hola, @Username!</Text>
                <Text style={Styles.tituloInicio}>{greeting}</Text>
            </View>
            <View>
                <TouchableOpacity style={Styles.cuadro1}>
                    <Image source={require('../Assets/Remove-bg.ai_1709083657086.png')} style={Styles.settingsImg}/>
                    <Text style={Styles.normalText}>Movimientos</Text>
                    <View style={dynamicStyles.circle}/>
                </TouchableOpacity>
            </View>
            
        </LinearGradient>
    )
}

export default MainMenu;