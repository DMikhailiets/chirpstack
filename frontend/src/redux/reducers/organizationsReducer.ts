import { organizationsAPI } from './../../API/organizationsAPI';
import redux from 'redux'

const initialstate = {
    organizations: null,
}


const organizationsReducer = (state: any = initialstate, action: any) => {
    switch(action.type){
        case 'SET_ORGANIZATIONS': {
            return { 
                ...state, organizations: action.organizations
            }
        }
        default: return state
    }
}

const setOrganizations = (organizations: any) => ({type: 'SET_ORGANIZATIONS', organizations})

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
        //dispatch(setToken(response.data.token))
        if(response.status === 200){
            return 'ok'
        }
    } catch(err) {
        return Error(err)
    }
}



export default organizationsReducer