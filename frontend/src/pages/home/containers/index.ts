import  HomeComponent from '../components'
import { logout } from '../../../redux/reducers/loginReducer';
import { AppState } from './../../../redux/store';
import { connect } from 'react-redux'


let mapStateToProps = (state: AppState) => ({
})

export default connect(mapStateToProps, {logout})(HomeComponent)

