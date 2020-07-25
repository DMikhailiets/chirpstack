import { LockOutlined } from '@ant-design/icons';
import { authAPI } from '../../API/authAPI';
import redux from 'redux'
import notification from '../../components/Notification';

const initialstate = {
    token: null,
}



const userReducer = (state: any = initialstate, action: any) => {
    switch(action.type){
        // case 'SET_USER_DATA': {  
        //     return {
        //         ...state,
        //         ...action.userData,
        //     }
        // }
        case 'SET_TOKEN': {
            return {
                ...state,
                token: action.token
            }
        }
        default: return state
    }
}


//const setUserData = (userData: any) => ({type: 'SET_USER_DATA', userData})
const setToken = (token: string) => ({type: 'SET_TOKEN', token})


// export const getMe = (token: any) => async (dispatch: redux.Dispatch) => {
//     console.log(token)
//     let response: any = await userAPI.getMe(token)
//     if (response.status == 200){
//         dispatch(setUserData(response.data))
//     } else {
//         return Error()
//     }
// }

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
            //dispatch(setToken(response.data.token))
        })
        .catch((error: any) => {
            reject()
            notification({text: "Something went wrong...",
            type: 'error',
            title: "Oops...",
            duration: 5})
            return new Error()
        }) 
    }) 
}

export default userReducer