import React, {useState} from "react";
import { View, Text, StyleSheet, Dimensions, Image, ScrollView, TouchableOpacity, Switch } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import Constants from 'expo-constants';
import theme from "../Themes/Theme";
import { useNavigation } from '@react-navigation/native'

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

function obtenerColor(quantity) {
  if (quantity === 0) {
    return '#FF0000';
  } else if (quantity >= 1 && quantity <= 5) {
    return '#FFFF00';
  } else {
    return '#52D126';
  }
}

function HayDescuento(descuento) {
  if (descuento > 0) {
    return (
      
      <View style={styles.CategoriaImpuesto}>
        {String(descuento)}
        <Text>hello world</Text>
        <Pasador
        estado= {true}/>
        <Text style={styles.CategoriaTexto}>{descuento}%</Text>
      </View> 
    );
  }  else {
    return  (
      <View>
      
      <Text>hello world {descuento}</Text>
      <Pasador
        estado= {false}/>
        </View>
    );
  }
}


const styles = StyleSheet.create({
    contenedorPrincipal: {
      flex: 1,
      justifyContent: 'flex-start'
    },
    contenedorCasilla: {
      margin: 25,
      marginTop: 30,
      justifyContent: 'space-between'
    },
    miniContenedor: {
      margin: 5,
      flexDirection:'row',
      justifyContent:'space-between'
    },
    text: {
        fontSize: theme.text.fontSize,
        fontWeight: theme.text.fontWeight,
        color: theme.colors.textPrimary,
        marginTop: 20
    },
    textList: {
        fontSize: theme.text.fontSize,
        fontWeight: theme.text.fontWeight,
        color: theme.colors.textPrimary,
        
    },
    smallTextList: {
      fontSize: theme.smalltext.fontSize,
      fontWeight: theme.text.fontWeight,
      color: theme.colors.textPrimary,
  },
    textList2: {
        fontSize: theme.text.fontSize,
        fontWeight: theme.text.fontWeight,
        color: theme.colors.textPrimary,
        marginLeft: 5
    },
    EstiloImagen: {
        width: '100%',
        height: windowHeight * 0.6,
        borderBottomLeftRadius: 85,
        borderBottomRightRadius: 85,
        marginTop: Constants.statusBarHeight
      },
      titulo: {
        fontSize: theme.title.fontSize,
        fontWeight: theme.title.fontWeight,
        color: theme.colors.textPrimary,
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
      TextoModificar2: {
        width:  30, 
        height: 30
       
      },
      smallText: {
        fontSize: theme.smalltext.fontSize,
        fontWeight: theme.text.fontWeight,
        color: theme.colors.textPrimary,
        alignSelf:'flex-end',
        marginEnd:Math.sqrt(windowWidth**2 + windowHeight**2) * 0.03,
        marginTop:15
      },
      Categoria: {
        marginHorizontal: '5%',
        backgroundColor: 'rgba(255, 255, 255,0.07)', 
        padding: 10,
        borderRadius: 40,
        marginTop: 20,
        alignSelf: "flex-start",
        margin: 'auto'
      },
      CategoriaImpuesto: {
        backgroundColor: theme.colors.primario, 
        padding: 10,
        borderRadius: 20,
        justifyContent:'center',
        alignItems:'center',
        marginLeft: 10
      },
      CategoriaTexto: {
        color: theme.colors.textPrimary, 
        fontSize: theme.text.fontSize,
        fontWeight: theme.text.fontWeight,
        marginVertical: '3%',
        marginHorizontal: '7%'
      },
      CategoriaTextoBold: {
        color: theme.colors.textPrimary, 
        fontSize: theme.text.fontSize,
        fontWeight: theme.hypertitle.fontWeight, 
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
      BotonModificar: {
        position: 'absolute',
        top: Constants.statusBarHeight,
        right: Constants.statusBarHeight * 0.1,
        padding: 10,
        alignSelf: 'flex-end'
         },

      greenCircle: {
        borderColor: '#52D126',
        borderWidth: 2,
        padding: 5,
        borderRadius: 20,
        justifyContent:'center',
        alignItems:'center',
        marginLeft: 10
        },  

        card: {
          backgroundColor: 'rgba(255, 255, 255,0.04)',
          borderRadius: 8,
          paddingVertical: 15,
          paddingHorizontal: 10,
          margin: 25,
          marginTop: 50
        },
        shadowProp: {
          shadowColor: '#808080',
          shadowOffset: {width: -2, height: 4},
          shadowOpacity: 0.2,
          shadowRadius: 3,
        },
        line: {
          borderColor: 'white', 
          borderWidth: 2,
          marginHorizontal: '5%'
        },
        textCategory: {
          flexDirection:'row', 
          justifyContent: 'space-between',
          marginHorizontal: '5%'
        },
        green: {
          color: '#52D126'
        },
        statsContainer: {
          margin: '3%',
          marginTop: '15%',
          marginBottom: '30%',
          backgroundColor: 'rgba(255, 255, 255,0.06)',
          borderRadius: 30,
          flexDirection: 'row',
          flexWrap: 'wrap',
        },
        littleStatsBox: {
          flexDirection:'row',
          justifyContent:'space-between',
          marginHorizontal:10,
          margin: 8,
          width: 'auto',
          alignItems: 'center'
        }
      
  });

const ProductView = ({ route }) => {
    const {
        id_producto,
        nombre,
        imagen,
        cod_proveedor,
        categoria,
        sub_categorias,
        descripcion,
        color,
        marca,
        modelo,
        cantidad_existencia,
        minima_cantidad,
        maxima_cantidad,
        reordenar_cantidad,
        costo_usd,
        costo_efectivo,
        costo_promedio_efectivo,
        precio_usd,
        precio_efectivo,
        tipo_impuesto,
        descuento_promocion,
        porcentajeDescuentoProm,
        valor_descuento_promocion,
        conversion_usd_efectivo,
      } = route.params.props;

      const ObjetoProps = route.params.props;

      const navigation = useNavigation();

  return (
    <LinearGradient
    colors={[
    theme.colors.primario,
    theme.colors.secundario,
    theme.colors.secundario,
    theme.colors.secundario,
    theme.colors.secundario,
    theme.colors.secundario,
    theme.colors.primario,
    ]}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
    style={styles.contenedorPrincipal}
    >
      <ScrollView>
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
        onPress={() => navigation.navigate("ModificarProducto",{props: ObjetoProps})}
      >
        <Image
        source={require('../Assets/image (2).png')}
        style={styles.TextoModificar2}
      />
      </TouchableOpacity>
      </View>
      
      <View style={styles.contenedorPrincipal}>
      
        <View style={styles.contenedorCasilla}>
          <View style={styles.miniContenedor}>
            <Text style={styles.titulo}>{nombre}</Text>
            <Text style={styles.titulo}>${precio_usd}</Text>
          </View>

          <View style={[styles.miniContenedor, {justifyContent: 'flex-end'}]}>
            <Text style={[styles.textList, {color: obtenerColor(cantidad_existencia)}]}>Disponible {cantidad_existencia}</Text>
          </View>


        </View>

        <View style={styles.contenedorCasilla}>

          <View style={styles.miniContenedor}>
            <Text style={[styles.textList, {color: '#808080'}]}>{descripcion}</Text>
          </View>

          
        </View>

        <View style={styles.miniContenedor}>
          <View style={styles.Categoria}>
            <Text style={styles.CategoriaTextoBold}>Categoria</Text>
          </View>
          <View style={styles.Categoria}>
            <Text style={styles.CategoriaTextoBold}>Subcategoria</Text>
          </View>
        </View>

        <View style={styles.line}/>
        <View style={styles.textCategory}>
          <Text style={styles.CategoriaTexto}>{categoria}</Text>
          <Text style={styles.CategoriaTexto}>{sub_categorias}</Text>
        </View>
        <View style={styles.line}/>


        <View style={[styles.card, styles.shadowProp]}>
          <View>
            <Text style={styles.titulo}>Caracteristicas</Text>
          </View>
          <View style={[styles.miniContenedor, {marginTop: 20}]}>
            <Text style={styles.textList}><Text style={styles.green}>•</Text>Modelo: {modelo}</Text>
            <Text style={styles.textList}><Text style={styles.green}>•</Text>Marca: {marca}</Text>
          </View>
          <View style={styles.miniContenedor}>
            <Text style={styles.textList}><Text style={styles.green}>•</Text>Color:{color}</Text>
            <Text style={styles.textList}><Text style={styles.green}>•</Text>#Prov: {cod_proveedor}</Text>
          </View>
        </View>

        <View style={styles.statsContainer}>
  
        
          <View style={styles.littleStatsBox}>
          <Text style={[styles.textList, {fontWeight: 'bold'}]}>Cantidad Existente:</Text>
          <View style={styles.greenCircle}>
          <Text style={styles.smallTextList}>{cantidad_existencia}</Text>
          </View>
          </View>

          <View style={styles.littleStatsBox}>
          <Text style={styles.smallTextList}>Reorden</Text>
          <View style={styles.greenCircle}>
          <Text style={styles.smallTextList}>{reordenar_cantidad}</Text>
          </View>
          </View>

          <View style={styles.littleStatsBox}>
          <Text style={[styles.textList, {fontWeight: 'bold'}]}>Cantidad: <Text style={styles.smallTextList}>    Minima</Text></Text>
          <View style={styles.greenCircle}>
          <Text style={styles.smallTextList}>{minima_cantidad}</Text>
          </View>
          </View>

          <View style={styles.littleStatsBox}>
          <Text style={styles.smallTextList}>Maxima</Text>
          <View style={styles.greenCircle}>
          <Text style={styles.smallTextList}>{maxima_cantidad}</Text>
          </View>
          </View>
          
          

          <View style={styles.littleStatsBox}>
          <Text style={[styles.textList, {fontWeight: 'bold'}]}>Costo:  <Text style={styles.smallTextList}>USD</Text></Text>
          <View style={styles.greenCircle}>
          <Text style={styles.smallTextList}>{costo_usd}$</Text>
          </View>
          </View>

          <View style={styles.littleStatsBox}>
          <Text style={[styles.textList, {fontWeight: 'bold'}]}>Valor venta:  <Text style={styles.smallTextList}>USD</Text></Text>
          <View style={styles.greenCircle}>
          <Text style={styles.smallTextList}>{precio_usd} $</Text>
          </View>
          </View>
          
        
          <View style={styles.littleStatsBox}>
          <Text style={[styles.textList, {fontWeight: 'bold', }]}>Tipo de Impuesto:       </Text>
          <View style={styles.greenCircle}>
          <Text style={styles.CategoriaTexto}>{tipo_impuesto}</Text>
          </View>
          </View>
        </View>
      </View>
      </ScrollView>
    </LinearGradient>
  );
};



export default ProductView;