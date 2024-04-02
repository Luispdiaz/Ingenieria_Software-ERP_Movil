import React, { useEffect } from "react";
import { View, FlatList, StyleSheet, Image, TouchableOpacity } from "react-native";
import Constants from 'expo-constants';
import { useNavigation } from "@react-navigation/native";
import { useContact } from "../../Context/ContactContext";
import { useState, useRef } from "react";
import Employee from "./Employee";

const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        backgroundColor: '#080915',
    },
    backButton: {
        position: 'absolute',
        marginTop:Constants.statusBarHeight,
        left: Constants.statusBarHeight * 0.01,
        padding: 10,
        zIndex: 1,
        alignSelf:'flex-start',
        justifyContent:'flex-start'
      },
      TextoModificar: {
        width: 24, 
        height: 20, 
        marginRight: 10, 
      },
    
   
});

const EnterpriseEmployees = () => {
    const { Contactos, getContacts, buscarContactos, buscarContactosporTipo } = useContact();
    const [BusquedaC, setBusquedaC] = useState('');
    const inputRef = useRef(null);
    const navigation = useNavigation();

    const handleLimpiarBusqueda = () => {
        setBusquedaC('');
        if (inputRef.current) {
            inputRef.current.clear();
        }
        buscarContactos('');
    }

    useEffect(() => {
        getContacts();
    }, []);

    const [selectedType, setSelectedType] = useState("Todos");

    const handleTypePress = (type) => {
        setSelectedType(type);
        if (type === "Todos") {
            getContacts();
        } else {
            buscarContactosporTipo(type);
        }
    }

    // Filtrar los contactos para mostrar solo los que tienen el atributo "empleado" true
    const contactosFiltrados = Contactos.filter(contacto => contacto.empleado === true);

    return (
        <View style={styles.MainContainer}>
            <View style={styles.backButton}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../Assets/image (3).png')} style={styles.TextoModificar}/>
                </TouchableOpacity>
            </View>
            <FlatList
                style={{marginTop: 60, marginHorizontal: 10, flex: 1}}
                data={contactosFiltrados}
                renderItem={({ item }) => (
                    <Employee {...item} />
                )}
                numColumns={1}
            />
        </View>
    );
}

export default EnterpriseEmployees;
