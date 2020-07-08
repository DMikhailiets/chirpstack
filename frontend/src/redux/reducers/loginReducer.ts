
import { LockOutlined } from '@ant-design/icons';
import { authAPI } from '../../API';
import redux from 'redux'

const initialstate = {
    token: null,
}



const userReducer = (state: any = initialstate, action: any) => {
    switch(action.type){
        case 'SET_USER_DATA': {  
            return {
                ...state,
                ...action.userData,
            }
        }
        case 'SET_USER_TOKEN': {
            return {
                ...state,
                token: action.token
            }
        }
        case 'LOGOUT': {
            return {
                token: null,
                fullname: "User"
            }
        }
        default: return state
    }
}


const setUserData = (userData: any) => ({type: 'SET_USER_DATA', userData})
const setUserToken = (token: string) => ({type: 'SET_USER_TOKEN', token})

const logOut = () => ({type: 'LOGOUT'})

export const getMe = (token: any) => async (dispatch: redux.Dispatch) => {
    console.log(token)
    let response: any = await userAPI.getMe(token)
    if (response.status == 200){
        dispatch(setUserData(response.data))
    } else {
        return Error()
    }
}

export const logout = () => async (dispatch: redux.Dispatch) => {
    window.localStorage.removeItem('token')
    dispatch(logOut())
    window.location.reload()
}

export const authUser = (authData: any) => async (dispatch: redux.Dispatch) =>  {
    let response: any = await authAPI.authUser({email: authData.email, password:authData.password})
    if (response.status == 200){
        dispatch(setUserToken(response.data.token))
        window.localStorage.setItem("token", response.data.token)
        //process.env.token = response.data.token
    } else {
        return Error()
    }
}
export default userReducer