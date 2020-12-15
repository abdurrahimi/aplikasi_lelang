import React, {useState, useContext} from 'react'
import {Context as AuthContext} from '../../../services/context/AuthContext'
import { Text, StyleSheet, View, TextInput, TouchableOpacity, Dimensions, SafeAreaView, ScrollView, Platform, StatusBar, KeyboardAvoidingView } from 'react-native'
import { FontAwesome, Feather } from '@expo/vector-icons'; 
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';

const SigninScreen = ({navigation}) => {
    const {state, Signin} = useContext(AuthContext)

    const [data, setData] = useState({
        change_textInputChange: false,
        secureTextEntry: true,
    })
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const textInputChange = (value) => {
        setEmail(value.replace(/\s/g, ''))
        if(value.length > 5){
            setData({
                ...data,
                check_textInputChange: true
            })
        }else{
            setData({
                ...data,
                check_textInputChange: false
            })
        }
    }

    const secureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        })
    }

    const handleSignin = () => {
        return Signin(email, password, () => navigation.replace('ResolveAuth'))
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
                <ScrollView behavior='padding'>
                    <Text style={styles.title}>Login Akun</Text>
                    <Text style={styles.description}>Login dengan akun terdaftar</Text>
                    <Text style={styles.text_footer}>Email / Nama Penguna</Text>
                    <View style={styles.action}>
                        <FontAwesome name='user-o' color='#05375a' size={20} />
                        <TextInput 
                            textContentType='emailAddress'
                            autoCapitalize='none'
                            autoCompleteType='email'
                            keyboardType='email-address'
                            placeholder='Email / Nama Pengguna Terdaftar' 
                            style={styles.textInput} 
                            value={email}
                            onChangeText={(text) => textInputChange(text)}
                        />
                        {data.check_textInputChange ? 
                            <Animatable.View animation='bounceIn'>
                                <Feather name='check-circle' color='green' size={20} />
                            </Animatable.View>
                            : null
                        }
                    </View>
                    <Text style={[styles.text_footer,{marginTop:15}]}>Kata Sandi</Text>
                    <View style={styles.action}>
                        <FontAwesome name='lock' color='#05375a' size={20} />
                        <TextInput 
                            textContentType='password'
                            secureTextEntry={data.secureTextEntry}
                            placeholder='**************' 
                            style={styles.textInput} 
                            value={password}
                            onChangeText={(text) => setPassword(text.replace(/\s/g, ''))}
                        />
                        <TouchableOpacity onPress={secureTextEntry}>
                            <Feather name={data.secureTextEntry ? 'eye-off':'eye'} color='gray' size={20} />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                        <Text style={{ color:'goldenrod', marginTop:10, fontWeight:'bold' }}>Pendaftaran Akun</Text>
                    </TouchableOpacity>
                    <View style={styles.button}>
                        {!state.loading && (
                            <TouchableOpacity onPress={handleSignin}>
                                <LinearGradient style={styles.signIn} colors={['goldenrod', 'gold']}> 
                                    <Text style={styles.textSign}>Masuk</Text>
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

export default SigninScreen

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
        marginBottom:20
    },
    text_header:{
        color:'white',
        fontWeight:'bold',
        fontSize:30
    },
    text_footer:{
        color:'goldenrod',
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
        flex:1,
        paddingLeft:10,
        color:'black'
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
