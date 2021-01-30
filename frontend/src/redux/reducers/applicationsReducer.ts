import applicationsAPI  from '../../API/applicationsAPI';
import redux from 'redux'

const initialState = {
    applications: null,
}

export let applicationsReducer = (state: any = initialState, action: any) => {
    switch(action.type){
        case 'SET_APPLICATIONS': {
            return {
                ...state, applications: action.applications.data.result
            }
        }
        default: 
            return state
    }
} 

const setApplictions = (applications: any) => ({type: 'SET_APPLICATIONS', applications})

export let getApplications = () => async (dispatch: redux.Dispatch) => {
    let response = await applicationsAPI.getApplications()
    if (response) {
        dispatch(setApplictions(response))
    }
}

export let createApplication = (application: any) => async (dispatch: redux.Dispatch) => {
    await applicationsAPI.createApplication({
        "application": {
          "description": application.description,
          "name": application.name,
          "organizationID": application.organizationID,
          "serviceProfileID": application.serviceProfileID
          //"payloadCodec": "string",
          //"payloadDecoderScript": "string",
          //"payloadEncoderScript": "string",
        }
      })
    dispatch(setApplictions(await applicationsAPI.getApplications()))
 }

export default applicationsReducer

