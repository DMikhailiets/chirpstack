import { organizationsAPI } from '../../API/organizationsAPI'
import redux from 'redux'

const initialstate = {
    organizations: null,
    organizationsUsers: []
}

const organizationsReducer = (state: any = initialstate, action: any) => {
    switch(action.type){
        case 'SET_ORGANIZATIONS': {
            return { 
                ...state, organizations: action.organizations.data.result,
            }
        }
        case 'SET_ORGANIZATIONS_USERS': {
            return {
                ...state, 
                organizationsUsers: { 
                    ...state.organizationsUsers, 
                    [action.id]: {
                        users: action.users.data.result
                    }
                } 
            }
        }
        default: return state
    }
}

const setOrganizations = (organizations: any) => ({type: 'SET_ORGANIZATIONS', organizations})
const setOrganizationsUsers = (users: any, id: any) => ({type: 'SET_ORGANIZATIONS_USERS', users, id})

export const getOrganizations = () => async (dispatch: redux.Dispatch) => {
    const response = await organizationsAPI.getOrganizations()
    if (response) {
        dispatch(setOrganizations(response))
    }
}

export const getOrganizationsUsers = (id: any) => async (dispatch: redux.Dispatch) => {
    const response = await organizationsAPI.getOrganizationsUsers(id)
    if (response) {
        dispatch(setOrganizationsUsers(response, id))
    }
}

export const createUser = (userData: any) => async (dispatch: redux.Dispatch) => {
    let organizations: any = []
    userData.Organizations.map((org: any) => organizations.push({
        "isAdmin": true,
        "isDeviceAdmin": true,
        "isGatewayAdmin": true,
        "organizationID": org
    }))
    await organizationsAPI.createUser({
        "organizations": organizations,
        "password": userData.password,
        "user": {
            "email": userData.email,
            "isActive": true,
            "isAdmin": true,
            "note": "string",
            "sessionTTL": 0
        }
    })
}

export const createOrganization = (data: any) => async (dispatch: redux.Dispatch) => {
    await organizationsAPI.createOrganization({
        "organization": {
            "canHaveGateways": data.canHaveGateways,
            "displayName": data.displayName,
            "name": data.name
        }
    })
    let response = await organizationsAPI.getOrganizations()
    dispatch(setOrganizations(response))
}

export default organizationsReducer