import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter as Router } from "connected-react-router";
import { history } from "../redux";
import { ToastContainer } from "react-toastify";

import {
  userIsAuthenticated,
  userIsNotAuthenticated,
} from "../hoc/authentication";

import { path } from "../utils";

import Home from "../routes/Home";
import Doctor from "../routes/Doctor";
// import Login from '../routes/Login';
import Login from "./Auth/Login";
// import Header from "./Header/Header";
import System from "../routes/System";

import { CustomToastCloseButton } from "../components/CustomToast";
import ConfirmModal from "../components/ConfirmModal";
import HomePage from "./HomePage/HomePage";
import CustomScrollbars from "../components/CustomScrollbars";
import DetailDoctor from "./Patient/Doctor/DetailDoctor";
import VerifyEmail from "./Patient/VerifyEmail";
import DetailSpecialty from "./Patient/Specialty/DetailSpecialty";
import DetailClinic from "./Patient/Clinic/DetailClinic";
import PageAddNewAccount from "./System/PageAddNewAccount";
import ManageSchedule from "./System/Doctor/ManageSchedule";
import HomeListClinic from "./Patient/Clinic/HomeListClinic";
import HomeListDoctor from "./Patient/Doctor/HomeListDoctor";
import HomeListSpecialty from "./Patient/Specialty/HomeListSpecialty";
import DetailPost from "./Patient/Post/DetailPost";
import HomeListPost from "./Patient/Post/HomeListPost";
class App extends Component {
  handlePersistorState = () => {
    const { persistor } = this.props;
    let { bootstrapped } = persistor.getState();
    if (bootstrapped) {
      if (this.props.onBeforeLift) {
        Promise.resolve(this.props.onBeforeLift())
          .then(() => this.setState({ bootstrapped: true }))
          .catch(() => this.setState({ bootstrapped: true }));
      } else {
        this.setState({ bootstrapped: true });
      }
    }
  };

  componentDidMount() {
    this.handlePersistorState();
  }

  render() {
    return (
      <Fragment>
        <Router history={history}>
          <div className="main-container">
            <ConfirmModal />

            <div className="content-container">
              <CustomScrollbars style={{ height: "100vh", width: "100%" }}>
                <Switch>
                  <Route path={path.HOME} exact component={Home} />
                  <Route
                    path={path.LOGIN}
                    component={userIsNotAuthenticated(Login)}
                  />
                  <Route
                    path={path.SYSTEM}
                    component={userIsAuthenticated(System)}
                  />
                  {/* <Route
                    path={path.ADD_NEW_ACCOUNT}
                    component={userIsAuthenticated(PageAddNewAccount)}
                  /> */}
                  <Route
                    path="/doctor/"
                    component={userIsAuthenticated(Doctor)}
                  />
                  {/* <Route
                    path="/doctor/manage-schedule"
                    component={userIsAuthenticated(ManageSchedule)}
                  /> */}
                  <Route path={path.HOMEPAGE} component={HomePage} />
                  <Route path={path.DETAIL_DOCTOR} component={DetailDoctor} />
                  <Route path={path.DETAIL_POST} component={DetailPost} />
                  <Route
                    path={path.DETAIL_SPECIALTY}
                    component={DetailSpecialty}
                  />
                  <Route path={path.DETAIL_CLINIC} component={DetailClinic} />
                  <Route path={path.VERIFY_EMAIL} component={VerifyEmail} />
                  <Route
                    path={path.HOME_LIST_CLINIC}
                    component={HomeListClinic}
                  />
                  <Route
                    path={path.HOME_LIST_DOCTOR}
                    component={HomeListDoctor}
                  />
                  <Route
                    path={path.HOME_LIST_SPECIALTY}
                    component={HomeListSpecialty}
                  />
                  <Route path={path.HOME_LIST_POST} component={HomeListPost} />
                </Switch>
              </CustomScrollbars>
            </div>
            <ToastContainer
              position="top-right"
              autoClose={2000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </div>
        </Router>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    started: state.app.started,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
