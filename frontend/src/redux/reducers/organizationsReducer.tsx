import { Redirect } from 'react-router-dom';
import { organizationsAPI } from '../../API/organizationsAPI';
import redux from 'redux'
import React from 'react';
import Notification from '../../components/Notification';

const initialstate = {
    organizations: [],
    organizationsUsers: []
}


const organizationsReducer = (state: any = initialstate, action: any) => {
    switch(action.type){
        case 'SET_ORGANIZATIONS': {
            return { 
                ...state, organizations: action.organizations.data.result,
            }
        }
        case 'SET_ORGANIZATIONS_USERS': {
                //let index = state.organizations.find((organization: any) => organization.id === action.id).id
                //let index = state.organizations.findIndex((organization: any) => organization.id === action.id)
                //console.log(index)
            return {
                ...state, organizationsUsers: { ...state.organizationsUsers , 
                     [action.id]: {
                         users: action.users.data.result
                     }
                } 
            }
        }
        default: return state
    }
}

const setOrganizations = (organizations: any) => ({type: 'SET_ORGANIZATIONS', organizations})
const setOrganizationsUsers = (users: any, id: any) => ({type: 'SET_ORGANIZATIONS_USERS', users, id})

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

export const getOrganizationsUsers = (id: any) => (dispatch: redux.Dispatch) => {
    return new Promise((reslove: any, reject: any) => {
        organizationsAPI.getOrganizationsUsers(id)
            .then((response: any) =>{
                dispatch(setOrganizationsUsers(response, id))
            })
            .catch((err) => {
                console.log(err)
            })
    })
}

export const createUser = (userData: any) => (dispatch: redux.Dispatch) => {
    return new Promise((reslove: any, reject: any) => {
        let organizations: any = []
        userData.Organizations.map((org: any) => organizations.push({
            "isAdmin": true,
            "isDeviceAdmin": true,
            "isGatewayAdmin": true,
            "organizationID": org
        }))
        organizationsAPI.createUser({
                "organizations": organizations,
                "password": userData.password,
                "user": {
                  "email": userData.email,
                  "isActive": true,
                  "isAdmin": true,
                  "note": "string",
                  "sessionTTL": 0
                }
        })
            .then((response: any) =>{
                getOrganizations()
                Notification({
                    text: "User was created!)",
                    type: 'success',
                    title: "Success!",
                    duration: 5
                })
            })
            .catch((err) => {
                console.log(err)
            })
    })
}

export const createOrganization = (data: any) => (dispatch: redux.Dispatch) => {
    console.log(data)
   
    return new Promise((reslove: any, reject: any) => {
        organizationsAPI.createOrganization(
            {
                "organization": {
                  "canHaveGateways": data.canHaveGateways,
                  "displayName": data.displayName,
                  "name": data.name
                }
              }
        )
            .then(() => {
                Notification({
                    text: "Organization was created!)",
                    type: 'success',
                    title: "Success!",
                    duration: 5
                })
            })
            .then(() => {
                organizationsAPI.getOrganizations()
            })
            .catch((err) => {
                Notification({
                    text: err,
                    type: 'error',
                    title: "Oops...",
                    duration: 5
                })
            })
    })
}


export default organizationsReducer