import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import theme from "../Themes/Theme";
import Constants from 'expo-constants';
import { useNavigation } from '@react-navigation/native';

const Styles = StyleSheet.create({
    contenedorPrincipal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    tituloInventario: {
        fontSize: theme.title.fontSize,
        fontWeight: theme.title.fontWeight,
        marginBottom: theme.title.marginBottom,
        color: theme.colors.textPrimary,
    },
});

const InitialPageView = () =>{
    const navigation = useNavigation();
    const [showSplash, setShowSplash] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowSplash(false);
            navigation.navigate("VistaInventario");
        }, 3000); // Duración de 3 segundos

        return () => clearTimeout(timer);
    }, [navigation]); // Ejecutar solo una vez al montar el componente

    return (
        <LinearGradient
            colors={[
                theme.colors.primario,
                theme.colors.terciario,
                theme.colors.secundario,
                theme.colors.secundario,
                theme.colors.secundario,
                theme.colors.secundario,
                theme.colors.secundario,
                theme.colors.terciario,
                theme.colors.primario,
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={Styles.contenedorPrincipal}
        >
            {showSplash && (
                <Text style={Styles.tituloInventario}>FLAMG</Text>
            )}
        </LinearGradient>
    );
};

export default InitialPageView;
