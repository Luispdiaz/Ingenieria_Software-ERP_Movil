import { StyleSheet, View, TextInput, Image, TouchableOpacity, Alert, Text} from 'react-native';


const NewProduct = () =>{
    return(
        <View>
        <TextInput
        style = {styles.textinput}
        placeholder='ID del Producto'
        placeholderTextColor= "#FFFFFF"
        />
        <TextInput
        style = {styles.textinput}
        placeholder='Codigo del Proveedor'
        placeholderTextColor= "#FFFFFF"
        />
        <TextInput
        style = {styles.textinput}
        placeholder='Nombre del Producto'
        placeholderTextColor= "#FFFFFF"
        />
        <TextInput
        style = {styles.textinput}
        placeholder='Descripción del Producto'
        placeholderTextColor= "#FFFFFF"
        />
        <TextInput
        style = {styles.textinput}
        placeholder='Marca del Producto'
        placeholderTextColor= "#FFFFFF"
        />
        <TextInput
        style = {styles.textinput}
        placeholder='Categoría del Producto'
        placeholderTextColor= "#FFFFFF"
        />
        <TextInput
        style = {styles.textinput}
        placeholder='Cantidad Inicial en el Inventario'
        placeholderTextColor= "#FFFFFF"
        />
        <TextInput
        style = {styles.textinput}
        placeholder='Precio por unidad'
        placeholderTextColor= "#FFFFFF"
        />
        <TextInput
        style = {styles.textinput}
        placeholder ='Costo por unidad'
        placeholderTextColor= "#FFFFFF"
        />
        <TextInput
        style = {styles.textinput}
        placeholder ='Tipo de Impuesto'
        placeholderTextColor= "#FFFFFF"
        />
        <TextInput
        style = {styles.textinput}
        placeholder ='Precio en Doláres'
        placeholderTextColor= "#FFFFFF"
        />
        <TextInput
        style = {styles.textinput}
        placeholder ='Precio efectivo'
        placeholderTextColor= "#FFFFFF"
        />
        <Text style = {styles.text}>
            Imagen:
        </Text>
        <TouchableOpacity style={styles.button} onPress={()=>Alert.alert("Imagen Agregada")} >
            <Image
                source={require("./Imagenes/BotonAgregar.png")}
            />
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
    }
  });

export default NewProduct