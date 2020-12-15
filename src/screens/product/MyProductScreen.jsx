import React, {useEffect, useState, useContext} from 'react'
import { StyleSheet, Text, View, Image} from 'react-native'
import {Context as BidContext} from '../../services/context/BidContext'
import {Context as UserContext} from '../../services/context/UserContext'
import {convertToRupiah} from '../../utils/GlobalHelper'
import {Appbar, List} from 'react-native-paper'

const MyProductScreen = ({navigation}) => {
    const {state:{bidder_id}} = useContext(UserContext)
    const {state, getMyProducts} = useContext(BidContext)

    useEffect(() => {
        getMyProducts(bidder_id)
        return () => {
            return null
        };
    }, []);

    const imageProduct = (url) => (
        <Image source={{ uri: url }}  style={{resizeMode: 'contain', width: 50, height: 45, alignSelf: 'center'}} />
    )

    return (
        <View style={styles.container}>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => navigation.goBack()}/>
                <Appbar.Content title="Produk Penawaran Saya" subtitle='Daftar Produk Yang Anda Bid.'/>
            </Appbar.Header>
            {state.loading && (
                <Text style={{ color:'gray' }}> {state.message} </Text>
            )}
            {state.myProducts.map((item, i) => {
                return(
                    <List.Item style={styles.listItem} key={i} 
                        onPress={() => navigation.navigate('ProductDetail',{
                            nama_produk : item.nama_produk,
                            id_lelang: item.id_lelang,
                            gambar: item.gambar,
                            status_lelang: item.status_lelang
                        })}
                        // onPress={() => navigation.navigate('BidProduct',{
                        //     bidder_id: bidder_id,
                        // })}
                        title={item.nama_produk}
                        description={`Kategori : ${item.kategori} | Status Lelang : ${item.status_lelang}`}
                        left={() => imageProduct(item.gambar)}
                        titleNumberOfLines={2}
                        descriptionNumberOfLines={2}
                        titleStyle={{ fontWeight:'bold' }}
                        // right={props => <List.Icon {...props} icon="ios-arrow-forward" />}
                    />
                )
            })}
        </View>
    )
}

export default MyProductScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: 'white'
    },
    listItem:{
        borderBottomWidth: 3,
        borderColor: 'rgba(123,101,80,0.15)'
    }
})
