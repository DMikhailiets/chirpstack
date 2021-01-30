import { serviceProfilesAPI } from './../../API/serviceProfilesAPI';
import { devicesAPI } from './../../API/devicesAPI';
import redux from 'redux'
import Notification from '../../components/Notification';

const initialState = {
    networkServers: null,
    serviceProfiles: null
}

export let networkServersReducer = (state: any = initialState, action: any) => {
    switch(action.type){
        case 'SET_NETWORK_SERVERS': {
            return {
                ...state, networkServers: action.networkServers.data.result
            }
        }
        case 'SET_SERVICE_PROFILES': {
            return {
                ...state, serviceProfiles: action.serviceProfiles.data.result
            }
        }
        default: 
            return state
    }
} 

const setNetworkServers = (networkServers: any) => ({type: 'SET_NETWORK_SERVERS', networkServers})
const setServiceProfiles = (serviceProfiles: any) => ({type: 'SET_SERVICE_PROFILES', serviceProfiles})

export let getNetworkServers = () => async (dispatch: redux.Dispatch) => {
    let response = await serviceProfilesAPI.getNetworkServers()
    dispatch(setNetworkServers(response))
}

export let getServiceProfiles = () => async (dispatch: redux.Dispatch) => {
    let response = await serviceProfilesAPI.getServiceProfiles()
    dispatch(setServiceProfiles(response))
}
 
export let createServiceProfile = (serviceProfile: any) => async (dispatch: redux.Dispatch) => {
    await serviceProfilesAPI.createServiceProfiles({
    "serviceProfile": {
        "addGWMetaData":  serviceProfile.addGWMetaData === undefined ? false : true,
        "name": serviceProfile.name,
        "networkServerID": serviceProfile.networkServerID,
        "organizationID": serviceProfile.organizationID,
        "nwkGeoLoc": serviceProfile.nwkGeoLoc=== undefined ? false : true,
        }
    })
    let response = await serviceProfilesAPI.getServiceProfiles()
    dispatch(setServiceProfiles(response))
}

export default networkServersReducer

