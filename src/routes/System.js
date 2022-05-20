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
import HomeManage from "../containers/System/HomeManage";
import ChangePassword from "../containers/Auth/ChangePassword";
import ChangeInforPersonal from "../containers/Auth/ChangeInforPersonal";
import "./FooterAdmin.scss";
import ManageSchedule from "../containers/System/Doctor/ManageSchedule";
class System extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrolling: false,
    };
  }
  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }
  handleScroll(event) {
    if (window.scrollY === 0 && this.state.scrolling === true) {
      this.setState({ scrolling: false });
    } else if (window.scrollY !== 0 && this.state.scrolling !== true) {
      this.setState({ scrolling: true });
    }
  }
  render() {
    const { systemMenuPath, isLoggedIn } = this.props;

    return (
      <>
        {" "}
        {this.props.isLoggedIn && <Header />}
        <div className="system-container" style={{ minHeight: "100vh" }}>
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
                path="/system/change-password"
                component={ChangePassword}
              />
              <Route
                path="/system/change-infor-personal"
                component={ChangeInforPersonal}
              />
              <Route
                path="/system/create-account"
                component={PageAddNewAccount}
              />

              <Route
                path="/system/specialty-manage"
                component={ManageSpecialty}
              />
              <Route path="/system/post-list" component={PostManage} />
              <Route path="/system/home-manage" component={HomeManage} />
              <Route path="/system/create-post" component={PageAddPost} />
              <Route
                path="/system/manage-schedule"
                component={ManageSchedule}
              />
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
        <footer
          className="footer-admin-container"
          style={{
            display: this.state.scrolling ? "none" : "block",
          }}
        >
          <p className="copy-right">© 2022 BookingCare</p>
        </footer>
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
