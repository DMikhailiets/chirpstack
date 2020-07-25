import components from '../components/createOrganizationForm'
import { connect } from 'react-redux'
import createOrganization from '../../../redux/reducers/organizationsReducer'

export default connect(null, {createOrganization})(components)