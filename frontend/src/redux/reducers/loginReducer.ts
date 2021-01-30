import { authAPI } from '../../API/authAPI'
import redux from 'redux'

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

export const logout = () => async (dispatch: redux.Dispatch) => {
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('name')
    window.location.reload()
}

export const loginUser = (authData: any) =>  async (dispatch: redux.Dispatch) =>  {
    let response = await authAPI.authUser({email: authData.username, password:authData.password})
    if (response) {
        window.localStorage.setItem("token", response.data.jwt)
        window.localStorage.setItem("name", authData.username)
        window.location.reload()
    }
}

export default userReducer