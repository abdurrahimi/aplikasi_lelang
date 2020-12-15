import {AsyncStorage, Alert} from 'react-native'
import CreateDataContext from './CreateDataContext'
import {API_ART} from '../api/ARTApi'

const UserReducer = (state, action) => {
    switch(action.type){
        case 'LOADING':
            return{
                ...state,
                loading: true,
                message: action.payload
            }
        case 'USER_DATA':
            return {
                ...state,
                bidder_id: action.payload.bidder_id,
                nama: action.payload.nama,
                email: action.payload.email,
                telp: action.payload.alamat,
                alamat: action.payload.usrname,
                password: action.payload.password,
                userData: action.payload,
            }
        case 'GET_SALDO':
            return{
                ...state,
                saldo: action.payload,
                loading: false,
                message: '',
            }
        default:
            return state
    }
}

const UserData = dispatch => async () =>{
    const login = await AsyncStorage.getItem('login')
    if(login){
        let data = JSON.parse(login)
        dispatch({type: 'USER_DATA', payload:data})
    }else{
        alert('NOT-LOGIN')
    }
}

const getSaldo = dispatch => async (bidder_id) => {
    let formData = new FormData()
    formData.append('bidder_id', bidder_id)
    dispatch({type: 'LOADING', payload: 'Memuat Saldo...'})
    try{
        let response = await fetch(`${API_ART}/services.php?type=saldo`, {
            method: 'POST',
            headers: {
                'Accept' : 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            body: formData
        })
        let responseJson = await response.json()
        dispatch({type: 'GET_SALDO', payload:responseJson.saldo.saldo})
        // alert(responseJson.data)
    }catch(error){
        alert(error)
    }
}


export const {Provider, Context} = CreateDataContext(
    UserReducer,
    {UserData, getSaldo},
    {loading:false, message:'',bidder_id: '', nama:'',email: '', telp: '', alamat: '', username: '', password: '', saldo:0, userData: [] }
)