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
   try {
    let response = await applicationsAPI.getApplications()
    dispatch(setApplictions(response))
   } catch(err){
      console.log(err)
   } 
}

export let createApplication = (application: any) => async (dispatch: redux.Dispatch) => {
    try {
     let response = await applicationsAPI.createApplication({
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
     response = await applicationsAPI.getApplications()
     dispatch(setApplictions(response))
     return response 
    } catch(error){
        
    } 
 }

export default applicationsReducer

