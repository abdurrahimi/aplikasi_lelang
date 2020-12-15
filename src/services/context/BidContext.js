import {Alert} from 'react-native'
import CreateDataContext from './CreateDataContext'
import {API_ART} from '../api/ARTApi'

const BidReducer = (state, action) => {
    switch(action.type){
        case 'LOADING':
            return{
                ...state,
                loading: true,
                message: action.payload
            }
        case 'ADD_BID':
            return{
                ...state,
                loading: false,
                message: action.payload
            }
        case 'GET_HISTORY_PRODUCT_BID':
            return{
                ...state,
                loading: false,
                message: '',
                historyProductBid: action.payload
            }
        case 'GET_HISTORY_BID':
            return{
                ...state,
                loading: false,
                message: '',
                historyBid: action.payload
            }
        case 'GET_MY_PRODUCTS':
            return{
                ...state,
                loading:false,
                message:'',
                myProducts:action.payload
            }
        case 'GET_MY_WIN':
            return{
                ...state,
                loading:false,
                message:'',
                listMyWin:action.payload
            }
        default:
            return state
    }
}

const addBid = dispatch => async (id_lelang, id_bidder, harga, callback) => {
    dispatch({type: 'LOADING', payload: 'Mengajukan Penawaran...'})
    let formData = new FormData()
    formData.append('id_lelang', id_lelang);
    formData.append('id_bidder', id_bidder);
    formData.append('harga', harga);
    try{
        let response = await fetch(`${API_ART}/services.php?type=addBid`, {
            method: 'POST',
            headers: {
                'Accept' : 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            body: formData
        })
        let responseJson = await response.json()
        if(responseJson.status === 'NOT_OK'){
            Alert.alert('Terdapat Masalah', 'Mohon maaf, terdapat masalah dalam pengajuan harga!')
        }else{
            dispatch({type:'ADD_BID', payload:'Pengajuan harga barang lelang berhasil, silahkan pantau di Riwayat Bid'})
            Alert.alert('Penawaran Berhasil', 'Terimakasih, penawaran harga berhasil dilakukan, pantau status penawaran di Riwayat Bid!')
            callback()
        }
        // alert(JSON.stringify(responseJson))
        
    }catch(err){
        alert(err)
    }
}

const historyProductBid = dispatch => async(bidder_id, id_lelang) => {
    // dispatch({type: 'LOADING', payload: 'Memuat Data....'})
    let formData = new FormData();
    formData.append('bidder_id', bidder_id);
    formData.append('id_lelang', id_lelang);
    try{
        let response = await fetch(`${API_ART}/services.php?type=myBidHistory`, {
            method: 'POST',
            headers: {
                'Accept' : 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            body: formData
        })
        let responseJson = await response.json()
        dispatch({type: 'GET_HISTORY_PRODUCT_BID', payload: responseJson.data})
        // alert(JSON.stringify(responseJson.data))
    }catch(err){
        alert(err)
    }
}

const historyBid = dispatch => async(id_bidder) => {
    dispatch({type: 'LOADING', payload: 'Memuat Data....'})
    let formData = new FormData();
    formData.append('id_bidder', id_bidder);
    try{
        let response = await fetch(`${API_ART}/services.php?type=allBid`, {
            method: 'POST',
            headers: {
                'Accept' : 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            body: formData
        })
        let responseJson = await response.json()
        dispatch({type: 'GET_HISTORY_BID', payload: responseJson.data})
        // alert(JSON.stringify(responseJson.data))
    }catch(err){
        alert(err)
    }
}

const getMyProducts = dispatch => async(id_bidder) => {
    dispatch({type: 'LOADING', payload: 'Memuat Data....'})
    let formData = new FormData();
    formData.append('id_bidder', id_bidder);
    try{
        let response = await fetch(`${API_ART}/services.php?type=myBidList`, {
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

const getMyWin = dispatch => async(id_bidder) => {
    dispatch({type: 'LOADING', payload: 'Memuat Data....'})
    let formData = new FormData();
    formData.append('id_bidder', id_bidder);
    try{
        let response = await fetch(`${API_ART}/services.php?type=winBid`, {
            method: 'POST',
            headers: {
                'Accept' : 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            body: formData
        })
        let responseJson = await response.json()
        dispatch({type: 'GET_MY_WIN', payload: responseJson.data})
        // alert(JSON.stringify(responseJson.data))
    }catch(error){
        alert(error)
    }
}



export const {Provider, Context} = CreateDataContext(
    BidReducer,
    {addBid, historyBid, getMyProducts, historyProductBid, getMyWin},
    {loading: false, message: '', historyBid:[], myProducts:[], historyProductBid: [], listMyWin:[]}
)