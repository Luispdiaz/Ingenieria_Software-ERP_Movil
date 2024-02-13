import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';



const Header = () =>  {
  return (
    <View>
      <Text style = {styles.titulo}>Modificar producto
      </Text>
      <Text style = {styles.subtitulo}>Rellena los siguientes campos</Text>
    </View>
  );
  }

const styles = StyleSheet.create({
    titulo: {
      fontSize: 32,
      color: "#FFFFFF",
      fontWeight: 'bold',
      marginLeft:15,
      marginTop:70
    },
    subtitulo:{
      fontSize: 13,
      color: "#FFFFFF",
      fontWeight: 'bold',
      marginLeft:15,
    }
  });

export default Header