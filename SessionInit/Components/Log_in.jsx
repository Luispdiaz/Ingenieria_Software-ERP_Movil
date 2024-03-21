import React, { useState, useEffect } from 'react'
import { Alert, StyleSheet, TouchableOpacity,Text, ImageBackground, TextInput } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';
import { SupaClient } from '../../Supabase/supabase'
import { useDatabase } from  '../../Context/DatabaseContext';
import { useUser } from '../../Context/UserContext';

const Log_in = () =>{
    const supa = SupaClient();
    const navigation = useNavigation();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [ID_empresa, setIDempresa] = React.useState('');
    const {Database, buscarDatabase} = useDatabase();
    const {buscarUser} = useUser();
    const [prevDatabase, setPrevDatabase] = useState(null);
    const [isError, setIsError] = useState(false);


    async function signInWithEmail() {
        const { user, error } = await supa.auth.signInWithPassword({
          email: email,
          password: password,
        })
    
        if (error){ Alert.alert(error.message)
        setIsError(true);
        console.log(error.message)
        } else {
            setIsError(false);
        }
      }

    const ComprobarEmpresa = () => {
        if  (Database === null){
            alert("No hay base de datos");
        }else if (Database !== prevDatabase){
            console.log("Base de datos",Database)
            setPrevDatabase(Database);
        }
    };

    useEffect(() => {
        const fetchDatabaseAndCheckCompany = async () => {
            await buscarDatabase(ID_empresa);
            await buscarUser();
            ComprobarEmpresa();
        };
        fetchDatabaseAndCheckCompany();
    }, [ID_empresa]);

    return (
            <ImageBackground source={require('../Assets/fondo.png')} resizeMode="cover" style={styles.container} >
                <Text style={styles.Logo}>FLAMG</Text>
                <Text style={styles.Welcome}>Bienvenido de vuelta</Text>
                <Text style={styles.sign_in}>Por favor Ingrese su cuenta</Text>
                <TextInput style={styles.ID_Empresa}
                    placeholder='ID de Empresa'
                    placeholderTextColor='grey'
                    onChangeText={(texto3) => setIDempresa(texto3)}
                    onEndEditing = {() =>{
                        buscarDatabase(ID_empresa);
                        setIsError(true);
                    }} 
                />
                <TextInput style={styles.Usuario}
                    placeholder='Email'
                    placeholderTextColor='grey'
                    onChangeText={(texto) => setEmail(texto)}
                    value={email}
                    onEndEditing = {() =>{
                        buscarUser();
                    }}                  
                />
                <TextInput style={styles.Password}
                    placeholder='Password'
                    placeholderTextColor='grey'
                    onChangeText={(texto2) => setPassword(texto2)}
                    value={password}
                    onEndEditing = {() =>{
                        signInWithEmail();
                    }} 
                />

                <TouchableOpacity style={styles.button} 
                    disabled={isError}
                    onPress={() => {navigation.navigate("MenuPrincipal");}} > 
                    <Text>Sign In</Text>
                </TouchableOpacity>
            </ImageBackground>
        
    )
}
export default Log_in;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
        backgroundColor: '#090A16',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        padding: 20,
      },
      button: {
        backgroundColor: '#E909FF',
        borderWidth: 0,
        borderRadius: 500,
        paddingVertical: 15,
        paddingHorizontal:140,
        alignSelf: "center",
        marginTop: 90,
    },
    Welcome:{
        fontSize: 34,
        fontWeight: 'bold',
        color: 'white',
        marginTop: 100,
        marginLeft: 15,
    },
    sign_in:{
        fontSize: 12,
        fontWeight: 'bold',
        color: 'grey',
        marginTop: 10,
        marginLeft: 20,
    },
    Logo:{
        fontSize: 36,
        fontWeight: '400',
        color: 'white',
        marginBottom: 50,
        marginTop: 40,
        marginLeft: 30,
        letterSpacing: -4,
        transform: [{ scaleX: 1.4 }, { scaleY: 0.5 }],
    },
    forgot_password:{
        fontSize: 12,
        fontWeight: 'bold',
        color: 'white',
        marginTop: 25,
        marginLeft: 200,
    },
    ID_Empresa:{
        padding: 10,
        borderWidth: 1,
        fontWeight: 'bold',
        borderColor: "#4D09FF",
        color: "#FFFFFF",
        textAlign: "left",
        paddingStart: 30, 
        width: '90%',
        height: 50,
        marginTop: 60,
        marginLeft: 25,
        borderRadius: 25,
    },
    Usuario:{
        padding: 10,
        borderWidth: 1,
        fontWeight: 'bold',
        borderColor: "#4D09FF",
        color: "#FFFFFF",
        textAlign: "left",
        paddingStart: 30, 
        width: '90%',
        height: 50,
        marginTop: 20,
        marginLeft: 25,
        borderRadius: 25,
    },
    Password:{
        padding: 10,
        borderWidth: 1,
        fontWeight: 'bold',
        borderColor: "#4D09FF",
        color: "#FFFFFF",
        textAlign: "left",
        paddingStart: 30, 
        width: '90%',
        height: 50,
        marginTop: 20,
        marginLeft: 25,
        borderRadius: 25,
    },
})

 