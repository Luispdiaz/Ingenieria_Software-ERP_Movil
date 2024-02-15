import React from "react";
import Constants  from "expo-constants";
import { StyleSheet,Text, View, ImageBackground, ScrollView, SafeAreaView} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import theme from "../../Inventory/Themes/Theme";
import Header from "./HeaderCreateProduct";
import NewProduct from "./ProductDescription";


const image = require("./Imagenes/Fondo.png");
const MainNewProduct = () =>{
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
    <Header/>
    <NewProduct/>
    
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

export default MainNewProduct

