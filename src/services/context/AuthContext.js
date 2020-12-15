import {AsyncStorage, Alert} from 'react-native'
import CreateDataContext from './CreateDataContext'
import {API_ART} from '../api/ARTApi'

const AuthReducer = (state, action) => {
    switch(action.type){
        case 'LOADING':
            return {
                ...state,
                loading: true,
                success: false,
                error: false,
                message: action.payload,
            }
        case 'ERROR':
            return {
                ...state,
                alert: true,
                loading: false,
                success: false,
                error: true,
                message: action.payload,
            }
        case 'SUCCESS':
            return {
                ...state,
                alert: true,
                loading: false,
                success: true,
                error: false,
                message: action.payload,
            }
            case 'LOGIN':
                return {
                    ...state,
                    alert: true,
                    loading : false,
                    success : true,
                    error: false,
                    message: 'Login Success...',
                    users: action.payload
                }
        default:
            return state
    }
}

// const CheckSignin = dispatch => async (navigate) => {
//     const login = await AsyncStorage.getItem('login')
//     if(login){
//         dispatch({type: 'LOGIN', payload: login})
//         return RootNavigation.navigate('Index')
//     }else{
//         return navigate()
//     }
// }

const Signin = dispatch => async (username, password, callback) => {
    dispatch({type: 'LOADING', payload: 'Mengautentikasi Akun...'})
    let formData = new FormData()
    formData.append('username', username);
    formData.append('password', password);
    try {
        let response = await fetch(`${API_ART}/services.php?type=doLogin`, {
            method: 'POST',
            headers: {
                'Accept' : 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            body: formData
        })
        let responseJson = await response.json()
        if(responseJson.status === 'NOT_OK'){
            Alert.alert("Upaya Masuk Gagal", responseJson.msg)
            console.log(responseJson)
            dispatch({type: 'ERROR', payload: responseJson.error})
        }else{
            callback()
            AsyncStorage.setItem('login', JSON.stringify(responseJson.data))
            dispatch({type: 'SUCCESS', payload: responseJson.data})
            console.log(JSON.stringify(responseJson.data))
        }
    } catch (err) {
        alert(err)
    }
}

const Signup = dispatch => async (formData, callback) => {
    dispatch({type: 'LOADING', payload: 'Mendaftarkan Akun...'})
    try {
        let response = await fetch(`${API_ART}/services.php?type=doRegister`, {
            method: 'POST',
            headers: {
                'Accept' : 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            body: formData
        })
        let responseJson = await response.json()
        if(responseJson.status === 'NOT_OK'){
            Alert.alert("Upaya Pendaftaran Gagal", responseJson.msg)
            console.log(responseJson)
            dispatch({type: 'ERROR', payload: responseJson.error})
        }else{
            callback()
            dispatch({type: 'SUCCESS', payload: responseJson.data})
            await AsyncStorage.setItem('login', JSON.stringify(responseJson.data))
            console.log(JSON.stringify(responseJson.data))
            Alert.alert("Pendaftaran Berhasil", 'Terimakasih pendaftaran anda berhasil.')
        }
    } catch (err) {
        alert(err)
    }
}


export const {Provider, Context} = CreateDataContext(
    AuthReducer,
    {Signin, Signup},
    {loading: false, success: false, error: false, message: '', alert: false}
)