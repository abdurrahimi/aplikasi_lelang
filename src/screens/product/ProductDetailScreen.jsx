import React, { useContext, useState, useEffect } from 'react'
import { StyleSheet, Alert, Text, View, Image, Dimensions, ScrollView } from 'react-native'
import { Context as ProductContext } from '../../services/context/ProductContext'
import { Appbar, TextInput, Button, List, Badge, Card, Title, Paragraph } from 'react-native-paper'
import { convertToRupiah } from '../../utils/GlobalHelper'

const ProductDetailScreen = ({ route, navigation }) => {
    const { state, getProductDetail, bidderByProduct } = useContext(ProductContext)
    const { nama_produk, id_lelang, gambar, status_lelang } = route.params

    useEffect(() => {
        getProductDetail(id_lelang)
        bidderByProduct(id_lelang)
        return () => {
            null
        };
    }, []);


    return (
        <View style={styles.container}>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => navigation.goBack()} />
                <Appbar.Content title={nama_produk} subtitle='Situasi produk saat ini' />
            </Appbar.Header>
            <ScrollView>
                {/* <Text> {JSON.stringify(state.listBidderByProduct)} </Text> */}
                <Text style={styles.title}>Status Produk Saat Ini</Text>
                <Card>
                    <Card.Cover source={{ uri: gambar }} />
                    <Card.Content>
                        <Title> {nama_produk} </Title>
                        <Paragraph>Harga Mulai: {state.productDetail.start_harga} </Paragraph>
                        <Paragraph>Tanggal Batas Lelang: {state.productDetail.tanggal_batas_lelang} </Paragraph>
                        <Paragraph>
                            Status Lelang: <Text style={styles.status_lelang}>{status_lelang}</Text>
                        </Paragraph>
                    </Card.Content>
                    {status_lelang === 'Masih Berlanjut' && (
                        <Card.Actions>
                            <Button onPress={() => navigation.navigate('Product')} color={'green'}>Lakukan Kembali Penawaran</Button>
                        </Card.Actions>
                    )}
                    <View style={styles.listBidderSection}>
                        <Text style={styles.titleListBidder}>Daftar Penawar Produk</Text>
                        {state.listBidderByProduct.map((item, i) => {
                            return (
                                <List.Item style={styles.listItem} key={i}
                                    title={`Bid Ke ${item.bid_ke}`}
                                    description={`Penawaran : ${convertToRupiah(item.harga)}\nTanggal Bid: ${item.tanggal_bid}`}
                                    left={props => <List.Icon {...props} icon="ios-person" />}
                                    titleNumberOfLines={2}
                                    descriptionNumberOfLines={2}
                                    titleStyle={{ fontWeight: 'bold' }}
                                />
                            )
                        })}
                    </View>
                </Card>
                {/* <Text> {JSON.stringify(state.productDetail)} </Text> */}
            </ScrollView>

        </View>
    )
}

export default ProductDetailScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    title: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        marginVertical: 10
    },
    status_lelang: {
        fontWeight: 'bold'
    },
    listBidderSection: {
        margin: 10
    },
    titleListBidder: {
        alignSelf: 'center',
        fontWeight: 'bold',
        color: 'grey'
    }
})
