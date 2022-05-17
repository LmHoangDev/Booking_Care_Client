import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions";
import Navigator from "../../components/Navigator";
import { adminMenu, doctorMenu } from "./menuApp";
import "./Header.scss";
import { languages, USER_ROLE } from "../../utils/constant";
import { changeLanguageApp } from "../../store/actions";
import { FormattedMessage } from "react-intl";
import _ from "lodash";

import { Dropdown, DropdownButton } from "reactstrap";
import { withRouter } from "react-router";
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuApp: [],
      isShow: false,
    };
  }
  toggleShow = () => {
    this.setState({ isShow: !this.state.isShow });
  };
  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };
  componentDidMount() {
    let { userInfo } = this.props;
    let menu = [];
    if (userInfo && !_.isEmpty(userInfo)) {
      let role = userInfo.roleId;
      if (role === USER_ROLE.ADMIN) {
        menu = adminMenu;
      }
      if (role === USER_ROLE.DOCTOR) {
        menu = doctorMenu;
      }
      this.setState({ menuApp: menu });
    }
  }
  render() {
    const { processLogout, language, userInfo } = this.props;

    return (
      <div className="header-container">
        {/* thanh navigator */}
        <div className="header-tabs-container">
          <Navigator menus={this.state.menuApp} />
        </div>
        <div className="languages" style={{ display: "flex" }}>
          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{ height: "40px" }}
              onClick={() => this.toggleShow()}
            >
              <span className="welcome">
                <FormattedMessage id="homeheader.welcome" />
                {userInfo && userInfo.firstName ? userInfo.firstName : ""}
              </span>
            </button>
            <ul
              className="dropdown-menu"
              aria-labelledby="dropdownMenuButton1"
              style={{ display: this.state.isShow ? "block" : "none" }}
            >
              <li>
                <a
                  className="dropdown-item"
                  onClick={() => {
                    this.props.history.push("/system/change-password");
                    this.setState({ isShow: false });
                  }}
                >
                  Đổi mật khẩu
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item"
                  onClick={() => {
                    this.props.history.push("/system/change-infor-personal");
                    this.setState({ isShow: false });
                  }}
                >
                  Chỉnh sửa thông tin
                </a>
              </li>
            </ul>
          </div>

          {/* <span
            className={language === "vi" ? "language-vi active" : "language-vi"}
            onClick={() => this.changeLanguage(languages.VI)}
          >
            VN
          </span>
          <span
            className={language === "en" ? "language-en active" : "language-en"}
            onClick={() => this.changeLanguage(languages.EN)}
          >
            EN
          </span> */}
          {/* nút logout */}
          <div
            className="btn btn-logout"
            onClick={processLogout}
            title="Log out"
          >
            <i className="fas fa-sign-out-alt"></i>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
