import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Button, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Camera } from 'expo-camera';
import { useProducts } from '../../Context/ProductContext';
import Constants from 'expo-constants';
import theme from '../../Inventory/Themes/Theme';
import Toast from 'react-native-toast-message';
import { useVenta } from '../../Context/VentaContext';
import { Alert } from 'react-native';



function BarcodeScan({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const {AgregarProductoCodProveedor} = useProducts()
  const {VerificarProductoExistentecod_proveedor} = useVenta()
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    
    if (VerificarProductoExistentecod_proveedor(data)) {
      Toast.show({
        type: 'info',
        text1: 'Producto Existente',
        text2: 'El producto ya se ha agregado anteriormente.',
        position: 'top',
        visibilityTime: 3000, // Tiempo en milisegundos que se mostrará el mensaje
      });
  } else {
      const verificar = AgregarProductoCodProveedor(data)
      if(verificar){
        Toast.show({
          type: 'success',
          text1: 'Producto Agregado',
          text2: 'El producto se ha añadido a la compra correctamente.',
          position: 'top',
          visibilityTime: 3000,
      });
      }else{
        Toast.show({
          type: 'error',
          text1: 'Producto no encontrado',
          text2: 'El producto no se encuentra en la base de datos.',
          position: 'top',
          visibilityTime: 3000,
    });
  }
  }
  };

  const renderCamera = () => {
    return (
      
        <View style={styles.cameraContainer}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={styles.camera}
        />
      </View>
      
    );
  };

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Camera permission not granted</Text>
      </View>
    );
  }

  return (
    <LinearGradient
        colors={[
          "#7227a6",
          "#431b6a",
          "#000000"
        ]}
        style={styles.contenedorPrincipal}
        >
          <View style={styles.contenedorTitulo}>
    <View style={styles.backButton}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
        >
          <Image
          source={require('../Assets/image (3).png')}
          style={styles.TextoModificar}
        />
        </TouchableOpacity>
        </View>
        <Text style={styles.tituloInventario}>Punto de Venta</Text>
    </View>
      <View style={styles.container}>
      {renderCamera()}
      <TouchableOpacity
        style={styles.button}
        onPress={() => setScanned(false)}
        
      >
        <Text style={styles.buttonText}>Escanear</Text>
      </TouchableOpacity>
    </View>
  </LinearGradient>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 40,
  },
  cameraContainer: {
    width: '100%',
    aspectRatio: 1,
    overflow: 'hidden',
    borderRadius: 10,
    marginBottom: 40,
  },
  camera: {
    flex: 1,
  },
  button: {
    backgroundColor: '#4D09FF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  contenedorPrincipal: {
    flex: 1,
    justifyContent:"flex-start"
},
contenedorTitulo: {
  marginTop: Constants.statusBarHeight + 10,
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection:'row'
},
backButton: {
position: 'absolute',
left: Constants.statusBarHeight * 0.01,
padding: 10,
zIndex: 1,
alignSelf:'flex-start',
justifyContent:'flex-start'
},
TextoModificar: {
  width: 24, 
  height: 20, 
  marginRight: 10, 
},
tituloInventario: {
fontSize: theme.title.fontSize,
fontWeight: theme.title.fontWeight,
color: theme.colors.textPrimary
},
});

export default BarcodeScan