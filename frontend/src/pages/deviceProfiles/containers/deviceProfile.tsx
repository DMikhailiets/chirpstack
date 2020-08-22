import React, { useEffect } from 'react'
import { AppState } from '../../../redux/store'
import { connect } from 'react-redux'
import { fetchOrganizations, fetchDeviceProfiles, fetchNetworkServers } from '../../../redux/selectors'
import { getOrganizations } from '../../../redux/reducers/organizationsReducer'
import ErrorBoundary from '../../../core/ErrorBoundary'
import DeviceProfilesComponent from '../components/deviceProfileComponent'
import { getNetworkServers } from '../../../redux/reducers/serviceProfilesReducer'
import { getDeviceProfiles, createDeviceProfile } from '../../../redux/reducers/deviceProfileReducer'

export type DeviceProfilesProps = {
    getDeviceProfiles: Function
    getOrganizations: Function
    getNetworkServers: Function
    createDeviceProfile: Function
    deviceProfiles: [] | null
    organizations: [] | null
    networkServers: [] | null
}

let DeviceProfiles: React.FC<DeviceProfilesProps> = ({ getOrganizations, organizations,  getDeviceProfiles, deviceProfiles, getNetworkServers, networkServers, createDeviceProfile, ...props}) => {
    useEffect(() => {
        getDeviceProfiles()
        getOrganizations()
        getNetworkServers()
    },[])
    return  <ErrorBoundary>
                <DeviceProfilesComponent 
                    organizations={organizations} 
                    deviceProfiles={deviceProfiles} 
                    networkServers={networkServers}
                    createDeviceProfile={createDeviceProfile}
                />
           </ErrorBoundary>
}

export default connect(
    (state: AppState) => ({
        deviceProfiles: fetchDeviceProfiles(state),
        networkServers: fetchNetworkServers(state),
        organizations: fetchOrganizations(state),
    }),
    { 
        getOrganizations, 
        getDeviceProfiles, 
        getNetworkServers,
        createDeviceProfile,
    }
    )
(DeviceProfiles)