import React, {useState, useContext, useEffect} from 'react'
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native'
import { Context as UserContext } from '../../services/context/UserContext'
import {Context as ProductContext} from '../../services/context/ProductContext'
import { Appbar, TextInput, Button, List, Badge, Card, Title, Paragraph } from 'react-native-paper'
import DatePicker from 'react-native-datepicker'

const {width} = Dimensions.get('window')

const ProductUpdateScreen = ({route, navigation}) => {
    const {lelang_id, nama_produk, kategori, start_harga, harga_final, kelipatan, tanggal_batas_lelang, gambar} = route.params
    const { state: { bidder_id } } = useContext(UserContext)
    const {state, UpdateProduct, getMyProducts} = useContext(ProductContext)
    const [value, setValue] = useState({
        nama_produk: nama_produk,
        kategori: kategori,
        start_harga: start_harga,
        harga_final: harga_final,
        kelipatan: kelipatan,
        tanggal_batas_lelang: tanggal_batas_lelang,
    }) 

    useEffect(() => {
        null
        return () => {
            getMyProducts(bidder_id)
        };
    }, []);

    const date_now = () => {
        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
        let dateNow = year+'-'+month+'-'+date;
        return dateNow.toString();
    }

    const handleChangeText = name => e => {
        let event = name !== 'nama_produk' && name !== 'kategori' ? e.replace(/\s/g, '') : e
        setValue({ 
            ...value,
            [name]: event 
        })
    }

    const handelUpdateProduct = () => {
        let formData = new FormData();
        formData.append('lelang_id', lelang_id);
        formData.append('nama_produk', value.nama_produk);
        formData.append('kategori', value.kategori);
        formData.append('start_harga', value.start_harga);
        formData.append('harga_final', value.harga_final);
        formData.append('kelipatan', value.kelipatan);
        formData.append('tanggal_batas_lelang', value.tanggal_batas_lelang);
        UpdateProduct(formData, () =>  navigation.goBack())
    }

    return (
        <View style={styles.container}>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => navigation.goBack()} />
                <Appbar.Content title={nama_produk} subtitle='Perbarui Data Produk' />
            </Appbar.Header>
            {/* <Text> {tanggal_batas_lelang} </Text> */}
            <ScrollView style={styles.formAdd} showsVerticalScrollIndicator={false}>
                <TextInput style={styles.formInput} label='Nama Produk' keyboardType='default' mode='outlined'
                    onChangeText={handleChangeText('nama_produk')} value={value.nama_produk}
                />

                <TextInput style={[styles.formInput,{backgroundColor:'darkgrey'}]} label='Kategori Produk' keyboardType='default' mode='outlined'
                    onChangeText={handleChangeText('kategori')} value={value.kategori} editable={false}
                />

                <TextInput style={styles.formInput} label='Harga Start' keyboardType='phone-pad' mode='outlined'
                    onChangeText={handleChangeText('start_harga')} value={value.start_harga}
                />

                <TextInput style={styles.formInput} label='Harga Final' keyboardType='phone-pad' mode='outlined' 
                    onChangeText={handleChangeText('harga_final')} value={value.harga_final}
                />

                <TextInput style={styles.formInput} label='Kelipatan Harga' keyboardType='phone-pad' mode='outlined'
                    onChangeText={handleChangeText('kelipatan')} value={value.kelipatan}
                />

                <DatePicker
                    style={[styles.formInput,{width: width*0.95, marginTop:15}]}
                    date={value.tanggal_batas_lelang}
                    mode="date"
                    placeholder="Batas Akhir Lelang"
                    format="YYYY-MM-DD"
                    minDate={date_now()}
                    onDateChange={handleChangeText('tanggal_batas_lelang')}
                    customStyles={{
                    // ... You can check the source to find the other keys.
                    }}
                />

                <Button icon="ios-open" style={{ marginVertical:20 }} mode="contained" 
                    loading={state.loading} 
                    disabled={state.loading}
                    onPress={handelUpdateProduct}
                >
                    {state.message !== '' ? state.message : 'UDPATE PRODUK'}
                </Button>

            </ScrollView>
        </View>
    )
}

export default ProductUpdateScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    formAdd:{
        margin:15
    },
    formInput:{
        marginVertical:5
    }
})
