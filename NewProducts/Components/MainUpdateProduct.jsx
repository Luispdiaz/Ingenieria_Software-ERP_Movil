import React from "react";
import Constants  from "expo-constants";
import { StyleSheet,Text, View, ImageBackground, ScrollView, SafeAreaView} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import theme from "../../Inventory/Themes/Theme";
import UpdateProduct from "./UpdateProduct";
import UpdateHeader from "./HeaderUpdateProduct";
import ButtonsUpdate from "./ButtonsUpdate";
const image = require("./Imagenes/Fondo.png");
const MainUpdateProduct = ({route}) =>{
    
    const props = route.params.props

    return(
        <LinearGradient
    colors={[
        theme.colors.secundario,
        theme.colors.primario,
    ]}
    style={styles.contenedorPrincipal}
    >
        <SafeAreaView style = {styles.container}>
          <ScrollView> 
          <ImageBackground source={image} resizeMode="cover"  style={styles.image}>
          <UpdateHeader/>
          <UpdateProduct Lista={{...props}}/>
          <ButtonsUpdate/>
          </ImageBackground>
          </ScrollView>
        </SafeAreaView>
        </LinearGradient>
        )
}

const styles = StyleSheet.create({
    container:{
      flex: 1
    },
    image: {
      marginTop: Constants.statusBarHeight,
      flex: 1,
    },
    contenedorPrincipal: {
        flex: 1,
        justifyContent:"flex-start"
      }
  })

export default MainUpdateProduct