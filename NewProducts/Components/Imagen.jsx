import {StyleSheet, Text, View, Image, TouchableOpacity} from "react-native"
import React, { useState } from "react"
import * as ImagePicker from "expo-image-picker"
import { launchCamera, launchImageLibrary } from "react-native-image-picker"

const OpenCamera = () =>{
  const [imgUrl, setimgUrl] = useState("https://img.freepik.com/foto-gratis/papel-pintado-gatito-lindo-fantasia_1409-6188.jpg")
  const [showView, setShowView] = useState(false);

  const handlePress = () => {
    setShowView(!showView);
  };

  const openCameraLib = async() =>{
    console.log("PRESSS=====>>")
    const result = await ImagePicker.launchCameraAsync({cameraType: ImagePicker.CameraType.front});
    setimgUrl(result?.assets[0]?.uri)
    console.log("RESULT ===>>", result)
  }
  const openImageLib = async() =>{
    console.log("PRESSS=====>>")
    const result = await ImagePicker.launchImageLibraryAsync({imageType: ImagePicker.MediaTypeOptions.Images});
    setimgUrl(result?.assets[0]?.uri)
    console.log("RESULT ===>>", result)
  }
  return(
    <View style = {styles.container}>
      <View>
      <Image resizeMode = "contain" style = {styles.img} source = {{uri: imgUrl}} />
      <TouchableOpacity onPress={handlePress} style={styles.button}>
        <Text >Agregar imagen</Text>
      </TouchableOpacity>
      {showView && (
      <View style={styles.view}>
      <TouchableOpacity style = {styles.btnCam} onPress = {openCameraLib}>
      <Image source={require('../Imagen/Camara.png')} style={styles.image} />
      </TouchableOpacity>
      <TouchableOpacity style = {styles.btnCam} onPress = {openImageLib}>
      <Image source={require('../Imagen/Image.png')} style={styles.image} />
      </TouchableOpacity>
      </View>
      )}
      
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  img: {
    width: 600,
    height: 600,
    alignSelf: "center",
    borderRadius: 6
  },
  image: {
    width: 100,
    height: 100,
  },
  button: {
    backgroundColor: 'white',
    borderBlockColor: "black",
    padding: 10,
    borderRadius: 5,
    alignItems: "center"
  },
  btnCam:{
    alignSelf:"center",
    justifyContent:"center",
    alignItems:"center",
    width:100,
    height:40,
    borderRadius:6,
    marginLeft: 30,
    
  },
  textBtn:{
    color:"#fff",
  },
  view: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    position: 'absolute',
    bottom: 50,
    left: 50,
    borderColor: "black",
    flexDirection: "row"
  },

})



export default OpenCamera