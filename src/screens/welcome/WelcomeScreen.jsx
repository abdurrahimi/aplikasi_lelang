import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native'
import {useTheme, Button} from 'react-native-paper'
import * as Animatable from 'react-native-animatable'
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons, AntDesign } from '@expo/vector-icons'; 

const WelcomeScreen = ({navigation}) => {
    const { colors } = useTheme();
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Animatable.Image 
                        animation='bounceIn'
                        duration={1500}
                        source={require('../../../assets/logo-auction.png')}
                        style={styles.logo}
                        resizeMode={'stretch'}
                    />
            </View>
            <Animatable.View animation='fadeInUpBig' style={styles.body}>
                <Text style={styles.title}>Stay connect with everyone</Text>
                <Text style={styles.text}>Auction anywhere, anytime!</Text>
                <View style={styles.button}>
                    <TouchableOpacity onPress={() => navigation.replace('Signin')}>
                        <LinearGradient 
                            style={styles.signIn}
                            colors={['goldenrod', 'gold']}> 
                            <Text style={styles.textSign}>Get Started  </Text>
                            <AntDesign name='login' color='white' size={20} />
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
        </View>
    )
}

export default WelcomeScreen
const {height} = Dimensions.get('screen')
const height_logo = height * 0.7 * 0.4;
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'khaki'
    },
    header:{
        flex:2,
        justifyContent:'center',
        alignItems: 'center'
    },
    body:{
        flex:1,
        backgroundColor:'white',
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        paddingVertical:75,
        paddingHorizontal:30
    },
    logo:{
        width: height_logo*1.8,
        height: height_logo*1.8
    },
    title:{
        color: 'goldenrod',
        fontWeight: 'bold',
        fontSize:30
    },
    text:{
        color:'grey',
        marginTop:5
    },
    button:{
        alignItems:'flex-end',
        marginTop:30
    },
    signIn:{
        width:150,
        height:40,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:50,
        flexDirection:'row'
    },
    textSign:{
        color:'white',
        fontWeight:'bold',
    }
})
