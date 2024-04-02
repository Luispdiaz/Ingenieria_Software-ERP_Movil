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
import { CompanyProvider } from "../Context/CompanyContext";
import ContactView from "../Contacts/Components/ContactView";
import NewContact from "../Contacts/Components/CreateContactView";
import UpdateContact from "../Contacts/Components/UpdateContact";
import IdentificationView from "../Sales/Components/IdentificationView";
import ConfirmContact from "../Sales/Components/ConfirmContact"
import ShoppingCartView from "../Sales/Components/ShoppingCartView";
import NewClient from "../Sales/Components/NewClient";
import SelectedProductsView from "../Sales/Components/SelectedProductsView";
import DeliveryNote from "../Sales/Components/DeliveryNote";
import EnterpriseView from "../Contacts/Components/EnterpriseView";
import { DatabaseContextProvider } from "../Context/DatabaseContext";
import { UserContextProvider } from "../Context/UserContext";
import Log_in from "../SessionInit/Components/Log_in";
import EnterpriseEmployees from "../Contacts/Components/EnterpriseEmployees";
import Employee from "../Contacts/Components/Employee";
import OptionsView from "../Sales/Components/OptionsView";
import ReportView from "../Contacts/Components/ReportView";
import Toast from 'react-native-toast-message';
import MovementsView from "../Movements/Components/MovementsView";
import BarcodeScan from "../Sales/Components/BarCode";

const Stack = createNativeStackNavigator();

const Styles = StyleSheet.create({
    contenedorPrincipal: {
        flex: 1
    }})


const Main = () => {
    return (
      <View style={Styles.contenedorPrincipal}>
      <DatabaseContextProvider>
      
      <UserContextProvider>
      <VentaContextProvider>
      <ContactContextProvider>
      <ProductContextProvider>
      <CompanyProvider>
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
      <Stack.Screen name="VistaEmpresa" component={EnterpriseView} options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name="Log_in" component={Log_in} options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name="VistaOpciones" component={OptionsView} options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name="VistaMovimientos" component={MovementsView} options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name="BarCodeScanner" component={BarcodeScan} options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name="VistaReporte" component={ReportView} options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name="VistaEmpresaEmpleados" component={EnterpriseEmployees} options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name="Empleado" component={Employee} options={{ headerShown: false }}></Stack.Screen>
      </Stack.Navigator>
      </CompanyProvider>
      </ProductContextProvider>
      </ContactContextProvider>
      </VentaContextProvider>
      </UserContextProvider>
      <Toast />
      
      </DatabaseContextProvider>
      </View>
    );
  };
  
  export default Main;