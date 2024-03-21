import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from "@react-navigation/native";
import Constants from 'expo-constants';
import theme from  '../../Inventory/Themes/Theme';
import { Svg, Path, Rect, Line, Circle, Text as SvgText} from 'react-native-svg';



const ReportView = () => {
  
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
  }, '');

const styles = StyleSheet.create({
  principalContainer: {
    flex: 1,
  },
  photo: {
    width: '100%',
    height: '40%',
    resizeMode: 'cover',
    marginTop: 30
  },
  dataContainer: {
    flex: 1,
    width: '100%',
    height: '60%',
    backgroundColor: '#080915', // Color de fondo de la vista debajo
    borderTopLeftRadius: 50, // Radio de borde superior izquierdo
    borderTopRightRadius: 50, // Radio de borde superior derecho
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 10,
    padding: 10
  },
  backButton: {
    position: 'absolute',
    left: Constants.statusBarHeight * 0.01,
    padding: 10,
    zIndex: 1,
    alignSelf:'flex-start',
    justifyContent:'flex-start',
    marginTop:Constants.statusBarHeight
  },
  
  mainTitle: {
    color: theme.colors.textPrimary,
    fontSize: theme.title.fontSize,
    fontWeight: theme.title.fontWeight
  },
  littleIcon: {
    width: 40,
    height: 40,  
  },
  disgustingGreenBox: {
    flexDirection: 'row',
    backgroundColor: '#52D126',
    padding: 10,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    width: '65%',
    marginTop: 10,
    marginBottom: 30
  },
  darkBox: {
    backgroundColor: '#000012',
    width: '100%',
    flexDirection: 'column',
    borderRadius: 30,
    padding: 10,
    margin: 10,
  
  },
  strongLittleText: {
    color: theme.colors.textPrimary,
    fontWeight: theme.title.fontWeight,
    fontSize: theme.text.fontSize,
  },
  littleText: {
    color: theme.colors.textPrimary,
    fontWeight: theme.text.fontWeight,
    fontSize: theme.text.fontSize,
  },
  transparentBox: {
    alignItems: 'center',
    width: '100%'
  },
  TextoModificar: {
    width: 24, 
    height: 20, 
    marginRight: 10, 
  },
  littleDataBox: {
    width:'50%',
    height: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 30,
    color: 'white',
  },
  chartContainer: {
    backgroundColor: '#7E6FD1',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    padding: 10,
  },
  
  split: {
    flexDirection: 'row'
  }
  
});

  return (
    
    <LinearGradient
  colors={['#961AFF', '#380E6B']}
  start={{ x: 0, y: 0 }}
  end={{ x: 1, y: 0 }}
  style={styles.principalContainer}
>
  <View style={styles.backButton}>
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Image
        source={require('../Assets/image (3).png')}
        style={styles.TextoModificar}
      />
    </TouchableOpacity>
  </View>
  <View style = {styles.transparentBox}>
  <Text style={styles.title}>Reportes</Text>
  </View>
  
  <ScrollView contentContainerStyle={styles.scrollViewContainer}>
    {/* First Chart */}
    <View>
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

    {/* Second Chart */}
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

    {/* Third Chart */}
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
  </ScrollView>
</LinearGradient>
  );
};

export default ReportView;