import { default as LoginComponents } from '../components'
import { connect } from 'react-redux'
import { loginUser } from '../../../redux/reducers/loginReducer'


const mapStateToProps = (state: any) => ({
    
})

export default connect(null, {loginUser})(LoginComponents)