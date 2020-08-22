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
              "applicationID": device.applicationID,
              "description": device.description,
              "devEUI": device.devEUI,
              "deviceProfileID": device.deviceProfileID,
              "name": device.name,//
              "referenceAltitude": device.referenceAltitude
            }
          })
        response = await devicesAPI.getDevices()
        dispatch(setDevices(response))
        return response 
       } catch(error){
           
       } 
 }



export default devicesReducer

