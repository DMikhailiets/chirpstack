import redux from 'redux'
import deviceProfilesAPI from '../../API/deviceProfilesAPI'

const initialState = {
    deviceProfiles: null,
}

export let deviceProfilesReducer = (state: any = initialState, action: any) => {
    switch(action.type){
        case 'SET_DEVICE_PROFILES': {
            return {
                ...state, deviceProfiles: action.deviceProfiles.data.result
            }
        }
        default: 
            return state
    }
} 

const setDeviceProfiles = (deviceProfiles: any) => ({type: 'SET_DEVICE_PROFILES', deviceProfiles})

export let getDeviceProfiles = () => async (dispatch: redux.Dispatch) => {
    let response = await deviceProfilesAPI.getDeviceProfiles()
    if (response) {
        dispatch(setDeviceProfiles(response))
    }
}

export let createDeviceProfile = (deviceProfile: any) => async (dispatch: redux.Dispatch) => {
    let response = await deviceProfilesAPI.createDeviceProfiles({ 
        deviceProfile: {...deviceProfile}
    // deviceProfile: {
    //  /*Device-profile name*/ 
    //  name: deviceProfile.name, //required
    //  /*Lorawan version*/
    //  macVersion: deviceProfile.macVersion, //TZ 
    //  /*Class*/
    //  regParamsRevision: deviceProfile.regParamsRevision,//TZ (A,B)
    //  /*Device support OTAA*/  
    //  supportsJoin: deviceProfile.supportsJoin,//TZ 
    //  /*RX2 channel frequency (Hz)*/
    //  rxFreq2: deviceProfile.rxFreq2,//TZ int
    //  /*Factory-preset frequencies (Hz)*/
    //  //"factoryPresetFreqs": [parseInt(deviceProfile.factoryPresetFreqs)],
    //  /*Payload codec*/
    //  payloadCodec: deviceProfile.payloadCodec,
    //  networkServerID: deviceProfile.networkServerID, //required
    //   organizationID: deviceProfile.organizationID  //required
    // }
    })
    dispatch(setDeviceProfiles(await deviceProfilesAPI.getDeviceProfiles()))
    return response 
 }

export default deviceProfilesReducer