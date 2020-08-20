import React, { useEffect } from 'react'
import ApplicationsComponent from '../components/applicationsComponent'
import { AppState } from '../../../redux/store'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { fetchApplications, fetchServiceProfiles, fetchOrganizations } from '../../../redux/selectors'
import { getOrganizations } from '../../../redux/reducers/organizationsReducer'
import { getServiceProfiles } from '../../../redux/reducers/serviceProfilesReducer'
import { createApplication, getApplications } from '../../../redux/reducers/applicationsReducer'
import ErrorBoundary from '../../../core/ErrorBoundary'

export type ApplicationsProps = {
    getServiceProfiles: Function,
    getOrganizations: Function,
    getApplications: Function,
    createApplication: Function,
    applications: [] | null,
    serviceProfiles: [] | null,
    organizations: [] | null
}

let Applications: React.FC<ApplicationsProps> = ({ getOrganizations, organizations,  getServiceProfiles, serviceProfiles,  getApplications, applications, createApplication, ...props}) => {
    useEffect(() => {
        getOrganizations()
        getApplications()
        getServiceProfiles()
    },[])
    return  <ErrorBoundary>
                <ApplicationsComponent 
                    organizations={organizations} 
                    serviceProfiles={serviceProfiles} 
                    applications={applications}
                    createApplication={createApplication}
                />
           </ErrorBoundary>
}

export default connect(
    (state: AppState) => ({
        applications: fetchApplications(state),
        serviceProfiles: fetchServiceProfiles(state),
        organizations: fetchOrganizations(state),
    }),
    { 
        getOrganizations, 
        getServiceProfiles, 
        getApplications, 
        createApplication,
    }
    )
(Applications)