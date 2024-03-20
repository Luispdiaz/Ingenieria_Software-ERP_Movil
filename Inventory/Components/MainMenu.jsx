import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView, Image, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Constants from 'expo-constants';
import theme from "../Themes/Theme";
import { useNavigation } from '@react-navigation/native';
import { useProducts } from "../../Context/ProductContext";

//funciones para hacer tarjetas automaticas:
function generarDiametro() {
    return Math.floor(Math.random() * (125 - 75 + 1)) + 75;
}

function generarNumerosAleatorios() {
    const numeroTop = Math.floor(Math.random() * 101); // Genera un número aleatorio entre 0 y 100
    const numeroRight = Math.floor(Math.random() * 101); // Genera otro número aleatorio entre 0 y 100
    const numeroAltura = Math.floor(Math.random() * (340 - 195 + 1)) + 130;
    return [numeroTop, numeroRight, numeroAltura]; // Retorna un arreglo con los dos números generados
}

function generarColorClaro() {
    const r = Math.floor(Math.random() * 156) + 70; // Componente rojo entre 100 y 255
    const g = Math.floor(Math.random() * 156) + 70; // Componente verde entre 100 y 255
    const b = Math.floor(Math.random() * 156) + 70; // Componente azul entre 100 y 255
    return `rgb(${r}, ${g}, ${b})`; // Retorna el color en formato rgb
}

const Tarjeta = ({ imagen, texto, pagina}) => {
    const diametro = generarDiametro();
    const [numeroTop, numeroRight, numeroAltura] = generarNumerosAleatorios();
    const colorClaro = generarColorClaro();
    const navigation = useNavigation();
   

    

    const dynamicStyles = StyleSheet.create({
        circle: {
          ...Styles.circle, // Mantén los estilos originales
          width: diametro,
          height: diametro,
          top: numeroTop,
          right: numeroRight,
        },
        cuadro: {
            ...Styles.cuadro,
            height: numeroAltura,
            backgroundColor: colorClaro
        }
      });

    return (
      <TouchableOpacity style={dynamicStyles.cuadro} onPress={() => navigation.navigate(pagina)}>
          <Image source={imagen} style={Styles.settingsImg} />
          <Text style={Styles.normalText}>{texto}</Text>
          <View style={dynamicStyles.circle}/>
      </TouchableOpacity>
    );
  }

const Styles = StyleSheet.create({
    ContenedorGlobal: {
        flex: 1
    },
    contenedorInicio: {
        marginTop: Constants.statusBarHeight + 15,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection:'row'
    },
    contenedorSaludo: {
        marginLeft: 30,
        marginVertical:10,
        flexDirection: 'column'
    },
    contenedorTarjetas: {
        flexDirection: 'column',
        alignContent: 'flex-start',
        width: '45%',
    },
    contenedorBigTarjetas: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignContent: 'flex-start',
        justifyContent: 'center'
    },
    profileImg: {
        width: 50,
        height: 50,
        borderRadius: 25,
        padding: 20,
        backgroundColor: 'white',
        position: 'absolute',
        right: 2, // Esto hará que se pegue a la izquierda
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
        color: theme.colors.textPrimary
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
    },
    cuadro: {
        margin: 5,
        borderRadius: 30,
        flexDirection: 'row',
        justifyContent: 'center',
        overflow: 'hidden',
        alignItems: "center",
        width: '90%'
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

  /* Para el siguiente Sprint:
  
  <Tarjeta
        imagen={require('..//Assets/ReportsIcon.png')}
        texto='Report'
        pagina='VistaInventario'  
    />
    <Tarjeta
        imagen={require('..//Assets/MovementsIcon.png')}
        texto='Movimientos'
        pagina='VistaInventario'  
    />
    
    */

const MainMenu = () => {
    const greeting = getGreeting();
    const { Productos, getProducts } = useProducts()
    const [verificacionRealizada, setVerificacionRealizada] = useState(false);
    useEffect(() => {
        const cargarProductosYVerificarReorden = async () => {
          await getProducts();
          setVerificacionRealizada(true);
        };
    
        if (!verificacionRealizada) {
          cargarProductosYVerificarReorden();
        } else {
          const productosReorden = [];
          Productos.forEach(producto => {
            if (producto.cantidad_existencia < producto.reordenar_cantidad) {
              productosReorden.push(producto.nombre);
            }
          });
    
          if (productosReorden.length > 0) {
            const mensaje = `Estos productos deben reordenarse: ${productosReorden.join(', ')}`;
            Alert.alert('Reordenar Productos', mensaje);
          }
        }
      }, [verificacionRealizada]);


    return (
        

        <LinearGradient colors={['#080A15','#080A15', '#6100AE' ,'#D0ADF9']}
        style={Styles.ContenedorGlobal}
        locations={[0,0.5, 0.8, 1]}
        start={[0, 0]}
        end={[1,   1]}>
            <ScrollView>
            <View style={Styles.contenedorInicio}>
                <Text>.</Text>
                <Text style={Styles.tituloInicio}>Inicio</Text>
                <Image source={require('../Assets/computer-icons-user-profile-avatar-profile-145f8a4162de6d6749f402e758214dfd.png')} style={Styles.profileImg}/>
            </View>
            
            <View style={Styles.contenedorSaludo}>
                <Text style={Styles.Maintitle}>¡Hola!</Text>
                <Text style={Styles.tituloInicio}>{greeting}</Text>
            </View>
            <View style={Styles.contenedorBigTarjetas}>
                <View style={Styles.contenedorTarjetas}>
                    <Tarjeta
                        imagen={require('..//Assets/InventoryIcon.png')}
                        texto='Inventario'
                        pagina='VistaInventario'
                    />
                    <Tarjeta
                        imagen={require('..//Assets/CompaniesIcon.png')}
                        texto='Empresas'
                        pagina='VistaEmpresa'  
                    />
                </View>
                <View style={Styles.contenedorTarjetas}>
                    <Tarjeta
                        imagen={require('..//Assets/contactIcon.png')}
                        texto='Personas'
                        pagina='VistaContactos'  
                    />
                    <Tarjeta
                        imagen={require('..//Assets/PointOfSaleIcon.png')}
                        texto='Punto de Venta'
                        pagina='VistaOpciones'  
                    />
                    
                </View>
            </View>
           
            </ScrollView>  
        </LinearGradient>
    )
}

export default MainMenu;