import { AppState } from './../store'
import { createSelector } from "reselect"


const getOrganizations = (state: AppState) => {
    return state.organizationsReducer.organizations
}

const getOrganizationsUsers = (state: AppState) => {
    return state.organizationsReducer.organizationsUsers
}

export const fetchOrganizations = createSelector(getOrganizations, (organizations: any) => {
    return organizations 
})

export const fetchOrganizationsUsers = createSelector(getOrganizationsUsers, (users: any) => {
    return users 
})


