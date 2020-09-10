import { LockOutlined } from '@ant-design/icons';
import { authAPI } from '../../API/authAPI';
import redux from 'redux'
import notification from '../../components/Notification';

const initialstate = {
    token: null,
}



const userReducer = (state: any = initialstate, action: any) => {
    switch(action.type){
        case 'SET_TOKEN': {
            return {
                ...state,
                token: action.token
            }
        }
        default: return state
    }
}

const setToken = (token: string) => ({type: 'SET_TOKEN', token})

export const logout = () => async (dispatch: redux.Dispatch) => {
    window.localStorage.removeItem('token')
    window.location.reload()
}

export const loginUser = (authData: any) =>  (dispatch: redux.Dispatch) =>  {
    return new Promise((resolve: any, reject: any) => {
        authAPI.authUser({email: authData.username, password:authData.password})
        .then((response) => {
            resolve()
            window.localStorage.setItem("token", response.data.jwt)
            notification({
                text: "nice to meet you!)",
                type: 'success',
                title: "Success!",
                duration: 5
            })
        return response
        })
        .catch((error: any) => {
            reject()
            notification({text: "Invalid email or password",
            type: 'error',
            title: "Oops...",
            duration: 5})
            return new Error()
        }) 
    }) 
}

export default userReducer