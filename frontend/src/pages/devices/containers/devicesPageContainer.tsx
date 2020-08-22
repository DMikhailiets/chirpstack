import devicesPage from '../components/devicesPage'
import { connect } from 'react-redux'
import { AppState } from '../../../redux/store'
import { fetchDevices, fetchApplications, fetchDeviceProfiles } from '../../../redux/selectors'
import { getApplications } from '../../../redux/reducers/applicationsReducer'
import { getDevices, createDevice } from '../../../redux/reducers/devicesReducer'
import { getDeviceProfiles } from '../../../redux/reducers/deviceProfileReducer'

let mapStateToProps = (state: AppState) => ({
    applications: fetchApplications(state),
    devices: fetchDevices(state),
    deviceProfiles: fetchDeviceProfiles(state)
})

export default connect(mapStateToProps, {getApplications, getDevices, createDevice, getDeviceProfiles})(devicesPage)