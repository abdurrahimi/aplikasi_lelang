import React, {useContext, useEffect, useState} from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import {Context as UserContext} from '../../services/context/UserContext'
import {Context as ProductContext} from '../../services/context/ProductContext'
import {Appbar, List, Badge, TextInput} from 'react-native-paper'

const ProductScreen = ({navigation}) => {
    const {state, getProduct} = useContext(ProductContext)
    const {state:{bidder_id}} = useContext(UserContext)
    const [data, setData] = useState([])
    useEffect(() => {
        getProduct().then(res => {
            setData(res)
        })
        return () => {
            return null
        };
    }, [])

    const convertToRupiah = (angka) => {
        var rupiah = '';		
        var angkarev = angka.toString().split('').reverse().join('');
        for(var i = 0; i < angkarev.length; i++) if(i%3 == 0) rupiah += angkarev.substr(i,3)+'.';
        return 'Rp. '+rupiah.split('',rupiah.length-1).reverse().join('');
    }

    const imageProduct = (url) => (
        <Image source={{uri: url,}} style={{resizeMode: 'contain', width: 50, height: 45, alignSelf: 'center'}} />
    )

    const arrayholder = state.productData;
    const searchFilterFunction = text => {    
        const newData = arrayholder.filter(item => {      
            const itemData = `${item.nama_produk.toUpperCase()} ${item.kategori.toUpperCase()}`;
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;    
        });
        setData(newData);  
    };

    return (
        <View style={styles.container}>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => navigation.goBack()}/>
                <Appbar.Content title="Bid Product" subtitle='Pilih Produk Lelang Tersedia!'/>
            </Appbar.Header>
            {/* <Text>{JSON.stringify(bidder_id)}</Text> */}
            {state.productData === '' && (
                <Text>Memuat Produk</Text>
            )}
            <TextInput
                label='Cari Produk'
                onChangeText={text => searchFilterFunction(text)}
            />
            {data.map((product,i) => {
                return(
                    <List.Item style={styles.listItem} key={i}
                        onPress={() => navigation.navigate('BidProduct',{
                            bidder_id: bidder_id,
                            lelang_id: product.lelang_id,
                            nama_produk: product.nama_produk,
                            kategori: product.kategori,
                            start_harga: product.start_harga,
                            kelipatan: product.kelipatan,
                            tanggal_batas_lelang: product.tanggal_batas_lelang,
                            gambar: product.gambar,
                            id_penjual: product.id_penjual,
                            status_lelang: product.status_lelang,
                            harga_final: product.harga_final,
                            sisa_hari: product.sisa_hari
                        })}
                        title={product.nama_produk}
                        description={`Harga dimulai dari : ${convertToRupiah(product.start_harga)}`}
                        left={() => imageProduct(product.gambar)}
                        titleNumberOfLines={2}
                        titleStyle={{ fontWeight:'bold' }}
                        right={props => <List.Icon {...props} icon="ios-arrow-forward" />}
                    />
                )
            })}
        </View>
    )
}

export default ProductScreen

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
