import { AppState } from './../store'
import { createSelector } from "reselect"


const getOrganizations = (state: AppState) => {
    return state.organizationsReducer.organizations
}

export const fetchOrganizations = createSelector(getOrganizations, (organizations: any) => {
    return organizations 
})

export default fetchOrganizations
