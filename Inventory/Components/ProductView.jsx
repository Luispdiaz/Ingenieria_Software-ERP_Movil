import React from "react";
import { View, Text, StyleSheet } from "react-native";

//Borrador

const ProductView = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Producto 1</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000", // Puedes cambiar el color según tus preferencias
  },
});

export default ProductView;