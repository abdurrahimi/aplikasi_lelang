import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { WebView } from 'react-native-webview';

const PaymentRedirectScreen = ({navigation, route}) => {
    const {urlPayment} = route.params
    return (
        <View style={styles.container}>
            {/* <Text>Payment Screen {urlPayment} </Text> */}
            <WebView originWhitelist={['*']} source={{uri:'http://sandbox.duitku.com/topup/topupdirectv2.aspx?ref=BKVISZDW7N1ZLCOYY'}} style={{ marginTop: 20 }} />
        </View>
    )
}
// AppRegistry.registerComponent('PaymentRedirectScreen', () => PaymentRedirectScreen);
export default PaymentRedirectScreen

const styles = StyleSheet.create({
    container:{
        flex:1,

    }
})
