import React, { useEffect, useState, useContext } from 'react'
import { Alert, StyleSheet, Text, View, Image } from 'react-native'
import { Context as ProductContext } from '../../services/context/ProductContext'
import { Context as UserContext } from '../../services/context/UserContext'
import { convertToRupiah } from '../../utils/GlobalHelper'
import { Appbar, List } from 'react-native-paper'

const MyProductSellScreen = ({ navigation }) => {
    const { state: { bidder_id } } = useContext(UserContext)
    const { state, getMyProducts, closeAuction } = useContext(ProductContext)

    useEffect(() => {
        getMyProducts(bidder_id)
        return () => {
            return null
        };
    }, []);

    const statusLelang = (status) => {
        if(status == 1){
            var value = 'Dibuka'
        }else{
            var value = 'Ditutup'
        }
        return value
    }

    const handleClickProduct = (lelang_id, nama_produk, kategori, start_harga, harga_final, tanggal_batas_lelang, kelipatan, gambar) => {
        Alert.alert(
            "Produk di Pilih",
            "Pilih untuk memperbarui atau menghapus produk",
            [
                {
                    text: "Batal",
                    onPress: () => console.log("Cancel"),
                    style: "cancel"
                },
                {
                    text: "Perbarui",
                    onPress: () => alertUpdateProduct(lelang_id, nama_produk, kategori, start_harga, harga_final, tanggal_batas_lelang, kelipatan, gambar),
                },
                {
                    text: "Tutup Lelang",
                    onPress: () => handleCloseAuction(lelang_id),
                }
            ],
            { cancelable: false }
        );
    }

    const alertUpdateProduct = (lelang_id, nama_produk, kategori, start_harga, harga_final, tanggal_batas_lelang, kelipatan, gambar) => {
        Alert.alert(
            "Perbarui Produk",
            "Pilih untuk Memperbarui Gambar atau Data Produk",
            [
                {
                    text: "Batal",
                    onPress: () => console.log("Cancel"),
                    style: "cancel"
                },
                {
                    text: "Perbarui Gambar",
                    onPress: () => navigation.navigate('ProductUpdateImage', {
                        lelang_id : lelang_id, 
                        nama_produk: nama_produk, 
                        kategori: kategori, 
                        start_harga: start_harga, 
                        tanggal_batas_lelang: tanggal_batas_lelang, 
                        gambar: gambar
                    }),
                },
                {
                    text: "Perbarui Data",
                    onPress: () => navigation.navigate('ProductUpdate',{
                        lelang_id : lelang_id, 
                        nama_produk: nama_produk, 
                        kategori: kategori, 
                        start_harga: start_harga, 
                        harga_final: harga_final,
                        kelipatan: kelipatan,
                        tanggal_batas_lelang: tanggal_batas_lelang, 
                        gambar: gambar
                    }),
                }
            ],
            { cancelable: false }
        );
    }

const handleCloseAuction = (lelang_id) => {
    closeAuction(lelang_id).then(res =>{
        getMyProducts(bidder_id)
    })
}

    const imageProduct = (url) => (
        <Image source={{ uri: url }} style={{ resizeMode: 'contain', width: 50, height: 45, alignSelf: 'center' }} />
    )
    const imageProductNull = () => (
        <Image source={require('../../../assets/bid-product1.png')} style={{ resizeMode: 'contain', width: 50, height: 45, alignSelf: 'center' }} />
    )

    return (
        <View style={styles.container}>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => navigation.goBack()} />
                <Appbar.Content title="Produk Di Lelang" subtitle='Daftar Produk Yang Anda Lelang' />
            </Appbar.Header>
            {state.loading && (
                <Text style={{ color: 'gray' }}> {state.message} </Text>
            )}
            {state.myProductData.map((item, i) => {
                return (
                    <List.Item style={styles.listItem} key={i}
                        onPress={() => handleClickProduct(
                            item.lelang_id,
                            item.nama_produk,
                            item.kategori,
                            item.start_harga,
                            item.harga_final,
                            item.tanggal_batas_lelang,
                            item.kelipatan,
                            item.gambar,
                        )}
                        title={item.nama_produk}
                        description={
                            `Harga Start : ${convertToRupiah(item.start_harga)}\nHarga Final : ${convertToRupiah(item.harga_final)}\nStatus: ${statusLelang(item.status_lelang)}`
                        }
                        left={item.gambar === null ? imageProductNull : () => imageProduct(item.gambar)}
                        right={props => <List.Icon {...props} icon="md-open" />}
                        titleNumberOfLines={3}
                        descriptionNumberOfLines={3}
                        titleStyle={{ fontWeight: 'bold' }}
                    />
                )
            })}
        </View>
    )
}

export default MyProductSellScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    listItem: {
        borderBottomWidth: 3,
        borderColor: 'rgba(123,101,80,0.15)'
    }
})
