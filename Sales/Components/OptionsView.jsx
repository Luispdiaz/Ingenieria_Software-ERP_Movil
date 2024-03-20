import React from "react";
import { View, Text, StyleSheet, Dimensions, Image, ScrollView, TouchableOpacity, TextInput } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from "@react-navigation/native";
import Constants from 'expo-constants';
import theme from "../../Inventory/Themes/Theme";
import { useState } from "react";
import { useContact } from "../../Context/ContactContext";

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    contenedorPrincipal: {
        flex: 1,
        justifyContent: "flex-start",
    },
    textinput: {
        flex: 1,
        padding: 10,
        borderWidth: 1,
        borderColor: 'white',
        color: "#FFFFFF",
        textAlign: "left",
        paddingStart: 30,
        borderRadius: 25,
        marginHorizontal: 20
    },
    textoSolicitud: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFFFF',
        textAlign: 'center',
        marginBottom: 20,
    },
    contenedorTitulo: {
        marginTop: Constants.statusBarHeight + 10,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    backButton: {
        position: 'absolute',
        left: Constants.statusBarHeight * 0.01,
        padding: 10,
        zIndex: 1,
        alignSelf: 'flex-start',
        justifyContent: 'flex-start'
    },
    TextoModificar: {
        width: 24,
        height: 20,
        marginRight: 10,
    },
    tituloInventario: {
        fontSize: theme.title.fontSize,
        fontWeight: theme.title.fontWeight,
        color: theme.colors.textPrimary
    },
    ContenedorSinTitulo: {
        flex: 1,
        justifyContent: 'center',
        marginBottom: 50,
        marginHorizontal: 5
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginTop: 20,
    },
    buttonStyles: {
        flex: 1,
        margin: 5,
        borderWidth: 2,
        borderColor: '#5909fe', // Cambiado a color principal
        borderRadius: 25,
        height: windowHeight * 0.25, // Ajustado para una mejor proporción
        shadowColor: 'rgba(0, 0, 0, 0.7)',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 6,
        backgroundColor: '#5909fe' // Cambiado a color principal
    },
    imageContainerStyles: {
        flex: 1, // Cambiado para ocupar todo el espacio disponible
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageStyles1: {
        aspectRatio: 1, // Mantener la relación de aspecto original
        resizeMode: 'contain', // Ajustar la imagen al contenedor
        height: '75%' // Ajustado para una mejor proporción
    },
    imageStyles2: {
        aspectRatio: 1, // Mantener la relación de aspecto original
        resizeMode: 'contain', // Ajustar la imagen al contenedor
        height: '80%' // Ajustado para una mejor proporción
    },
    textContainerStyles: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    textStyles: {
        color: "#FFFFFF",
        fontSize: 20,
        fontWeight: 'normal',
        margin: 10
    },
    buttonPressed: {
        backgroundColor: 'rgba(89, 9, 254, 0.5)', // Hace que el contenedor se vuelva opaco
        borderColor: 'white' // Hace que el borde se vuelva blanco
    }
});

const OptionsView = () => {
    const navigation = useNavigation();
    const [isPressedCompra, setIsPressedCompra] = useState(false);
    const [isPressedVenta, setIsPressedVenta] = useState(false);

    const handlePressCompra = () => {
        setIsPressedCompra(true);
        setTimeout(() => {
            setIsPressedCompra(false);
        }, 200);
    };

    const handlePressVenta = () => {
        setIsPressedVenta(true);
        setTimeout(() => {
            setIsPressedVenta(false);
        }, 200);
    };

    return (
        <LinearGradient
            colors={[
                "#7227a6",
                "#431b6a",
                "#000000"
            ]}
            style={styles.contenedorPrincipal}
        >
            <View style={styles.contenedorTitulo}>
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
                <Text style={styles.tituloInventario}>Punto de Venta</Text>
            </View>

            <View style={styles.ContenedorSinTitulo}>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => {
                            navigation.navigate("VistaIdentificacion", { tipoRegistro: "Compra" });
                            handlePressCompra();
                        }}
                        style={[styles.buttonStyles, isPressedCompra && styles.buttonPressed]}
                    >
                        <View style={styles.imageContainerStyles}>
                            <Image style={styles.imageStyles1} source={require("../Assets/image (17).png")} />
                        </View>
                        <View style={styles.textContainerStyles}>
                            <Text style={styles.textStyles}>Registrar Compra</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => {
                            navigation.navigate("VistaIdentificacion",{ tipoRegistro: "Venta" });
                            handlePressVenta();
                        }}
                        style={[styles.buttonStyles, isPressedVenta && styles.buttonPressed]}
                    >
                        <View style={styles.imageContainerStyles}>
                            <Image style={styles.imageStyles2} source={require("../Assets/image (19).png")} />
                        </View>
                        <View style={styles.textContainerStyles}>
                            <Text style={styles.textStyles}>Registrar Venta</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </LinearGradient>
    );
};

export default OptionsView;