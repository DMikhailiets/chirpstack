import { organizationsAPI } from './../../API/organizationsAPI';
import redux from 'redux'

const initialstate = {
    organizations: null,
    organizationsUsers: null
}


const organizationsReducer = (state: any = initialstate, action: any) => {
    switch(action.type){
        case 'SET_ORGANIZATIONS': {
            return { 
                ...state, organizations: action.organizations.data.result,
            }
        }
        case 'SET_ORGANIZATIONS_USERS': {
                let index = state.organizations.find((organization: any) => organization.id === action.id).id
                console.log(index)
            return {
                ...state.organizations, ...state.organizations[index] = Object.defineProperty(state.organizations[index], "users", action.users.data.result)
            }
        }
        default: return state
    }
}

const setOrganizations = (organizations: any) => ({type: 'SET_ORGANIZATIONS', organizations})
const setOrganizationsUsers = (users: any, id: any) => ({type: 'SET_ORGANIZATIONS_USERS', users, id})

export const getOrganizations = () => (dispatch: redux.Dispatch) => {
    return new Promise((reslove: any, reject: any) => {
        organizationsAPI.getOrganizations()
            .then((response: any) =>{
                dispatch(setOrganizations(response))
            })
            .catch((err) => {
                console.log(err)
            })
    })
}

export const getOrganizationsUsers = (id: any) => (dispatch: redux.Dispatch) => {
    console.log(id)
    return new Promise((reslove: any, reject: any) => {
        organizationsAPI.getOrganizationsUsers(id)
            .then((response: any) =>{
                dispatch(setOrganizationsUsers(response, id))
            })
            .catch((err) => {
                console.log(err)
            })
    })
}

export const createOrganization = (data: any) => async (dispatch: redux.Dispatch) =>  {
    try {
        let response: any = await organizationsAPI.createOrganization(
            {
                "organization": {
                  "canHaveGateways": data.canHaveGateways,
                  "displayName": data.displayName,
                  "id": data.id,
                  "name": data.name
                }
              }
        )
        
        if(response.status === 200){
            return 'ok'
        }
    } catch(err) {
        return Error(err)
    }
}



export default organizationsReducer