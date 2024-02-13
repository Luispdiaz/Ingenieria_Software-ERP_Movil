import React from "react";
import  Constants  from "expo-constants";
import { StyleSheet,Text, View, ImageBackground, ScrollView, SafeAreaView} from "react-native";
import Header from "./HeaderCreateProduct";
import Product from "./ProductDescription";
import Buttons from "./Buttons";


const image = require("./Imagenes/Fondo.png");
const Main = () =>{
  return(
  <SafeAreaView style = {styles.container}>
    <ScrollView> 
    <ImageBackground source={image} resizeMode="cover"  style={styles.image}>
    <Header/>
    <Product/>
    <Buttons/>
    </ImageBackground>
    </ScrollView>
  </SafeAreaView>
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
})

export default Main

