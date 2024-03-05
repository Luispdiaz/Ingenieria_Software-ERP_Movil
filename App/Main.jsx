import React from "react";
import { View, Text, StyleSheet} from "react-native";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import InventoryView from "../Inventory/Components/InventoryView";
import ProductView from "../Inventory/Components/ProductView";
import InitialPageView from "../Inventory/Components/InitialPageView";
import MainUpdateProduct from "../NewProducts/Components/MainUpdateProduct";
import NewProduct from "../NewProducts/Components/ProductDescription";
import MainMenu from "../Inventory/Components/MainMenu";
import { ProductContextProvider } from "../Context/ProductContext";
import ContactsView from "../Contacts/Components/ContactsView";
import { ContactContextProvider } from "../Context/ContactContext";
import { VentaContextProvider } from "../Context/VentaContext";
import ContactView from "../Contacts/Components/ContactView";
import NewContact from "../Contacts/Components/CreateContactView";
import UpdateContact from "../Contacts/Components/UpdateContact";
import IdentificationView from "../Sales/Components/IdentificationView";
import ConfirmContact from "../Sales/Components/ConfirmContact"
import ShoppingCartView from "../Sales/Components/ShoppingCartView";
import NewClient from "../Sales/Components/NewClient";
import SelectedProductsView from "../Sales/Components/SelectedProductsView";
import DeliveryNote from "../Sales/Components/DeliveryNote";


const Stack = createNativeStackNavigator();

const Styles = StyleSheet.create({
    contenedorPrincipal: {
        flex: 1
    }})


const Main = () => {
    return (
      <View style={Styles.contenedorPrincipal}>
      <VentaContextProvider>
      <ContactContextProvider>
      <ProductContextProvider>
      <Stack.Navigator>
      <Stack.Screen name="PaginaInicial" component={InitialPageView} options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name="MenuPrincipal" component={MainMenu} options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name="VistaInventario" component={InventoryView} options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name="VistaProducto" component={ProductView} options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name="CrearProducto" component={NewProduct} options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name="ModificarProducto" component={MainUpdateProduct} options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name="VistaContactos" component={ContactsView} options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name="VistaContacto" component={ContactView} options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name="CrearContacto" component={NewContact} options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name="ModificarContacto" component={UpdateContact} options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name="VistaIdentificacion" component={IdentificationView} options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name="VistaConfirmarInfoPV" component={ConfirmContact} options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name="VistaRegistroPV" component={NewClient} options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name="VistaCarritoCompras" component={ShoppingCartView} options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name="VistaProductosVenta" component={SelectedProductsView} options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name="VistaNotadeEntrega" component={DeliveryNote} options={{ headerShown: false }}></Stack.Screen>
      </Stack.Navigator>
      </ProductContextProvider>
      </ContactContextProvider>
      </VentaContextProvider>
      </View>
    );
  };
  
  export default Main;