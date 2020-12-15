import React, {Fragment, useState, useEffect, useContext} from 'react'
import { StyleSheet, Image, View, ActivityIndicator, Alert } from 'react-native';
import {Context as ProductContext} from '../../services/context/ProductContext'
import { Context as UserContext } from '../../services/context/UserContext'
import {Appbar, List, Text, Button} from 'react-native-paper'
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

const ProductUpdateImage = ({route,navigation}) => {
    const {state, uploadImageProduct, getMyProducts} = useContext(ProductContext)
    const { state: { bidder_id } } = useContext(UserContext)
    const {lelang_id, nama_produk, kategori, start_harga, tanggal_batas_lelang, gambar} = route.params
    const [value, setValue] = useState({
        avatarSource: null,
        isUpload: false,
        filename: null
    })
    const {avatarSource, isUpload, filename} = value
    
    const getPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    };

    useEffect(() => {
        getPermissionAsync()
        return () => {
            getMyProducts(bidder_id)
        };
    }, []);

    const pickImage = async () => {
        // setState({...state, isUpload: true})
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 4],
                quality: 1,
            });
            if (!result.cancelled) {
                let localUri = result.uri;
                let filename = localUri.split('/').pop();
                // uploadImage(result.uri, filename)
                setValue({
                    isUpload: false,
                    avatarSource: localUri,
                    filename: filename
                })
            }else{
                setValue({
                    isUpload: false,
                    avatarSource: null,
                    filename: null
                })
            }
            console.log(result);
        }catch (E) {
            console.log(E);
        }
    };

    const pickCamera = async () => {
        try {
            let result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 4],
                quality: 1,
            });
            if (!result.cancelled) {
                let localUri = result.uri;
                let filename = localUri.split('/').pop();
                // uploadImage(result.uri, filename)
                setValue({
                    isUpload: false,
                    avatarSource: localUri,
                    filename: filename
                })
            }else{
                setValue({
                    isUpload: false,
                    avatarSource: null,
                    filename: null
                })
            }
            console.log(result);
        }catch (E) {
            console.log(E);
        }
    };

    const handleUploadImage = (image_uri, image_name) => {
        let formData = new FormData();
        formData.append('lelang_id', lelang_id);
        formData.append('nama_produk', nama_produk);
        formData.append('kategori', kategori);
        formData.append('start_harga', start_harga);
        formData.append('tanggal_batas_lelang', tanggal_batas_lelang);
        formData.append('gambar', {type:'image/jpg', uri:image_uri, name:image_name});

        return uploadImageProduct(formData, ()=>navigation.goBack())
    }

    return (
        <View>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => navigation.goBack()}/>
                <Appbar.Content title="Perbarui Gambar" subtitle='Perbarui Gambar Produk Anda'/>
            </Appbar.Header>
            {avatarSource !== null && (
                <Fragment>
                    <Image source={{ uri: avatarSource }} style={{ width: 200, height: 200, alignSelf:'center', marginTop:20 }} />
                    <Button style={{ margin:10 }} disabled={state.loading} loading={state.loading} icon='md-cloud-upload' mode="contained" color='midnightblue' onPress={() => handleUploadImage(avatarSource,filename)}>
                        {state.message !== ''?state.message:'Upload'}
                    </Button>
                </Fragment>
            )}
            <Text style={{ alignSelf:'center', marginTop:10, color:'grey' }}>Pilih Sumber Gambar</Text>
            <View style={{ flexDirection:'row', alignItems:'center', justifyContent:'center', marginVertical:10}}>
                <Button style={{ margin:10 }} icon="ios-image" mode="contained" color='gold' onPress={pickImage}>
                    Galeri
                </Button>
                <Button style={{ margin:10 }} title="Kamera" icon="ios-camera" mode="contained" color='gold' onPress={pickCamera}>
                    Kamera
                </Button>
            </View>
            {gambar !== null && (
                <Fragment>
                    <Image source={{ uri: gambar }} style={{ width: 200, height: 200, alignSelf:'center', marginTop:20 }} />
                </Fragment>
            )}
        </View>
    )
}

export default ProductUpdateImage

const styles = StyleSheet.create({
    container:{
        flex:1,
    }
})
