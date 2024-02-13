import React from "react";
import { View, Text, StyleSheet, Dimensions, Image, ScrollView } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import Constants from 'expo-constants';
import theme from "../Themes/Theme";

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
      smallText: {
        fontSize: theme.smalltext.fontSize,
        fontWeight: theme.text.fontWeight,
        color: theme.colors.textPrimary,
        alignSelf:'flex-end',
        marginEnd:Math.sqrt(windowWidth**2 + windowHeight**2) * 0.03,
        marginTop:15
      },
      Categoria: {
        backgroundColor: theme.colors.cuartario, // Utiliza el color terciario del tema
        padding: 10,
        borderRadius: 5,
        marginTop: 30,
        alignSelf: "flex-start",
        marginRight: 10
      },
      CategoriaTexto: {
        color: theme.colors.textPrimary, // Utiliza el color de texto principal del tema
        fontSize: theme.text.fontSize, // Utiliza el tamaño de fuente del tema
        fontWeight: theme.text.fontWeight, // Utiliza el peso de fuente del tema
      },
      CategoriaImpuesto: {
        backgroundColor: theme.colors.primario, // Utiliza el color terciario del tema
        padding: 10,
        borderRadius: 20,
        justifyContent:'center',
        alignItems:'center',
        marginLeft: 10
      },
      CategoriaTexto: {
        color: theme.colors.textPrimary, // Utiliza el color de texto principal del tema
        fontSize: theme.text.fontSize, // Utiliza el tamaño de fuente del tema
        fontWeight: theme.text.fontWeight, // Utiliza el peso de fuente del tema
      },
      contenedorPrincipal: {
        flex: 1,
    }
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

  return (
    <LinearGradient
    colors={[
    theme.colors.primario,
    theme.colors.primario,
    theme.colors.primario,
    theme.colors.terciario,
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
       <Text style={styles.textList}>➤  Costo (Dolares)          {costo_usd} $</Text>
       <Text style={styles.textList}>➤  Costo (Efectivo)         {costo_efectivo}</Text>
       <Text style={styles.textList}>➤  Precio (Dolares)         {precioDolar} $</Text>
       <Text style={styles.textList}>➤  Precio (Efectivo)         {precioEfectivo} </Text>
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