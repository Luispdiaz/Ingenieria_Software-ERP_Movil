import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import theme from "../Themes/Theme";
import { useNavigation } from '@react-navigation/native';

const Styles = StyleSheet.create({
    contenedorPrincipal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    tituloInventario: {
        position: 'absolute',
        fontSize: theme.title.fontSize,
        fontWeight: theme.title.fontWeight,
        color: theme.colors.textPrimary,
        zIndex: 1, 
    },
});

const InitialPageView = () =>{
    const navigation = useNavigation();
    const [showSplash, setShowSplash] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowSplash(false);
            navigation.navigate("MenuPrincipal");
        }, 3000); 

        return () => clearTimeout(timer);
    }, [navigation]); 

    return (
        <LinearGradient
            colors={[
                theme.colors.primario,
                theme.colors.terciario,
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
            
            <Image source={require('../Assets/image (16).png')} style={{position: 'absolute'}}  />
        </LinearGradient>
    );
};

export default InitialPageView;
