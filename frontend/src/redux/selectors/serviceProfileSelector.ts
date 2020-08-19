import { AppState } from './../store'
import { createSelector } from 'reselect'

const getNetworkServers = (state: AppState) => {
    return state.serviceProfileReducer.networkServers
}

const getServiceProfiles = (state: AppState) => {
    return state.serviceProfileReducer.serviceProfiles
}

export const fetchNetworkServers = createSelector(getNetworkServers, (networkServers: any) => {
    return networkServers 
})

export const fetchServiceProfiles = createSelector(getServiceProfiles, (serviceProfiles: any) => {
    return serviceProfiles 
})



