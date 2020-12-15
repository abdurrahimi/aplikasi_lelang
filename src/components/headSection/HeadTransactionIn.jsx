import React from 'react'
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native'
import { withNavigation } from '@react-navigation/compat'
import {Card} from 'react-native-paper'

const HeadTransaction = ({navigation, saldo}) => {
    return (
        <View style={ styles.headLayout }>
            <View style={{ backgroundColor: '#303f9f', height: 74, borderBottomLeftRadius: 0, borderBottomRightRadius: 35 }}>
                <Text></Text>
            </View>
            <View style={styles.headContent}>
                <Card style={{ elevation: 8, marginLeft: 20, marginRight: 20, borderRadius: 5}}>
                    <View style={styles.headInformation}>
                        <View style={styles.headSection1}>
                            <TouchableOpacity onPress={() => navigation.navigate('Topup')}>
                                <Image source={require('../../../assets/topup-icon.png')} 
                                    style={{resizeMode: 'contain', width: 50, height: 50, alignSelf: 'center'}} 
                                /> 
                                <Text style={{ color: 'gray', fontWeight: 'bold', fontSize:15}} numberOfLines={1}>Topup Saldo</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.headSection1}>
                            <View style={{ flexDirection:'column', marginHorizontal:10 }}>
                                <Text style={{ color:'gray', fontSize:20, fontWeight:'bold' }}>Saldo </Text>
                                <Text style={{ color:'green', fontSize:22, fontWeight:'bold' }}>{saldo}</Text>
                            </View>
                            
                            {/* <Text>Topup saldo</Text> */}
                        </View>
                        
                        
                    </View>
                </Card>
            </View>
        </View>
    )
}

export default withNavigation(HeadTransaction)

const styles = StyleSheet.create({
    headLayout:{
        backgroundColor: 'white',
        height: 113
    },
    headContent:{
        backgroundColor: 'transparent',
        bottom: 50,
    },
    headInformation:{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        margin: 10
    },
    headSection1:{
        backgroundColor: 'transparent',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
    },
    headSection2:{
        backgroundColor: 'transparent',
        alignSelf: 'stretch',
        width: '70%'
    }
})
