import React, { useContext, useState, useEffect } from 'react'
import { StyleSheet, Alert, Text, View, Image, Dimensions, ScrollView, Picker } from 'react-native'
import { Context as ProductContext } from '../../services/context/ProductContext'
import { Context as UserContext } from '../../services/context/UserContext'
import { Appbar, TextInput, Button, List, Badge } from 'react-native-paper'
import { convertToRupiah } from '../../utils/GlobalHelper'
import DatePicker from 'react-native-datepicker'

const { width } = Dimensions.get('window')

const ProductSellScreen = ({ navigation }) => {
    const { state, addProduct, getCategory } = useContext(ProductContext)
    const { state: { bidder_id } } = useContext(UserContext)
    const [value, setValue] = useState({
        nama_produk: '',
        kategori: '',
        start_harga: '',
        kelipatan: '',
        tanggal_batas_lelang: '',
        harga_final: ''
    })
    const { nama_produk, kategori, start_harga, harga_final, kelipatan, tanggal_batas_lelang } = value

    useEffect(() => {
        getCategory()
        return () => {
            null
        };
    }, []);

    const date_now = () => {
        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
        let dateNow = year + '-' + month + '-' + date;
        return dateNow.toString();
    }

    const handleChangeText = name => e => {
        let event = name !== 'nama_produk' && name !== 'kategori' ? e.replace(/\s/g, '') : e
        setValue({
            ...value,
            [name]: event
        })
    }

    const handleAddProduct = () => {
        let formData = new FormData();
        formData.append('id_penjual', bidder_id);
        formData.append('nama_produk', nama_produk);
        formData.append('kategori', kategori);
        formData.append('start_harga', start_harga);
        formData.append('harga_final', harga_final);
        formData.append('kelipatan', kelipatan);
        formData.append('tanggal_batas_lelang', tanggal_batas_lelang);
        addProduct(formData, () => navigation.goBack())
    }

    return (
        <View style={styles.container}>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => navigation.goBack()} />
                <Appbar.Content title='Lelang/Jual Produk' subtitle='Jual Produk Anda Disini!' />
            </Appbar.Header>
            <ScrollView style={styles.formAdd} showsVerticalScrollIndicator={false}>
                <Picker
                    selectedValue={kategori}
                    style={{height: 50, width: 400 }}
                    value={kategori}
                    onValueChange={handleChangeText('kategori')}
                >
                    <Picker.Item label="Pilih Kategori" value="" />
                    {state.categoryData.map((item,i) => {
                        return(
                            <Picker.Item label={item.kategori} value={item.kategori} />
                        )
                    })}
                    
                </Picker>
                <TextInput style={styles.formInput} label='Nama Produk' keyboardType='default' mode='outlined'
                    onChangeText={handleChangeText('nama_produk')} value={nama_produk}
                />

                {/* <TextInput style={styles.formInput} label='Kategori Produk' keyboardType='default' mode='outlined'
                    onChangeText={handleChangeText('kategori')} value={kategori}
                /> */}

                <TextInput style={styles.formInput} label='Harga Start' keyboardType='phone-pad' mode='outlined'
                    onChangeText={handleChangeText('start_harga')} value={start_harga}
                />

                <TextInput style={styles.formInput} label='Harga Final' keyboardType='phone-pad' mode='outlined'
                    onChangeText={handleChangeText('harga_final')} value={harga_final}
                />

                <TextInput style={styles.formInput} label='Kelipatan Harga' keyboardType='phone-pad' mode='outlined'
                    onChangeText={handleChangeText('kelipatan')} value={kelipatan}
                />

                <DatePicker
                    style={[styles.formInput, { width: width * 0.95, marginTop: 15 }]}
                    date={tanggal_batas_lelang}
                    mode="date"
                    placeholder="Batas Akhir Lelang"
                    format="YYYY-MM-DD"
                    minDate={date_now()}
                    onDateChange={handleChangeText('tanggal_batas_lelang')}
                    customStyles={{
                        // ... You can check the source to find the other keys.
                    }}
                />

                <Button icon="ios-add-circle" style={{ marginVertical: 20 }} mode="contained"
                    loading={state.loading}
                    disabled={state.loading}
                    onPress={handleAddProduct}
                >
                    {state.message !== '' ? state.message : 'JUAL PRODUK'}
                </Button>

            </ScrollView>

        </View>
    )
}

export default ProductSellScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    formAdd: {
        margin: 15
    },
    formInput: {
        marginVertical: 5
    }
})
