import React, { useContext, useEffect } from 'react'
import {AsyncStorage, StyleSheet, Text, View } from 'react-native'
import {Context as UserContext} from '../services/context/UserContext'
import { ActivityIndicator, Colors } from 'react-native-paper';
import { withNavigation } from '@react-navigation/native';

const ResolveAuth = ({navigation}) => {
    const {UserData} = useContext(UserContext)
    useEffect(() => {
        const CheckSignin = async () => {
            const login = await AsyncStorage.getItem('login')
            if(login){
                navigation.replace('Index')
            }else{
                navigation.replace('Welcome')
            }
        }
        CheckSignin()
    }, [])

    return (
        <View style={styles.container}>
            <ActivityIndicator animating={true} color='gold' type='large' />
            <Text style={{ color: 'grey', marginVertical:10 }}>Mohon Tunggu...</Text>
        </View>
    )
}

export default ResolveAuth

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    }
})
