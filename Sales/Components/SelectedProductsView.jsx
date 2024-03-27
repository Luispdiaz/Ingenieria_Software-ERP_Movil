import React, { useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, Image, ScrollView, TouchableOpacity, TextInput, FlatList, Modal } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from "@react-navigation/native";
import Constants from 'expo-constants';
import theme from "../../Inventory/Themes/Theme";
import { useState } from "react";
import { useContact } from "../../Context/ContactContext";
import { useVenta } from "../../Context/VentaContext";
import Product2 from "./Product2";
import PercentageDiscountStrategy from "../Strategies/PercentageDiscountStrategy";
import NoDiscountStrategy from "../Strategies/NoDiscountStrategy";
import IVATaxStrategy from "../Strategies/IVATaxStrategy";
import FreeTaxStrategy from "../Strategies/FreeTaxStrategy";

const styles = StyleSheet.create({
    contenedorPrincipal: {
        flex: 1,
        justifyContent:"flex-start"
    },
    textinput: {
        flex:1,
        padding: 10,
        borderWidth: 1,
        borderColor: 'white',
        color: "#FFFFFF",
        textAlign: "left",
        paddingStart: 30, 
        borderRadius: 25,
        marginHorizontal:20
      },
      textoSolicitud: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFFFF',
        textAlign: 'center',
        marginBottom: 20, 
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
    ContenedorSinTitulo:{
      flex: 1,
      justifyContent: 'center',
      marginBottom:50
    }, 
    resumenContainer: {
      backgroundColor: '#1b1f4c',
      padding: 20,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
    },
    resumenTitulo: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#ECF0F1',
      marginBottom: 10,
    },
    totalContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10,
    },
    totalTexto: {
      fontSize: 16,
      color: '#ECF0F1',
    },
    totalNumero: {
      fontSize: 16,
      color: '#b87adf',
    },
    pagarBoton: {
      backgroundColor: '#4D09FF', 
      padding: 10,
      borderRadius: 10,
      alignItems: 'center',
    },
    pagarTexto: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#ECF0F1',
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      backgroundColor: '#fff',
      width: '80%', // Puedes ajustar el ancho según tus necesidades
      padding: 20,
      borderRadius: 10,
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 15,
      color: '#000',
    },
    paymentMethodContainer: {
      padding: 10,
      borderRadius: 5,
      marginVertical: 5,
      backgroundColor:  '#DDDDDD'
    },
    selectedPaymentMethod: {
      borderColor: '#4D09FF',
      backgroundColor:  '#4D09FF'
    },
    paymentMethodText: {
      color: '#000',
    },
    pagoRecibidoButton: {
      marginTop: 20,
      backgroundColor: '#4D09FF',
      padding: 10,
      borderRadius: 5,
    },
    pagoRecibidoButtonText: {
      color: '#fff',
      textAlign: 'center',
      fontWeight: 'bold',
    },
    cancelButton: {
      marginTop: 10,
      backgroundColor: '#ff3333', // Puedes ajustar el color según tu preferencia
      padding: 10,
      borderRadius: 5,
    },
    cancelButtonText: {
      color: '#fff',
      textAlign: 'center',
      fontWeight: 'bold',
    },
    botonesContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 20,
    },
    casilla: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#b168ea',
      marginHorizontal: 5,
      borderRadius: 10,
      paddingVertical: 10,
    },
    casillaSelected: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#4D09FF',
      marginHorizontal: 5,
      borderRadius: 10,
      paddingVertical: 10,
    },
    casillaTexto: {
      fontSize: 16,
      color: 'black',
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 15,
      color: '#000',
    },
    optionContainer: {
      marginBottom: 20,
    },
    optionButton: {
      backgroundColor: '#DDDDDD',
      padding: 10,
      marginBottom: 5,
      borderRadius: 5,
      alignItems: 'center',
    },
    selectedOptionButton: {
      backgroundColor: '#4D09FF',

    },
    selectedOptionButtonText: {
      color: '#FFFFFF',
    },
    confirmButton: {
      backgroundColor: '#4D09FF',
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
    },
    confirmButtonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
    cancelButton: {
      marginTop: 10,
      backgroundColor: '#ff3333',
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
    },
    cancelButtonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
    selectedPaymentMethodText: {
      color: '#FFFFFF', // Color blanco para el texto seleccionado
    },
    noteInput: {
      borderWidth: 1,
      borderColor: '#4D09FF',
      borderRadius: 5,
      padding: 10,
      marginBottom: 20,
      maxHeight: 150, // Altura máxima del componente de entrada de texto
      textAlignVertical: 'top', // Alinear el texto en la parte superior
    },
  });

  const SelectedProductsView = ({route}) => {
    const [MontoTotal, setMontoTotal] = useState(0)
    const [MontoIGTF, setMontoIGTF] = useState(0)
    const navigation = useNavigation()
    const [CodCliente, setCodCliente] = useState('');
    const { buscarContactosporCedula } = useContact()
    const { ProductosVenta  } = useVenta()
    const tipoRegistro = route.params.tipoRegistro
    const [modalVisible1, setModalVisible1] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false);
    const [modalVisible3, setModalVisible3] = useState(false);
    const [selectedModal, setSelectedModal] = useState(null);
    const [selectedDocumentType, setSelectedDocumentType] = useState('Factura');
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('Contado');
    const [note, setNote] = useState('');

  // Función para guardar la nota y cerrar el modal
  const handleSaveNote = () => {
    // Aquí puedes realizar acciones adicionales con la nota antes de guardarla
    // Guardar la nota en el estado o en cualquier otro lugar necesario
    // Cerrar el modal
    setModalVisible2(false);
  };

    const calcularTotalUsd = () => {
      return ProductosVenta.reduce((total, producto) => {
          let discountStrategy;
          let precioConDescuento;
  
          if (producto.valor_descuento_promocion > 0) {
              discountStrategy = new PercentageDiscountStrategy(producto.valor_descuento_promocion);
          } else {
              discountStrategy = new NoDiscountStrategy();
          }
          precioConDescuento = discountStrategy.calculateDiscountedPriceUSD(producto);
          return total + (precioConDescuento * producto.cantidad);
      }, 0).toFixed(2);
  };
    
  const calcularTotalBs = () => {
    return ProductosVenta.reduce((total, producto) => {
        let discountStrategy;
        let precioConDescuento;

        if (producto.valor_descuento_promocion > 0) {
            discountStrategy = new PercentageDiscountStrategy(producto.valor_descuento_promocion);
        } else {
            discountStrategy = new NoDiscountStrategy();
        }
        precioConDescuento = discountStrategy.calculateDiscountedPriceBolivares(producto);
        
        return total + (precioConDescuento * producto.cantidad);
    }, 0).toFixed(2);
};
    
const calcularImpuestos = () => { 
  const totalImpuestos = ProductosVenta.reduce((total, producto) => {
      let productoImpuesto;
      let ImpuestoEstrategia;
      if (producto.tipo_impuesto === 'IVA') {
          ImpuestoEstrategia = new IVATaxStrategy();
      } else {
          ImpuestoEstrategia = new FreeTaxStrategy();
      }
      productoImpuesto = parseFloat(ImpuestoEstrategia.calculateTax(producto));
      return total + productoImpuesto;
  }, 0);

  
  
  return totalImpuestos.toFixed(2); 
};

const calcularImpuestosIGTF = () => { 
  const totalImpuestos = ProductosVenta.reduce((total, producto) => {
      let productoImpuesto;
      let ImpuestoEstrategia;
      if (producto.tipo_impuesto === 'IVA') {
          ImpuestoEstrategia = new IVATaxStrategy();
      } else {
          ImpuestoEstrategia = new FreeTaxStrategy();
      }
      productoImpuesto = parseFloat(ImpuestoEstrategia.calculateTax(producto));
      return total + productoImpuesto;
  }, 0);
  return totalImpuestos.toFixed(2); 
};
    
    const calcularTotalFinal = () => {
      const totalBs = parseFloat(calcularTotalBs());
      const impuestos = parseFloat(calcularImpuestos());
      setMontoTotal((totalBs + impuestos).toFixed(2))
      
    };
    useEffect(() => {
      calcularTotalFinal();
      setMontoIGTF(0)
    }, [ProductosVenta]);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPaymentMethods, setSelectedPaymentMethods] = useState([]);

  const paymentMethods = [
    { id: 1, name: 'Pago Móvil' },
    { id: 2, name: 'Efectivo' },
    { id: 3, name: 'Tarjeta' },
    { id: 4, name: 'Divisas'}
  ];

  const togglePaymentMethod = (methodId) => {
    const isSelected = selectedPaymentMethods.includes(methodId);
    if (isSelected) {
      setSelectedPaymentMethods(selectedPaymentMethods.filter(id => id !== methodId));
      // Eliminar el monto asociado al método de pago
      setPaymentAmounts(prevState => {
        const { [methodId]: deleted, ...newState } = prevState;
        return newState;
      });
    } else {
      setSelectedPaymentMethods([...selectedPaymentMethods, methodId]);
      // Inicializar el monto asociado al método de pago seleccionado
      setPaymentAmounts(prevState => ({
        ...prevState,
        [methodId]: 0,
      }));
    }
    setMontoIGTF(0)
    calcularTotalFinal()
  };

  const handlePaymentAmountChange = (methodId, amount) => {
    if (isNaN(parseFloat(amount)) || amount === '') {
      // Si el valor ingresado no es un número o está vacío,
      // establecer el monto al valor inicial o 0
      setPaymentAmounts(prevState => ({
        ...prevState,
        [methodId]: 0,
      }));
    } else {
      // Actualizar el monto asociado al método de pago
      setPaymentAmounts(prevState => ({
        ...prevState,
        [methodId]: parseFloat(amount),
      }));
    }

  };

  const calculateRemainingAmount = () => {
    let totalAmount = parseFloat(MontoTotal);
    const paidAmount = Object.entries(paymentAmounts).reduce((acc, [methodId, amount]) => {
      // Si el método de pago es en divisas, convertir el monto a dólares
      const convertedAmount = paymentMethods.find(method => method.id === parseInt(methodId)).name === 'Divisas' ? amount * 36.26 : amount;
      totalAmount += convertedAmount*0.03;
      return acc + parseFloat(convertedAmount);
    }, 0);
    // Calcula el 3% del convertedAmount
    
    const remainingAmount = totalAmount - paidAmount;
    return remainingAmount.toFixed(2);
  };



  const renderPaymentMethod = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.paymentMethodContainer,
        selectedPaymentMethods.includes(item.id) && styles.selectedPaymentMethod,
      ]}
      onPress={() => togglePaymentMethod(item.id)}
    >
      <Text style={[styles.paymentMethodText, selectedPaymentMethods.includes(item.id) && styles.selectedPaymentMethodText]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const handlePaymentReceived = () => {
    // Verificar si se ha seleccionado solo un método de pago
    if (selectedPaymentMethods.length === 1) {
      
      // Si solo hay un método de pago, establecer el monto completo para ese método
      console.log(selectedPaymentMethods[0])
      if (selectedPaymentMethods[0] === 4){
      const MetodoUnico = calculateRemainingAmount()
      const convertedAmount = MetodoUnico * 0.03 ;
      const total = parseFloat(MontoTotal) + parseFloat(convertedAmount);
      const totalAmount = parseFloat(total.toFixed(2)); // Redondear a 2 decimales
      const igtfAmount = parseFloat(convertedAmount.toFixed(2)); // Redondear a 2 decimales
      setMontoTotal(totalAmount);
      setMontoIGTF(igtfAmount);}
      setModalVisible(false);
      return
    }
  
    // Verificar si se han ingresado los montos de pago
    if (selectedPaymentMethods.length === 0 || Object.values(paymentAmounts).some(amount => amount === 0)) {
      // Mostrar un mensaje de error si no se han ingresado los montos
      alert('No se ha ingresado la cantidad para todos los métodos de pago.');
      return;
    }
    
    // Sumar el monto total de todos los métodos de pago
    const totalPaymentAmount = Object.values(paymentAmounts).reduce((total, amount) => total + amount, 0);
    
    // Verificar si ya no hay monto restante o si hay un vuelto
    if (totalPaymentAmount >= parseFloat(calculateRemainingAmount())) {
      // Realizar acciones adicionales al confirmar el pago
    // Por ejemplo, enviar los datos de la venta al backend
    // Luego, navegar a la siguiente pantalla

    console.log(paymentAmounts)
    const convertedAmount = parseFloat(paymentAmounts["4"]) * 0.03 * 36.26;
    const total = parseFloat(MontoTotal) + parseFloat(convertedAmount);
    const totalAmount = parseFloat(total.toFixed(2)); // Redondear a 2 decimales
    const igtfAmount = parseFloat(convertedAmount.toFixed(2)); // Redondear a 2 decimales

    setMontoTotal(totalAmount);
    setMontoIGTF(igtfAmount);
    setModalVisible(false);
    } else {
      console.log(totalPaymentAmount)
      // Mostrar un mensaje de error si todavía falta pagar
      alert('El monto ingresado es menor al monto total por pagar.');
    }
  };

  const handleModalChange = (modalName) => {
  setSelectedModal(modalName);
  // Aquí estableces la visibilidad del modal correspondiente
  if (modalName === "Modal1") {
    setModalVisible1(true);
  } else if (modalName === "Modal2") {
    setModalVisible2(true);
  } else if (modalName === "Modal3") {
    setModalVisible(true);
  }
};

  // Renderizado de cada casilla como botón
  const RenderCasilla = ({ modalName, imagePath, width, height }) => {
    return (
      <TouchableOpacity
        style={selectedModal === modalName ? styles.casillaSelected : styles.casilla}
        onPress={() => handleModalChange(modalName)}
      >
        <Image style={{ width: width, height: height }} source={imagePath} /> 
      </TouchableOpacity>
    );
  };

  const handleConfirmSelections = () => {
    // Aquí puedes realizar acciones adicionales con las selecciones del usuario
    // Cerrar el modal
    setModalVisible1(false);
  };

  const [paymentAmounts, setPaymentAmounts] = useState({});
  const [VariableTemp, setVariableTemp] = useState("")


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

    <View style={styles.ContenedorSinTitulo}>
      <FlatList
      style={{marginTop:20, marginHorizontal:10}}
          data={ProductosVenta}
          renderItem={({ item }) => (
              <Product2 {...item}
              />
            )}
            numColumns={1} 
      /> 
    </View>
      <View style={styles.resumenContainer}>
      <Text style={styles.resumenTitulo}>
        {tipoRegistro === 'Compra' ? 'Resumen de la Compra' : 'Resumen de la Venta'}
      </Text>
      <View style={styles.totalContainer}>
        <Text style={styles.totalTexto}>Monto en Dolares:</Text>
        <Text style={styles.totalNumero}>{calcularTotalUsd()} $</Text>
      </View>
      <View style={styles.totalContainer}>
        <Text style={styles.totalTexto}>Monto en Bs:</Text>
        <Text style={styles.totalNumero}>{calcularTotalBs()} Bs</Text>
      </View>
      <View style={styles.totalContainer}>
        <Text style={styles.totalTexto}>IVA (16,00%):</Text>
        <Text style={styles.totalNumero}>{calcularImpuestos()} Bs</Text>
      </View>
      <View style={styles.totalContainer}>
        <Text style={styles.totalTexto}>IGTF (3,00%):</Text>
        <Text style={styles.totalNumero}>{MontoIGTF} Bs</Text>
      </View>
      <View style={styles.totalContainer}>
        <Text style={styles.totalTexto}>Total en Bolivares:</Text>
        <Text style={styles.totalNumero}>{MontoTotal} Bs</Text>
      </View>
      <TouchableOpacity
        style={styles.pagarBoton}
        onPress={() => {
          // Verificar si se ha seleccionado al menos un método de pago
          if (selectedPaymentMethods.length > 0) {
            // Navegar a la siguiente vista
            navigation.navigate("VistaNotadeEntrega", {route});
          } else {
            // Mostrar un alert indicando que debe elegir al menos un método de pago
            alert("Por favor, elija al menos un método de pago.");
          }
        }}
      >
        <Text style={styles.pagarTexto}>Pagar</Text>
      </TouchableOpacity>

      <View style={styles.botonesContainer}>
      <RenderCasilla modalName="Modal1" imagePath={require("../Assets/image(20).png")} width={24}
  height={22}/>
      <RenderCasilla modalName="Modal2" imagePath={require("../Assets/image(21).png")} width={23.5}
  height={22}/>
      <RenderCasilla modalName="Modal3" imagePath={require("../Assets/image(23).png")} width={22}
  height={22}/>
      </View>
    </View>
    
    <Modal
  animationType="slide"
  transparent={true}
  visible={modalVisible1 && selectedModal === "Modal1"}
  onRequestClose={() => setModalVisible1(false)}
>
  <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
      <Text style={styles.modalTitle}>Seleccionar Opciones</Text>
      {/* Opciones de factura, nota de entrega o recibo de pago */}
      <View style={styles.optionContainer}>
        <Text style={{marginBottom:5}}>Seleccionar tipo de documento:</Text>
        <TouchableOpacity
          style={[
            styles.optionButton,
            selectedDocumentType === "Factura" && styles.selectedOptionButton,
          ]}
          onPress={() => setSelectedDocumentType("Factura")}
        >
          <Text style={[styles.optionButtonText, selectedDocumentType === "Factura" && styles.selectedOptionButtonText]}>Factura</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.optionButton,
            selectedDocumentType === "Nota de Entrega" && styles.selectedOptionButton,
          ]}
          onPress={() => setSelectedDocumentType("Nota de Entrega")}
        >
          <Text style={[styles.optionButtonText, selectedDocumentType === "Nota de Entrega" && styles.selectedOptionButtonText]}>Nota de Entrega</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.optionButton,
            selectedDocumentType === "Recibo de Pago" && styles.selectedOptionButton,
          ]}
          onPress={() => setSelectedDocumentType("Recibo de Pago")}
        >
          <Text style={[styles.optionButtonText, selectedDocumentType === "Recibo de Pago" && styles.selectedOptionButtonText]}>Recibo de Pago</Text>
        </TouchableOpacity>
      </View>
      {/* Opciones de contado, crédito o anticipado */}
      <View style={styles.optionContainer}>
        <Text style={{marginBottom:5}}>Seleccionar forma de pago:</Text>
        <TouchableOpacity
          style={[
            styles.optionButton,
            selectedPaymentMethod === "Contado" && styles.selectedOptionButton,
          ]}
          onPress={() => setSelectedPaymentMethod("Contado")}
        >
          <Text style={[styles.optionButtonText, selectedPaymentMethod === "Contado" && styles.selectedOptionButtonText]}>Contado</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.optionButton,
            selectedPaymentMethod === "Crédito" && styles.selectedOptionButton,
          ]}
          onPress={() => setSelectedPaymentMethod("Crédito")}
        >
          <Text style={[styles.optionButtonText, selectedPaymentMethod === "Crédito" && styles.selectedOptionButtonText]}>Crédito</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.optionButton,
            selectedPaymentMethod === "Anticipado" && styles.selectedOptionButton,
          ]}
          onPress={() => setSelectedPaymentMethod("Anticipado")}
        >
          <Text style={[styles.optionButtonText, selectedPaymentMethod === "Anticipado" && styles.selectedOptionButtonText]}>Anticipado</Text>
        </TouchableOpacity>
      </View>
      {/* Botón para confirmar selecciones */}
      <TouchableOpacity
        style={styles.confirmButton}
        onPress={handleConfirmSelections}
      >
        <Text style={styles.confirmButtonText}>Confirmar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible1(false)}>
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
    </View>
  </View>
</Modal>

<Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible2 && selectedModal === "Modal2"}
        onRequestClose={() => setModalVisible2(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Agregar Notas</Text>
            {/* Componente de entrada de texto para notas */}
            <TextInput
              style={styles.noteInput}
              multiline={true}
              placeholder="Escribe tus notas aquí..."
              value={note}
              onChangeText={setNote} // Actualizar el estado de la nota
            />
            {/* Botón para guardar la nota */}
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={handleSaveNote}
            >
              <Text style={styles.confirmButtonText}>Guardar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => {
                setNote(''); // Restablecer el contenido de la nota
                setModalVisible2(false); // Cerrar el modal
              }}>
  <Text style={styles.cancelButtonText}>Cancelar</Text>
</TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible1 && selectedModal === "Modal3"}
        onRequestClose={() => setModalVisible(false)}
      >
        {/* Contenido de tu Modal 3 */}
      </Modal>
      <Modal
  animationType="slide"
  transparent={true}
  visible={modalVisible}
  onRequestClose={() => setModalVisible(false)}
>
  <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
      <Text style={styles.modalTitle}>Métodos de Pago Recibidos</Text>
      <FlatList
        data={paymentMethods}
        renderItem={renderPaymentMethod}
        keyExtractor={(item) => item.id.toString()}
      />
      {selectedPaymentMethods.length > 1 && (
        <View style={{marginTop: 20}}>
          <Text style={{fontWeight: 'bold', marginBottom: 5}}>Montos de Pago</Text>
          {selectedPaymentMethods.map(methodId => (
            <TextInput
              key={methodId}
              style={[styles.noteInput, {marginBottom: 10}]}
              placeholder={`Monto de ${paymentMethods.find(method => method.id === methodId).name}`}
              keyboardType="numeric"
              onChangeText={(amount) => {
              // Reemplazar comas por puntos antes de establecer el valor en el estado
              const formattedAmount = amount.replace(',', '.');
              setVariableTemp(formattedAmount);
  }}
              onSubmitEditing={() => handlePaymentAmountChange(methodId, VariableTemp)}
            />
          ))}
          <View style={{flexDirection:'row'}}>
          <Text style={{fontWeight: 'bold', marginTop: 10}}>
          {calculateRemainingAmount() < 0 ? 'Vuelto:' : 'Monto Restante:'}

          </Text>
          <Text style={{fontWeight: 'bold', marginTop: 10, marginLeft:5}}>
            {calculateRemainingAmount() < 0 ? (calculateRemainingAmount() * -1).toFixed(2) : calculateRemainingAmount()} Bs
          </Text>
          </View>
        </View>
      )}
      <TouchableOpacity style={styles.pagoRecibidoButton} onPress={handlePaymentReceived}>
        <Text style={styles.pagoRecibidoButtonText}>Confirmar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.cancelButton} onPress={() => {
        // Restablecer todas las variables asociadas al modal
        setModalVisible(false); // Cerrar el modal
        setSelectedPaymentMethods([]); // Reinicializar los métodos de pago seleccionados
        setPaymentAmounts({}); // Reinicializar los montos de pago
        setVariableTemp(''); // Reinicializar la variable temporal
        setNote(''); // Reinicializar la nota
      }}>
        <Text style={styles.cancelButtonText}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>
            
    </LinearGradient>
  );
};

export default SelectedProductsView;