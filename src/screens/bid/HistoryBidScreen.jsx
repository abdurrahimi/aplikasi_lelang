import React, { useEffect, useContext } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import {Context as BidContext} from '../../services/context/BidContext'
import {Context as UserContext} from '../../services/context/UserContext'
import {convertToRupiah} from '../../utils/GlobalHelper'
import {Appbar, List} from 'react-native-paper'

const HistoryBidScreen = ({navigation}) => {
    const {state:{bidder_id}} = useContext(UserContext)
    const {state, historyBid} = useContext(BidContext)

    useEffect(() => {
        historyBid(bidder_id)
        return () => {
            return null
        };
    }, []);


    const imageProduct = () => (
        <Image source={require('../../../assets/history-bid.png')}  style={{resizeMode: 'contain', width: 50, height: 45, alignSelf: 'center'}} />
    )
    return (
        <View style={styles.container}>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => navigation.goBack()}/>
                <Appbar.Content title="Riwaya Bid" subtitle='Daftar riwayat bid anda!'/>
            </Appbar.Header>
            {/* <Text> {JSON.stringify(state.historyBid)} </Text> */}
            {state.loading && (
                <Text style={{ color:'gray' }}> {state.message} </Text>
            )}
            {state.historyBid.map((item, i) => {
                return(
                    <List.Item style={styles.listItem} key={i}
                        // onPress={() => navigation.navigate('BidProduct',{
                        //     bidder_id: bidder_id,
                        // })}
                        title={item.nama_produk}
                        description={`Harga Penawaran : ${convertToRupiah(item.harga)}`}
                        left={imageProduct}
                        titleNumberOfLines={2}
                        titleStyle={{ fontWeight:'bold' }}
                        // right={props => <List.Icon {...props} icon="ios-arrow-forward" />}
                    />
                )
            })}
        </View>
    )
}

export default HistoryBidScreen

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
