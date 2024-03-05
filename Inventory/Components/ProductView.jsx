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
        backgroundColor: '#8a2be2', 
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

      purplecircle: {
        borderColor: '#8a2be2',
        borderWidth: 2,
        padding: 10,
        borderRadius: 20,
        justifyContent:'center',
        alignItems:'center',
        marginLeft: 10
        },  

        card: {
          backgroundColor: '#8a2be2',
          borderRadius: 8,
          paddingVertical: 15,
          paddingHorizontal: 10,
          width: '100%',
          marginVertical: 10,
        },
        shadowProp: {
          shadowColor: '#808080',
          shadowOffset: {width: -2, height: 4},
          shadowOpacity: 0.2,
          shadowRadius: 3,
        },
      
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
      <ScrollView>
      <View style={{marginHorizontal: Math.sqrt(windowWidth**2 + windowHeight**2) * 0.045, marginVertical:2}}>
      <View style={{flexDirection:'row', justifyContent:'space-between'}}>
      <Text style={styles.titulo}>{nombre}</Text>
      <Text style={styles.titulo}>{precio_usd}$</Text>
      </View>

      <View style={{flexDirection:'row', justifyContent:'space-between'}}>
      <Text style={styles.textList}>{descripcion}</Text>
      <Text style={styles.textList}>Disponible {cantidad_existencia}</Text>
      </View>
      <View style={{flexDirection:'row', justifyContent: 'space-between'}}>
       <View style={styles.Categoria}>
       <Text style={styles.CategoriaTexto}>Categoria</Text>
       </View>
       <View style={styles.Categoria}>
       <Text style={styles.CategoriaTexto}>Subcategoria</Text>
       </View>
       </View>

       <View style={{flexDirection:'row', justifyContent: 'space-between',borderBottomColor: 'white', borderTopColor:'white',
       borderBottomWidth: StyleSheet.hairlineWidth, borderTopWidth: StyleSheet.hairlineWidth, marginTop:10}}>
       <Text style={styles.CategoriaTexto}>{categoria}</Text>
       <Text style={styles.CategoriaTexto}>{sub_categorias}</Text>
       </View>

       <View style={[styles.card, styles.shadowProp]}>
       <View>
       <Text style={styles.titulo}>Caracteristicas</Text>
       </View>
       <View style={{flexDirection:'row', justifyContent:'space-between',marginTop:10}}>
        <Text style={styles.textList}>•Modelo: {modelo}</Text>
        <Text style={styles.textList}>•Marca: {marca}</Text>
        </View>
        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
        <Text style={styles.textList}>•Color:{color}</Text>
        <Text style={styles.textList}>•#Prov: {cod_proveedor}</Text>
        </View>
       </View>

       <View style={{marginTop:30}}>
        
        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
        <Text style={styles.textList}>•Cantidad Existente</Text>
        <View style={styles.purplecircle}>
        <Text style={styles.textList}>{cantidad_existencia}</Text>
        </View>
        </View>

        <View style={{flexDirection:'row', justifyContent:'space-between',marginTop:15}}>
        <Text style={styles.textList}>•Reorden</Text>
        <View style={styles.purplecircle}>
        <Text style={styles.textList}>{reordenar_cantidad}</Text>
        </View>
        </View>

        <View style={{flexDirection:'row', justifyContent:'space-between',marginTop:15}}>
        <Text style={styles.textList}>•Cantidad (maxima)</Text>
        <View style={styles.purplecircle}>
        <Text style={styles.textList}>{maxima_cantidad}</Text>
        </View>
        </View>
        
        <View style={{flexDirection:'row', justifyContent:'space-between',marginTop:15}}>
        <Text style={styles.textList}>•Cantidad (minima)</Text>
        <View style={styles.purplecircle}>
        <Text style={styles.textList}>{minima_cantidad}</Text>
        </View>
        </View>

        <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:15}}>
        <Text style={styles.textList}>•Costo promedio:</Text>
        <View style={styles.purplecircle}>
        <Text style={styles.textList}>{costo_promedio_efectivo}$</Text>
        </View>
        </View>

        <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:15}}>
        <Text style={styles.textList}>•Valor venta:</Text>
        <View style={styles.purplecircle}>
        <Text style={styles.textList}>{precio_usd} $</Text>
        </View>
        </View>
        

       </View>
       <View style={{flexDirection:'row', alignItems:'center', marginTop:25}}>
       <Text style={styles.textList}>•Tipo de Impuesto  </Text>
       <View style={styles.CategoriaImpuesto}>
       <Text style={styles.CategoriaTexto}>{tipo_impuesto} 🏷️16%</Text>
       </View>
       </View>
       <View style={{flexDirection:'row', alignItems:'center', marginTop:25}}>
       <Text style={styles.textList}>•Descuento</Text>
       <View style={styles.CategoriaImpuesto}>
       <Text style={styles.CategoriaTexto}>{String(descuento_promocion)}</Text>
       </View>
       <View style={styles.CategoriaImpuesto}>
       <Text style={styles.CategoriaTexto}>{valor_descuento_promocion}%</Text>
       </View>
       </View>
       <View style={{flexDirection:'row', alignItems:'center', marginTop:25}}>
       <Text style={styles.textList}>•Conversion  </Text>
       <View style={styles.CategoriaImpuesto}>
       <Text style={styles.CategoriaTexto}>{String(conversion_usd_efectivo)}</Text>
       </View>
       </View>
      </View>
      </ScrollView>
    </LinearGradient>
  );
};



export default ProductView;