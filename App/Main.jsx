import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import InventoryView from "../Inventory/Components/InventoryView";

const Stack = createNativeStackNavigator();

const Styles = StyleSheet.create({
    contenedorPrincipal: {
        flex: 1
    }})


const Main = () => {
    return (
      <View style={Styles.contenedorPrincipal}>
      <Stack.Navigator>
        <Stack.Screen name="VistaInventario" component={InventoryView} options={{ headerShown: false }}></Stack.Screen>
      </Stack.Navigator>
      </View>
    );
  };
  
  export default Main;