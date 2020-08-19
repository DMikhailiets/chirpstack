import React from 'react'
import { fetchOrganizationsUsers } from './../../../redux/selectors/organizationsSelector';
import { AppState } from './../../../redux/store';
import { getOrganizationsUsers } from './../../../redux/reducers/organizationsReducer';
import Organization from '../components/Organization'
import { connect } from 'react-redux'

let mapStateToProps = (state: AppState) => ({
    users: fetchOrganizationsUsers(state)
})

export default connect(mapStateToProps,{getOrganizationsUsers})(React.memo(Organization))