import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
// import { KeyCodeUtils, LanguageUtils } from "../utils";

// import userIcon from "../../src/assets/images/user.svg";
// import passIcon from "../../src/assets/images/pass.svg";
import "./Login.scss";
import { FormattedMessage } from "react-intl";

// import adminService from "../services/adminService";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isShowPassword: false,
    };
  }
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
    // console.log(this.state);
  };
  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
  };
  handleChangeTypePassword = () => {
    this.setState({
      isShowPassword: !this.state.isShowPassword,
    });
  };

  render() {
    return (
      <div className="login-bg">
        <div className="login-container">
          <h2 className="text-center">Sign In</h2>
          <form
            className="login-content row"
            onSubmit={(e) => this.handleSubmit(e)}
          >
            <div className="col-12 form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                value={this.state.username}
                onChange={(e) => this.handleChange(e)}
              />
            </div>
            <div className="col-12 form-group container-password">
              <label htmlFor="password">Password</label>
              <input
                type={this.state.isShowPassword ? "text" : "password"}
                className="form-control"
                name="password"
                id="password"
                value={this.state.password}
                onChange={(e) => this.handleChange(e)}
              />

              <i
                class={
                  this.state.isShowPassword ? "fas fa-eye" : "fas fa-eye-slash"
                }
                onClick={() => this.handleChangeTypePassword()}
              ></i>
            </div>
            <div className="col-12 form-group">
              <button
                type="submit"
                className="form-control"
                onClick={(e) => this.handleSubmit(e)}
              >
                Login
              </button>
            </div>
            <div className="col-12 form-group text-center">
              <a href="#" className="text-danger">
                Forgot your password?
              </a>
            </div>
            <div className="col-12 form-group text-center ">
              <div className="form-control border-0 mb-2">
                <span className="font-weight-bold">Or login with</span>
              </div>
              <a href="#">
                <i class="fab fa-google-plus-g"></i>
              </a>
              <a href="">
                <i class="fab fa-facebook"></i>
              </a>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    adminLoginSuccess: (adminInfo) =>
      dispatch(actions.adminLoginSuccess(adminInfo)),
    adminLoginFail: () => dispatch(actions.adminLoginFail()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
