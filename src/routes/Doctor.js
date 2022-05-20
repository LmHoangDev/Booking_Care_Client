import { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import Header from "../containers/Header/Header";
import ManagePatient from "../containers/System/Doctor/ManagePatient";
import ManageScheduleOne from "../containers/System/Doctor/ManageScheduleOne";

class Doctor extends Component {
  render() {
    const { isLoggedIn } = this.props;

    return (
      <>
        {" "}
        {this.props.isLoggedIn && <Header />}
        <div className="system-container">
          <div className="system-list">
            <Switch>
              <Route
                path="/doctor/manage-schedule-detail"
                component={ManageScheduleOne}
              />
              <Route path="/doctor/manage-patient" component={ManagePatient} />
            </Switch>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    DoctorMenuPath: state.app.DoctorMenuPath,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);
