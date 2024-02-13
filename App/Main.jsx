import React from "react";
import { View, Text, StyleSheet} from "react-native";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import InventoryView from "../Inventory/Components/InventoryView";
import ProductView from "../Inventory/Components/ProductView";
import InitialPageView from "../Inventory/Components/InitialPageView";

const Stack = createNativeStackNavigator();

const Styles = StyleSheet.create({
    contenedorPrincipal: {
        flex: 1
    }})


const Main = () => {
    return (
      <View style={Styles.contenedorPrincipal}>
      <Stack.Navigator>
      <Stack.Screen name="PaginaInicial" component={InitialPageView} options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name="VistaInventario" component={InventoryView} options={{ headerShown: false }}></Stack.Screen>
        <Stack.Screen name="VistaProducto" component={ProductView} options={{ headerShown: false }}></Stack.Screen>
      </Stack.Navigator>
      </View>
    );
  };
  
  export default Main;