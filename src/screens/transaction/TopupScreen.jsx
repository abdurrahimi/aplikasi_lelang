import React, { useEffect, useContext, useState } from 'react'
import { StyleSheet, Text, View, Alert } from 'react-native'
import {Context as UserContext} from '../../services/context/UserContext'
import {Context as MoneyContext} from '../../services/context/MoneyContext'
import {Appbar, TextInput, Button} from 'react-native-paper'
import * as Linking from 'expo-linking';

const TopupScreen = ({navigation}) => {
    const {state:{bidder_id}} = useContext(UserContext)
    const {state, topup} = useContext(MoneyContext)
    const [ammount, setAmmount] = useState('')
    
    const handleSendTopup = () => {
        if(ammount === ''){
            Alert.alert('Paramater Kosong', 'Masukan Jumlah Topup Yang Di Inginkan!')
        }else{
            topup(bidder_id, ammount).then(res=>{
                Alert.alert('Lakukan Pambayaran','Aktifitas Halaman Dialihkan Ke WebBrowser!')
                Linking.openURL(res.data.paymentUrl);
                setAmmount('')
                // alert(res.data.paymentUrl)
                // navigation.navigate('Payment',{
                //     urlPayment: res.data.paymentUrl
                // })
            })
        }
        
    }

    return (
        <View style={styles.container}>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => navigation.goBack()}/>
                <Appbar.Content title="Topup Saldo" subtitle='Masukan Jumlah Saldo & Klik Lanjutkan!'/>
            </Appbar.Header>

            <View style={styles.formTopup}>
                <TextInput label='Jumlah Topup' mode='outlined' keyboardType='numeric' style={styles.textInput}
                    autoCapitalize='none'
                    value={ammount}
                    onChangeText={(value) => setAmmount(value)}
                />
                <Button icon="md-send" mode="contained" onPress={handleSendTopup} loading={state.loading} disabled={state.loading}>
                    {state.message !== '' ? state.message : 'Lanjutkan'}
                </Button>
            </View>
        </View>
    )
}

export default TopupScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    formTopup:{
        margin:10
    },
    textInput:{
        marginBottom:20
    },
    buttonSubmit:{
    
    }
})
