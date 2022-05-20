import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import "./Login.scss";
import { FormattedMessage } from "react-intl";

import { handleLoginApi } from "../../services/userService";
import { withRouter } from "react-router";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isShowPassword: false,
      errorMessage: "",
    };
  }
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
    // console.log(this.state);
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(this.state);
    this.setState({
      errorMessage: "",
    });
    try {
      let result = await handleLoginApi(
        this.state.username,
        this.state.password
      );
      console.log("result: ", result);
      if (result && result.errCode !== 0) {
        this.setState({
          errorMessage: result.errMessage,
        });
      }
      if (result && result.errCode === 0) {
        this.props.userLoginSuccess(result.user);
        console.log("Login success");
        this.props.history.push("/system/home-manage");
      }
      console.log(result);
    } catch (error) {
      if (error.response) {
        if (error.response.data) {
          this.setState({
            errorMessage: error.response.data.message,
          });
        }
      }
    }
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
                className={
                  this.state.isShowPassword ? "fas fa-eye" : "fas fa-eye-slash"
                }
                onClick={() => this.handleChangeTypePassword()}
              ></i>
            </div>
            <div className="col-12 form-group text-danger text-center fw-bold">
              {this.state.errorMessage}
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
            {/* <div className="col-12 form-group text-center">
              <a href="#" className="text-danger">
                Forgot your password?
              </a>
            </div> */}
            <div className="col-12 form-group text-center ">
              <div className="form-control border-0 mb-2">
                <span className="font-weight-bold">Or login with</span>
              </div>
              <a href="#">
                <i className="fab fa-google-plus-g"></i>
              </a>
              <a href="#">
                <i className="fab fa-facebook"></i>
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

    // userLoginFail: () => dispatch(actions.userLoginFail()),
    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
