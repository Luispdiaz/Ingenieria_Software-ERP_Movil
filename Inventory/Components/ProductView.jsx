import React from "react";
import { View, Text, StyleSheet, Dimensions, Image, ScrollView, TouchableOpacity } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import Constants from 'expo-constants';
import theme from "../Themes/Theme";
import { useNavigation } from '@react-navigation/native'

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').height;


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.secundario
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
    textList2: {
        fontSize: theme.text.fontSize,
        fontWeight: theme.text.fontWeight,
        color: theme.colors.textPrimary,
        marginLeft: 5
    },
    EstiloImagen: {
        width: '100%',
        height: windowHeight * 0.4, // Puedes ajustar este valor según tus necesidades
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
        backgroundColor: theme.colors.cuartario, 
        padding: 10,
        borderRadius: 5,
        marginTop: 30,
        alignSelf: "flex-start",
        marginRight: 10
      },
      CategoriaTexto: {
        color: theme.colors.textPrimary, 
        fontSize: theme.text.fontSize, 
        fontWeight: theme.text.fontWeight, 
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
      },
      contenedorPrincipal: {
        flex: 1,
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
    
      
  });

const ProductView = ({ route }) => {
    const {
        id,
        nombre,
        imagenURL,
        codProveedor,
        categoria,
        subcategoria,
        descripcion,
        color,
        marca,
        modelo,
        cantidadExistencia,
        minimaCantidad,
        maximaCantidad,
        reordenarCantidad,
        costo_usd,
        costo_efectivo,
        costoPromedioEfectivo,
        precioDolar,
        precioEfectivo,
        tipoImpuesto,
        descuentoProm,
        porcentajeDescuentoProm,
        conversionUsdEfectivo,
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
      <Image style={styles.EstiloImagen} source={{ uri: imagenURL }} />
    

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
      <ScrollView>
      <Text style={styles.smallText}>Disponible</Text>
      <View style={{marginHorizontal: Math.sqrt(windowWidth**2 + windowHeight**2) * 0.045, marginVertical:2}}>
      <View style={{flexDirection:'row', justifyContent:'space-between'}}>
      <Text style={styles.titulo}>{nombre}</Text>
      <Text style={styles.titulo}>{cantidadExistencia}</Text>
      </View>
       <Text style={styles.text}>{descripcion}</Text>
       <View style={{flexDirection:'row'}}>
       <View style={styles.Categoria}>
       <Text style={styles.CategoriaTexto}>🔍 {categoria} </Text>
       </View>
       <View style={styles.Categoria}>
       <Text style={styles.CategoriaTexto}>⭐ {marca} </Text>
       </View>
       </View>
       <View style={{marginTop:30}}>

        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
        <Text style={styles.textList}>➤  Costo (Dolares)</Text>
        <Text style={styles.textList2}>{costo_usd} $</Text>
        </View>

        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
        <Text style={styles.textList}>➤  Costo (Efectivo)</Text>
        <Text style={styles.textList2}>{costo_efectivo} $</Text>
        </View>

        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
        <Text style={styles.textList}>➤  Precio (Dolares)</Text>
        <Text style={styles.textList2}>{precioDolar} $</Text>
        </View>

        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
        <Text style={styles.textList}>➤  Precio (Efectivo)</Text>
        <Text style={styles.textList2}>{precioEfectivo} $</Text>
        </View>

       </View>
       <View style={{flexDirection:'row', alignItems:'center', marginTop:25}}>
       <Text style={styles.textList}>Tipo de Impuesto  </Text>
       <View style={styles.CategoriaImpuesto}>
       <Text style={styles.CategoriaTexto}>{tipoImpuesto} 🏷️</Text>
       </View>
       </View>
      </View>
      </ScrollView>
    </LinearGradient>
  );
};



export default ProductView;