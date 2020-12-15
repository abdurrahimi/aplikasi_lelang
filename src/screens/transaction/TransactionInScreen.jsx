import React, {useContext, useEffect} from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import {Context as UserContext} from '../../services/context/UserContext'
import {Appbar, List} from 'react-native-paper'
import { withNavigation } from '@react-navigation/compat'
import HeadTransactionIn from '../../components/headSection/HeadTransactionIn'
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler'
import {convertToRupiah} from '../../utils/GlobalHelper'
import ListMyWinner from '../../components/home/ListMyWinner'

const TransactionIn = ({navigation}) => {
    const {state, getSaldo} = useContext(UserContext)
    useEffect(() => {
        getSaldo(state.bidder_id)
        return () => {
            null
        };
    }, []);
    const imageProduct = (url) => (
        <Image source={{uri: url,}} style={{resizeMode: 'contain', width: 50, height: 45, alignSelf: 'center'}} />
    )
    return (
        <View style={ styles.container}>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => navigation.goBack()}/>
                <Appbar.Content title="Transaksi Masuk" subtitle='Daftar Transaksi Masuk!'/>
            </Appbar.Header>
            <HeadTransactionIn saldo={state.loading?state.message:convertToRupiah(state.saldo)} />
            <ScrollView>
                <Text style={styles.statusInformation}>Belum Ada Transaksi Masuk</Text>
                <ListMyWinner/>
            </ScrollView>
            {/* <List.Item style={styles.listItem}
                        onPress={() => navigation.navigate('BidProduct',{
                            bidder_id: bidder_id,
                        })}
                        title='test'
                        description={`test`}
                        left={() => imageProduct('https://png.pngtree.com/png-vector/20190115/ourlarge/pngtree-vector-location-icon-png-image_317888.jpg')}
                        titleNumberOfLines={2}
                        titleStyle={{ fontWeight:'bold' }}
                        right={props => <List.Icon {...props} icon="ios-arrow-forward" />}
                    /> */}
        </View>
    )
}

export default withNavigation(TransactionIn)

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'white'
    },
    statusInformation:{
        alignSelf:'center',
        marginVertical: 20,
        fontWeight:'bold',
        fontSize:15,
        color: 'rgba(144, 24, 56, 0.53)'
    }
})
