import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from "@react-navigation/native";
import Constants from 'expo-constants';
import theme from  '../../Inventory/Themes/Theme';
import { Svg, Path, Rect, Line, Circle, Text as SvgText} from 'react-native-svg';
import { LineChart } from 'react-native-chart-kit';
import { useVenta } from '../../Context/VentaContext';




  {/* First Chart */}
  /*<View>
  <View style={styles.chartContainer}>
    <Svg width={widthpie} height={heightpie}>
      {arcs}
      {datapie.map((value, index) => (
        <Text
          key={index}
          x={widthpie / 2}
          y={heightpie / 2 + 10 * (index + 1)}
          fill="white"
          fontSize="12"
          textAnchor="middle"
        >
          {`${value}%`}
        </Text>
      ))}
    </Svg>
    <Text style={{ color: '#fff', marginTop: 20 }}>Distribucion de ventas por producto</Text>
  </View>
</View>

{/* Second Chart }
<View>
  <View style={styles.chartContainer}>
    <Svg width={width} height={height}>
      {data.map((value, index) => (
        <Rect
          key={index}
          x={(chartWidth / data.length) * index + paddingLeft}
          y={(chartHeight - (value / maxValue) * chartHeight) + paddingTop}
          width={chartWidth / data.length - 5}
          height={(value / maxValue) * chartHeight}
          fill="white"
        />
      ))}
      {data.map((value, index) => (
        <Text
          key={index}
          x={(chartWidth / data.length) * index + paddingLeft + 10}
          y={height - paddingBottom + 20}
          fill="white"
          fontSize="10"
          textAnchor="middle"
        >
          {value}
        </Text>
      ))}
    </Svg>
    <Text style={{ color: '#fff', marginTop: 20 }}>Productos del mes</Text>
  </View>
</View>

{/* Third Chart }
<View>
  <View style={styles.chartContainer}>
    <Svg width={widthLine} height={heightLine}>
      <Line
        x1={paddingLeftLine}
        y1={chartHeightLine + paddingTopLine}
        x2={chartWidthLine + paddingLeftLine}
        y2={chartHeightLine + paddingTopLine}
        stroke="#fff"
        strokeWidth="2"
      />
      <Line
        x1={paddingLeftLine}
        y1={paddingTopLine}
        x2={paddingLeftLine}
        y2={chartHeightLine + paddingTopLine}
        stroke="#fff"
        strokeWidth="2"
      />
      <Line
        d={linePathLine}
        fill="none"
        stroke="#fff"
        strokeWidth="2"
      />
      {dataLine.map((value, index) => (
        <Circle
          key={index}
          cx={(chartWidthLine / (dataLine.length - 1)) * index + paddingLeftLine}
          cy={(chartHeightLine - (value / maxValueLine) * chartHeightLine) + paddingTopLine}
          r="5"
          fill="#fff"
        />
      ))}
      {dataLine.map((value, index) => (
        <SvgText
          key={index}
          x={(chartWidthLine / (dataLine.length - 1)) * index + paddingLeftLine - 10}
          y={heightLine - paddingBottomLine + 20}
          fill="#fff"
          fontSize="10"
          textAnchor="middle"
        >
          {value}
        </SvgText>
      ))}
    </Svg>
    <Text style={{ color: '#fff', marginTop: 20 }}>Ventas Proyectadas</Text>
  </View>
</View>
  
  const navigation = useNavigation();

  const datapie = [50, 30, 20]; // Sample data
  const widthpie = 300;
  const heightpie = 200;
  const radiuspie = Math.min(widthpie, heightpie) / 2;
  const centerXpie = widthpie / 2;
  const centerYpie = heightpie / 2;
  const colorspie = ['#FF5733', '#33FFC4', '#335AFF']; // Sample colors
  const totalpie = datapie.reduce((acc, val) => acc + val, 0);

  let startAnglepie = 0;
  let endAnglepie = 0;
  const arcs = datapie.map((value, index) => {
    endAnglepie = startAnglepie + (value / totalpie) * 2 * Math.PI;
    const startXpie = centerXpie + radiuspie * Math.cos(startAnglepie);
    const startYpie = centerYpie + radiuspie * Math.sin(startAnglepie);
    const endXpie = centerXpie + radiuspie * Math.cos(endAnglepie);
    const endYpie = centerYpie + radiuspie * Math.sin(endAnglepie);
    const largeArcFlagpie = value / totalpie > 0.5 ? 1 : 0;
    const pathpie = `M ${centerXpie} ${centerYpie} L ${startXpie} ${startYpie} A ${radiuspie} ${radiuspie} 0 ${largeArcFlagpie} 1 ${endXpie} ${endYpie} Z`;
    startAnglepie = endAnglepie;
    return <Path key={index} d={pathpie} fill={colorspie[index]} />;
  });

  const data = [20, 45, 28, 80, 99, 43];
  const width = 300;
  const height = 200;
  const paddingTop = 10;
  const paddingRight = 10;
  const paddingBottom = 30;
  const paddingLeft = 30;
  const chartHeight = height - paddingTop - paddingBottom;
  const chartWidth = width - paddingRight - paddingLeft;
  const maxValue = Math.max(...data);
  
  const dataLine = [20, 45, 28, 80, 99, 43];
  const widthLine = 300;
  const heightLine = 200;
  const paddingTopLine = 10;
  const paddingRightLine = 10;
  const paddingBottomLine = 30;
  const paddingLeftLine = 30;
  const chartHeightLine = heightLine - paddingTopLine - paddingBottomLine;
  const chartWidthLine = widthLine - paddingRightLine - paddingLeftLine;
  const maxValueLine = Math.max(...dataLine);
  
  const linePathLine = dataLine.reduce((path, value, index) => {
    const xLine = (chartWidthLine / (dataLine.length - 1)) * index + paddingLeftLine;
    const yLine = ((chartHeightLine - (value / maxValueLine) * chartHeightLine) || 0) + paddingTopLine;
    return index === 0 ? `M${xLine},${yLine}` : `${path} L${xLine},${yLine}`;
  }, '');*/
  const ReportView = () => {
    
    const { obtenerTotalEfectivoCompras, obtenerTotalEfectivoVentas } = useVenta();
    const navigation = useNavigation();
    const [datosCargados, setDatosCargados] = useState(false);
    const [ingresosMensuales, setIngresosMensuales] = useState(0);
    const [gastosMensuales, setGastosMensuales] = useState(0);
    const [gananciaMensual, setGananciaMensual] = useState(0);
  
    const obtenerDatos = async () => {
      try {
        const ingresos = await obtenerTotalEfectivoVentas();
        const gastos = await obtenerTotalEfectivoCompras();
        const ganancia = ingresos - gastos;
        setIngresosMensuales(ingresos);
        setGastosMensuales(gastos);
        setGananciaMensual(ganancia);
        setDatosCargados(true);
      } catch (error) {
        console.error('Error al obtener los datos:', error.message);
      }
    };
  
    useEffect(() => {
      obtenerDatos();
    }, []);
  
    if (!datosCargados) {
      return <ActivityIndicator />;
    }
  
    const data = {
      labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
      datasets: [
        {
          data: [500, 700, 600, 800, 900, 1000], // Valores de ingresos mensuales
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // Color de la línea
          strokeWidth: 2, // Grosor de la línea
        },
        {
          data: [300, 400, 500, 600, 700, 800], // Valores de gastos mensuales
          color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`, // Color de la línea
          strokeWidth: 2, // Grosor de la línea
        },
      ],
    };
  
    const chartConfig = {
      backgroundGradientFrom: '#961AFF',
      backgroundGradientTo: '#380E6B',
      decimalPlaces: 0,
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16,
      },
    };
  
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
          <Text style={styles.tituloInventario}>Reportes</Text>
        </View>
  
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          <View style={styles.container}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Gasto Mensual</Text>
              <Text style={styles.cardValue}>Bs.{gastosMensuales}</Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Ingreso Mensual</Text>
              <Text style={styles.cardValue}>Bs.{ingresosMensuales}</Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Ganancia Mensual</Text>
              <Text style={styles.cardValue}>Bs.{gananciaMensual.toFixed(2)}</Text>
            </View>
            {/* Aquí se integra la gráfica */}
            <View style={styles.chartContainer}>
              <LineChart data={data} width={350} height={220} chartConfig={chartConfig} />
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    );
  };

const styles = {
  principalContainer: {
    flex: 1
  },
  contenedorTitulo: {
    marginTop: Constants.statusBarHeight,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 20,
  },
  tituloInventario: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: 10,
  },
  scrollViewContainer: {
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
    elevation: 3,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#380E6B',
  },
  cardValue: {
    fontSize: 18,
    color: '#380E6B',
  },
  backButton: {
    position: 'absolute',
    left: 10,
    padding: 10,
    zIndex: 1,
  },
  TextoModificar: {
    width: 24,
    height: 20,
  },
  contenedorPrincipal: {
    flex: 1,
    justifyContent:"flex-start"
},
contenedorTitulo: {
    marginTop: Constants.statusBarHeight + 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection:'row',
    marginBottom: 20
},
tituloInventario: {
  fontSize: 24,
  fontWeight: 'bold',
  color: "#FFFFFF"
},
contenedorContactos:{
flex: 1,
justifyContent: "flex-start",
backgroundColor: "rgba(0, 0, 0, 0.07))",
paddingHorizontal: 20, // Relleno horizontal
paddingVertical: 30,   // Relleno vertical
borderTopLeftRadius: 46,  // Radio de borde superior izquierdo
borderTopRightRadius: 46,
marginTop: 20
},
textinput: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'white',
    color: 'white',
    textAlign: "left",
    paddingStart: 30, 
    borderRadius: 100,
    flex:1
  }, 
containerBuscador: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  TextoModificar: {
    width: 24, 
    height: 20, 
    marginRight: 10, 
  },
  backButton: {
    position: 'absolute',
    left: Constants.statusBarHeight * 0.01,
    padding: 10,
    zIndex: 1,
    alignSelf:'flex-start',
    justifyContent:'flex-start'
  },
  mensajeNoCoincidencias: {
    fontSize: 16,
    color: "#FFFFFF", 
    textAlign: 'center',
    marginTop: 20,
  },
};

export default ReportView;