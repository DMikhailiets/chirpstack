import { AppState } from './../store'
import { createSelector } from 'reselect'

export const fetchDeviceProfiles = createSelector((state: AppState) => state.deviceProfilesReducer.deviceProfiles, (deviceProfiles: any) => deviceProfiles)



