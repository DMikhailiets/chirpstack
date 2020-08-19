import devicesPage from '../components/devicesPage'
import { connect } from 'react-redux'
import { AppState } from '../../../redux/store'
import { fetchOrganizations, fetchDevices } from '../../../redux/selectors'
import { getOrganizations } from '../../../redux/reducers/organizationsReducer'
import { getDevices, createDevice } from '../../../redux/reducers/devicesReducer'

let mapStateToProps = (state: AppState) => ({
    organizations: fetchOrganizations(state),
    devices: fetchDevices(state)
})

export default connect(mapStateToProps, {getOrganizations, getDevices, createDevice})(devicesPage)