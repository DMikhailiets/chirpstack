import React from 'react'
import { getServiceProfiles, getNetworkServers, createServiceProfile, } from '../../../redux/reducers/serviceProfilesReducer';
import ServiceProfiles from '../components/serviceProfileComponent'
import { connect } from 'react-redux'
import { AppState } from '../../../redux/store'
import { fetchNetworkServers, fetchServiceProfiles, fetchOrganizations } from '../../../redux/selectors'
import { getOrganizations } from '../../../redux/reducers/organizationsReducer';

let mapStateToProps = (state: AppState) => ({
    networkServers: fetchNetworkServers(state),
    serviceProfiles: fetchServiceProfiles(state),
    organizations: fetchOrganizations(state)
})

export default connect(mapStateToProps, {getOrganizations, getServiceProfiles, getNetworkServers, createServiceProfile})(React.memo(ServiceProfiles))