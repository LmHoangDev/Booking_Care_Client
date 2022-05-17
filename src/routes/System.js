import { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import Header from "../containers/Header/Header";
import ManageDoctor from "../containers/System/Admin/ManageDoctor";
import UserRedux from "../containers/System/Admin/UserRedux";
import ListClinic from "../containers/System/Clinic/ListClinic";
import ManageClinic from "../containers/System/Clinic/ManageClinic";
import PageAddNewAccount from "../containers/System/PageAddNewAccount";
import PageAddPost from "../containers/System/Post/PageAddPost";
import PostManage from "../containers/System/Post/PostManage";
import ListSpecialty from "../containers/System/Specialty/ListSpecialty";
import ManageSpecialty from "../containers/System/Specialty/ManageSpecialty";
import UserManage from "../containers/System/UserManage";

class System extends Component {
  render() {
    const { systemMenuPath, isLoggedIn } = this.props;

    return (
      <>
        {" "}
        {this.props.isLoggedIn && <Header />}
        <div className="system-container">
          <div className="system-list">
            <Switch>
              <Route path="/system/user-manage" component={UserManage} />
              <Route path="/system/user-redux" component={UserRedux} />
              <Route path="/system/doctor-manage" component={ManageDoctor} />

              <Route
                path="/system/specialty-manage"
                component={ManageSpecialty}
              />
              <Route path="/system/specialty-list" component={ListSpecialty} />
              <Route
                path="/system/create-account"
                component={PageAddNewAccount}
              />

              <Route
                path="/system/specialty-manage"
                component={ManageSpecialty}
              />
              <Route path="/system/post-list" component={PostManage} />
              <Route path="/system/create-post" component={PageAddPost} />

              <Route path="/system/create-clinic" component={ManageClinic} />
              <Route path="/system/clinic-list" component={ListClinic} />
              {/* <Route path="/system/handbook-manage" component={PostManage} /> */}
              <Route
                component={() => {
                  return <Redirect to={systemMenuPath} />;
                }}
              />
            </Switch>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    systemMenuPath: state.app.systemMenuPath,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
