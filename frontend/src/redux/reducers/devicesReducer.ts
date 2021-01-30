import { devicesAPI } from './../../API/devicesAPI'
import redux from 'redux'

const initialState = {
    devices: null
}

export let devicesReducer = (state: any = initialState, action: any) => {
    switch(action.type){
        case 'SET_DEVICES': {
            return {
                ...state, devices: action.devices.data.result
            }
        }
        default: 
            return state
    }
} 

const setDevices = (devices: any) => ({type: 'SET_DEVICES', devices})

export let getDevices = () => async (dispatch: redux.Dispatch) => {
    let response = await devicesAPI.getDevices()
    dispatch(setDevices(response))
}

export let createDevice = (device: any) => async (dispatch: redux.Dispatch) => {
    await devicesAPI.createDevice({
        "device": {
            "applicationID": device.applicationID,
            "description": device.description,
            "devEUI": device.devEUI,
            "deviceProfileID": device.deviceProfileID,
            "name": device.name,//
            "referenceAltitude": device.referenceAltitude
        }
        })
    dispatch(setDevices(await devicesAPI.getDevices()))
}