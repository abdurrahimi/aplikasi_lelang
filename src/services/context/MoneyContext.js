import CreateDataContext from './CreateDataContext'
import {API_ART} from '../api/ARTApi'

const MoneyReducer = (state, action) => {
    switch(action.type){
        case 'LOADING':
            return{
                ...state,
                loading: true,
                message: action.payload
            }
        case 'TOPUP_PAYMENT':
            return{
                ...state,
                loading: false,
                message: '',
                topupData: action.payload
            }
        default:
            return state
    }
}

const topup = dispatch => async (bidder_id, ammount) => {
    dispatch({type: 'LOADING', payload: 'Memproses Pembayaran...'})
    let formData = new FormData()
    formData.append('signature', 'dd7298aa1a5d2220ba3b11d82db4feb9a3bc908e');
    formData.append('bidder_id', bidder_id);
    formData.append('amount', ammount);
    formData.append('payment_method', 'BK');
    try{
        let response = await fetch(`${API_ART}/services.php?type=topup`, {
            method: 'POST',
            headers: {
                'Accept' : 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            body: formData
        })
        let responseJson = await response.json()
        dispatch({type: 'TOPUP_PAYMENT', payload: responseJson.data})
        return responseJson
    }catch(error){
        alert(error)
    }
}

export const {Provider, Context} = CreateDataContext(
    MoneyReducer,
    {topup},
    {loading: false, message: '', topupData:[]}
)