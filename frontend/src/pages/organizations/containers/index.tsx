import OrganizationsPage from "../components/organization";
import { connect } from "react-redux";
import { createOrganization, getOrganizations, createUser } from "../../../redux/reducers/organizationsReducer";
import { AppState } from "../../../redux/store";
import { fetchOrganizations } from "../../../redux/selectors";

let mapStateToProps = (state: AppState) =>({
    organizations: fetchOrganizations(state)
})

export default connect(mapStateToProps, {createOrganization, createUser, getOrganizations})(OrganizationsPage)


