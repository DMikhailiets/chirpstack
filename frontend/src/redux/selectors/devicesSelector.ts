import { AppState } from './../store'
import { createSelector } from 'reselect'

const getDevices = (state: AppState) => {
    return state.devicesReducer.devices
}

export const fetchDevices = createSelector(getDevices, (devices: any) => {
    return devices 
})



