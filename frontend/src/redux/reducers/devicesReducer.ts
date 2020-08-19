import { devicesAPI } from './../../API/devicesAPI';
import redux from 'redux'
import Notification from '../../components/Notification';

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
   try {
    let response = await devicesAPI.getDevices()
    await(dispatch(setDevices(response)))

   } catch{
       throw new Error('error')
   } 
}

export let createDevice = (device: any) => async (dispatch: redux.Dispatch) => {
    try {
     let response = await devicesAPI.createDevice({
        "device": {
            "applicationID": "1",
            "devEUI": "e67a5df34bd4dc52",
            "deviceProfileID": "d48c2780-942e-496e-872b-0621844375b8",
            "isDisabled": true,
            "name": "Device1",
            "referenceAltitude": 0,
            "skipFCntCheck": true,
        }
      })
     return response 
    } catch(error){
        throw new Error(error)
    } 
 }



export default devicesReducer

