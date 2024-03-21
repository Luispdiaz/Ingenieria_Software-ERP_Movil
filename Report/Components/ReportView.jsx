import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from "@react-navigation/native";
import Constants from 'expo-constants';
import theme from  '../../Inventory/Themes/Theme';

const ReportView = () => {
  
  const navigation = useNavigation();

  const data = [
    { label: 'A', value: 50 },
    { label: 'B', value: 80 },
    { label: 'C', value: 30 },
    { label: 'D', value: 60 },
  ];


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
    backgroundColor: '#f5fcff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  
  split: {
    flexDirection: 'row'
  }
  
});

  return (
    
      <LinearGradient
        colors={['#961AFF', '#380E6B']}
        start={{ x: 0, y: 0 }} // Comienza desde la esquina superior izquierda
        end={{ x: 1, y: 0 }} // Termina en la esquina superior derecha
        style={styles.principalContainer}>
       
      <View style={styles.backButton}>
        <TouchableOpacity
        onPress={() => navigation.goBack()}>
          <Image
          source={require('../Assets/image (3).png')}
          style={styles.TextoModificar}/>
        </TouchableOpacity>
      </View>
      

      <ScrollView>
      
      </ScrollView> 
      </LinearGradient>
    
  );
};

export default ReportView;