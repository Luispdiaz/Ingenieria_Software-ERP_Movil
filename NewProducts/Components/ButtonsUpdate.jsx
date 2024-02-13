import React from 'react';
import {StyleSheet,Button,View,SafeAreaView,Text,Alert,TouchableOpacity} from 'react-native';


const ButtonsUpdate = () => {
  return (
  <View style={styles.countContainer}>
    <TouchableOpacity style={styles.button} onPress={()=>Alert.alert("Producto cancelado")}>
      <Text style={styles.buttonText}>Cancelar</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.button} onPress={()=>Alert.alert("Producto Modificado")} >
      <Text style={styles.buttonText}>Modificar</Text>
    </TouchableOpacity>
  </View>
);
};

const styles = StyleSheet.create({
  countContainer: {
    flexDirection: 'row',
    justifyContent: "space-around",
    marginBottom: 50
  },
  button: {
  alignItems: 'center',
  backgroundColor: '#FFFFFF',
  padding: 10,
  marginTop: 20,
  borderRadius: 5,
  
  },
  buttonText:{
      color:"#000000",
      fontSize: 30,
      fontWeight: "bold"
  }
});

export default ButtonsUpdate

