import { StyleSheet, View, TextInput, Image, TouchableOpacity, Alert,Text} from 'react-native';


const UpdateProduct = ({Lista}) =>{
    const urlImagen = "https://media.istockphoto.com/id/1524823226/es/foto/coloridas-frutas-y-verduras-crudas-variadas-comida-vegana-v%C3%ADvido-arreglo-de-arco-iris.jpg?s=2048x2048&w=is&k=20&c=V31zgnfuQciT2WmGZps8w9zTuc7xw0B5MMXgGoKHD3I=";
    return(
        <View>
        <TextInput
        style = {styles.textinput}
        placeholder = {`ID: ${Lista.id}`}
        placeholderTextColor= "#FFFFFF"
        />
        <TextInput
        style = {styles.textinput}
        placeholder = {`Codigo Proveedor: ${Lista.codProveedor}`}
        placeholderTextColor= "#FFFFFF"
        />
        <TextInput
        style = {styles.textinput}
        placeholder = {`Nombre: ${Lista.nombre}`}
        placeholderTextColor= "#FFFFFF"
        />
        <TextInput
        style = {styles.textinputDescription}
        placeholder = {`Descripción: ${Lista.descripcion}`}
        multiline = {true}
        scrollEnabled = {true}
        placeholderTextColor= "#FFFFFF"
        />
        <TextInput
        style = {styles.textinput}
        placeholder = {`Marca: ${Lista.marca}`}
        placeholderTextColor= "#FFFFFF"
        />
        <TextInput
        style = {styles.textinput}
        placeholder = {`Categoria: ${Lista.categoria}`}
        placeholderTextColor= "#FFFFFF"
        />
        <TextInput
        style = {styles.textinput}
        placeholder = {`Cantidad: ${Lista.cantidadExistencia}`}
        placeholderTextColor= "#FFFFFF"
        />
        <TextInput
        style = {styles.textinput}
        placeholder = {`Precio USD: ${Lista.precioDolar}`}
        placeholderTextColor= "#FFFFFF"
        />
        <TextInput
        style = {styles.textinput}
        placeholder = {`Precio Efectivo: ${Lista.precioEfectivo}`}
        placeholderTextColor= "#FFFFFF"
        />
        <TextInput
        style = {styles.textinput}
        placeholder = {`Costo USD: ${Lista.costo_usd}`}
        placeholderTextColor= "#FFFFFF"
        />
        <TextInput
        style = {styles.textinput}
        placeholder = {`Costo Efectivo: ${Lista.costo_efectivo}`}
        placeholderTextColor= "#FFFFFF"
        />
        <TextInput
        style = {styles.textinput}
        placeholder = {`Impuesto: ${Lista.tipoImpuesto}`}
        placeholderTextColor= "#FFFFFF"
        />
        <Text style = {styles.text}>
            Imagen:
        </Text>
        <TouchableOpacity  onPress={()=>Alert.alert("Imagen Agregada")} >
        <Image style={styles.textinputImage} source={{ uri: Lista.imagenURL }} />
        </TouchableOpacity>
        
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
    button: {
        alignItems: 'center',
        padding: 10,
        marginTop: 20,
        borderRadius: 5,
        flex: 1
    },
    EstiloImagen:{
        height: 20,
        borderRadius:5,
        flex: 1
    }
  });

export default UpdateProduct