import { StyleSheet, View, TextInput, Image, TouchableOpacity, Alert,Text} from 'react-native';
import { useProducts } from '../../Context/ProductContext';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';



const UpdateProduct = ({Lista}) =>{
    const { UpdateProduct } = useProducts() 
    const [CodProveedor, setCodProveedor] = useState('');
    const [Nombre, setNombre] = useState('');
    const [Descripcion, setDescripcion] = useState('');
    const [Marca, setMarca] = useState('');
    const [Categoria, setCategoria] = useState('');
    const [CantidadInicial, setCantidadInicial] = useState('');
    const [PrecioD, setPrecioD] = useState('');
    const [PrecioE, setPrecioE] = useState('');
    const [CostoD, setCostoD] = useState('');
    const [CostoE, setCostoE] = useState('');
    const [TipoImpuesto, setTipoImpuesto] = useState('');
    const [Imagen, setImagen] = useState('');
    const navigation = useNavigation()

    const handleSubmit = () => {
        if (!isValidNumber(CantidadInicial) || !isValidNumber(PrecioD) || !isValidNumber(PrecioE) || !isValidNumber(CostoD) || !isValidNumber(CostoE)) {
            Alert.alert('Error', 'Por favor, ingresa valores válidos');
            navigation.navigate("VistaInventario");
          }
          else {
        UpdateProduct(Lista.id_producto, 
            {nombre: Nombre,
                Imagen: Imagen,
                sub_categorias: null,
                cod_proveedor: CodProveedor,
                descripcion: Descripcion,
                color: null,
                categoria: Categoria,
                marca: Marca,
                modelo: null,
                cantidad_existencia: CantidadInicial,
                minima_cantidad:null,
                maxima_cantidad:null,
                reordenar_cantidad:null,
                costo_promedio_usd:null,
                costo_promedio_efectivo:null,
                costo_usd: CostoD,
                costo_efectivo:CostoE,
                precio_usd:PrecioD,
                precio_efectivo:PrecioE,
                tipo_impuesto:TipoImpuesto,
                descuento_promocion:null,
                conversion_usd_efectivo:null,
                valor_descuento_promocion:null})
                Alert.alert('El producto se modificó de manera exitosa');
                navigation.navigate("VistaInventario")
    }
    
    }
    const isValidNumber = (value) => {
        const numberValue = parseFloat(value);
        return !isNaN(numberValue) && numberValue >= 0;
      };

    return(
        <View>

           <TextInput
            style={styles.textinput}
            placeholder='URL de la Imagen'
            placeholderTextColor='#FFFFFF'
            onChangeText={(texto) => setImagen(texto)}
            />

        <TextInput
      style={styles.textinput}
      placeholder={`Nombre: ${Lista.nombre}`}
      placeholderTextColor="#FFFFFF"
      onChangeText={(texto) => setNombre(texto)}
    />
    <TextInput
      style={styles.textinput}
      placeholder={`Codigo Proveedor: ${Lista.cod_proveedor}`}
      placeholderTextColor="#FFFFFF"
      onChangeText={(texto) => setCodProveedor(texto)}
    />
    <TextInput
      style={styles.textinputDescription}
      placeholder={`Descripción: ${Lista.descripcion}`}
      multiline={true}
      scrollEnabled={true}
      placeholderTextColor="#FFFFFF"
      onChangeText={(texto) => setDescripcion(texto)}
    />
    <TextInput
      style={styles.textinput}
      placeholder={`Marca: ${Lista.marca}`}
      placeholderTextColor="#FFFFFF"
      onChangeText={(texto) => setMarca(texto)}
    />
    <TextInput
      style={styles.textinput}
      placeholder={`Categoria: ${Lista.categoria}`}
      placeholderTextColor="#FFFFFF"
      onChangeText={(texto) => setCategoria(texto)}
    />
    <TextInput
      style={styles.textinput}
      placeholder={`Cantidad: ${Lista.cantidad_existencia}`}
      placeholderTextColor="#FFFFFF"
      onChangeText={(texto) => setCantidadInicial(texto)}

    />
    <TextInput
      style={styles.textinput}
      placeholder={`Precio USD: ${Lista.precio_usd}`}
      placeholderTextColor="#FFFFFF"
      onChangeText={(texto) => setPrecioD(texto)}
    />
    <TextInput
      style={styles.textinput}
      placeholder={`Precio Efectivo: ${Lista.precio_efectivo}`}
      placeholderTextColor="#FFFFFF"
      onChangeText={(texto) => setPrecioE(texto)}
    />
    <TextInput
      style={styles.textinput}
      placeholder={`Costo USD: ${Lista.costo_usd}`}
      placeholderTextColor="#FFFFFF"
      onChangeText={(texto) => setCostoD(texto)}
    />
    <TextInput
      style={styles.textinput}
      placeholder={`Costo Efectivo: ${Lista.costo_efectivo}`}
      placeholderTextColor="#FFFFFF"
      onChangeText={(texto) => setCostoE(texto)}
    />
    <TextInput
      style={styles.textinput}
      placeholder={`Impuesto: ${Lista.tipo_impuesto}`}
      placeholderTextColor="#FFFFFF"
      onChangeText={(texto) => setTipoImpuesto(texto)}
    />

        <View style={styles.countContainer}>
            <TouchableOpacity style={styles.button} onPress={handleSubmit} >
            <Text style={styles.buttonText}>Modificar</Text>
            </TouchableOpacity>
        </View>
        
        </View>
    )
}

const styles = StyleSheet.create({
    textinput:{
        padding: 10,
        borderWidth: 1,
        borderColor: "#4D09FF",
        color: "#FFFFFF",
        textAlign: "left",
        paddingStart: 30, /*Aqui cambio la posicion del texto dentro del input*/
        width: '80%',
        height: 50,
        marginTop: 20,
        marginLeft: 25,
        borderRadius: 25,
    },
    textinputDescription:{
        padding: 10,
        borderWidth: 1,
        borderColor: "#4D09FF",
        color: "#FFFFFF",
        textAlign: "left",
        paddingStart: 30, /*Aqui cambio la posicion del texto dentro del input*/
        width: '80%',
        marginTop: 20,
        marginLeft: 25,
        borderRadius: 25,
    },
    countContainer: {
        flexDirection: 'row',
        justifyContent: "space-around",
        marginBottom: 50

      },
      button: {
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
      padding: 10,
      marginTop: 20,
      borderRadius: 5,
      },
      buttonText:{
          color:"#000000",
          fontSize: 30,
          fontWeight: "bold"
      },
    textinputImage:{
        padding: 10,
        borderWidth: 1,
        borderColor: "#4D09FF",
        color: "#FFFFFF",
        textAlign: "left",
        alignSelf: "center",
        paddingStart: 30, /*Aqui cambio la posicion del texto dentro del input*/
        width: 225,
        height: 165,
        marginTop: 20,
        borderRadius: 25,
    },
    text:{
        color: "white",
        marginTop: 20,
        marginLeft:50
    },
    EstiloImagen:{
        height: 20,
        borderRadius:5,
        flex: 1
    }
  });

export default UpdateProduct