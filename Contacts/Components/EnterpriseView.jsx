import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useCompanyContext } from '../../Context/CompanyContext'; // Ajusta la ruta según tu estructura de archivos
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from "@react-navigation/native";
import Constants from 'expo-constants';
import theme from  '../Themes/Theme';

const EnterpriseView = () => {
  const { empresa } = useCompanyContext(); // Obtén el registro de la empresa del contexto
  const navigation = useNavigation();


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
    margin: 30,
    zIndex: 1,
    alignSelf:'flex-start',
    justifyContent:'flex-start',
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
    width:  30, 
    height: 27
  },
  littleDataBox: {
    width:'50%',
    height: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    
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
      <Image source={{uri: empresa._j.imagen_logo}} style={styles.photo} />
      <ScrollView>
      <View style={styles.dataContainer}>
        <View style={styles.transparentBox}>
          <Text style={styles.mainTitle}>{empresa._j.nombre}</Text>
          <View style={styles.disgustingGreenBox}>
            <Image style={styles.littleIcon} source={require('../Assets/assetC_4.png')} />
            <Text style={styles.strongLittleText}> Gestion empleados</Text>
          </View>
        </View>
        <View style={styles.darkBox}>
          <Text style={[styles.strongLittleText, {width: '100%'}]}>Información empresa</Text>
          <View style={styles.split}>
            <View style={styles.littleDataBox}>
              <Image style={styles.littleIcon} source={require('../Assets/storeIcon.png')} />
              <Text style={styles.littleText}>{empresa._j.nombre}</Text>
            </View>
            <View style={styles.littleDataBox}>
              <Image style={styles.littleIcon} source={require('../Assets/locationIcon.png')} />
              <Text style={styles.littleText}>{empresa._j.direccion}</Text>
            </View>
          </View>
          <View style={styles.split}>
            <View style={styles.littleDataBox}>
              <Image style={styles.littleIcon} source={require('../Assets/idIcon.png')} />
              <Text style={[styles.littleText, {color: '#E909FF'}]}>RIF: {empresa._j.nro_rif}</Text>
            </View>
            <View style={styles.littleDataBox}>
              <Image style={styles.littleIcon} source={require('../Assets/phoneIcon.png')} />
              <Text style={styles.littleText}>+{empresa._j.cod_telefono} {empresa._j.telefono}</Text>
            </View>
          </View>
          <View style={styles.split}>
            <View style={[styles.littleDataBox, {width: '100%'}]}>
              <Image style={styles.littleIcon} source={require('../Assets/mailIcon.png')} />
              <Text style={styles.littleText}>{empresa._j.correo}</Text>
            </View>
          </View>
        </View>
      



        <View style={styles.darkBox}>
          <Text style={[styles.strongLittleText, {width: '100%'}]}>Actividad empresa</Text>
            <View style={styles.littleDataBox}>
              <Text style={[styles.littleText, {color: '#E909FF'}]}>{empresa._j.actividad_empresa}</Text>
            </View>
        </View>

        <View style={styles.darkBox}>
          <Text style={[styles.strongLittleText, {width: '100%'}]}>Código postal</Text>
            <View style={styles.littleDataBox}>
              <Image style={styles.littleIcon} source={require('../Assets/postalcodeIcon.png')} />
              <Text style={styles.littleText}>{empresa._j.codigo_postal}</Text>
            </View>
        </View>

        <View style={styles.darkBox}>
          <Text style={[styles.strongLittleText, {width: '100%'}]}>Empresa origen</Text>
            <View style={styles.littleDataBox}>
              <Image style={styles.littleIcon} source={require('../Assets/companyIcon.png')} />
              <Text style={styles.littleText}>{empresa._j.empresa_origen}</Text>
            </View>
        </View>

        <View style={styles.darkBox}>
          <Text style={[styles.strongLittleText, {width: '100%'}]}>Propietario</Text>
            <View style={styles.littleDataBox}>
              <Image style={styles.littleIcon} source={require('../Assets/contactIcon.png')} />
              <Text style={styles.littleText}>{empresa._j.propietario}</Text>
            </View>
            <View style={styles.littleDataBox}>
              <Image style={styles.littleIcon} source={require('../Assets/idIcon.png')} />
              <Text style={[styles.littleText, {color: '#E909FF'}]}>{empresa._j.rif_propietario}</Text>
            </View>
        </View>

        <View style={styles.darkBox}>
          <Text style={[styles.strongLittleText, {width: '100%'}]}>Enlace web</Text>
            <View style={styles.littleDataBox}>
              <Text style={[styles.littleText, {color: '#E909FF'}]}>{empresa._j.web}</Text>
            </View>
        </View>

        <View style={styles.darkBox}>
          <Text style={[styles.strongLittleText, {width: '100%'}]}>Clave Administrador</Text>
            <View style={styles.littleDataBox}>
              <Text style={[styles.littleText, {color: '#E909FF'}]}>{empresa._j.clave_administrador}</Text>
            </View>
        </View>
        
      </View>
      </ScrollView> 
      </LinearGradient>
    
  );
};

export default EnterpriseView;
