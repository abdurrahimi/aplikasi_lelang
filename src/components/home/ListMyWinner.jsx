import React, { useContext, useEffect } from 'react'
import { StyleSheet, Text, View, Image, ScrollView, Alert } from 'react-native'
import {Context as UserContext} from '../../services/context/UserContext'
import {Context as BidContext} from '../../services/context/BidContext'
import { Card, Button, Title, Paragraph, List } from 'react-native-paper';
import {convertToRupiah} from '../../utils/GlobalHelper'

const ListMyWinner = ({navigation}) => {
    const {state:{bidder_id}} = useContext(UserContext)
    const {state, getMyWin} = useContext(BidContext)
    
    useEffect(() => {
        getMyWin(bidder_id)
        return () => {
            null
        }
    }, [])

    const imageWin = () => (
        <Image source={require('../../../assets/cash-in.png')} 
            style={{resizeMode: 'contain', width: 75, height: 75, alignSelf: 'center'}} 
        />
    )

    const lanjutkanTransaksi = () => {
        Alert.alert(
            'Sedang Dalam Mode Pengembangan', 
            '(Jika Mode Production)Transaksi akan di alihkan pada halaman payment gateway dengan memberikan rincian transfer atau menarik saldo dari e-wallet yang terintegrasi dengan bank.'
        )
    }

    return (
        <View>
            {state.listMyWin.length > 0 && (
                <Text style={styles.title}>Bid yang anda menangkan! Selamat!</Text>
            )}
            <ScrollView>
                {state.listMyWin.map((item, i) => {
                    return (
                        // <List.Item style={styles.listItem} key={i}
                        //     title={`test`}
                        //     description={`test`}
                        //     left={imageWin}
                        //     titleNumberOfLines={2}
                        //     descriptionNumberOfLines={2}
                        //     titleStyle={{ fontWeight: 'bold' }}
                        // />
                        <Card key={i} style={styles.listItem}>
                            <Card.Cover source={{ uri: item.gambar }} />
                            <Card.Content>
                                <Title> {item.nama_produk} </Title>
                                <Paragraph>
                                    {`Kategori : ${item.kategori}\nStart Harga: ${convertToRupiah(item.start_harga)}\nKelipatan: ${convertToRupiah(item.kelipatan)}`}
                                </Paragraph>
                            </Card.Content>
                            <Card.Actions>
                                <Button color='green' onPress={lanjutkanTransaksi}>Lanjutkan Transaksi</Button>
                                {/* <Button>Ok</Button> */}
                            </Card.Actions>
                        </Card>
                    )
                })}
            </ScrollView>
            
        </View>
    )
}

export default ListMyWinner

const styles = StyleSheet.create({
    container:{

    },
    title:{
        marginVertical:10,
        fontWeight: 'bold',
        fontSize:20,
        alignSelf:'center',
        color:'grey'
    },
    listItem:{
        marginVertical:10
    }
})
