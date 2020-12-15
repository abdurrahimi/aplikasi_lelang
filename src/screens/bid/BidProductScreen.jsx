import React, { useContext, useState, useEffect } from 'react'
import { StyleSheet, Alert, Text, View, Image, Dimensions, ScrollView, FlatList, TouchableOpacity } from 'react-native'
import { Context as BidContext } from '../../services/context/BidContext'
import { Context as ProductContext } from '../../services/context/ProductContext'
import { Context as UserContext } from '../../services/context/UserContext'
import { Appbar, TextInput, Button, List, Badge, Avatar, Card, Title, Paragraph } from 'react-native-paper'
import { convertToRupiah } from '../../utils/GlobalHelper'
import CountDown from 'react-native-countdown-component';

const BidProductScreen = ({ route, navigation }) => {
    const { state: { userData } } = useContext(UserContext)
    const { state: { listBidderByProduct }, bidderByProduct, getSimilarity } = useContext(ProductContext)
    const { state, addBid, historyProductBid } = useContext(BidContext)
    const { bidder_id, lelang_id, nama_produk, kategori, id_penjual, start_harga, kelipatan, tanggal_batas_lelang, gambar, sisa_hari } = route.params
    const [bid, setBid] = useState(0)
    const [similarity, setSimilarity] = useState([])

    useEffect(() => {
        getSimilarity(lelang_id, start_harga, kelipatan, kategori).then(res => {
            setSimilarity(res)
        })
        historyProductBid(bidder_id, lelang_id)
        bidderByProduct(lelang_id)
        return () => {
            null
        }
    }, [])


    const handleBid = () => {
        if (parseInt(bid) > parseInt(userData.saldo)) {
            Alert.alert(
                "Saldo Tidak Cukup",
                "Maaf saldo anda tidak mencukupi untuk melakukan bid.",
                [
                    {
                        text: "Batal",
                        onPress: () => console.log("Cancel"),
                        style: "cancel"
                    },
                    {
                        text: "Isi Saldo",
                        onPress: () => navigation.navigate('TransactionIn'),
                    },
                ],
                { cancelable: false }
            );
        } else {
            if (parseInt(bid) <= parseInt(start_harga)) {
                Alert.alert('Penawaran Tidak Valid', 'Pastikan Penawaran di atas harga mulai')
            } else {
                if (state.historyProductBid.length >= 3) {
                    Alert.alert('Penawaran Batas Maksimal', 'Penawaran dibatasi sampai 3 kali!')
                } else {
                    addBid(lelang_id, bidder_id, bid, () => navigation.goBack())
                }
            }
        }
    }

    // const similarityData = [
    //     { nama_produk: 'produk1', kategori: 'kategori1' },
    //     { nama_produk: 'produk2', kategori: 'kategori2' },
    //     { nama_produk: 'produk2', kategori: 'kategori2' },
    // ];
    const LeftContent = props => <Avatar.Icon {...props} icon="folder" />
    const renderItemSimilarity = (item) => {
        return (
            <Card style={{ marginHorizontal: 20 }}>
                <Card.Content numberOfLines={1}>
                    <Title style={{ fontSize: 15 }} numberOfLines={1}> {item.kategori} </Title>
                    <Paragraph> {item.nama_produk} </Paragraph>
                </Card.Content>
                <TouchableOpacity>
                    <Card.Cover source={{ uri: item.gambar }} style={{ width: 200 }} />
                </TouchableOpacity>
                <Card.Actions>
                    <Button color='grey'> Similarity : {item.similarity * 100} % </Button>
                </Card.Actions>
            </Card>
        )
    }

    return (
        <View style={styles.container}>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => navigation.goBack()} />
                <Appbar.Content title={nama_produk} subtitle='Ajukan harga terbaik untuk mendapatkan barang!' />
            </Appbar.Header>
            {/* <Text> {userData.saldo} </Text> */}
            <ScrollView>
                <View style={styles.photoContainer}>
                    <Image source={{ uri: gambar }} style={styles.imageContainer} />
                </View>
                <Text style={{ alignSelf:'center', fontWeight:'bold', marginVertical:10 }}>Batas Waktu Lelang </Text>
                <CountDown
                    until={sisa_hari*86400}
                    onFinish={() => alert('Waktu Lelang Sudah Habis!')}
                    onPress={() => Alert.alert('Batas Waktu','Batas Waktu Lelang')}
                    size={20}
                    timeToShow={['D','H','M', 'S']}
                    timeLabels={{d:'Hari',h:'Jam',m: 'Menit', s: 'Detik'}}
                />
                {/* <Text> {bid} </Text> */}
                <View style={styles.informationContainer}>
                    <Text style={styles.titleInformation}>Informasi Produk Lelang</Text>
                    <Text style={styles.descriptionInformation}>Nama Produk : {nama_produk}</Text>
                    <Text style={styles.descriptionInformation}>Kategori : {kategori}</Text>
                    <Text style={styles.descriptionInformation}>Penjual : {id_penjual}</Text>
                    <Text style={styles.descriptionInformation}>Harga dimulai dari : {convertToRupiah(start_harga)}</Text>
                    <Text style={styles.descriptionInformation}>Tanggal Batas Lelang : {tanggal_batas_lelang}</Text>
                </View>

                <View style={styles.bidContainer}>
                    <TextInput label='Penawaran Harga' keyboardType='numeric' mode='outlined'
                        value={bid} onChangeText={(value) => setBid(value)}
                    />
                    <Button icon="ios-add-circle" style={{ margin: 20 }} mode="contained" onPress={handleBid} disabled={state.loading}>
                        Ajukan Penawaran
                    </Button>
                </View>
                <Text style={{ alignSelf: 'center', fontWeight: 'bold', fontSize: 18, color: 'grey' }}>Rekomendasi Lelang</Text>
                <FlatList
                    data={similarity}
                    horizontal={true}
                    numColumns={1}
                    renderItem={({ item }) => renderItemSimilarity(item)}
                    keyExtractor={(item, index) => index.toString()}
                />

                <View style={styles.listBidderSection}>
                    <Text style={styles.titleListBidder}>Daftar Penawar Produk</Text>
                    {listBidderByProduct.map((item, i) => {
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
            </ScrollView>

        </View>
    )
}

export default BidProductScreen
const { height, width } = Dimensions.get('screen')
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    photoContainer: {
        backgroundColor: '#303f9f',
        alignItems: 'center'
    },
    imageContainer: {
        width: width,
        height: 250,
        opacity: 0.9
    },
    informationContainer: {
        margin: 10
    },
    titleInformation: {
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        color: 'gray'
    },
    descriptionInformation: {
        color: 'gray',
        marginVertical: 5
    },
    bidContainer: {
        margin: 10
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
