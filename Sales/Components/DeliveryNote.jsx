import React, { useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, Image, ScrollView, TouchableOpacity, TextInput, FlatList } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from "@react-navigation/native";
import Constants from 'expo-constants';
import theme from "../../Inventory/Themes/Theme";
import { useState } from "react";
import { useContact } from "../../Context/ContactContext";
import { useVenta } from "../../Context/VentaContext";
import { useProducts } from "../../Context/ProductContext";
import { useCompanyContext } from "../../Context/CompanyContext";
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';


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
      marginVertical:10,
    },
    titulo: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        marginTop: 15,
        marginLeft:15,
        marginBottom:10
      },
      subtitulo:{
        fontSize: 15,
        color: "#FFFFFF",
        fontWeight: 'bold',
        marginLeft:15,
        marginTop:10
      },
      text:{
        fontSize: 15,
        color: "#FFFFFF",
        marginLeft:15,
        marginTop:2
      },
      text1:{
        fontSize: 15,
        color: "#FFFFFF",
        marginVertical:4
      },
      text2:{
        fontSize: 15,
        color: "#999999",
        marginLeft:15,
        marginTop:2
      },
      text3:{
        fontSize: 15,
        color: "#FFFFFF",
        marginVertical:2
      },
      botonSalir: {
        backgroundColor: '#FF5733',
        padding: 10,
        borderRadius: 5,
        margin: 10,
        alignItems: 'center',
      },
      textoBotonSalir: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
      },
      line: {
        borderColor: 'white', 
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderWidth: 1.5,
        marginHorizontal: 15,
        marginTop: 5,
        flexDirection:'row',
        justifyContent: 'space-between'
      },
      line1: {
        borderColor: 'white', 
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderTopWidth:0,
        borderWidth: 1.5,
        marginHorizontal: 15,
        flexDirection:'row',
        justifyContent: 'space-between'
      },
      line2: {
        borderColor: 'white', 
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderWidth: 1.5,
        borderBottomWidth:0,
        marginHorizontal: 15,
        marginTop: 10,
      },
      line3: {
        borderColor: 'white', 
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderWidth: 1.5,
        marginHorizontal: 15,
        marginTop: 5,
      },
      productoContainer:{
        marginVertical:10,
        marginRight:15
      },
      button: {
        backgroundColor: '#b168ea',
        borderRadius: 30,
        paddingVertical: 12,
        paddingHorizontal: 20,
        alignItems: 'center',
        alignSelf:'center',
        marginVertical: 10,
        width: '65%'
        
      },
      buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
      }
      
  });

  

  const DeliveryNote = ({route}) => {
    const [formattedDateFactura, setFormattedDateFactura] = useState('');
    const navigation = useNavigation();
    const [CodCliente, setCodCliente] = useState('');
    const { buscarContactosporCedula } = useContact();
    const { Cliente, ProductosVenta, ReiniciarVariables, DatosFactura, createMovimiento_Inventario, createEncabezado  } = useVenta();
    const {modificarCantidadExistencia} = useProducts()
    const { empresa } = useCompanyContext()
    const TipoResgistro = route.params.TipoRegistro
    console.log(empresa)
    console.log(TipoResgistro)
    console.log(DatosFactura)
    console.log(DatosFactura["4"])

    useEffect(() => {
      const currentDate = new Date();
      const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
      setFormattedDateFactura(formattedDate);
    }, []);

    
  
    const calcularTotalItems = () => {
      // Contar la cantidad de productos únicos
      return ProductosVenta.length;
    };

    const calcularTotalProductos = () => {
      // Contar la cantidad total de productos (incluyendo los que son iguales)
      return ProductosVenta.reduce((total, producto) => total + producto.cantidad, 0);
    };
  
    const calcularSubtotal = () => {
      return ProductosVenta.reduce((total, producto) => {
        return total + (producto.precio_efectivo * producto.cantidad);
      }, 0).toFixed(2);
    };
  
    const calcularImpuestos = () => {
      const impuestoIVA = 0.16;
      return ProductosVenta.reduce((totalImpuestos, producto) => {
        return producto.tipo_impuesto === 'IVA'
          ? totalImpuestos + (producto.precio_efectivo * impuestoIVA * producto.cantidad)
          : totalImpuestos;
      }, 0).toFixed(2);
    };
  
    const calcularTotal = () => {
      const subtotal = parseFloat(calcularSubtotal());
      const impuestos = parseFloat(calcularImpuestos());
      return (subtotal + impuestos).toFixed(2);
    };

    const calcularPrecioConDescuentoUnitario = (item) => {
        const precioConDescuento = item.valor_descuento_promocion > 0
          ? item.precio_efectivo * (1 - item.valor_descuento_promocion / 100)
          : item.precio_efectivo;
        return precioConDescuento;
      };
      
      const calcularPrecioTotalConDescuento = (item) => {
        const precioConDescuentoUnitario = calcularPrecioConDescuentoUnitario(item);
        return item.cantidad * precioConDescuentoUnitario;
      };

      const calcularDescuentoTotal = () => {
        return ProductosVenta.reduce((totalDescuento, producto) => {
          const precioConDescuentoUnitario = calcularPrecioConDescuentoUnitario(producto);
          const descuentoPorProducto = precioConDescuentoUnitario * producto.cantidad - producto.precio_efectivo * producto.cantidad;
          return totalDescuento + descuentoPorProducto;
        }, 0);
      };

      const calcularPrecioUnitario = (item) => {
        return item.precio_efectivo.toFixed(2); // Devuelve el precio unitario sin descuento
      };
      
      const calcularPrecioTotal = (item) => {
        return (item.cantidad * item.precio_efectivo).toFixed(2); // Devuelve el precio total sin descuento
      };

      const calcularTotalNeto = () => {
        const subtotal = parseFloat(calcularSubtotal());
        const descuentoTotal = parseFloat(calcularDescuentoTotal());
        return (subtotal + descuentoTotal).toFixed(2);
      };

      
        const htmlContentVenta = `
        <div style="font-family: Arial, sans-serif;">
          <div style="text-align: center;">
             <h1 style="text-align: center;">${DatosFactura.Documento === 'Factura' ? 'SENIAT' : DatosFactura.Documento}</h1>
            <p>${empresa._j.nombre}</p>
            <p>${empresa._j.direccion}</p>
            <p>ID: ${empresa._j.nro_rif}</p>
            <p>Giro: ${empresa._j.actividad_empresa}</p>
            <p>Fecha Emisión: ${formattedDateFactura}</p>
          </div>
    
          <div style="margin-bottom: 20px;">
            <h2>Datos del Consumidor</h2>
            <p>Nombre: ${Cliente.nombre}</p>
            <p>Cédula: ${Cliente.cont_id_fiscal}</p>
            <p>Dirección: ${Cliente.direccion}</p>
          </div>
    
          <div style="margin-bottom: 20px;">
          <h2 style="text-align: left;">${DatosFactura.Documento === 'Factura' ? DatosFactura.Documento : 'Productos'}</h2>
              <div>
              ${ProductosVenta.map(item => `
              <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                <div>${item.cod_proveedor}</div>
                <div>${item.nombre}</div>
                <div>${item.cantidad} x Bs. ${calcularPrecioUnitario(item)}</div>
                <div>Bs. ${calcularPrecioTotal(item)}</div>
              </div>
            `).join('')}
            </div>
          </div>
    
          <div style="margin-bottom: 20px;">
              <p><strong style="float: left;">Subtotal:</strong> <span style="float: right;">Bs. ${calcularSubtotal()}</span></p>
              <div style="clear: both;"></div>
              <p><strong style="float: left;">Descuento:</strong> <span style="float: right;">Bs. ${-1 * calcularDescuentoTotal().toFixed(2)}</span></p>
              <div style="clear: both;"></div>
              <p><strong style="float: left;">Total Neto:</strong> <span style="float: right;">Bs. ${calcularTotalNeto()}</span></p>
              <div style="clear: both;"></div>
              <p><strong style="float: left;">IVA:</strong> <span style="float: right;">16%</span></p>
              <div style="clear: both;"></div>
              <p><strong style="float: left;">IGTF:</strong> <span style="float: right;">3%</span></p>
              <div style="clear: both;"></div>
              <p><strong style="float: left;">Total IVA:</strong> <span style="float: right;">Bs. ${calcularImpuestos()}</span></p>
              <div style="clear: both;"></div>
              <p><strong style="float: left;">Total IGTF:</strong> <span style="float: right;">Bs. ${DatosFactura.MontoIGTF}</span></p>
              <div style="clear: both;"></div>
          </div>

          <div style="margin-bottom: 20px;">
            <p>
              ${DatosFactura.MetodoPago.map(metodo => {
                switch (metodo) {
                  case 1:
                    return `<div style="display: flex; justify-content: space-between;"><strong>Pago Móvil:</strong> <span style="margin-left: auto;">Bs. ${DatosFactura["1"]}</span></div>`;
                  case 2:
                    return `<div style="display: flex; justify-content: space-between;"><strong>Efectivo:</strong> <span style="margin-left: auto;">Bs. ${DatosFactura["2"]}</span></div>`;
                  case 3:
                    return `<div style="display: flex; justify-content: space-between;"><strong>Transferencia:</strong> <span style="margin-left: auto;">Bs. ${DatosFactura["3"]}</span></div>`;
                  case 4:
                    return `<div style="display: flex; justify-content: space-between;"><strong>Divisas:</strong> <span style="margin-left: auto;">Bs. ${DatosFactura["4"]}</span></div>`;
                  default:
                    return '';
                }
              }).join('')}
            </p>
          </div>
    
          <div style="margin-bottom: 20px;">
              <p><strong style="float: left;">Total:</strong> <span style="float: right;">Bs. ${DatosFactura.MontoTotal}</span></p>
              <div style="clear: both;"></div>
              <p><strong style="float: left;">Total Ref:</strong> <span style="float: right;">Bs. ${(DatosFactura.MontoTotal / 36.26).toFixed(2)}</span></p>
              <div style="clear: both;"></div>
          </div>

          <div>
          <p>NO. Documento: 000000015</p>
          <p>Máximo 3 días para cambio y devolución.</p>
          <p>Presentar Factura</p>
          <p>Tienda 1</p>
          <p>Caja: 1</p>
          <p>Cajero: María Rojas</p>
          </div>
          
        </div>
      `;
      const htmlContentCompra = `
        <div style="font-family: Arial, sans-serif;">
          <div style="text-align: center;">
          <h1 style="text-align: center;">${DatosFactura.Documento === 'Factura' ? 'SENIAT' : DatosFactura.Documento}</h1>
            <p>${Cliente.nombre}</p>
            <p>${Cliente.direccion}</p>
            <p>ID: ${Cliente.cont_id_fiscal}</p>
            <p>Fecha Emisión: ${formattedDateFactura}</p>
          </div>
    
          <div style="margin-bottom: 20px;">
            <h2>Datos del Consumidor</h2>
            <p>Nombre: ${empresa._j.nombre}</p>
            <p>RIF: ${empresa._j.nro_rif}</p>
            <p>Dirección: ${empresa._j.direccion}</p>
          </div>
    
          <div style="margin-bottom: 20px;">
          <h2 style="text-align: left;">${DatosFactura.Documento === 'Factura' ? DatosFactura.Documento : 'Productos'}</h2>
              <div>
              ${ProductosVenta.map(item => `
              <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                <div>${item.cod_proveedor}</div>
                <div>${item.nombre}</div>
                <div>${item.cantidad} x Bs. ${calcularPrecioUnitario(item)}</div>
                <div>Bs. ${calcularPrecioTotal(item)}</div>
              </div>
            `).join('')}
            </div>
          </div>
    
          <div style="margin-bottom: 20px;">
              <p><strong style="float: left;">Subtotal:</strong> <span style="float: right;">Bs. ${calcularSubtotal()}</span></p>
              <div style="clear: both;"></div>
              <p><strong style="float: left;">Descuento:</strong> <span style="float: right;">Bs. ${-1 * calcularDescuentoTotal().toFixed(2)}</span></p>
              <div style="clear: both;"></div>
              <p><strong style="float: left;">Total Neto:</strong> <span style="float: right;">Bs. ${calcularTotalNeto()}</span></p>
              <div style="clear: both;"></div>
              <p><strong style="float: left;">IVA:</strong> <span style="float: right;">16%</span></p>
              <div style="clear: both;"></div>
              <p><strong style="float: left;">IGTF:</strong> <span style="float: right;">3%</span></p>
              <div style="clear: both;"></div>
              <p><strong style="float: left;">Total IVA:</strong> <span style="float: right;">Bs. ${calcularImpuestos()}</span></p>
              <div style="clear: both;"></div>
              <p><strong style="float: left;">Total IGTF:</strong> <span style="float: right;">Bs. ${DatosFactura.MontoIGTF}</span></p>
              <div style="clear: both;"></div>
          </div>

          <div style="margin-bottom: 20px;">
            <p>
              ${DatosFactura.MetodoPago.map(metodo => {
                switch (metodo) {
                  case 1:
                    return `<div style="display: flex; justify-content: space-between;"><strong>Pago Móvil:</strong> <span style="margin-left: auto;">Bs. ${DatosFactura["1"]}</span></div>`;
                  case 2:
                    return `<div style="display: flex; justify-content: space-between;"><strong>Efectivo:</strong> <span style="margin-left: auto;">Bs. ${DatosFactura["2"]}</span></div>`;
                  case 3:
                    return `<div style="display: flex; justify-content: space-between;"><strong>Transferencia:</strong> <span style="margin-left: auto;">Bs. ${DatosFactura["3"]}</span></div>`;
                  case 4:
                    return `<div style="display: flex; justify-content: space-between;"><strong>Divisas:</strong> <span style="margin-left: auto;">Bs. ${DatosFactura["4"]}</span></div>`;
                  default:
                    return '';
                }
              }).join('')}
            </p>
          </div>
    
          <div style="margin-bottom: 20px;">
              <p><strong style="float: left;">Total:</strong> <span style="float: right;">Bs. ${DatosFactura.MontoTotal}</span></p>
              <div style="clear: both;"></div>
              <p><strong style="float: left;">Total Ref:</strong> <span style="float: right;">Bs. ${(DatosFactura.MontoTotal / 36.26).toFixed(2)}</span></p>
              <div style="clear: both;"></div>
          </div>

          <div>
          <p>NO. Documento: 000000015</p>
          <p>Máximo 3 días para cambio y devolución.</p>
          <p>Presentar Factura</p>
          <p>Tienda 1</p>
          <p>Caja: 1</p>
          <p>Cajero: María Rojas</p>
          </div>
          
        </div>
      `;

      const handleImprimirComprobante = async () => {
        try {
            let contentToPrint = htmlContentVenta; // Por defecto, usamos el contenido para Venta
    
            if (TipoResgistro === 'Compra') {
                contentToPrint = htmlContentCompra; // Si es "Compra", usamos el contenido para Compra
            }
    
            const file = await Print.printAsync({
                html: contentToPrint,
                base64: false
            });
    
        } catch (error) {
            console.error('An error occurred while printing:', error);
        }
    };
      
    

  const handleExit = () => {
    navigation.navigate("MenuPrincipal"); 
    ReiniciarVariables()
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    
    if(TipoResgistro==='Compra'){
      
      createEncabezado(
        TipoResgistro,
        randomNumber, // Aquí debes establecer el valor adecuado para el código de encabezado
        DatosFactura.Documento,
        Cliente.cont_id_fiscal,
        formattedDate,
        12345,
        DatosFactura.FormaPago,
        36.26,
        DatosFactura.Nota,
        calcularTotalProductos(),
        calcularTotalItems(),
        1, // Aquí debes establecer el valor adecuado para la caja
        parseFloat(calcularSubtotal()),
        3,
        DatosFactura.MontoIGTF,
        16,
        parseFloat(calcularImpuestos()),
        DatosFactura.MontoTotal, // Verificar si el método de pago incluye efectivo
        DatosFactura.MontoTotal/36.26,  // Verificar si el método de pago incluye divisas
        'María Rojas', // Aquí debes establecer el valor adecuado para el cajero
        Cliente.nombre
        )
      for (const producto of ProductosVenta) {
        const nuevaCantidad = parseInt(producto.cantidad_existencia) + parseInt(producto.cantidad);
        const randomNumber2 = Math.floor(Math.random() * 100) + 1;
        const porcentajeDescuento = producto.porcentaje_descuento && !isNaN(producto.porcentaje_descuento) ? producto.porcentaje_descuento : 0;
        modificarCantidadExistencia(producto.id_producto, nuevaCantidad);
        
        createMovimiento_Inventario(
          producto.cantidad,
              producto.precio_usd,
              producto.precio_efectivo,
              producto.costo_usd,
              producto.costo_efectivo,
              16,
              porcentajeDescuento,
             formattedDate,
               DatosFactura.Documento,
               randomNumber2,
              producto.cantidad * producto.precio_efectivo,
              producto.id_producto
        )
      }
      
    }
    else{
      const randomNumber = Math.floor(Math.random() * 100) + 1;
      createEncabezado(
        TipoResgistro,
        randomNumber, // Aquí debes establecer el valor adecuado para el código de encabezado
        DatosFactura.Documento,
        Cliente.cont_id_fiscal,
        formattedDate,
        12345,
        DatosFactura.FormaPago,
        36.26,
        DatosFactura.Nota,
        calcularTotalProductos(),
        calcularTotalItems(),
        1, // Aquí debes establecer el valor adecuado para la caja
        parseFloat(calcularSubtotal()),
        3,
        DatosFactura.MontoIGTF,
        16,
        parseFloat(calcularImpuestos()),
        DatosFactura.MontoTotal, // Verificar si el método de pago incluye efectivo
        DatosFactura.MontoTotal/36.26,  // Verificar si el método de pago incluye divisas
        'María Rojas', 
        Cliente.nombre
          )
    for (const producto of ProductosVenta) {
        const nuevaCantidad = producto.cantidad_existencia - producto.cantidad;
        const randomNumber1 = Math.floor(Math.random() * 100) + 1;
        const porcentajeDescuento = producto.porcentaje_descuento && !isNaN(producto.porcentaje_descuento) ? producto.porcentaje_descuento : 0;
        modificarCantidadExistencia(producto.id_producto, nuevaCantidad);
        
        createMovimiento_Inventario(
          producto.cantidad,
              producto.precio_usd,
              producto.precio_efectivo,
              producto.costo_usd,
              producto.costo_efectivo,
              16,
              porcentajeDescuento,
             formattedDate,
               DatosFactura.Documento,
               randomNumber1,
              producto.cantidad * producto.precio_efectivo,
              producto.id_producto
        )
      }
    }
  };
  const currentDate = new Date();
  // Formatear la fecha como "YYYY-MM-DD"
  const formattedDate = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  // Formatear la hora y los minutos con ceros a la izquierda si es necesario
  const formattedHours = hours < 10 ? `0${hours}` : hours;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  // Combinar la hora y los minutos en una cadena de texto
  const formattedTime = `${formattedHours}:${formattedMinutes}`;
    return (
      <LinearGradient
        colors={[
          "#7227a6",
          "#431b6a",
          "#000000"
        ]}
        style={styles.contenedorPrincipal}
      >
        <ScrollView style={styles.scrollViewContainer}>
          <View style={styles.contenedorTitulo}>
            <View style={styles.backButton}>
              <TouchableOpacity
                onPress={() => handleExit()}
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
            {/* Datos del Empresa */}
            <View>
            {TipoResgistro === 'Compra' ? (
              <>
                {/* Mostrar los datos específicos para el tipo de registro "Compra" */}
                <Text style={styles.text}>{Cliente.nombre}</Text>
                <Text style={styles.text}>{`ID: ${Cliente.cont_id_fiscal}`}</Text>
                <Text style={styles.text}>{`Fecha Emisión: ${formattedDate}     Hora: ${formattedTime}`}</Text>
                <Text style={styles.text}>{`Dirección: ${Cliente.direccion}`}</Text>
                <Text style={styles.text}>{`Caja: 1     Cajero: María Rojas`}</Text>
              </>
            ) : (
              <>
                {/* Mostrar los datos generales de la empresa */}
                <Text style={styles.text}>{empresa._j.nombre}</Text>
                <Text style={styles.text}>{`ID: ${empresa._j.nro_rif}`}</Text>
                <Text style={styles.text}>{`Giro: ${empresa._j.actividad_empresa}`}</Text>
                <Text style={styles.text}>{`Fecha Emisión: ${formattedDate}     Hora: ${formattedTime}`}</Text>
                <Text style={styles.text}>{`Dirección: ${empresa._j.direccion}`}</Text>
                <Text style={styles.text}>{`Caja: 1     Cajero: María Rojas`}</Text>
              </>
            )}
          </View>

            {/* Datos del Cliente */}
            
            <View style={styles.line2}>
              {TipoResgistro === 'Compra' ? (
                <>
                  {/* Mostrar los datos específicos para "Compra" */}
                  <Text style={styles.text3}>{`Nombre: ${empresa._j.nombre}`}</Text>
                  <Text style={styles.text3}>{`ID: ${empresa._j.nro_rif}`}</Text>
                  <Text style={styles.text3}>{`Dirección: ${empresa._j.direccion}`}</Text>
                </>
              ) : (
                <>
                  {/* Mostrar los datos generales del cliente */}
                  <Text style={styles.text3}>{`Nombre: ${Cliente.nombre}`}</Text>
                  <Text style={styles.text3}>{`ID: ${Cliente.cont_id_fiscal}`}</Text>
                  <Text style={styles.text3}>{`Dirección: ${Cliente.direccion}`}</Text>
                </>
              )}
            </View>

            <View style={styles.line}>
            <Text style={styles.text1}>{`Tipo Transacción`}</Text>
            <Text style={styles.text1}>{DatosFactura.Documento}</Text>
            </View>
            <View style={styles.line1}>
            <Text style={styles.text1}>{`Observaciones`}</Text>
            <Text style={styles.text1}>{DatosFactura.Nota}</Text>
            </View>
            <View style={styles.line1}>
            <Text style={styles.text1}>{`Nro Control`}</Text>
            <Text style={styles.text1}>{null}</Text>
            </View>

            

            {/* Productos Entregados */}
            {ProductosVenta.map((item) => (
              <View key={item.id_producto} style={styles.productoContainer}>
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                
                <Text style={styles.text}>{item.nombre}</Text>
                <Text style={styles.text}>{`${item.cantidad} x Bs. ${calcularPrecioUnitario(item)}`}</Text>
                <Text style={styles.text}>{`Bs. ${calcularPrecioTotal(item)}`}</Text>
                
                {/* Agrega más campos según sea necesario */}
                </View>
                <Text style={styles.text2}>{item.cod_proveedor}</Text>
              </View>
            ))}


            <View style={styles.line3}>
              <View style={{flexDirection:'row', justifyContent:'space-between'}}>
              <Text style={styles.text1}>{`Total Items`}</Text>
              <Text style={styles.text1}>{calcularTotalItems()}</Text>
              </View>
              <View style={{flexDirection:'row', justifyContent:'space-between'}}>
              <Text style={styles.text1}>{`Total Productos`}</Text>
              <Text style={styles.text1}>{Number(calcularTotalProductos()).toString()}</Text>
              </View>
            </View>
            <View style={styles.line1}>
            <Text style={styles.text1}>{`Condición Venta`}</Text>
            <Text style={styles.text1}>{DatosFactura.FormaPago}</Text>
            </View>

            {/* Costos */}
              <View style={styles.productoContainer}>
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <Text style={styles.text}>Subtotal</Text>
                <Text style={styles.text}>{calcularSubtotal()} Bs</Text>
                </View>
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <Text style={styles.text}>Descuento</Text>
                <Text style={styles.text}>{-1*calcularDescuentoTotal().toFixed(2)}</Text>
                </View>
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <Text style={styles.text}>Total Neto</Text>
                <Text style={styles.text}>{calcularTotalNeto()} Bs</Text>
                </View>
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <Text style={styles.text}>IVA</Text>
                <Text style={styles.text}>16%</Text>
                </View>
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <Text style={styles.text}>IGTF</Text>
                <Text style={styles.text}>3%</Text>
                </View>
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <Text style={styles.text}>Total IVA</Text>
                <Text style={styles.text}>{calcularImpuestos()} Bs</Text>
                </View>
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <Text style={styles.text}>Total IGTF</Text>
                <Text style={styles.text}>{DatosFactura.MontoIGTF} Bs</Text>
                </View>
              </View>

              <View style={styles.line3}>
                  <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                  <Text style={styles.text1}>{`Total`}</Text>
                  <Text style={styles.text1}>{DatosFactura.MontoTotal}</Text>
                  </View>
                  <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                  <Text style={styles.text1}>{`Total Ref`}</Text>
                  <Text style={styles.text1}>{(DatosFactura.MontoTotal/36.26).toFixed(2)}</Text>
                  </View>
                </View>
                <View style={styles.line1}>
                <Text style={styles.text1}>{`Metodo de Pago`}</Text>
                <View style={{alignItems:'flex-end'}}>
                {DatosFactura.MetodoPago.map((metodo, index) => (
                  <Text key={index} style={styles.text1}>
                    {metodo === 1 && 'Pago Móvil'}
                    {metodo === 2 && 'Efectivo'}
                    {metodo === 3 && 'Transferencia'}
                    {metodo === 4 && 'Divisas'}
                  </Text>
                ))}
                </View>
                </View>

                <TouchableOpacity style={styles.button} onPress={handleImprimirComprobante}>
                <Text style={styles.buttonText}>Imprimir Comprobante</Text>
                </TouchableOpacity>
            
            
            
          </View>
        </ScrollView>
        <TouchableOpacity style={styles.botonSalir} onPress={handleExit}>
        <Text style={styles.textoBotonSalir}>Salir</Text>
        </TouchableOpacity>
      </LinearGradient>
    );
  };
  
  export default DeliveryNote;