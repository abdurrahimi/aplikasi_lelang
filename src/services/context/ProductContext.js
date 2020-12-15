import {Alert} from 'react-native'
import CreateDataContext from './CreateDataContext'
import {API_ART} from '../api/ARTApi'

const ProductReducer = (state, action) => {
    switch(action.type){
        case 'LOADING':
            return{
                ...state,
                loading: true,
                message: action.payload
            }
        case 'GET_PRODUCT':
            return{
                ...state,
                loading: false,
                message: '',
                productData: action.payload
            }
        case 'GET_PRODUCT_DETAIL':
            return{
                ...state,
                loading: false,
                message: '',
                productDetail: action.payload
            }
        case 'ADD_PRODUCT':
                return{
                    ...state,
                    loading: false,
                    message: '',
                }
        case 'GET_MY_PRODUCTS':
            return{
                ...state,
                loading: false,
                message: '',
                myProductData: action.payload
            }
        case 'UPDATE_IMAGE':
            return{
                ...state,
                loading: false,
                message: '',
            }
        case 'BID_LIST_BY_ID':
            return{
                ...state,
                loading: false,
                message: '',
                listBidderByProduct: action.payload
            }
        case 'CLOSE_AUCTION':
            return{
                ...state,
                loading: false,
                message: '',
            }
        case 'GET_SIMILARITY':
            return{
                ...state,
                loading: false,
                message: '',
                similarityData: action.payload
            }
        case 'GET_KATEGORI':
            return{
                ...state,
                loading: false,
                message: '',
                categoryData: action.payload
            }
        default:
            return state
    }
}

const getProduct = dispatch => async () => {
    dispatch({type: 'LOADING', payload: 'Memuat data produk...'})
    try{
        let response = await fetch(`${API_ART}/services.php?type=getLelang`, {
            method: 'POST',
            headers: {
                'Accept' : 'application/json',
                'Content-Type': 'multipart/form-data',
            },
        })
        let responseJson = await response.json()
        // alert(JSON.stringify(responseJson))
        dispatch({type:'GET_PRODUCT', payload:responseJson.data})
        // alert(JSON.stringify(responseJson.data))
        return responseJson.data
        
    }catch(err){
        alert(err)
    }
}

const getProductDetail = dispatch => async(lelang_id) => {
    dispatch({type: 'LOADING', payload: 'Memuat Data....'})
    let formData = new FormData()
    formData.append('lelang_id', lelang_id);
    try{
        let response = await fetch(`${API_ART}/services.php?type=getLelangDetail`, {
            method: 'POST',
            headers: {
                'Accept' : 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            body: formData
        })
        let responseJson = await response.json()
        dispatch({type:'GET_PRODUCT_DETAIL', payload:responseJson.detail_produk})
        // alert(JSON.stringify(responseJson))
    }catch(error){
        alert(error)
    }
}

const addProduct = dispatch => async(formData, callback) => {
    dispatch({type: 'LOADING', payload: 'Menambahkan Produk'})
    try{
        let response = await fetch(`${API_ART}/services.php?type=addProduct`, {
            method: 'POST',
            headers: {
                'Accept' : 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            body: formData
        })
        let responseJson = await response.json()
        dispatch({type:'GET_KATEGORI', payload:responseJson.msg})
        alert(responseJson.msg)
        callback()
    }catch(error){
        alert(error)
    }
}

const UpdateProduct = dispatch => async(formData, callback) => {
    dispatch({type: 'LOADING', payload: 'Memperbarui Produk'})
    try{
        let response = await fetch(`${API_ART}/services.php?type=updateMyProduk`, {
            method: 'POST',
            headers: {
                'Accept' : 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            body: formData
        })
        let responseJson = await response.json()
        dispatch({type:'ADD_PRODUCT', payload:responseJson.msg})
        alert(responseJson.msg)
        callback()
    }catch(error){
        alert(error)
    }
}

const getMyProducts = dispatch => async(id_bidder) => {
    dispatch({type: 'LOADING', payload: 'Memuat Data....'})
    let formData = new FormData();
    formData.append('id_bidder', id_bidder);
    try{
        let response = await fetch(`${API_ART}/services.php?type=allMyProduk`, {
            method: 'POST',
            headers: {
                'Accept' : 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            body: formData
        })
        let responseJson = await response.json()
        dispatch({type: 'GET_MY_PRODUCTS', payload: responseJson.data})
        // alert(JSON.stringify(responseJson.data))
    }catch(error){
        alert(error)
    }
}

const uploadImageProduct = dispatch => async (formData, callback) => {
    dispatch({type: 'LOADING', payload: 'Mengupload Foto'})
    try{
        let response = await fetch(`${API_ART}/services.php?type=updateMyProduk`, {
            method: 'POST',
            headers: {
                'Accept' : 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            body: formData
        })
        let responseJson = await response.json()
        dispatch({type: 'UPDATE_IMAGE'})
        Alert.alert('Berhasil Memperbarui', responseJson.msg)
        callback()
    }catch(error){
        alert(error)
    }
}

const bidderByProduct = dispatch => async (lelang_id) => {
    let formData = new FormData()
    formData.append('lelang_id', lelang_id)
    dispatch({type: 'LOADING', payload: 'Memuat Data...'})
    try{
        let response = await fetch(`${API_ART}/services.php?type=bidList`, {
            method: 'POST',
            headers: {
                'Accept' : 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            body: formData
        })
        let responseJson = await response.json()
        dispatch({type: 'BID_LIST_BY_ID', payload:responseJson.data})
        // alert(responseJson.data)
    }catch(error){
        alert(error)
    }
}

const closeAuction = dispatch => async (lelang_id) => {
    let formData = new FormData()
    formData.append('lelang_id', lelang_id)
    dispatch({type: 'LOADING', payload: 'Menutup Lelang...'})
    try{
        let response = await fetch(`${API_ART}/services.php?type=closeLelang`, {
            method: 'POST',
            headers: {
                'Accept' : 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            body: formData
        })
        let responseJson = await response.json()
        dispatch({type: 'CLOSE_AUCTION'})
        Alert.alert('Lelang Ditutup', 'Produk lelang berhasil ditutup.')
    }catch(error){
        alert(error)
    }
}

const getSimilarity = dispatch => async (lelang_id, harga_start,kelipatan,kategori) => {
    let formData = new FormData()
    formData.append('lelang_id', lelang_id)
    formData.append('harga_start', harga_start)
    formData.append('kelipatan', kelipatan)
    formData.append('kategori', kategori)
    // dispatch({type: 'LOADING', payload: 'Memuat Data...'})
    try{
        let response = await fetch(`${API_ART}/services.php?type=getSimilarity`, {
            method: 'POST',
            headers: {
                'Accept' : 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            body: formData
        })
        let responseJson = await response.json()
        dispatch({type: 'GET_SIMILARITY',payload:responseJson.data})
        // alert(JSON.stringify(responseJson.data))
        return responseJson.data
    }catch(error){
        alert(error)
    }
}

const getCategory = dispatch => async () => {
    let formData = new FormData()
    dispatch({type: 'LOADING', payload: 'Memuat Data...'})
    try{
        let response = await fetch(`${API_ART}/services.php?type=getCategori`, {
            method: 'POST',
            headers: {
                'Accept' : 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            body: ''
        })
        let responseJson = await response.json()
        dispatch({type: 'GET_KATEGORI',payload:responseJson.data})
        // alert(JSON.stringify(responseJson.data))
        return responseJson.data
    }catch(error){
        alert(JSON.stringify(error))
    }
}


export const {Provider, Context} = CreateDataContext(
    ProductReducer,
    {getProduct, getProductDetail, addProduct, UpdateProduct, getMyProducts, uploadImageProduct, bidderByProduct, closeAuction, getSimilarity, getCategory},
    {loading: false, message: '', productData:[], productDetail:'', myProductData:[], listBidderByProduct:[], similarityData:[], categoryData:[]}
)