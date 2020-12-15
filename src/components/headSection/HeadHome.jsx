import React from 'react'
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity} from 'react-native'
import { withNavigation } from '@react-navigation/compat'
import {Card, Button} from 'react-native-paper'

const HeadHome = ({navigation}) => {
    return (
        <View style={ styles.headLayout }>
            <View style={{ backgroundColor: 'khaki', height: 120, borderBottomLeftRadius: 0, borderBottomRightRadius: 35 }}>
                <Text></Text>
            </View>
            <View style={styles.headContent}>
                <Card style={{ elevation: 8, marginLeft: 20, marginRight: 20, borderRadius: 5}}>
                    <View style={styles.headInformation}>
                        <View style={styles.headSection1}>
                            <TouchableOpacity onPress={() => navigation.navigate('TransactionIn')}>
                                <Image source={require('../../../assets/transaction-in.png')} 
                                    style={{resizeMode: 'contain', width: 50, height: 50, alignSelf: 'center'}} 
                                /> 
                                <Text style={{ color: 'grey', fontWeight: 'bold', fontSize:10}} numberOfLines={1}>Transaksi Masuk</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.headSection1}>
                            <TouchableOpacity onPress={() => navigation.navigate('TransactionOut')}>
                                <Image source={require('../../../assets/cash-in.png')} 
                                    style={{resizeMode: 'contain', width: 50, height: 50, alignSelf: 'center'}} 
                                />
                                <Text style={{ color: 'grey', fontWeight: 'bold', fontSize:10}} numberOfLines={1}>Transaksi Keluar</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.headSection1}>
                            <TouchableOpacity onPress={() => navigation.navigate('MyProduct')}>
                                <Image source={require('../../../assets/bid-product1.png')} 
                                    style={{resizeMode: 'contain', width: 50, height: 50, alignSelf: 'center'}} 
                                />
                                <Text style={{ color: 'grey', fontWeight: 'bold', fontSize:10}} numberOfLines={1}>Produk Penawaran</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.headSection1}>
                            <TouchableOpacity onPress={() => navigation.navigate('BidHistory')}>
                                <Image source={require('../../../assets/history-bid.png')} 
                                    style={{resizeMode: 'contain', width: 50, height: 50, alignSelf: 'center'}} 
                                />
                                <Text style={{ color: 'grey', fontWeight: 'bold', fontSize:10}} numberOfLines={1}>Riwayat Bid</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Button icon="ios-add-circle" style={{ margin:10 }} mode="contained" onPress={() => navigation.navigate('ProductSell')}>
                        LELANG/JUAL BARANG
                    </Button>
                    <Button icon="ios-list" style={{ marginBottom:10, marginHorizontal:10 }} mode="contained" color={'green'} onPress={() => navigation.navigate('MyProductSell')}>
                        DAFTAR PRODUK DI LELANG
                    </Button>
                </Card>
            </View>
        </View>
    )
}

export default withNavigation(HeadHome)

const styles = StyleSheet.create({
    headLayout:{
        backgroundColor: 'white',
        height: 210
    },
    headContent:{
        backgroundColor: 'transparent',
        bottom: 110,
    },
    headInformation:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        margin: 10
    },
    headSection1:{
        backgroundColor: 'transparent',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        width: '20%',
    },
    headSection2:{
        backgroundColor: 'transparent',
        alignSelf: 'stretch',
        width: '70%'
    }
})
