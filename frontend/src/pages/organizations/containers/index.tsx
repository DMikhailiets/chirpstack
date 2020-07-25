import Organization from "../components/organization";
import { connect } from "react-redux";
import { createOrganization } from "../../../redux/reducers/organizationsReducer";
import { AppState } from "../../../redux/store";

let mapStateToProp = (state: AppState) =>({
})

export default connect(null, {createOrganization})(Organization)


