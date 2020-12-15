import React, {useState, useContext} from 'react'
import { Text, StyleSheet, View, TouchableOpacity, Dimensions, SafeAreaView, ScrollView, Platform, StatusBar, KeyboardAvoidingView } from 'react-native'
import {Context as AuthContext} from '../../../services/context/AuthContext'
import { FontAwesome, Feather } from '@expo/vector-icons'; 
import {TextInput} from 'react-native-paper'
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable'

const SignupScreen = ({navigation}) => {
    const {state, Signup} = useContext(AuthContext);
    const [value, setValue] = useState({
        nama: '',
        email: '',
        telp: '',
        alamat: '',
        username: '',
        password: ''
    })

    const {nama, email, telp, alamat, username, password} = value

    const handleChangeText = name => e => {
        let event = name !== 'name' ? e.replace(/\s/g, '') : e
        setValue({ 
            ...value,
            [name]: event 
        })
    }

    const handleSignup = () => {
        let formData = new FormData();
        formData.append('nama', nama);
        formData.append('email', email);
        formData.append('telp', telp);
        formData.append('alamat', alamat);
        formData.append('username', username);
        formData.append('password', password);
        
        return Signup(formData, () => navigation.replace('Signin'))
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Animatable.Image 
                        animation='bounceIn'
                        duration={1500}
                        source={require('../../../../assets/logo-auction.png')}
                        style={styles.logo}
                        resizeMode={'stretch'}
                    />
                {/* <Text style={styles.textHeader}>Aplikasi Lelang Indonesia</Text> */}
            </View>
            <Animatable.View animation='fadeInUpBig' style={styles.body}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text style={styles.title}>Pendaftaran Akun</Text>
                    <Text style={styles.description}>Daftarkan akun dengan data yang valid!</Text>
                    {/* <Text>{JSON.stringify(value)}</Text> */}

                    <TextInput label='Nama Lengkap' type='flat' style={styles.textInput} 
                        onChangeText={handleChangeText('nama')} 
                    />
                    <TextInput label='Email' type='flat' textContentType='emailAddress' style={styles.textInput}
                        autoCapitalize='none'
                        onChangeText={handleChangeText('email')}
                    />
                    <TextInput label='Telp' type='flat' style={styles.textInput} 
                        keyboardType='numeric'
                        onChangeText={handleChangeText('telp')}
                    />
                    <TextInput label='Alamat' type='flat' multiline={true} style={styles.textInput} 
                        onChangeText={handleChangeText('alamat')} 
                    />
                    <TextInput label='Nama Pengguna' type='flat' style={styles.textInput} 
                        autoCapitalize='none' 
                        onChangeText={handleChangeText('username')} 
                    />
                    <TextInput label='Kata Sandi' type='flat' style={styles.textInput} 
                        autoCapitalize='none'
                        secureTextEntry 
                        onChangeText={handleChangeText('password')}
                    />
                    
                    <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
                        <Text style={{ color:'goldenrod', marginTop:10, fontWeight:'bold' }}>Sudah Punya Akun</Text>
                    </TouchableOpacity>
                    <View style={styles.button}>
                        {!state.loading && (
                            <TouchableOpacity onPress={handleSignup}>
                                <LinearGradient style={styles.signIn} colors={['goldenrod', 'gold']}> 
                                    <Text style={styles.textSign}>Daftar</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        )}

                        {state.loading && (
                            <LinearGradient style={styles.signIn} colors={['gray', 'darkgray']}> 
                                <Text style={styles.textSign}>{state.message}</Text>
                            </LinearGradient>
                        )}
                        {/* <TouchableOpacity 
                            onPress={() => navigation.navigate('Welcome')}
                            style={[styles.signIn, {borderColor:'#4dc2f8', borderWidth:1, marginTop:15}]}
                        >
                            <Text style={[styles.textSign,{color:'#4dc2f8'}]}>Sign Up</Text>
                        </TouchableOpacity> */}
                    </View>
                    </ScrollView>    
            </Animatable.View>
        </SafeAreaView>
    )
}

export default SignupScreen

const {height, width} = Dimensions.get('screen')
const height_logo = height * 0.4 * 0.4;

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: 'khaki',
        paddingTop:10
    },
    header:{
        flex:1.5,
        justifyContent:'center',
        alignItems: 'center'
    },
    logo:{
        width: height_logo*2.5,
        height: height_logo*2.5
    },
    textHeader: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20
    },
    body:{
        flex:3,
        backgroundColor:'white',
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        paddingHorizontal:20,
        paddingVertical:30
    },
    title:{
        color: 'goldenrod',
        fontWeight: 'bold',
        fontSize:30,
    },
    description:{
        color: 'goldenrod',
        fontSize:15,
        marginBottom:10
    },
    text_header:{
        color:'white',
        fontWeight:'bold',
        fontSize:30
    },
    text_footer:{
        color:'#05375a',
        fontSize:18
    },
    action:{
        flexDirection:'row',
        marginTop:10,
        borderBottomWidth:1,
        borderBottomColor:'#f2f2f2',
        paddingBottom:5
    },
    textInput:{
        backgroundColor:'transparent'
    },
    button:{
        alignItems:'center',
        marginTop:20
    },
    signIn:{
        width:width*0.9,
        height:50,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10
    },
    textSign:{
        fontSize:18,
        fontWeight:'bold',
        color:'white'
    }
})
