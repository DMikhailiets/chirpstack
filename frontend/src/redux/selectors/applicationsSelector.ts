import { AppState } from './../store'
import { createSelector } from 'reselect'

export const fetchApplications = createSelector((state: AppState) => state.applicationsReducer.applications, (devices: any) => devices)



